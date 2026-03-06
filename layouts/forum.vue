<template>
    <div class="min-h-screen bg-neutral-950 text-white">
        <div class="max-w-7xl mx-auto flex">
            <!-- Боковая панель (X style) -->
            <aside class="w-64 sticky top-0 h-screen p-4 border-r border-neutral-800">
                <div class="space-y-6">
                    <NuxtLink to="/forum"
                        class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        LYCEUMSPACE
                    </NuxtLink>

                    <nav class="space-y-2">
                        <NuxtLink to="/forum"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-900 transition">
                            <Icon name="heroicons:home" class="w-6 h-6" />
                            <span>Главная</span>
                        </NuxtLink>

                        <NuxtLink :to="`/forum/profile?id=${user?.id}`"
                            class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-900 transition">
                            <Icon name="heroicons:user" class="w-6 h-6" />
                            <span>Профиль</span>
                        </NuxtLink>

                        <button @click="logout"
                            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-900 transition text-red-400">
                            <Icon name="heroicons:arrow-left-on-rectangle" class="w-6 h-6" />
                            <span>Выйти</span>
                        </button>
                    </nav>

                    <!-- Кнопка создания поста (мобильная) -->
                    <button @click="showCreatePost = true"
                        class="md:hidden w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full py-3 font-medium">
                        Написать
                    </button>
                </div>
            </aside>

            <!-- Основной контент -->
            <main class="flex-1 max-w-2xl">
                <slot />
            </main>

            <!-- Правый сайдбар (тренды, рекомендации) -->
            <aside class="w-80 p-4 hidden lg:block">
                <div class="bg-neutral-900/50 rounded-xl p-4 sticky top-4">
                    <h3 class="font-bold mb-4">Тренды</h3>
                    <div class="space-y-4 text-sm text-neutral-400">
                        <p>Скоро здесь появятся популярные темы</p>
                    </div>
                </div>
            </aside>
        </div>

        <!-- Модалка создания поста -->
        <SimpleModal v-model="showCreatePost" title="Создать пост">
            <CreatePost @created="handlePostCreated" />
        </SimpleModal>
    </div>
</template>

<script setup>
import { useSupabaseUser, useSupabaseClient } from '#imports'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const showCreatePost = ref(false)

const logout = async () => {
    await supabase.auth.signOut()
    await router.push('/login')
}

const handlePostCreated = () => {
    showCreatePost.value = false
    // Обновляем ленту (будет реализовано через emit)
}
</script>