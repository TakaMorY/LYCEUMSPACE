<template>
  <div class="p-4">
    <!-- Шапка -->
    <div class="sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10 py-3 mb-4">
      <h1 class="text-xl font-bold">Главная</h1>
    </div>

    <!-- Форма создания поста (десктоп) -->
    <div class="hidden md:block mb-6 bg-neutral-900/50 rounded-xl p-4">
      <CreatePost @created="handleNewPost" />
    </div>

    <!-- Лента -->
    <div class="space-y-4">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @like="handleLike"
        @comment="openComments"
        @repost="handleRepost"
      />
    </div>

    <!-- Загрузка -->
    <div v-if="loading" class="text-center py-8">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-neutral-500" />
    </div>

    <!-- Модалка комментариев -->
    <SimpleModal v-model="showComments" title="Комментарии">
      <CommentThread v-if="selectedPost" :post-id="selectedPost.id" @update="handleCommentUpdate" />
    </SimpleModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import PostCard from '~/components/PostCard.vue'
import CreatePost from '~/components/CreatePost.vue'
import CommentThread from '~/components/CommentThread.vue'
import SimpleModal from '~/components/SimpleModal.vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const posts = ref([])
const loading = ref(true)
const showComments = ref(false)
const selectedPost = ref(null)

// Загрузка постов
const fetchPosts = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id ( name, username, avatar ),
      likes ( id, user_id ),
      comments ( id ),
      reposts ( id, user_id )
    `)
    .order('created_at', { ascending: false })
  
  if (!error && data) {
    posts.value = data.map(post => ({
      ...post,
      likes_count: post.likes?.length || 0,
      liked_by_user: post.likes?.some(like => like.user_id === user.value?.id) || false,
      comments_count: post.comments?.length || 0,
      reposts_count: post.reposts?.length || 0,
      reposted_by_user: post.reposts?.some(r => r.user_id === user.value?.id) || false
    }))
  }
  loading.value = false
}

onMounted(fetchPosts)

const handleNewPost = (post) => {
  // Добавляем новый пост в начало ленты с базовыми полями
  posts.value = [{
    ...post,
    profiles: user.value,
    likes_count: 0,
    liked_by_user: false,
    comments_count: 0,
    reposts_count: 0,
    reposted_by_user: false
  }, ...posts.value]
}

const handleLike = ({ postId, liked }) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.liked_by_user = liked
    post.likes_count += liked ? 1 : -1
  }
}

const handleRepost = ({ postId, reposted }) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.reposted_by_user = reposted
    post.reposts_count += reposted ? 1 : -1
  }
}

const openComments = (post) => {
  selectedPost.value = post
  showComments.value = true
}

const handleCommentUpdate = () => {
  // Обновляем счётчик комментариев
  if (selectedPost.value) {
    const post = posts.value.find(p => p.id === selectedPost.value.id)
    if (post) {
      post.comments_count++
    }
  }
}
</script>