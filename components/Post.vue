<template>
  <article class="border-b border-neutral-800 py-4 hover:bg-neutral-900/50 transition-colors">
    <div class="flex items-start space-x-3">
      <NuxtLink :to="`/profile/${post.user_id}`" class="flex-shrink-0">
        <img :src="post.profiles?.avatar_url || '/default-avatar.png'" class="w-10 h-10 rounded-full" />
      </NuxtLink>
      <div class="flex-1 min-w-0">
        <div class="flex items-center space-x-1 text-sm">
          <NuxtLink :to="`/profile/${post.user_id}`" class="font-bold text-white hover:underline">
            {{ post.profiles?.full_name || post.profiles?.username }}
          </NuxtLink>
          <span class="text-neutral-500">@{{ post.profiles?.username }}</span>
          <span class="text-neutral-500">·</span>
          <span class="text-neutral-500 text-xs">{{ formatDate(post.created_at) }}</span>
        </div>
        <p class="mt-2 text-white whitespace-pre-wrap">{{ post.content }}</p>

        <!-- Действия -->
        <div class="flex items-center space-x-6 mt-3 text-neutral-500">
          <button @click="toggleLike" class="flex items-center space-x-1 hover:text-pink-500 transition-colors">
            <svg class="w-5 h-5" :class="{ 'fill-pink-500 text-pink-500': userLiked }" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{{ post.likes_count }}</span>
          </button>

          <button @click="showComments = !showComments"
            class="flex items-center space-x-1 hover:text-blue-400 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{{ post.comments_count }}</span>
          </button>
        </div>

        <!-- Комментарии -->
        <div v-if="showComments" class="mt-4 space-y-3">
          <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
          <form @submit.prevent="addComment" class="flex mt-2">
            <input v-model="newComment" placeholder="Напишите комментарий..."
              class="flex-1 bg-neutral-900 border border-neutral-700 rounded-l-full px-4 py-2 text-white placeholder-neutral-500 focus:border-white focus:outline-none transition" />
            <button type="submit"
              class="bg-white text-neutral-900 px-4 py-2 rounded-r-full font-bold disabled:opacity-50 hover:bg-neutral-200 transition"
              :disabled="!newComment.trim()">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['updated'])

const showComments = ref(false)
const newComment = ref('')
const comments = ref([])

const userLiked = computed(() => props.post.user_liked)

const toggleLike = async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) return

  try {
    if (userLiked.value) {
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('post_id', props.post.id)
    } else {
      await supabase
        .from('likes')
        .insert({ user_id: currentUser.id, post_id: props.post.id })
    }
    emit('updated')
  } catch (e) {
    console.error(e)
  }
}

const loadComments = async () => {
  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles!user_id (username, avatar_url)')
    .eq('post_id', props.post.id)
    .order('created_at', { ascending: true })
  if (error) {
    console.error('Ошибка загрузки комментариев:', error)
    return
  }
  comments.value = data || []
}

watch(showComments, async (val) => {
  if (val && comments.value.length === 0) await loadComments()
})

const addComment = async () => {
  if (!newComment.value.trim()) return

  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) {
    alert('Необходимо войти в систему')
    return
  }

  const { error } = await supabase
    .from('comments')
    .insert({
      post_id: props.post.id,
      user_id: currentUser.id,
      content: newComment.value
    })
  if (!error) {
    newComment.value = ''
    await loadComments()
    emit('updated')
  } else {
    console.error('Ошибка добавления комментария:', error)
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'short' })
}
</script>