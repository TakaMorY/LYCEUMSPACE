<template>
  <div>
    <!-- Профиль -->
    <div v-if="profilePending" class="text-center py-8 text-neutral-500">Загрузка профиля...</div>
    <div v-else-if="profile" class="border-b border-neutral-800 pb-6 mb-6">
      <div class="flex items-start space-x-4">
        <img :src="profile.avatar_url || '/default-avatar.png'" class="w-24 h-24 rounded-full border-2 border-neutral-700" />
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-white">{{ profile.full_name || profile.username }}</h1>
          <p class="text-neutral-500">@{{ profile.username }}</p>
          <p v-if="profile.bio" class="mt-2 text-white/80">{{ profile.bio }}</p>
          <p class="text-neutral-600 text-sm mt-2">Зарегистрирован {{ formatDate(profile.created_at) }}</p>
        </div>
        <button
          v-if="user && user.id !== profile.id"
          @click="toggleFollow"
          class="px-4 py-2 rounded-full font-bold border transition"
          :class="isFollowing ? 'border-neutral-700 text-white hover:bg-neutral-800' : 'bg-white text-black border-white hover:bg-neutral-200'"
        >
          {{ isFollowing ? 'Отписаться' : 'Подписаться' }}
        </button>
      </div>
    </div>
    <div v-else class="text-center py-8 text-neutral-500">Пользователь не найден</div>

    <!-- Посты пользователя -->
    <h2 class="text-xl font-bold text-white mb-3">Посты</h2>
    <div v-if="postsPending" class="text-center py-8 text-neutral-500">Загрузка постов...</div>
    <div v-else-if="!posts || posts.length === 0" class="text-center py-8 text-neutral-500">
      У пользователя пока нет постов
    </div>
    <div v-else>
      <Post v-for="post in posts" :key="post.id" :post="post" @updated="refreshPosts" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'forum'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const profileId = route.params.id

const { data: profile, pending: profilePending } = await useAsyncData(`profile-${profileId}`, async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single()
  if (error) throw error
  return data
})

const { data: posts, pending: postsPending, refresh } = await useAsyncData(`profile-posts-${profileId}`, async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!user_id (username, full_name, avatar_url),
      likes ( id ),
      comments ( id )
    `)
    .eq('user_id', profileId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(post => ({
    ...post,
    likes_count: post.likes?.length || 0,
    comments_count: post.comments?.length || 0,
    user_liked: user.value ? post.likes?.some(like => like.user_id === user.value.id) : false
  }))
})

const { data: followData, refresh: refreshFollow } = await useAsyncData(`follow-${profileId}`, async () => {
  if (!user.value || user.value.id === profileId) return null
  const { data } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', user.value.id)
    .eq('following_id', profileId)
    .maybeSingle()
  return data
})

const isFollowing = computed(() => !!followData.value)

const toggleFollow = async () => {
  if (!user.value) return
  if (isFollowing.value) {
    await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.value.id)
      .eq('following_id', profileId)
  } else {
    await supabase
      .from('follows')
      .insert({ follower_id: user.value.id, following_id: profileId })
  }
  refreshFollow()
}

const refreshPosts = () => refresh()

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>