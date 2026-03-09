<template>
    <div class="absolute inset-0 opacity-30 pointer-events-none">
        <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping-slow"></div>
        <div class="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-neutral-300 rounded-full animate-pulse-slow"></div>
        <div
            class="absolute bottom-1/4 right-1/4 w-1 h-1 bg-neutral-400 rounded-full animate-ping-slow animation-delay-1000">
        </div>
        <div class="absolute top-1/2 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse-slow animation-delay-2000">
        </div>
    </div>
    <!-- Блобы (размытые круги) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
            class="absolute -top-40 -right-40 w-96 h-96 bg-neutral-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob">
        </div>

        <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neutral-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000">
        </div>
    </div>
    <div class="min-h-screen relative  overflow-hidden">




        <!-- Основной контент -->
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 z-10">

            <!-- Панель поиска (стилизованная под переключатели на странице входа) -->
            <div class="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in-up animation-delay-100">
                <div class="flex p-1 bg-neutral-800/60 rounded-2xl backdrop-blur-sm border border-neutral-700/30">
                    <button @click="searchMode = 'posts'"
                        class="flex-1 py-3 px-6 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden"
                        :class="searchMode === 'posts' ? 'text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-200'">
                        <span v-if="searchMode === 'posts'"
                            class="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-600 animate-gradient"></span>
                        <span class="relative z-10">Поиск постов</span>
                    </button>
                    <button @click="searchMode = 'users'"
                        class="flex-1 py-3 px-6 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden"
                        :class="searchMode === 'users' ? 'text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-200'">
                        <span v-if="searchMode === 'users'"
                            class="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-600 animate-gradient"></span>
                        <span class="relative z-10">Поиск пользователей</span>
                    </button>
                </div>

                <!-- Поле поиска (стиль инпута из login.vue) -->
                <div class="flex-1 relative group/input">
                    <input v-model="searchQuery"
                        :placeholder="searchMode === 'posts' ? 'Поиск по заголовкам...' : 'Поиск по имени или никнейму...'"
                        class="w-full px-6 py-3 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                    <svg class="absolute right-4 top-3.5 w-5 h-5 text-neutral-500 transition-colors group-focus-within/input:text-white"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <!-- Результаты поиска пользователей (карточки в стиле карточки входа) -->
            <div v-if="searchMode === 'users' && searchQuery" class="mb-8 animate-fade-in animation-delay-200">
                <div v-if="searchingUsers" class="text-center py-8">
                    <div
                        class="inline-block w-8 h-8 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin">
                    </div>
                </div>
                <div v-else-if="userResults.length === 0" class="text-center py-8 text-neutral-500">
                    Пользователи не найдены
                </div>
                <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <NuxtLink v-for="user in userResults" :key="user.id" :to="`/profile/${user.id}`"
                        class="relative group bg-neutral-900/40 backdrop-blur-xl rounded-2xl border border-neutral-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
                        <!-- Неоновая подсветка при наведении -->
                        <div
                            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                            <div
                                class="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl">
                            </div>
                            <div
                                class="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-2xl">
                            </div>
                        </div>
                        <div class="relative p-4 flex items-center gap-3">
                            <img :src="user.avatar_url || '/images/defaultavatar/default-avatar.png'"
                                class="w-12 h-12 rounded-full border-2 border-neutral-700/50" />
                            <div>
                                <div class="font-semibold text-white">{{ user.full_name || user.username }}</div>
                                <div class="text-sm text-neutral-400">@{{ user.username }}</div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>

            <!-- Компонент создания поста (уже стилизован отдельно) -->
            <div v-if="searchMode === 'posts'" class="animate-fade-in animation-delay-200">
                <CreatePost v-if="user" @created="handlePostCreated" />
                <div v-else
                    class="bg-neutral-900/40 backdrop-blur-xl rounded-3xl border border-neutral-700/50 p-6 mb-8 text-center">
                    <p class="text-neutral-400">Войдите, чтобы публиковать посты</p>
                </div>
            </div>

            <!-- Лента постов -->
            <div v-if="searchMode === 'posts'" class="animate-fade-in animation-delay-300">
                <div v-if="loading" class="text-center py-20">
                    <div
                        class="inline-block w-12 h-12 border-4 border-neutral-700 border-t-neutral-300 rounded-full animate-spin">
                    </div>
                </div>
                <div v-else-if="filteredPosts.length === 0" class="text-center py-20 text-neutral-500 text-lg">
                    Пока нет постов. Будьте первым!
                </div>
                <div v-else class="space-y-6">
                    <Post v-for="post in filteredPosts" :key="post.id" :post="post" @updated="refreshPosts" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const searchMode = ref('posts')
