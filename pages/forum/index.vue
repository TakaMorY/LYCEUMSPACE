<template>
  <div class="max-w-7xl mx-auto">
    <!-- Поиск -->
    <div class="mb-8">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск по заголовкам..."
          class="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-neutral-500 focus:border-blue-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
        />
        <svg class="absolute right-4 top-4 w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <CreatePost v-if="user" @created="handlePostCreated" />
    <div v-else class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-8 text-center">
      <p class="text-neutral-300">Войдите, чтобы публиковать посты</p>
    </div>

    <!-- Лента постов -->
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="filteredPosts.length === 0" class="text-center py-20 text-neutral-400 text-lg">
      Пока нет постов. Будьте первым!
    </div>
    <div v-else class="space-y-6">
      <Post
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        @updated="refreshPosts"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const searchQuery = ref('')
const loading = ref(true)
const posts = ref([])
const error = ref(null)

const loadPosts = async () => {
  loading.value = true
  error.value = null
  try {
    // ВАЖНО: Запрашиваем likes с полем user_id (как на странице профиля)
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select(`
        *,
        profiles!user_id (username, full_name, avatar_url),
        likes ( user_id ),
        comments ( id )
      `)
      .order('created_at', { ascending: false })

    if (fetchError) throw fetchError

    posts.value = (data || []).map(post => ({
      ...post,
      likes_count: post.likes?.length || 0,
      comments_count: post.comments?.length || 0,
      user_liked: user.value ? post.likes?.some(like => like.user_id === user.value.id) : false
    }))
  } catch (err) {
    console.error('Ошибка загрузки постов:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const filteredPosts = computed(() => {
  if (!searchQuery.value) return posts.value
  const q = searchQuery.value.toLowerCase()
  return posts.value.filter(post => post.title?.toLowerCase().includes(q))
})

let postsChannel
onMounted(() => {
  loadPosts()
  postsChannel = supabase
    .channel('public:posts')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, async (payload) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', payload.new.user_id)
        .single()
      const newPost = {
        ...payload.new,
        profiles: profile,
        likes: [],
        comments: [],
        likes_count: 0,
        comments_count: 0,
        user_liked: false
      }
      posts.value = [newPost, ...posts.value]
    })
    .subscribe()
})

onUnmounted(() => {
  supabase.removeChannel(postsChannel)
})

const refreshPosts = () => loadPosts()
const handlePostCreated = () => {}
</script>