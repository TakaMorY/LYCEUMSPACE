<template>
  <div class="p-4">
    <!-- Шапка -->
    <div class="sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10 py-3 mb-4 flex items-center gap-4">
      <NuxtLink to="/forum" class="p-2 hover:bg-neutral-900 rounded-full transition">
        <Icon name="heroicons:arrow-left" class="w-5 h-5" />
      </NuxtLink>
      <h1 class="text-xl font-bold">{{ profile?.name || 'Профиль' }}</h1>
    </div>

    <div v-if="loading" class="text-center py-8">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 animate-spin text-neutral-500" />
    </div>

    <div v-else-if="profile">
      <!-- Информация профиля -->
      <div class="bg-neutral-900/50 rounded-xl p-6 mb-6">
        <div class="flex items-start gap-4">
          <UserAvatar :user="profile" class="w-20 h-20" />
          <div class="flex-1">
            <h2 class="text-xl font-bold">{{ profile.name }}</h2>
            <p class="text-neutral-400">@{{ profile.username }}</p>
            <p v-if="profile.bio" class="mt-2">{{ profile.bio }}</p>
            
            <div class="flex gap-4 mt-4 text-sm">
              <span><strong class="text-white">{{ postsCount }}</strong> постов</span>
              <span><strong class="text-white">{{ followersCount }}</strong> подписчиков</span>
              <span><strong class="text-white">{{ followingCount }}</strong> подписок</span>
            </div>

            <!-- Кнопка подписки -->
            <button
              v-if="user && user.id !== profile.id"
              @click="toggleFollow"
              class="mt-4 px-4 py-2 rounded-full border text-sm transition"
              :class="isFollowing ? 'border-neutral-700 hover:bg-neutral-800' : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'"
            >
              {{ isFollowing ? 'Отписаться' : 'Подписаться' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Посты пользователя -->
      <div class="space-y-4">
        <PostCard
          v-for="post in userPosts"
          :key="post.id"
          :post="post"
          @like="handleLike"
          @comment="openComments"
          @repost="handleRepost"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import UserAvatar from '~/components/UserAvatar.vue'
import PostCard from '~/components/PostCard.vue'

const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const profile = ref(null)
const userPosts = ref([])
const followersCount = ref(0)
const followingCount = ref(0)
const postsCount = ref(0)
const loading = ref(true)
const isFollowing = ref(false)

const fetchProfile = async () => {
  const userId = route.query.id || user.value?.id
  if (!userId) return

  loading.value = true
  
  // Профиль
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  profile.value = profileData

  // Посты
  const { data: posts } = await supabase
    .from('posts')
    .select(`
      *,
      likes ( id, user_id ),
      comments ( id ),
      reposts ( id, user_id )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  userPosts.value = posts?.map(post => ({
    ...post,
    likes_count: post.likes?.length || 0,
    liked_by_user: post.likes?.some(like => like.user_id === user.value?.id) || false,
    comments_count: post.comments?.length || 0,
    reposts_count: post.reposts?.length || 0,
    reposted_by_user: post.reposts?.some(r => r.user_id === user.value?.id) || false
  })) || []
  
  postsCount.value = userPosts.value.length

  // Подписчики
  const { count: followers } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId)
  followersCount.value = followers || 0

  // Подписки
  const { count: following } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', userId)
  followingCount.value = following || 0

  // Проверка подписки
  if (user.value && user.value.id !== userId) {
    const { data: follow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.value.id)
      .eq('following_id', userId)
      .maybeSingle()
    isFollowing.value = !!follow
  }

  loading.value = false
}

onMounted(fetchProfile)

const toggleFollow = async () => {
  if (!user.value) return
  
  if (isFollowing.value) {
    await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user.value.id)
      .eq('following_id', profile.value.id)
    followersCount.value--
  } else {
    await supabase
      .from('follows')
      .insert({ follower_id: user.value.id, following_id: profile.value.id })
    followersCount.value++
  }
  isFollowing.value = !isFollowing.value
}

const handleLike = ({ postId, liked }) => {
  const post = userPosts.value.find(p => p.id === postId)
  if (post) {
    post.liked_by_user = liked
    post.likes_count += liked ? 1 : -1
  }
}

const handleRepost = ({ postId, reposted }) => {
  const post = userPosts.value.find(p => p.id === postId)
  if (post) {
    post.reposted_by_user = reposted
    post.reposts_count += reposted ? 1 : -1
  }
}
</script>