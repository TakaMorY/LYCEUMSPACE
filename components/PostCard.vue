<template>
  <div class="bg-neutral-900/50 rounded-xl p-4 border border-neutral-800 hover:border-neutral-700 transition">
    <div class="flex gap-3">
      <NuxtLink :to="`/forum/profile?id=${post.user_id}`">
        <UserAvatar :user="post.profiles" />
      </NuxtLink>

      <div class="flex-1">
        <div class="flex items-center gap-2">
          <NuxtLink :to="`/forum/profile?id=${post.user_id}`" class="font-semibold hover:underline">
            {{ post.profiles?.name || 'Пользователь' }}
          </NuxtLink>
          <span class="text-neutral-500 text-sm">· {{ formatDate(post.created_at) }}</span>
        </div>

        <p class="mt-2 text-white">{{ post.content }}</p>

        <!-- Медиа -->
        <div v-if="post.media?.length" class="mt-3 grid grid-cols-2 gap-2">
          <!-- тут будут изображения -->
        </div>

        <!-- Действия -->
        <div class="flex items-center gap-6 mt-4 text-neutral-500">
          <button @click="toggleLike" class="flex items-center gap-1 hover:text-red-500 transition">
            <Icon :name="liked ? 'heroicons:heart-solid' : 'heroicons:heart'" class="w-5 h-5" :class="{ 'text-red-500': liked }" />
            <span :class="{ 'text-red-500': liked }">{{ likesCount }}</span>
          </button>

          <button @click="$emit('comment', post)" class="flex items-center gap-1 hover:text-blue-500 transition">
            <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-5 h-5" />
            <span>{{ commentsCount }}</span>
          </button>

          <button @click="toggleRepost" class="flex items-center gap-1 hover:text-green-500 transition">
            <Icon name="heroicons:arrow-path" class="w-5 h-5" :class="{ 'text-green-500': reposted }" />
            <span :class="{ 'text-green-500': reposted }">{{ repostsCount }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import UserAvatar from './UserAvatar.vue'

const props = defineProps({
  post: Object
})
const emit = defineEmits(['like', 'comment', 'repost', 'update'])

const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Локальное состояние для оптимистичных обновлений
const liked = ref(props.post.liked_by_user || false)
const likesCount = ref(props.post.likes_count || 0)
const reposted = ref(props.post.reposted_by_user || false)
const repostsCount = ref(props.post.reposts_count || 0)
const commentsCount = ref(props.post.comments_count || 0)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
  })
}

const toggleLike = async () => {
  if (!user.value) return
  
  const wasLiked = liked.value
  // Оптимистичное обновление
  liked.value = !wasLiked
  likesCount.value += wasLiked ? -1 : 1
  
  try {
    if (wasLiked) {
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.value.id)
        .eq('post_id', props.post.id)
    } else {
      await supabase
        .from('likes')
        .insert({ user_id: user.value.id, post_id: props.post.id })
    }
    emit('like', { postId: props.post.id, liked: liked.value })
  } catch (error) {
    // Откат при ошибке
    liked.value = wasLiked
    likesCount.value += wasLiked ? 1 : -1
    console.error('Ошибка:', error)
  }
}

const toggleRepost = async () => {
  if (!user.value) return
  
  const wasReposted = reposted.value
  reposted.value = !wasReposted
  repostsCount.value += wasReposted ? -1 : 1
  
  try {
    if (wasReposted) {
      await supabase
        .from('reposts')
        .delete()
        .eq('user_id', user.value.id)
        .eq('post_id', props.post.id)
    } else {
      await supabase
        .from('reposts')
        .insert({ user_id: user.value.id, post_id: props.post.id })
    }
    emit('repost', { postId: props.post.id, reposted: reposted.value })
  } catch (error) {
    reposted.value = wasReposted
    repostsCount.value += wasReposted ? 1 : -1
    console.error('Ошибка:', error)
  }
}
</script>