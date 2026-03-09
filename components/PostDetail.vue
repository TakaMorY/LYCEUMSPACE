<template>
    <div class="max-w-4xl mx-auto">
        <article
            class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden mb-8">
            <!-- Изображение поста (ещё крупнее) -->
            <div v-if="post.image_url" class="w-full h-96 overflow-hidden bg-neutral-900">
                <img :src="post.image_url" class="w-full h-full object-cover" />
            </div>

            <div class="p-8">
                <!-- Шапка: аватар, автор, дата -->
                <div class="flex items-center gap-4 mb-4">
                    <NuxtLink :to="`/profile/${post.user_id}`" class="flex-shrink-0">
                        <img :src="post.profiles?.avatar_url || '/images/defaultavatar/default-avatar.png'"
                            class="w-16 h-16 rounded-full border-2 border-white/20" />
                    </NuxtLink>
                    <div>
                        <NuxtLink :to="`/profile/${post.user_id}`" class="text-xl font-bold text-white hover:underline">
                            {{ post.profiles?.full_name || post.profiles?.username }}
                        </NuxtLink>
                        <div class="flex items-center gap-2 text-neutral-400">
                            <span>@{{ post.profiles?.username }}</span>
                            <span>·</span>
                            <span>{{ formatDate(post.created_at) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Заголовок поста (очень крупно) -->
                <h1 v-if="post.title" class="text-4xl font-bold text-white mb-4">
                    {{ post.title }}
                </h1>

                <!-- Текст поста (увеличенный) -->
                <p class="text-white/90 text-xl leading-relaxed whitespace-pre-wrap mb-6">
                    {{ post.content }}
                </p>

                <!-- Действия (лайк) -->
                <div class="flex items-center gap-4 mb-8">
                    <button @click="toggleLike" class="flex items-center gap-2 group">
                        <svg class="w-8 h-8 transition-all duration-300"
                            :class="userLiked ? 'fill-pink-500 text-pink-500' : 'text-neutral-400 group-hover:text-pink-400'"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span class="text-white text-xl">{{ post.likes_count }}</span>
                    </button>
                    <div class="flex items-center gap-2">
                        <svg class="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span class="text-white text-xl">{{ post.comments_count }}</span>
                    </div>
                </div>

                <!-- Комментарии (без ссылок на отдельные страницы) -->
                <div class="space-y-6">
                    <h2 class="text-2xl font-semibold text-white mb-4">Комментарии</h2>
                    <CommentSimple v-for="comment in comments" :key="comment.id" :comment="comment" />

                    <!-- Форма добавления комментария -->
                    <div v-if="user" class="mt-6 bg-white/5 rounded-xl p-6">
                        <textarea v-model="newCommentText" placeholder="Напишите комментарий..." rows="3"
                            class="w-full bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:border-blue-400 focus:outline-none resize-none p-4 text-lg"></textarea>
                        <div class="flex items-center gap-4 mt-4">
                            <label
                                class="cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg text-white transition px-5 py-3 text-base">
                                <input type="file" accept="image/*" class="hidden" @change="handleCommentImage" />
                                📷 Добавить фото
                            </label>
                            <span v-if="commentUploading" class="text-neutral-400">Загрузка...</span>
                            <span v-else-if="commentImage" class="text-neutral-400">✅ Фото выбрано</span>
                            <button @click="addComment" :disabled="!newCommentText || commentUploading"
                                class="ml-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium text-base disabled:opacity-50">
                                Отправить
                            </button>
                        </div>
                    </div>
                    <div v-else class="text-center text-neutral-400 text-lg">
                        <NuxtLink to="/login" class="text-blue-400 hover:underline">Войдите</NuxtLink>, чтобы
                        комментировать
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const props = defineProps({
    post: Object
})
const emit = defineEmits(['updated'])

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

const formatDate = (date) => new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
</script>