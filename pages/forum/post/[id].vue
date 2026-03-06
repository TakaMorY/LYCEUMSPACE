<template>
  <div class="max-w-2xl mx-auto p-4 space-y-6">
    <NuxtLink to="/forum" class="inline-flex items-center gap-1 text-gray-500 hover:text-blue-600">
      <Icon name="heroicons:arrow-left" class="w-4 h-4" /> Назад
    </NuxtLink>
    
    <PostCard v-if="post" :post="post" expanded />
    <div v-else class="text-center py-10">Пост не найден</div>
    
    <div class="border-t border-gray-200 dark:border-gray-800 pt-6">
      <h2 class="text-xl font-semibold mb-4">Комментарии</h2>
      <CommentThread :post-id="route.params.id" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const post = ref(null)

onMounted(async () => {
  const { data } = await supabase
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
  
  if (data) {
    post.value = {
      ...data,
      likes_count: data.likes?.length || 0,
      liked_by_user: data.likes?.some(like => like.user_id === user.value?.id) || false,
      comments_count: data.comments?.length || 0,
      reposts_count: data.reposts?.length || 0,
      reposted_by_user: data.reposts?.some(r => r.user_id === user.value?.id) || false
    }
  }
})
</script>