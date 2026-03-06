<template>
  <div class="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
    <div class="bg-neutral-900/40 backdrop-blur-xl rounded-3xl border border-neutral-700/50 p-8 w-full max-w-md">
      <h2 class="text-3xl font-light text-white mb-2">Новый пароль</h2>
      <p class="text-neutral-400 text-sm mb-6">Придумайте надёжный пароль</p>

      <form @submit.prevent="handleUpdate">
        <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Новый пароль" required
          minlength="6"
          class="w-full px-4 py-3 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white outline-none mb-4" />
        <input v-model="confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="Подтвердите пароль"
          required
          class="w-full px-4 py-3 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white outline-none mb-6" />

        <div v-if="message" class="mb-4 text-sm" :class="messageType === 'success' ? 'text-green-400' : 'text-red-400'">
          {{ message }}
        </div>

        <button type="submit" :disabled="loading || password !== confirmPassword"
          class="w-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50">
          {{ loading ? 'Сохраняем...' : 'Сохранить пароль' }}
        </button>

        <div class="text-center mt-4">
          <NuxtLink to="/login" class="text-sm text-neutral-400 hover:text-white">
            Вернуться к входу
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const message = ref('')
const messageType = ref('success')

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    messageType.value = 'error'
    message.value = 'Ссылка устарела. Запросите новую.'
  }
})

const handleUpdate = async () => {
  if (password.value !== confirmPassword.value) {
    messageType.value = 'error'
    message.value = 'Пароли не совпадают'
    return
  }
  message.value = ''
  loading.value = true
  try {
    const { error } = await supabase.auth.updateUser({ password: password.value })
    if (error) throw error
    messageType.value = 'success'
    message.value = 'Пароль успешно изменён! Перенаправляем...'
    setTimeout(() => navigateTo('/login'), 2000)
  } catch (err) {
    messageType.value = 'error'
    message.value = err.message
  } finally {
    loading.value = false
  }
}
</script>