const searchQuery = ref('')
const loading = ref(true)
const posts = ref([])
const error = ref(null)

const userResults = ref([])
const searchingUsers = ref(false)

const loadPosts = async () => {
    if (searchMode.value !== 'posts') return
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
            .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        posts.value = (data || []).map(post => ({
            ...post,
            likes_count: post.likes?.length || 0,
            comments_count: post.comments?.length || 0,
            user_liked: user.value ? post.likes?.some(like => like.user_id === user.value.id) : false
        }))
    } catch (err) {
        console.error('Ошибка загрузки постов:', err)
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const filteredPosts = computed(() => {
    if (!searchQuery.value) return posts.value
    const q = searchQuery.value.toLowerCase()
    return posts.value.filter(post => post.title?.toLowerCase().includes(q))
})

let searchTimeout
watch([searchMode, searchQuery], () => {
    if (searchMode.value !== 'users') {
        userResults.value = []
        return
    }
    if (!searchQuery.value.trim()) {
        userResults.value = []
        return
    }
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
        searchingUsers.value = true
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, username, full_name, avatar_url')
                .or(`username.ilike.%${searchQuery.value}%,full_name.ilike.%${searchQuery.value}%`)
                .limit(20)
            if (error) throw error
            userResults.value = data || []
        } catch (err) {
            console.error('Ошибка поиска пользователей:', err)
        } finally {
            searchingUsers.value = false
        }
    }, 300)
})

let postsChannel
onMounted(() => {
    loadPosts()
    postsChannel = supabase
        .channel('public:posts')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, async (payload) => {
            if (searchMode.value !== 'posts') return
            const { data: profile } = await supabase
                .from('profiles')
                .select('username, full_name, avatar_url')
                .eq('id', payload.new.user_id)
                .single()
            const newPost = {
                ...payload.new,
                profiles: profile,
                likes: [],
                comments: [],
                likes_count: 0,
                comments_count: 0,
                user_liked: false
            }
            posts.value = [newPost, ...posts.value]
        })
        .subscribe()
})

onUnmounted(() => {
    supabase.removeChannel(postsChannel)
})

watch(searchMode, (newMode) => {
    if (newMode === 'posts') {
        loadPosts()
    }
})

const refreshPosts = () => loadPosts()
const handlePostCreated = () => { }
</script>

<style scoped>
/* Копируем анимации из login.vue */
@keyframes blob {

    0%,
    100% {
        transform: scale(1) translate(0, 0) rotate(0deg);
    }

    33% {
        transform: scale(1.2) translate(50px, -50px) rotate(120deg);
    }

    66% {
        transform: scale(0.8) translate(-20px, 20px) rotate(240deg);
    }
}

.animate-blob {
    animation: blob 20s infinite;
}

@keyframes ping-slow {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    80%,
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-ping-slow {
    animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
}

@keyframes gradient-x {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient-x {
    animation: gradient-x 3s ease infinite;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.9s ease-out;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
    opacity: 0;
}

.animation-delay-100 {
    animation-delay: 0.1s;
}

.animation-delay-200 {
    animation-delay: 0.2s;
}

.animation-delay-300 {
    animation-delay: 0.3s;
}

.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}
</style>