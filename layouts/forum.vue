<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
    <!-- Десктопная шапка (видна на md и выше) -->
    <header class="hidden md:block sticky top-0 z-50 bg-neutral-900/70 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-wrap">
        <NuxtLink to="/" class="text-xs sm:text-sm md:text-base lg:text-xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          ЛИЦЕЙСКОЕПРОСТРАНСТВО
        </NuxtLink>

        <div v-if="user" class="flex items-center gap-2 sm:gap-4">
          <!-- Кнопка сообщений -->
          <NuxtLink to="/messages" class="relative p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm border border-white/10">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </NuxtLink>

          <!-- Шестерёнка (настройки) -->
          <NuxtLink to="/settings/profile" class="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm border border-white/10">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </NuxtLink>

          <!-- Аватар пользователя (ссылка на профиль) -->
          <NuxtLink :to="user ? `/profile/${user.id}` : '#'" class="flex items-center gap-2">
            <img :src="headerProfile?.avatar_url || '/images/defaultavatar/default-avatar.png'" class="w-8 h-8 rounded-full border border-white/20" />
            <span class="text-white text-sm hidden sm:inline">{{ headerProfile?.full_name || headerProfile?.username }}</span>
          </NuxtLink>

          <!-- Кнопка выхода -->
          <button @click="signOut" class="px-3 py-1.5 sm:px-5 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs sm:text-sm font-medium transition-all backdrop-blur-sm border border-white/10">
            Выйти
          </button>
        </div>
      </div>
    </header>

    <!-- Мобильное нижнее меню (видно только на экранах < md) -->
    <div v-if="user" class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/90 backdrop-blur-xl border-t border-white/10">
      <div class="flex justify-around py-2">
        <NuxtLink to="/" class="flex flex-col items-center p-2 text-neutral-400 hover:text-white transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs mt-1">Главная</span>
        </NuxtLink>
        <NuxtLink to="/messages" class="flex flex-col items-center p-2 text-neutral-400 hover:text-white transition relative">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span class="text-xs mt-1">Сообщения</span>
          <span v-if="unreadCount > 0" class="absolute top-0 right-2 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
            {{ unreadCount > 9 ? '9+' : unreadCount }}
          </span>
        </NuxtLink>
        <NuxtLink :to="user ? `/profile/${user.id}` : '#'" class="flex flex-col items-center p-2 text-neutral-400 hover:text-white transition">
          <img :src="headerProfile?.avatar_url || '/images/defaultavatar/default-avatar.png'" class="w-6 h-6 rounded-full border border-white/20" />
          <span class="text-xs mt-1">Профиль</span>
        </NuxtLink>
        <NuxtLink to="/settings/profile" class="flex flex-col items-center p-2 text-neutral-400 hover:text-white transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-xs mt-1">Настройки</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Основной контент с отступом снизу на мобильных -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-20 md:pb-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const unreadCount = ref(0)

// Загрузка данных профиля для шапки (аватар и имя)
const { data: headerProfile, refresh: refreshHeader } = await useAsyncData('header-profile', async () => {
  if (!user.value) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('username, full_name, avatar_url')
    .eq('id', user.value.id)
    .single()
  if (error) return null
  return data
}, { server: false })

const loadUnreadCount = async () => {
  if (!user.value) return
  const { count } = await supabase
    .from('user_messages')
    .select('*', { count: 'exact', head: true })
    .eq('receiver_id', user.value.id)
    .eq('read', false)
  unreadCount.value = count || 0
}

let messagesChannel
onMounted(() => {
  if (user.value) {
    loadUnreadCount()
    messagesChannel = supabase
      .channel('public:user_messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'user_messages',
        filter: `receiver_id=eq.${user.value.id}`
      }, () => {
        loadUnreadCount()
      })
      .subscribe()
  }
})
onUnmounted(() => {
  if (messagesChannel) supabase.removeChannel(messagesChannel)
})

const signOut = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>