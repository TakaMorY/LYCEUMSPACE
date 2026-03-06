<template>
  <div class="max-w-2xl mx-auto p-4">
    <NuxtLink to="/forum" class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 transition">
      <Icon name="heroicons:arrow-left" class="w-5 h-5" /> Назад
    </NuxtLink>

    <div v-if="loading" class="text-center py-8 text-gray-400">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin mx-auto" />
      <p class="mt-2">Загрузка поста...</p>
    </div>

    <div v-else-if="post">
      <PostCard
        :post="post"
        @like="handleLike"
        @repost="handleRepost"
        @comment="() => {}"
      />

      <div class="mt-8">
        <h2 class="text-xl font-semibold text-white mb-4">Комментарии</h2>
        <CommentThread :post-id="post.id" />
      </div>
    </div>

    <div v-else class="text-center py-8 text-red-400">
      Пост не найден
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import PostCard from '~/components/PostCard.vue'
import CommentThread from '~/components/CommentThread.vue'

const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const post = ref(null)
const loading = ref(true)

const fetchPost = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id ( name, username, avatar ),
      likes ( id, user_id ),
      comments ( id ),
      reposts ( id, user_id ),
      media ( id, url, type )
    `)
    .eq('id', route.params.id)
    .single()

  if (!error && data) {
    post.value = {
      ...data,
      likes_count: data.likes?.length || 0,
      liked_by_user: data.likes?.some(like => like.user_id === user.value?.id) || false,
      comments_count: data.comments?.length || 0,
      reposts_count: data.reposts?.length || 0,
      reposted_by_user: data.reposts?.some(r => r.user_id === user.value?.id) || false
    }
  }
  loading.value = false
}

onMounted(fetchPost)

const handleLike = ({ postId, liked }) => {
  if (post.value?.id === postId) {
    post.value.likes_count += liked ? 1 : -1
    post.value.liked_by_user = liked
  }
}

const handleRepost = ({ postId, reposted }) => {
  if (post.value?.id === postId) {
    post.value.reposts_count += reposted ? 1 : -1
    post.value.reposted_by_user = reposted
  }
}
</script>