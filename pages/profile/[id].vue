<template>
  <div>
    <!-- Состояние загрузки -->
    <div v-if="loading" class="text-center py-8 text-white">Загрузка профиля...</div>

    <!-- Ошибка -->
    <div v-else-if="error" class="text-center py-8 text-red-400">
      <p>{{ error }}</p>
    </div>

    <!-- Профиль загружен -->
    <div v-else-if="profile" class="relative">
      <!-- Обложка (заглушка) -->
      <div class="h-32 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-t-2xl"></div>

      <!-- Аватар и информация -->
      <div class="px-4 pb-4">
        <div class="flex items-end -mt-12 mb-4">
          <img
            :src="profile.avatar_url || '/images/defaultavatar/default-avatar.png'"
            class="w-24 h-24 rounded-full border-4 border-neutral-950"
          />
          <div class="ml-4 flex-1">
            <h1 class="text-2xl font-bold text-white">{{ profile.full_name || profile.username }}</h1>
            <p class="text-neutral-400">@{{ profile.username }}</p>
          </div>

          <!-- Кнопка редактирования (только для владельца) -->
          <button
            v-if="isOwner"
            @click="navigateTo('/settings/profile')"
            class="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            Редактировать профиль
          </button>
        </div>

        <!-- Био -->
        <p v-if="profile.bio" class="text-white/80 mt-2">{{ profile.bio }}</p>

        <!-- Дополнительная информация -->
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

        <!-- Статистика (только посты и лайки) -->
        <div class="flex space-x-6 mt-4 border-t border-neutral-800 pt-4">
          <div>
            <span class="font-bold text-white">{{ posts?.length || 0 }}</span>
            <span class="text-neutral-500 ml-1">постов</span>
          </div>
          <div>
            <span class="font-bold text-white">{{ totalLikes }}</span>
            <span class="text-neutral-500 ml-1">лайков</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Посты пользователя -->
    <h2 class="text-xl font-bold text-white mb-3 mt-6">Посты</h2>
    <div v-if="postsLoading" class="text-center py-8 text-neutral-500">Загрузка постов...</div>
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

const loading = ref(true)
const error = ref(null)
const profile = ref(null)

const profileId = route.params.id

if (!profileId || profileId === 'undefined' || profileId === 'null' || profileId.length < 30) {
  throw createError({ statusCode: 404, message: 'Профиль не найден' })
}

const isOwner = computed(() => user.value && user.value.id === profileId)

// Загрузка профиля
const loadProfile = async () => {
  loading.value = true
  error.value = null

  try {
    const { data, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', profileId)
      .maybeSingle()

    if (fetchError) throw fetchError

    if (data) {
      profile.value = data
    } else {
      if (isOwner.value) {
        const username = user.value.email?.split('@')[0] || `user_${Date.now()}`
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({ id: profileId, username, full_name: username, avatar_url: null })
        if (insertError) throw insertError

        const { data: newData, error: fetchNewError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single()
        if (fetchNewError) throw fetchNewError
        profile.value = newData
      } else {
        throw new Error('Профиль не найден')
      }
    }
  } catch (err) {
    console.error('Ошибка загрузки профиля:', err)
    error.value = err.message
    if (err.message === 'Профиль не найден') {
      throw createError({ statusCode: 404, message: 'Профиль не найден' })
    }
  } finally {
    loading.value = false
  }
}

watchEffect(async () => {
  if (profileId && user.value !== undefined) {
    await loadProfile()
  }
})

// Посты пользователя (исправлен запрос likes: теперь user_id)
const { data: posts, pending: postsLoading, refresh: refreshPosts } = await useAsyncData(
  `profile-posts-${profileId}`,
  async () => {
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
  },
  {
    server: false,
    default: () => []
  }
)

// Общее количество лайков
const totalLikes = computed(() => {
  return posts.value?.reduce((sum, post) => sum + (post.likes_count || 0), 0) || 0
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>