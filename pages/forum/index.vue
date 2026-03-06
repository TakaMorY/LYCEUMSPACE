<!-- pages/forum/index.vue -->
<template>
  <div class="max-w-2xl mx-auto p-4 space-y-6">
    <!-- Шапка -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Главная
      </h1>
      <span
        v-if="user"
        class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
      >
        {{ posts.length }} постов
      </span>
      <span v-else-if="!sessionLoaded" class="text-gray-400 text-sm">Загрузка сессии...</span>
    </div>

    <!-- Форма создания поста (только когда сессия загружена и пользователь есть) -->
    <div
      v-if="sessionLoaded && user"
      class="sticky top-4 z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90"
    >
      <div class="p-5">
        <div class="flex gap-4">
          <!-- Аватар -->
          <img
            v-if="user.user_metadata?.avatar"
            :src="user.user_metadata.avatar"
            class="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
            alt=""
          />
          <div
            v-else
            class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg"
          >
            {{ user.email?.charAt(0).toUpperCase() }}
          </div>

          <!-- Поле ввода и кнопки -->
          <div class="flex-1">
            <textarea
              v-model="newPostContent"
              placeholder="Что происходит?"
              rows="3"
              class="w-full p-3 border-0 focus:ring-0 text-lg bg-transparent placeholder-gray-400 resize-none focus:outline-none"
            ></textarea>

            <div class="flex items-center justify-between mt-2 border-t border-gray-100 dark:border-gray-800 pt-3">
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  @click="triggerFileUpload"
                  class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-full transition"
                  title="Прикрепить медиа"
                >
                  <Icon name="heroicons:photo" class="w-6 h-6" />
                </button>
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  class="hidden"
                  @change="handleFileUpload"
                />
                <span v-if="uploadedFiles.length" class="text-sm text-gray-500">
                  {{ uploadedFiles.length }} файл(ов)
                </span>
              </div>
              <button
                type="button"
                @click="createPost"
                :disabled="!newPostContent.trim() && !uploadedFiles.length"
                class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-medium transition shadow-md hover:shadow-lg"
              >
                <span v-if="creating" class="flex items-center gap-2">
                  <Icon name="heroicons:arrow-path" class="w-5 h-5 animate-spin" />
                  Публикация...
                </span>
                <span v-else>Опубликовать</span>
              </button>
            </div>

            <!-- Предпросмотр медиа -->
            <div v-if="previews.length" class="flex gap-2 mt-3 flex-wrap">
              <div v-for="(preview, idx) in previews" :key="idx" class="relative">
                <img
                  :src="preview"
                  class="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
                <button
                  type="button"
                  @click="removeFile(idx)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs shadow hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="sessionLoaded && !user" class="text-center py-6">
      <p class="text-gray-500">Войдите, чтобы создавать посты</p>
    </div>

    <!-- Лента постов -->
    <div class="space-y-4">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @like="toggleLike"
        @comment="openCommentModal"
        @repost="toggleRepost"
      />
    </div>

    <!-- Пустое состояние -->
    <div v-if="!posts.length && sessionLoaded" class="text-center py-16">
      <Icon name="heroicons:document-text" class="text-6xl text-gray-300 mx-auto mb-4" />
      <p class="text-gray-500">Здесь пока пусто. Создайте первый пост!</p>
    </div>

    <!-- Модалка комментариев -->
    <SimpleModal v-model="isCommentModalOpen" title="Комментарии" :fullscreen="mobile">
      <CommentThread v-if="selectedPost" :post-id="selectedPost.id" />
    </SimpleModal>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useSupabaseUser, useSupabaseClient } from '#imports'
import { useWindowSize } from '@vueuse/core'
import PostCard from '~/components/PostCard.vue'
import SimpleModal from '~/components/SimpleModal.vue'
import CommentThread from '~/components/CommentThread.vue'

const supabase = useSupabaseClient()
const userFromComposable = useSupabaseUser() // реактивная ссылка на пользователя

// Флаг загрузки сессии
const sessionLoaded = ref(false)

// Локальная реактивная ссылка на пользователя, синхронизированная с userFromComposable
const user = ref(null)

watch(userFromComposable, (newUser) => {
  user.value = newUser
}, { immediate: true })

// Состояние для создания поста
const newPostContent = ref('')
const creating = ref(false)
const fileInput = ref(null)
const uploadedFiles = ref([])
const previews = ref([])

// Лента постов
const posts = ref([])

// Комментарии
const isCommentModalOpen = ref(false)
const selectedPost = ref(null)

const { width } = useWindowSize()
const mobile = computed(() => width.value < 640)

// Подписки
let postsSubscription
let likesSubscription

// Проверка сессии при загрузке
onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  sessionLoaded.value = true
  await fetchPosts()
  subscribeToLikes()
  if (user.value) {
    await subscribeToNewPosts()
  }
})

onUnmounted(() => {
  postsSubscription?.unsubscribe()
  likesSubscription?.unsubscribe()
})

// Следим за изменением пользователя (вход/выход)
watch(user, async (newUser, oldUser) => {
  if (newUser) {
    await fetchPosts()
    await subscribeToNewPosts()
  } else {
    await fetchPosts() // без фильтра – все посты
    if (postsSubscription) {
      postsSubscription.unsubscribe()
      postsSubscription = null
    }
  }
})

