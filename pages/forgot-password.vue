<template>
  <div class="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
    <div class="bg-neutral-900/40 backdrop-blur-xl rounded-3xl border border-neutral-700/50 p-8 w-full max-w-md">
      <h2 class="text-3xl font-light text-white mb-2">Сброс пароля</h2>
      <p class="text-neutral-400 text-sm mb-6">Введите email, на который придёт ссылка для восстановления</p>

      <form @submit.prevent="handleReset">
        <input
          v-model="email"
          type="email"
          placeholder="your@email.com"
          required
          class="w-full px-4 py-3 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white outline-none mb-6"
        />

        <div v-if="message" class="mb-4 text-sm" :class="messageType === 'success' ? 'text-green-400' : 'text-red-400'">
          {{ message }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {{ loading ? 'Отправка...' : 'Отправить ссылку' }}
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
const email = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('success')

const handleReset = async () => {
  message.value = ''
  loading.value = true
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) throw error
    messageType.value = 'success'
    message.value = 'Ссылка отправлена! Проверьте почту.'
    email.value = ''
  } catch (err) {
    messageType.value = 'error'
    message.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
