<template>
  <div>
    <div v-if="loading" class="text-center py-20">
      <div class="inline-block w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="error" class="text-center py-20 text-red-400">{{ error }}</div>
    <div v-else>
      <PostDetail :post="post" @updated="refreshPost" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

const loading = ref(true)
const error = ref(null)
const post = ref(null)

const loadPost = async () => {
  loading.value = true
  error.value = null
  try {
    const { data, error: fetchError } = await supabase
      .from('posts')
      .select(`
        *,
        profiles!user_id (username, full_name, avatar_url),
        likes ( user_id ),
        comments ( id )
      `)
      .eq('id', route.params.id)
      .single()
    if (fetchError) throw fetchError

    post.value = {
      ...data,
      likes_count: data.likes?.length || 0,
      comments_count: data.comments?.length || 0,
      user_liked: user.value ? data.likes?.some(like => like.user_id === user.value.id) : false
    }
  } catch (err) {
    console.error(err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const refreshPost = () => loadPost()

onMounted(loadPost)
</script>