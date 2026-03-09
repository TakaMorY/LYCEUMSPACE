<template>
  <div class="relative group bg-neutral-900/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-neutral-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 mb-6">
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div class="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl"></div>
      <div class="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-2xl"></div>
    </div>

    <div class="relative">
      <h3 class="text-lg sm:text-xl font-medium text-white mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Создать пост
      </h3>
      <div class="space-y-4">
        <input
          v-model="title"
          type="text"
          placeholder="Заголовок (необязательно)"
          maxlength="100"
          class="w-full px-4 py-2 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-all duration-300 text-sm sm:text-base"
        />
        <textarea
          v-model="content"
          placeholder="Что у вас нового?"
          rows="4"
          maxlength="2000"
          class="w-full px-4 py-2 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base"
        ></textarea>
        <div class="text-right text-xs text-neutral-500">{{ content.length }}/2000</div>

        <div class="flex flex-wrap items-center gap-3">
          <label class="cursor-pointer px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs sm:text-sm text-white transition border border-neutral-700/50 flex items-center gap-2">
            <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
            Загрузить фото
          </label>
          <span v-if="uploading" class="text-xs text-neutral-400">Загрузка...</span>
          <div v-if="imagePreview" class="flex items-center gap-2 bg-neutral-800/60 p-1 rounded-lg">
            <img :src="imagePreview" class="h-8 w-8 object-cover rounded" />
            <button @click="removeImage" class="text-neutral-400 hover:text-white text-xs">✕</button>
          </div>
        </div>

        <div class="flex ">
          <button
            @click="submitPost"
            :disabled="!content.trim() || loading || uploading"
            class="px-6 py-3 bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 text-white rounded-xl text-sm font-medium disabled:opacity-50 transition-all duration-300 flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            {{ loading ? 'Публикация...' : 'Опубликовать' }}
          </button>
        </div>
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