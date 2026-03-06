<template>
    <div class="max-w-2xl mx-auto p-4">
        <div class="card">
            <div class="card-body">
                <!-- Шапка профиля -->
                <div class="flex items-start gap-4">
                    <img v-if="profile?.avatar" :src="profile.avatar" class="avatar avatar-xl" />
                    <div v-else
                        class="avatar avatar-xl bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-2xl">
                        {{ profile?.name?.charAt(0) }}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-2xl font-bold">{{ profile?.name }}</h1>
                                <p class="text-gray-500">@{{ profile?.username }}</p>
                            </div>
                            <button v-if="user && user.id !== profile?.id" @click="toggleFollow"
                                class="px-4 py-2 rounded-full text-sm font-medium transition" :class="isFollowing
                                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'">
                                {{ isFollowing ? 'Отписаться' : 'Подписаться' }}
                            </button>
                        </div>
                        <p class="mt-2">{{ profile?.bio }}</p>
                    </div>
                </div>

                <!-- Статистика -->
                <div class="flex gap-6 border-t border-gray-200 dark:border-gray-800 mt-4 pt-4">
                    <div><span class="font-bold">{{ postsCount }}</span> <span class="text-gray-500">постов</span></div>
                    <div><span class="font-bold">{{ followersCount }}</span> <span
                            class="text-gray-500">подписчиков</span></div>
                    <div><span class="font-bold">{{ followingCount }}</span> <span class="text-gray-500">подписок</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Посты пользователя -->
        <div class="mt-6 space-y-4">
            <h2 class="text-xl font-semibold">Посты</h2>
            <PostCard v-for="post in userPosts" :key="post.id" :post="post" @like="toggleLike"
                @comment="openCommentModal" @repost="toggleRepost" />
            <div v-if="!userPosts.length" class="text-center py-10 text-gray-500">
                У пользователя пока нет постов.
            </div>
        </div>
    </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const profile = ref(null)
const userPosts = ref([])
const postsCount = ref(0)
const followersCount = ref(0)
const followingCount = ref(0)
const isFollowing = ref(false)

const isCommentModalOpen = ref(false)
const selectedPost = ref(null)

const userId = route.params.id || user.value?.id

onMounted(async () => {
    if (!userId) return
    await fetchProfile()
    await fetchUserPosts()
    await fetchStats()
    if (user.value && user.value.id !== userId) {
        await checkFollow()
    }
})

async function fetchProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (!error) profile.value = data
}

async function fetchUserPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      profiles:user_id ( name, username, avatar ),
      likes ( id, user_id ),
      comments ( id ),
      reposts ( id, user_id ),
      media ( id, url, type )
    `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (!error && data) {
        userPosts.value = data.map(post => ({
            ...post,
            likes_count: post.likes?.length || 0,
            liked_by_user: post.likes?.some(like => like.user_id === user.value?.id) || false,
            comments_count: post.comments?.length || 0,
            reposts_count: post.reposts?.length || 0,
            reposted_by_user: post.reposts?.some(r => r.user_id === user.value?.id) || false
        }))
        postsCount.value = data.length
    }
}

async function fetchStats() {
    const { count: followers } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('following_id', userId)

    followersCount.value = followers || 0

    const { count: following } = await supabase
        .from('follows')
        .select('*', { count: 'exact', head: true })
        .eq('follower_id', userId)

    followingCount.value = following || 0
}

async function checkFollow() {
    const { data } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', user.value.id)
        .eq('following_id', userId)
        .maybeSingle()

    isFollowing.value = !!data
}

async function toggleFollow() {
    if (!user.value) return navigateTo('/login')

    if (isFollowing.value) {
        await supabase
            .from('follows')
            .delete()
            .eq('follower_id', user.value.id)
            .eq('following_id', userId)

        followersCount.value -= 1
        isFollowing.value = false
    } else {
        await supabase
            .from('follows')
            .insert({ follower_id: user.value.id, following_id: userId })

        followersCount.value += 1
        isFollowing.value = true
    }
}

// Лайк, репост, комментарий аналогично index.vue
async function toggleLike(post) { /* ... */ }
async function toggleRepost(post) { /* ... */ }
function openCommentModal(post) {
    selectedPost.value = post
    isCommentModalOpen.value = true
}
</script>