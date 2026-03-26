<template>
    <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
        <header class="sticky top-0 z-50 bg-neutral-900/70 backdrop-blur-xl border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-wrap">
                <NuxtLink to="/"
                    class="text-xs sm:text-sm md:text-base lg:text-xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent whitespace-normal">
                    ЛИЦЕЙСКОЕПРОСТРАНСТВО
                </NuxtLink>

                <div v-if="userId" class="flex items-center gap-2 sm:gap-4">
                    <!-- Кнопка профиля -->
                    <NuxtLink :to="`/profile/${userId}`" 
                        class="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
                        title="Мой профиль">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </NuxtLink>

                    <!-- Кнопка сообщений -->
                    <NuxtLink to="/messages" 
                        class="relative p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
                        title="Личные сообщения">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span v-if="unreadCount > 0" 
                            class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
                            {{ unreadCount > 9 ? '9+' : unreadCount }}
                        </span>
                    </NuxtLink>

                    <!-- Настройки -->
                    <NuxtLink to="/settings/profile"
                        class="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
                        title="Настройки профиля">
                        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </NuxtLink>

                    <!-- Кнопка выхода -->
                    <button @click="signOut"
                        class="px-3 py-1.5 sm:px-5 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs sm:text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/10">
                        Выйти
                    </button>
                </div>
            </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <slot />
        </main>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const userId = ref(null)
const unreadCount = ref(0)

// Получаем ID напрямую через getUser()
const loadUserId = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    if (currentUser) {
        userId.value = currentUser.id
        loadUnreadCount()
    }
}

const loadUnreadCount = async () => {
    if (!userId.value) return
    const { count } = await supabase
        .from('user_messages')
        .select('*', { count: 'exact', head: true })
        .eq('receiver_id', userId.value)
        .eq('read', false)
    unreadCount.value = count || 0
}

const signOut = async () => {
    await supabase.auth.signOut()
    await navigateTo('/login')
}

let messagesChannel

onMounted(() => {
    loadUserId()
    messagesChannel = supabase
        .channel('public:user_messages')
        .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'user_messages',
            filter: `receiver_id=eq.${userId.value}`
        }, () => {
            loadUnreadCount()
        })
        .subscribe()
})

onUnmounted(() => {
    if (messagesChannel) supabase.removeChannel(messagesChannel)
})
</script>