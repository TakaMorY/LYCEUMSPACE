<template>
  <div>
    <div v-if="sessionLoading" class="text-center py-4 text-white">Загрузка...</div>
    <template v-else>
      <CreatePost v-if="user" @created="refreshPosts" />
      <div v-else class="bg-neutral-800 text-neutral-300 p-4 rounded-lg mb-4 text-center">
        Войдите, чтобы публиковать посты
      </div>

      <div v-if="postsPending" class="text-center py-4 text-white">Загрузка постов...</div>
      <div v-else-if="!posts || posts.length === 0" class="text-center py-8 text-neutral-500">
        Пока нет постов. Будьте первым!
      </div>
      <div v-else>
        <Post v-for="post in posts" :key="post.id" :post="post" @updated="refreshPosts" />
      </div>
    </template>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'forum'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { data: session, pending: sessionLoading } = await useAsyncData('session', () =>
  supabase.auth.getSession()
)

const { data: posts, pending: postsPending, refresh } = await useAsyncData('feed', async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles!user_id (username, full_name, avatar_url),
        likes ( id ),
        comments ( id )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return (data || []).map(post => ({
      ...post,
      likes_count: post.likes?.length || 0,
      comments_count: post.comments?.length || 0,
      user_liked: user.value ? post.likes?.some(like => like.user_id === user.value.id) : false
    }))
  } catch (err) {
    console.error('Ошибка загрузки постов:', err)
    return []
  }
})

const refreshPosts = () => refresh()
</script>