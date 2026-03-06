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
    </div>

    <!-- Форма создания поста (только для авторизованных) -->
    <div v-if="user" class="card sticky top-4 z-10">
      <div class="card-body">
        <div class="flex gap-3">
          <!-- Аватар пользователя -->
          <img
            v-if="user.user_metadata?.avatar"
            :src="user.user_metadata.avatar"
            class="avatar avatar-md"
            alt=""
          />
          <div
            v-else
            class="avatar avatar-md bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600"
          >
            {{ user.email?.charAt(0).toUpperCase() }}
          </div>

          <div class="flex-1">
            <textarea
              v-model="newPostContent"
              placeholder="Что происходит?"
              rows="2"
              class="w-full p-0 border-0 focus:ring-0 text-lg bg-transparent placeholder-gray-400 resize-none"
            ></textarea>

            <div class="flex items-center justify-between mt-3">
              <button @click="triggerFileUpload" class="btn-icon">
                <Icon name="heroicons:photo" class="w-5 h-5" />
              </button>
              <input
                ref="fileInput"
                type="file"
                multiple
                accept="image/*,video/*"
                class="hidden"
                @change="handleFileUpload"
              />
              <button
                @click="createPost"
                :disabled="!newPostContent.trim() && !uploadedFiles.length"
                class="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none text-white rounded-full font-medium transition"
              >
                <span v-if="creating">Публикация...</span>
                <span v-else>Опубликовать</span>
              </button>
            </div>

            <!-- Предпросмотр медиа -->
            <div v-if="previews.length" class="flex gap-2 mt-3 flex-wrap">
              <div v-for="(preview, idx) in previews" :key="idx" class="relative">
                <img :src="preview" class="w-20 h-20 object-cover rounded" />
                <button
                  @click="removeFile(idx)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <div v-if="!posts.length" class="text-center py-16">
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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSupabaseUser, useSupabaseClient } from '#imports'
import { useWindowSize } from '@vueuse/core'
import PostCard from '~/components/PostCard.vue'
import SimpleModal from '~/components/SimpleModal.vue'
import CommentThread from '~/components/CommentThread.vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const { width } = useWindowSize()
const mobile = computed(() => width.value < 640)

// Состояние для создания поста
const newPostContent = ref('')
const creating = ref(false)
const fileInput = ref(null)
const uploadedFiles = ref([]) // массив File объектов
const previews = ref([]) // dataURL для предпросмотра

// Лента постов
const posts = ref([])

// Комментарии
const isCommentModalOpen = ref(false)
const selectedPost = ref(null)

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

  // Если пользователь авторизован – показываем посты от подписок + свои
  if (user.value) {
    const { data: follows } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.value.id)

    const followedIds = follows?.map(f => f.following_id) || []
    followedIds.push(user.value.id) // добавляем самого себя
    query = query.in('user_id', followedIds)
  }

  const { data, error } = await query
  if (error) {
    console.error('Error fetching posts:', error)
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

// ---- Realtime подписка на новые посты ----
let postsSubscription
function subscribeToNewPosts() {
  if (!user.value) return

  // Подписываемся на посты от пользователей, на которых подписан
  supabase
    .from('follows')
    .select('following_id')
    .eq('follower_id', user.value.id)
    .then(({ data: follows }) => {
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
            // Загружаем полный пост с профилем и медиа
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
    })
}

// Подписка на изменения лайков (чтобы обновлять счётчики)
let likesSubscription
function subscribeToLikes() {
  likesSubscription = supabase
    .channel('likes-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'likes' },
      () => fetchPosts() // грубо, но для демо сойдёт
    )
    .subscribe()
}

// ---- Создание поста с медиа ----
async function createPost() {
  if (!user.value) return
  if (!newPostContent.value.trim() && uploadedFiles.value.length === 0) return

  creating.value = true
  try {
    // 1. Вставляем пост
    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert({
        content: newPostContent.value,
        user_id: user.value.id
      })
      .select()
      .single()

    if (postError) throw postError

    // 2. Загружаем медиа в Storage и создаём записи в таблице media
    if (uploadedFiles.value.length) {
      const mediaPromises = uploadedFiles.value.map(async (file) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.value.id}/${Date.now()}.${fileExt}`
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

    // Очищаем форму
    newPostContent.value = ''
    uploadedFiles.value = []
    previews.value = []
  } catch (error) {
    console.error('Error creating post:', error)
  } finally {
    creating.value = false
  }
}

// ---- Лайк / дизлайк ----
async function toggleLike(post) {
  if (!user.value) return navigateTo('/login')

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
  if (!user.value) return navigateTo('/login')

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

  // Генерация превью для изображений
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => previews.value.push(e.target.result)
      reader.readAsDataURL(file)
    } else {
      // Для видео можно показать плейсхолдер
      previews.value.push('/video-placeholder.png') // замените на свой
    }
  })
}

function removeFile(index) {
  uploadedFiles.value.splice(index, 1)
  previews.value.splice(index, 1)
}

// ---- Открытие модалки комментариев ----
function openCommentModal(post) {
  selectedPost.value = post
  isCommentModalOpen.value = true
}

// ---- Инициализация и очистка подписок ----
onMounted(async () => {
  await fetchPosts()
  subscribeToNewPosts()
  subscribeToLikes()
})

onUnmounted(() => {
  postsSubscription?.unsubscribe()
  likesSubscription?.unsubscribe()
})
</script>

<style scoped>
/* Дополнительные стили при необходимости */
.card {
  @apply bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 transition-shadow hover:shadow-md;
}
.card-body {
  @apply p-4 sm:p-5;
}
.avatar {
  @apply rounded-full object-cover;
}
.avatar-md {
  @apply w-10 h-10;
}
.btn-icon {
  @apply inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800;
}
</style>