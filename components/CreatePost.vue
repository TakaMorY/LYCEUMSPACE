<template>
  <div class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-8">
    <h3 class="text-xl font-semibold text-white mb-4">Создать пост</h3>
    <div class="space-y-4">
      <!-- Заголовок (опционально) -->
      <input
        v-model="title"
        type="text"
        placeholder="Заголовок (необязательно)"
        maxlength="100"
        class="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:border-blue-400 focus:outline-none transition"
      />

      <!-- Текст поста -->
      <textarea
        v-model="content"
        placeholder="Что у вас нового?"
        rows="3"
        maxlength="2000"
        class="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:border-blue-400 focus:outline-none resize-none"
      ></textarea>
      <div class="text-right text-sm text-neutral-500">{{ content.length }}/2000</div>

      <!-- Загрузка изображения -->
      <div class="flex items-center gap-4">
        <label class="cursor-pointer px-5 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-300">
          <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
          <span>📷 Загрузить фото</span>
        </label>
        <span v-if="uploading" class="text-neutral-400">Загрузка...</span>
        <span v-else-if="imagePreview" class="text-sm text-neutral-400 flex items-center gap-2">
          ✅ Фото выбрано
          <button @click="removeImage" class="text-red-400 hover:text-red-300">✕</button>
        </span>
        <img v-if="imagePreview" :src="imagePreview" class="h-10 w-10 rounded-lg object-cover" />
      </div>

      <!-- Кнопка публикации -->
      <div class="flex justify-end">
        <button
          @click="submitPost"
          :disabled="!content.trim() || loading || uploading"
          class="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold disabled:opacity-50 transition-all duration-300 shadow-lg shadow-purple-500/20"
        >
          {{ loading ? 'Публикация...' : 'Опубликовать' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const emit = defineEmits(['created'])

const title = ref('')
const content = ref('')
const imageFile = ref(null)
const imagePreview = ref(null)
const uploading = ref(false)
const loading = ref(false)

// Обработка выбора файла
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

// Удаление выбранного изображения
const removeImage = () => {
  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value)
  imageFile.value = null
  imagePreview.value = null
}

// Загрузка изображения в Storage
const uploadImage = async () => {
  if (!imageFile.value) return null
  uploading.value = true
  try {
    const fileExt = imageFile.value.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
    const { error } = await supabase.storage
      .from('post-images')
      .upload(fileName, imageFile.value)
    if (error) throw error
    const { data: { publicUrl } } = supabase.storage
      .from('post-images')
      .getPublicUrl(fileName)
    return publicUrl
  } catch (err) {
    console.error('Ошибка загрузки изображения:', err)
    alert('Не удалось загрузить изображение')
    return null
  } finally {
    uploading.value = false
  }
}

// Отправка поста
const submitPost = async () => {
  if (!content.value.trim() || loading.value) return

  // Получаем актуального пользователя через getUser() – это надёжнее, чем useSupabaseUser()
  const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
  if (userError || !currentUser) {
    alert('Необходимо войти в систему')
    return
  }

  loading.value = true
  try {
    const imageUrl = await uploadImage()
    // Если было выбрано изображение, но загрузка не удалась – прерываем
    if (imageFile.value && !imageUrl) {
      loading.value = false
      return
    }

    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: currentUser.id,      // обязательно передаём ID текущего пользователя
        title: title.value.trim() || null,
        content: content.value.trim(),
        image_url: imageUrl
      })
    if (error) throw error

    // Очистка формы
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