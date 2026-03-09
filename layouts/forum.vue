<template>
    <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
        <header class="sticky top-0 z-50 bg-neutral-900/70 backdrop-blur-xl border-b border-white/10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-wrap">
                <!-- Логотип с адаптивным размером и переносом -->
                <NuxtLink to="/forum"
                    class="text-xs sm:text-sm md:text-base lg:text-xl font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent whitespace-normal">
                    ЛИЦЕЙСКОЕПРОСТРАНСТВО
                </NuxtLink>

                <!-- Блок авторизованного пользователя -->
                <div v-if="user" class="flex items-center gap-2 sm:gap-4">
                    <!-- Шестеренка -->
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

        <!-- Основной контент с адаптивными отступами -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <slot />
        </main>


    </div>
    <footer>
        <Footer />
    </footer>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const signOut = async () => {
    await supabase.auth.signOut()
    await navigateTo('/login')
}
</script>