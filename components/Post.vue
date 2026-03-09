<template>
  <article
    class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 mb-6"
    :class="{
      'post-large': size === 'large'
    }"
  >
    <!-- Изображение поста -->
    <div v-if="post.image_url" class="w-full overflow-hidden rounded-t-2xl bg-neutral-900" :class="size === 'large' ? 'h-96' : 'h-80'">
      <img :src="post.image_url" class="w-full h-full object-cover" />
    </div>
    
    <div :class="size === 'large' ? 'p-8' : 'p-6'">
      <!-- Шапка: аватар, автор, дата и заголовок -->
      <div class="flex items-start gap-3 mb-3">
        <NuxtLink :to="`/profile/${post.user_id}`" class="flex-shrink-0">
          <img
            :src="post.profiles?.avatar_url || '/images/defaultavatar/default-avatar.png'"
            class="rounded-full border-2 border-white/20"
            :class="size === 'large' ? 'w-14 h-14' : 'w-10 h-10'"
          />
        </NuxtLink>
        <div class="flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <NuxtLink :to="`/profile/${post.user_id}`" class="font-bold text-white hover:underline" :class="size === 'large' ? 'text-lg' : 'text-base'">
              {{ post.profiles?.full_name || post.profiles?.username }}
            </NuxtLink>
            <span class="text-sm text-neutral-400">@{{ post.profiles?.username }}</span>
            <span class="text-sm text-neutral-400">·</span>
            <NuxtLink :to="`/post/${post.id}`" class="text-sm text-neutral-400 hover:text-white transition-colors">
              {{ formatDate(post.created_at) }}
            </NuxtLink>
          </div>
          <h2 v-if="post.title" class="mt-2 font-bold text-white" :class="size === 'large' ? 'text-3xl' : 'text-2xl'">
            <NuxtLink :to="`/post/${post.id}`" class="hover:underline">
              {{ post.title }}
            </NuxtLink>
          </h2>
        </div>
      </div>

      <!-- Текст поста -->
      <p class="text-white/80 mb-4 leading-relaxed whitespace-pre-wrap" :class="size === 'large' ? 'text-lg' : 'text-base'">
        {{ post.content }}
      </p>

      <!-- Действия -->
      <div class="flex items-center gap-6">
        <button @click="toggleLike" class="flex items-center gap-2 group">
          <svg
            class="transition-all duration-300"
            :class="[
              size === 'large' ? 'w-7 h-7' : 'w-6 h-6',
              userLiked ? 'fill-pink-500 text-pink-500' : 'text-neutral-400 group-hover:text-pink-400'
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span class="text-white font-medium" :class="size === 'large' ? 'text-lg' : 'text-base'">{{ post.likes_count }}</span>
        </button>

        <!-- Кнопка комментариев (только счётчик, если forceShowComments) -->
        <div v-if="forceShowComments" class="flex items-center gap-2">
          <svg
            class="text-neutral-400"
            :class="size === 'large' ? 'w-7 h-7' : 'w-6 h-6'"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span class="text-white font-medium" :class="size === 'large' ? 'text-lg' : 'text-base'">{{ post.comments_count }}</span>
        </div>
        <button v-else @click="toggleComments" class="flex items-center gap-2 group">
          <svg
            class="text-neutral-400 group-hover:text-blue-400 transition-colors"
            :class="size === 'large' ? 'w-7 h-7' : 'w-6 h-6'"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span class="text-white font-medium" :class="size === 'large' ? 'text-lg' : 'text-base'">{{ post.comments_count }}</span>
        </button>
      </div>

      <!-- Комментарии -->
      <div v-if="forceShowComments || showComments" class="mt-6 space-y-4" :class="size === 'large' ? 'space-y-6' : 'space-y-4'">
        <Comment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :size="size"
        />

        <div v-if="user" class="mt-4 bg-white/5 rounded-xl p-4" :class="size === 'large' ? 'p-6' : 'p-4'">
          <textarea
            v-model="newCommentText"
            placeholder="Напишите комментарий..."
            rows="2"
            class="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:border-blue-400 focus:outline-none resize-none"
            :class="size === 'large' ? 'px-5 py-4 text-lg' : 'px-4 py-3 text-base'"
          ></textarea>
          <div class="flex items-center gap-3 mt-3">
            <label class="cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition" :class="size === 'large' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm'">
              <input type="file" accept="image/*" class="hidden" @change="handleCommentImage" />
              📷 Добавить фото
            </label>
            <span v-if="commentUploading" class="text-neutral-400" :class="size === 'large' ? 'text-base' : 'text-sm'">Загрузка...</span>
            <span v-else-if="commentImage" class="text-sm text-neutral-400" :class="size === 'large' ? 'text-base' : 'text-sm'">✅ Фото выбрано</span>
            <button
              @click="addComment"
              :disabled="!newCommentText || commentUploading"
              class="ml-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium disabled:opacity-50"
              :class="size === 'large' ? 'px-6 py-3 text-base' : 'px-5 py-2 text-sm'"
            >
              Отправить
            </button>
          </div>
        </div>
        <div v-else class="text-center text-neutral-500 text-sm" :class="size === 'large' ? 'text-base' : 'text-sm'">
          <NuxtLink to="/login" class="text-blue-400 hover:underline">Войдите</NuxtLink>, чтобы комментировать
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const props = defineProps({
  post: Object,
  forceShowComments: { type: Boolean, default: false },
  size: { type: String, default: 'normal', validator: (v) => ['normal', 'large'].includes(v) } // новый пропс
})
const emit = defineEmits(['updated'])

const showComments = ref(false)
const newCommentText = ref('')
const commentImage = ref(null)
const commentUploading = ref(false)
const comments = ref([])

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
const setupCommentsChannel = () => {
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
}

if (props.forceShowComments) {
  loadComments()
  setupCommentsChannel()
}

const toggleComments = () => {
  showComments.value = !showComments.value
  if (showComments.value && comments.value.length === 0) {
    loadComments()
    setupCommentsChannel()
  } else if (!showComments.value) {
    supabase.removeChannel(commentsChannel)
  }
}

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
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', currentUser.id)
        .eq('post_id', props.post.id)
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('likes')
        .insert({ user_id: currentUser.id, post_id: props.post.id })
      if (error) throw error
    }
    emit('updated')
  } catch (e) {
    console.error('Ошибка лайка:', e)
    alert('Не удалось поставить лайк. Возможно, вы уже ставили.')
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'short' })
</script>