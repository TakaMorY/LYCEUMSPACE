<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-white mb-6">Смена пароля</h1>

    <form @submit.prevent="changePassword" class="space-y-6">
      <div>
        <label class="block text-sm text-neutral-300 mb-1">Текущий пароль</label>
        <input
          v-model="currentPassword"
          type="password"
          required
          class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition"
        />
      </div>

      <div>
        <label class="block text-sm text-neutral-300 mb-1">Новый пароль</label>
        <input
          v-model="newPassword"
          type="password"
          required
          minlength="6"
          class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition"
        />
        <p class="text-xs text-neutral-500 mt-1">Минимум 6 символов</p>
      </div>

      <div>
        <label class="block text-sm text-neutral-300 mb-1">Подтвердите новый пароль</label>
        <input
          v-model="confirmPassword"
          type="password"
          required
          class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition"
        />
      </div>

      <div v-if="error" class="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
        {{ error }}
      </div>
      <div v-if="success" class="bg-green-500/10 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm">
        Пароль успешно изменён!
      </div>

      <div class="flex justify-end space-x-3 pt-4">
        <NuxtLink to="/settings/profile" class="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-full font-semibold transition">
          Назад
        </NuxtLink>
        <button
          type="submit"
          :disabled="loading || !isFormValid"
          class="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-neutral-200 disabled:opacity-50 transition"
        >
          {{ loading ? 'Смена...' : 'Изменить пароль' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const router = useRouter()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const isFormValid = computed(() => {
  return currentPassword.value && 
         newPassword.value.length >= 6 && 
         newPassword.value === confirmPassword.value
})

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  loading.value = true
  error.value = ''
  success.value = false

  try {
    // Сначала проверим текущий пароль, попытавшись войти
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: useSupabaseUser().value.email,
      password: currentPassword.value
    })
    if (signInError) throw new Error('Неверный текущий пароль')

    // Меняем пароль
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword.value
    })
    if (updateError) throw updateError

    success.value = true
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''

    // Через 2 секунды перейдём в профиль
    setTimeout(() => {
      router.push(`/profile/${useSupabaseUser().value.id}`)
    }, 2000)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>