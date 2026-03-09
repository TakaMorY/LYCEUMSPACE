<template>
  <div class="flex items-start space-x-3 border-b border-neutral-800 pb-4 mb-4">
    <img :src="userAvatar || '/default-avatar.png'" class="w-10 h-10 rounded-full flex-shrink-0" />
    <div class="flex-1">
      <textarea
        v-model="content"
        placeholder="Что происходит?"
        class="w-full bg-transparent border-none outline-none text-white text-lg resize-none placeholder-neutral-600"
        rows="3"
        maxlength="280"
      ></textarea>
      <div class="flex justify-between items-center mt-2">
        <span class="text-sm text-neutral-500">{{ content.length }}/280</span>
        <button
          @click="submitPost"
          :disabled="!content.trim() || loading"
          class="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 transition"
        >
          {{ loading ? 'Публикация...' : 'Опубликовать' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const content = ref('')
const loading = ref(false)
const emit = defineEmits(['created'])

const userAvatar = computed(() => '/default-avatar.png') // можно заменить на реальный аватар

const submitPost = async () => {
  if (!content.value.trim() || loading.value) return

  const { data: { user: currentUser } } = await supabase.auth.getUser()
  if (!currentUser) {
    alert('Необходимо войти в систему')
    return
  }

  loading.value = true
  try {
    const { error } = await supabase
      .from('posts')
      .insert({
        user_id: currentUser.id,
        content: content.value
      })
    if (error) throw error
    content.value = ''
    emit('created')
  } catch (err) {
    console.error('Ошибка при создании поста:', err)
    alert('Ошибка при публикации: ' + err.message)
  } finally {
    loading.value = false
  }
}
</script>