<template>
  <div>
    <!-- Шапка профиля с обложкой -->
    <div v-if="profilePending" class="text-center py-8 text-neutral-500">Загрузка профиля...</div>
    <div v-else-if="profileError" class="text-center py-8 text-neutral-500">
      <p>Ошибка загрузки профиля.</p>
      <p class="text-sm mt-2">{{ profileError.message }}</p>
    </div>
    <div v-else-if="profile" class="relative">
      <!-- Обложка (заглушка) -->
      <div class="h-32 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-t-2xl"></div>

      <!-- Аватар и информация -->
      <div class="px-4 pb-4">
        <div class="flex items-end -mt-12 mb-4">
          <img :src="profile.avatar_url || '/images/defaultavatar/default-avatar.png'" class="w-24 h-24 rounded-full border-4 border-neutral-950" />
            class="w-24 h-24 rounded-full border-4 border-neutral-950" />
          <div class="ml-4 flex-1">
            <h1 class="text-2xl font-bold text-white">{{ profile.full_name || profile.username }}</h1>
            <p class="text-neutral-400">@{{ profile.username }}</p>
          </div>
          <!-- Кнопка редактирования (только для владельца) -->
          <button v-if="user && user.id === profile.id" @click="navigateTo('/settings/profile')"
            class="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition">
            Редактировать профиль
          </button>
          <button v-else-if="user && user.id !== profile.id" @click="toggleFollow"
            class="px-4 py-2 rounded-full font-bold border transition"
            :class="isFollowing ? 'border-neutral-700 text-white hover:bg-neutral-800' : 'bg-white text-black border-white hover:bg-neutral-200'">
            {{ isFollowing ? 'Отписаться' : 'Подписаться' }}
          </button>
        </div>

        <!-- Био и дополнительная информация -->
        <p v-if="profile.bio" class="text-white/80 mt-2">{{ profile.bio }}</p>

        <div class="flex flex-wrap gap-4 mt-3 text-sm">
          <div v-if="profile.class_number || profile.class_letter" class="flex items-center text-neutral-400">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{{ profile.class_number }}{{ profile.class_letter }} класс</span>
          </div>
          <div class="flex items-center text-neutral-400">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Зарегистрирован {{ formatDate(profile.created_at) }}</span>
          </div>
        </div>

        <!-- Статистика (посты, подписчики, подписки) – можно добавить позже -->
        <div class="flex space-x-6 mt-4 border-t border-neutral-800 pt-4">
          <div>
            <span class="font-bold text-white">{{ posts?.length || 0 }}</span>
            <span class="text-neutral-500 ml-1">постов</span>
          </div>
          <div>
            <span class="font-bold text-white">0</span>
            <span class="text-neutral-500 ml-1">подписчиков</span>
          </div>
          <div>
            <span class="font-bold text-white">0</span>
            <span class="text-neutral-500 ml-1">подписок</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-8 text-neutral-500">Пользователь не найден</div>

    <!-- Посты пользователя -->
    <h2 class="text-xl font-bold text-white mb-3 mt-6">Посты</h2>
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
definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const profileId = route.params.id

// Проверка на undefined или некорректный UUID
if (!profileId || profileId === 'undefined' || profileId === 'null') {
  throw createError({ statusCode: 404, message: 'Профиль не найден' })
}

// Загружаем профиль
const { data: profile, pending: profilePending, error: profileError } = await useAsyncData(`profile-${profileId}`, async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', profileId)
    .single()
  if (error) throw error
  return data
})

// Посты пользователя
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

// Подписка (если нужна)
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