<template>
    <div
        class="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-3xl p-6 mb-8 hover:border-neutral-700 transition-all duration-300 shadow-xl group">
        <h3 class="text-xl font-medium text-white mb-4 flex items-center gap-2">
            <svg class="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Создать пост
        </h3>
        <div class="space-y-4">
            <!-- Заголовок -->
            <div class="relative">
                <input v-model="title" type="text" placeholder="Заголовок (необязательно)" maxlength="100"
                    class="w-full px-5 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-neutral-400 focus:outline-none transition-all duration-300" />
            </div>

            <!-- Текст поста -->
            <div class="relative">
                <textarea v-model="content" placeholder="Что у вас нового?" rows="4" maxlength="2000"
                    class="w-full px-5 py-3 bg-neutral-800/50 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:border-neutral-400 focus:outline-none resize-none transition-all duration-300"></textarea>
                <div class="absolute right-3 bottom-3 text-xs text-neutral-500">{{ content.length }}/2000</div>
            </div>

            <!-- Загрузка изображения -->
            <div class="flex items-center gap-4 flex-wrap">
                <label
                    class="cursor-pointer px-5 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-white transition-all duration-300 flex items-center gap-2 border border-neutral-700">
                    <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Загрузить фото</span>
                </label>
                <div v-if="imagePreview"
                    class="flex items-center gap-2 bg-neutral-800/50 border border-neutral-700 rounded-xl px-3 py-2 animate-fade-in">
                    <img :src="imagePreview" class="h-10 w-10 rounded-lg object-cover" />
                    <span class="text-sm text-neutral-300">Фото выбрано</span>
                    <button @click="removeImage" class="text-neutral-400 hover:text-neutral-200 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <span v-if="uploading" class="text-neutral-400 animate-pulse">Загрузка...</span>
            </div>

            <!-- Кнопка публикации -->
            <div class="flex">
                <button @click="submitPost" :disabled="!content.trim() || loading || uploading"
                    class="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-medium disabled:opacity-50 transition-all duration-300 flex items-center gap-2 border border-neutral-700 group/btn">
                    <svg class="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {{ loading ? 'Публикация...' : 'Опубликовать' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const emit = defineEmits(['created'])

const title = ref('')
const content = ref('')
const imageFile = ref(null)
const imagePreview = ref(null)
const uploading = ref(false)
const loading = ref(false)

const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
        alert('Файл слишком большой (макс. 2MB)')
        return
    }
    if (!file.type.startsWith('image/')) {
        alert('Можно загружать только изображения')
        return
    }
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
}

const removeImage = () => {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value)
    imageFile.value = null
    imagePreview.value = null
}

const uploadImage = async () => {
    if (!imageFile.value) return null
    uploading.value = true
    try {
        const fileExt = imageFile.value.name.split('.').pop()
        const fileName = `${user.value.id}_${Date.now()}.${fileExt}`
        const { error } = await supabase.storage
            .from('post-images')
            .upload(fileName, imageFile.value)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage
            .from('post-images')
            .getPublicUrl(fileName)
        return publicUrl
    } catch (err) {
        console.error(err)
        alert('Ошибка загрузки изображения')
        return null
    } finally {
        uploading.value = false
    }
}

const submitPost = async () => {
    if (!content.value.trim() || loading.value) return

    const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
    if (userError || !currentUser) {
        alert('Необходимо войти в систему')
        return
    }

    loading.value = true
    try {
        const imageUrl = await uploadImage()
        if (imageFile.value && !imageUrl) {
            loading.value = false
            return
        }

        const { error } = await supabase
            .from('posts')
            .insert({
                user_id: currentUser.id,
                title: title.value.trim() || null,
                content: content.value.trim(),
                image_url: imageUrl
            })
        if (error) throw error

        title.value = ''
        content.value = ''
        removeImage()
        emit('created')
    } catch (err) {
        console.error('Ошибка при создании поста:', err)
        alert('Ошибка при публикации: ' + err.message)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-fade-in {
    animation: fade-in 0.2s ease-out;
}
</style>