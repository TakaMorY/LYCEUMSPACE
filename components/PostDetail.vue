<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
    <article class="bg-neutral-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-neutral-700/50 overflow-hidden">
      <!-- Изображение поста -->
      <div v-if="post.image_url" class="w-full max-h-[60vh] sm:max-h-[70vh] overflow-hidden bg-neutral-900">
        <img :src="post.image_url" class="w-full h-auto object-contain" />
      </div>

      <div class="p-4 sm:p-6">
        <!-- Шапка: аватар, автор, дата -->
        <div class="flex items-center gap-3 sm:gap-4 mb-4">
          <NuxtLink :to="`/profile/${post.user_id}`" class="flex-shrink-0">
            <img :src="post.profiles?.avatar_url || '/images/defaultavatar/default-avatar.png'" class="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-neutral-700/50" />
          </NuxtLink>
          <div>
            <NuxtLink :to="`/profile/${post.user_id}`" class="text-base sm:text-lg font-bold text-white hover:underline">
              {{ post.profiles?.full_name || post.profiles?.username }}
            </NuxtLink>
            <div class="flex items-center gap-2 text-xs sm:text-sm text-neutral-400">
              <span>@{{ post.profiles?.username }}</span>
              <span>·</span>
              <span>{{ formatDate(post.created_at) }}</span>
            </div>
          </div>
        </div>

        <!-- Заголовок поста -->
        <h1 v-if="post.title" class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          {{ post.title }}
        </h1>

        <!-- Текст поста -->
        <p class="text-white/80 text-base sm:text-lg leading-relaxed whitespace-pre-wrap mb-6">
          {{ post.content }}
        </p>

        <!-- Действия (лайк и счётчик комментариев) -->
        <div class="flex items-center gap-6 mb-6">
          <button @click="toggleLike" class="flex items-center gap-2 group">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300" :class="userLiked ? 'fill-pink-500 text-pink-500' : 'text-neutral-400 group-hover:text-pink-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span class="text-white text-base sm:text-lg">{{ post.likes_count }}</span>
          </button>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span class="text-white text-base sm:text-lg">{{ post.comments_count }}</span>
          </div>
        </div>

        <!-- Комментарии -->
        <div class="space-y-4 sm:space-y-6">
          <h2 class="text-lg sm:text-xl font-semibold text-white">Комментарии</h2>
          <Comment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            @open-image="openImageModal"
          />

          <!-- Форма добавления комментария -->
          <div v-if="user" class="mt-4 bg-neutral-800/40 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-neutral-700/30">
            <textarea
              v-model="newCommentText"
              placeholder="Напишите комментарий..."
              rows="2"
              class="w-full bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base"
            ></textarea>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <label class="cursor-pointer px-3 py-2 sm:px-4 sm:py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs sm:text-sm text-white transition border border-neutral-700/50 flex items-center gap-2">
                <input type="file" accept="image/*" class="hidden" @change="handleCommentImage" />
                📷 Добавить фото
              </label>
              <span v-if="commentUploading" class="text-xs sm:text-sm text-neutral-400">Загрузка...</span>
              <span v-else-if="commentImage" class="text-xs sm:text-sm text-neutral-400">✅ Фото выбрано</span>
              <button
                @click="addComment"
                :disabled="!newCommentText || commentUploading"
                class="ml-auto px-4 py-2 sm:px-5 sm:py-2 bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 text-white rounded-lg text-xs sm:text-sm font-medium disabled:opacity-50 transition-all duration-300"
              >
                Отправить
              </button>
            </div>
          </div>
          <div v-else class="text-center text-xs sm:text-sm text-neutral-500">
            <NuxtLink to="/login" class="text-blue-400 hover:underline">Войдите</NuxtLink>, чтобы комментировать
          </div>
        </div>
      </div>
    </article>

    <!-- Модальное окно для просмотра изображения -->
    <div v-if="modalImage" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" @click="closeModal">
      <div class="relative max-w-full max-h-full" @click.stop>
        <img :src="modalImage" class="max-w-full max-h-screen object-contain rounded-lg" />
        <button @click="closeModal" class="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const props = defineProps({ post: Object })
const emit = defineEmits(['updated'])

const newCommentText = ref('')
const commentImage = ref(null)
const commentUploading = ref(false)
const comments = ref([])
const modalImage = ref(null)

const userLiked = computed(() => props.post.user_liked)

// Загрузка комментариев
const loadComments = async () => {
  const { data, error } = await supabase
    .from('comments')
    .select('*, profiles!user_id (username, avatar_url)')
    .eq('post_id', props.post.id)
    .order('created_at', { ascending: true })
  if (!error) comments.value = data || []
}

// Realtime комментарии
let commentsChannel
onMounted(() => {
  loadComments()
  commentsChannel = supabase
    .channel(`comments:${props.post.id}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${props.post.id}` }, async (payload) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', payload.new.user_id)
        .single()
      comments.value.push({ ...payload.new, profiles: profile })
      emit('updated')
    })
    .subscribe()
})

onUnmounted(() => {
  supabase.removeChannel(commentsChannel)
})

// Загрузка фото для комментария
const handleCommentImage = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    alert('Файл слишком большой (макс. 2MB)')
    return
  }
  commentUploading.value = true
  try {
    const fileName = `comment_${user.value.id}_${Date.now()}.${file.name.split('.').pop()}`
    const { error } = await supabase.storage
      .from('comment-images')
      .upload(fileName, file)
    if (error) throw error
    const { data: { publicUrl } } = supabase.storage
      .from('comment-images')
      .getPublicUrl(fileName)
    commentImage.value = publicUrl
  } catch (err) {
    console.error(err)
    alert('Ошибка загрузки')
  } finally {
    commentUploading.value = false
  }
}

// Добавление комментария
const addComment = async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) return alert('Необходимо войти в систему')
  const { error } = await supabase
    .from('comments')
    .insert({
      post_id: props.post.id,
      user_id: currentUser.id,
      content: newCommentText.value,
      image_url: commentImage.value
    })
  if (!error) {
    newCommentText.value = ''
    commentImage.value = null
  } else {
    console.error(error)
    alert('Ошибка при добавлении комментария')
  }
}

// Лайк
const toggleLike = async () => {
  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) return alert('Войдите, чтобы ставить лайки')
  try {
    if (userLiked.value) {
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('post_id', props.post.id)
    } else {
      await supabase
        .from('likes')
        .insert({ user_id: currentUser.id, post_id: props.post.id })
    }
    emit('updated')
  } catch (e) {
    console.error('Ошибка лайка:', e)
    alert('Не удалось поставить лайк')
  }
}

// Открыть модальное окно с изображением
const openImageModal = (url) => {
  modalImage.value = url
}

// Закрыть модальное окно
const closeModal = () => {
  modalImage.value = null
}

const formatDate = (date) => new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
</script>