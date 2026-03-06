<template>
  <article class="card">
    <div class="card-body">
      <div class="flex gap-3">
        <!-- Аватар -->
        <img
          v-if="post.profiles?.avatar"
          :src="post.profiles.avatar"
          class="avatar avatar-md"
          alt=""
        />
        <div v-else class="avatar avatar-md bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
          {{ post.profiles?.name?.charAt(0) || '?' }}
        </div>
        
        <div class="flex-1 min-w-0">
          <!-- Шапка: имя, юзернейм, дата -->
          <div class="flex items-center gap-2 flex-wrap text-sm">
            <NuxtLink
              :to="`/forum/profile/${post.user_id}`"
              class="font-semibold text-gray-900 dark:text-white hover:underline truncate"
            >
              {{ post.profiles?.name }}
            </NuxtLink>
            <span class="text-gray-500">@{{ post.profiles?.username }}</span>
            <span class="text-gray-400">· {{ formatDate(post.created_at) }}</span>
          </div>
          
          <!-- Текст поста -->
          <p class="mt-2 text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
            {{ post.content }}
          </p>
          
          <!-- Медиа -->
          <div v-if="post.media?.length" class="mt-3 grid gap-1" :class="mediaGridClass">
            <img
              v-for="m in post.media"
              :key="m.id"
              :src="m.url"
              class="rounded-lg object-cover w-full h-auto cursor-pointer hover:opacity-90 transition"
              @click="openMedia(m)"
            />
          </div>
          
          <!-- Действия -->
          <div class="flex items-center gap-4 mt-4">
            <button
              class="btn-icon"
              :class="{ 'text-red-500': post.liked_by_user }"
              @click="$emit('like', post)"
            >
              <Icon
                :name="post.liked_by_user ? 'heroicons:heart-solid' : 'heroicons:heart'"
                class="w-5 h-5"
              />
              <span>{{ post.likes_count }}</span>
            </button>
            
            <button class="btn-icon" @click="$emit('comment', post)">
              <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-5 h-5" />
              <span>{{ post.comments_count }}</span>
            </button>
            
            <button class="btn-icon" @click="$emit('repost', post)">
              <Icon name="heroicons:arrow-path" class="w-5 h-5" />
              <span>{{ post.reposts_count }}</span>
            </button>
            
            <NuxtLink
              v-if="!expanded"
              :to="`/forum/post/${post.id}`"
              class="btn-icon ml-auto"
            >
              <Icon name="heroicons:arrow-right-circle" class="w-5 h-5" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: Object,
  expanded: Boolean
})
const emit = defineEmits(['like', 'comment', 'repost'])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

const mediaGridClass = computed(() => {
  const count = props.post.media?.length || 0
  if (count === 1) return 'grid-cols-1'
  if (count === 2) return 'grid-cols-2'
  if (count >= 3) return 'grid-cols-3'
  return ''
})
</script>