// ---- Загрузка постов ----
async function fetchPosts() {
  let query = supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id ( name, username, avatar ),
      likes ( id, user_id ),
      comments ( id ),
      reposts ( id, user_id ),
      media ( id, url, type )
    `)
    .order('created_at', { ascending: false })

  // Если пользователь авторизован – фильтруем по подпискам
  if (user.value?.id) {
    const { data: follows } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.value.id)

    const followedIds = follows?.map(f => f.following_id) || []
    followedIds.push(user.value.id)

    if (followedIds.length > 0) {
      query = query.in('user_id', followedIds)
    }
  }

  const { data, error } = await query
  if (error) {
    console.error('Ошибка загрузки постов:', error)
    return
  }

  posts.value = data.map(post => ({
    ...post,
    likes_count: post.likes?.length || 0,
    liked_by_user: post.likes?.some(like => like.user_id === user.value?.id) || false,
    comments_count: post.comments?.length || 0,
    reposts_count: post.reposts?.length || 0,
    reposted_by_user: post.reposts?.some(r => r.user_id === user.value?.id) || false
  }))
}

// ---- Подписка на новые посты ----
async function subscribeToNewPosts() {
  if (postsSubscription) {
    postsSubscription.unsubscribe()
    postsSubscription = null
  }
  if (!user.value?.id) return

  const { data: follows } = await supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', user.value.id)

  const followedIds = follows?.map(f => f.following_id) || []
  followedIds.push(user.value.id)

  if (followedIds.length === 0) return

  postsSubscription = supabase
    .channel('posts-feed')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'posts',
        filter: `user_id=in.(${followedIds.join(',')})`
      },
      async (payload) => {
        const { data: newPost } = await supabase
          .from('posts')
          .select(`
            *,
            profiles:user_id ( name, username, avatar ),
            likes ( id, user_id ),
            comments ( id ),
            reposts ( id, user_id ),
            media ( id, url, type )
          `)
          .eq('id', payload.new.id)
          .single()

        if (newPost) {
          newPost.likes_count = newPost.likes?.length || 0
          newPost.liked_by_user = false
          newPost.comments_count = newPost.comments?.length || 0
          newPost.reposts_count = newPost.reposts?.length || 0
          newPost.reposted_by_user = false
          posts.value = [newPost, ...posts.value]
        }
      }
    )
    .subscribe()
}

// ---- Подписка на лайки ----
function subscribeToLikes() {
  if (likesSubscription) return
  likesSubscription = supabase
    .channel('likes-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'likes' },
      () => fetchPosts()
    )
    .subscribe()
}

// ---- Создание поста (надёжная проверка авторизации) ----
async function createPost() {
  // Получаем актуального пользователя напрямую из Supabase (не полагаемся на реактивность)
  const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
  if (userError || !currentUser) {
    console.warn('Пользователь не авторизован (серверная проверка)')
    return
  }

  if (!newPostContent.value.trim() && uploadedFiles.value.length === 0) return

  creating.value = true
  try {
    // Вставка поста
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert({
        content: newPostContent.value,
        user_id: currentUser.id
      })
      .select()
      .single()

    if (postError) throw postError

    // Загрузка медиа, если есть
    if (uploadedFiles.value.length) {
      const mediaPromises = uploadedFiles.value.map(async (file) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${currentUser.id}/${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('post-media')
          .upload(fileName, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('post-media')
          .getPublicUrl(fileName)

        return supabase
          .from('media')
          .insert({
            post_id: postData.id,
            url: publicUrl,
            type: file.type.startsWith('image/') ? 'image' : 'video'
          })
      })

      await Promise.all(mediaPromises)
    }

    // Очистка формы
    newPostContent.value = ''
    uploadedFiles.value = []
    previews.value = []

    // Обновляем ленту (опционально)
    await fetchPosts()

  } catch (error) {
    console.error('Ошибка при создании поста:', error)
  } finally {
    creating.value = false
  }
}

// ---- Лайк / дизлайк ----
async function toggleLike(post) {
  if (!user.value?.id) return

  if (post.liked_by_user) {
    await supabase
      .from('likes')
      .delete()
      .eq('post_id', post.id)
      .eq('user_id', user.value.id)

    post.liked_by_user = false
    post.likes_count -= 1
  } else {
    await supabase
      .from('likes')
      .insert({ post_id: post.id, user_id: user.value.id })

    post.liked_by_user = true
    post.likes_count += 1
  }
}

// ---- Репост / отмена ----
async function toggleRepost(post) {
  if (!user.value?.id) return

  if (post.reposted_by_user) {
    await supabase
      .from('reposts')
      .delete()
      .eq('original_post_id', post.id)
      .eq('user_id', user.value.id)

    post.reposted_by_user = false
    post.reposts_count -= 1
  } else {
    await supabase
      .from('reposts')
      .insert({ original_post_id: post.id, user_id: user.value.id })

    post.reposted_by_user = true
    post.reposts_count += 1
  }
}

// ---- Загрузка файлов ----
function triggerFileUpload() {
  fileInput.value?.click()
}

function handleFileUpload(event) {
  const files = Array.from(event.target.files)
  uploadedFiles.value.push(...files)

  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => previews.value.push(e.target.result)
      reader.readAsDataURL(file)
    } else {
      previews.value.push('/video-placeholder.png') // замените на реальный плейсхолдер
    }
  })
}

function removeFile(index) {
  uploadedFiles.value.splice(index, 1)
  previews.value.splice(index, 1)
}

function openCommentModal(post) {
  selectedPost.value = post
  isCommentModalOpen.value = true
}
</script>

<style scoped>
textarea::placeholder {
  color: #9ca3af;
  font-weight: 300;
}
textarea:focus {
  outline: none;
  box-shadow: none;
}
</style>