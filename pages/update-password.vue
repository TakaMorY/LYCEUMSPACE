<template>
    <div class="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
        <!-- Фоновые эффекты (аналогично) -->
        <div class="absolute inset-0 opacity-30">
            <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping-slow"></div>
            <div class="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-neutral-300 rounded-full animate-pulse-slow"></div>
        </div>
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="absolute -top-40 -right-40 w-96 h-96 bg-neutral-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob">
            </div>
        </div>

        <!-- Карточка -->
        <div class="relative w-full max-w-md animate-fade-in-up">
            <div
                class="bg-neutral-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-700/50 overflow-hidden p-8">
                <h2 class="text-3xl font-light text-white mb-2">Новый пароль</h2>
                <p class="text-neutral-400 text-sm mb-8">Придумайте надёжный пароль</p>

                <form @submit.prevent="handleUpdate" class="space-y-6">
                    <!-- Новый пароль -->
                    <div class="space-y-2">
                        <label class="block text-sm text-neutral-300">Новый пароль</label>
                        <div class="relative group/input">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-neutral-400 group-focus-within/input:text-white" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" required minlength="6"
                                class="w-full pl-10 pr-12 py-3 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                placeholder="••••••••" />
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white transition-colors">
                                <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Подтверждение пароля -->
                    <div class="space-y-2">
                        <label class="block text-sm text-neutral-300">Подтвердите пароль</label>
                        <div class="relative group/input">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-neutral-400 group-focus-within/input:text-white" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <input v-model="confirmPassword" :type="showConfirm ? 'text' : 'password'" required
                                class="w-full pl-10 pr-12 py-3 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                placeholder="••••••••" />
                            <button type="button" @click="showConfirm = !showConfirm"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white transition-colors">
                                <svg v-if="showConfirm" class="h-5 w-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Сообщение -->
                    <div v-if="message" class="px-4 py-3 rounded-xl text-sm backdrop-blur-sm"
                        :class="messageType === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-200' : 'bg-red-500/10 border border-red-500/50 text-red-200'">
                        {{ message }}
                    </div>

                    <!-- Кнопка -->
                    <button type="submit" :disabled="loading || !isPasswordMatch"
                        class="relative w-full group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 bg-[length:200%_100%] animate-gradient-x px-6 py-4 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] disabled:opacity-50">
                        <span class="relative z-10">{{ loading ? 'Обновление...' : 'Сохранить новый пароль' }}</span>
                        <span
                            class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                    </button>

                    <!-- Ссылка на вход -->
                    <div class="text-center">
                        <NuxtLink to="/login"
                            class="text-sm text-neutral-400 hover:text-white transition-colors relative group/link">
                            Вернуться к входу
                            <span
                                class="absolute -bottom-0.5 left-1/2 w-0 h-px bg-white group-hover/link:w-full group-hover/link:left-0 transition-all duration-300"></span>
                        </NuxtLink>
                    </div>
                </form>
            </div>
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

const isPasswordMatch = computed(() => password.value === confirmPassword.value && password.value.length > 0)

// При загрузке страницы проверяем, есть ли сессия (Supabase автоматически создаст сессию после перехода по ссылке)
onMounted(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        // Если сессии нет – возможно, ссылка устарела или пользователь уже использовал её
        messageType.value = 'error'
        message.value = 'Ссылка для сброса пароля недействительна или устарела. Запросите новую.'
    }
})

const handleUpdate = async () => {
    if (!isPasswordMatch.value) {
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
        message.value = 'Пароль успешно изменён! Сейчас вы будете перенаправлены...'

        // Через 2 секунды редирект на логин
        setTimeout(() => {
            navigateTo('/login')
        }, 2000)
    } catch (err) {
        messageType.value = 'error'
        message.value = err.message
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
/* Те же анимации, что и выше */
@keyframes blob {
    /* ... */
}

@keyframes ping-slow {
    /* ... */
}

@keyframes pulse-slow {
    /* ... */
}

@keyframes gradient-x {
    /* ... */
}

@keyframes fade-in-up {
    /* ... */
}

.animate-blob {
    animation: blob 20s infinite;
}

.animate-ping-slow {
    animation: ping-slow 4s infinite;
}

.animate-pulse-slow {
    animation: pulse-slow 3s infinite;
}

.animate-gradient-x {
    animation: gradient-x 3s ease infinite;
}

.animate-fade-in-up {
    animation: fade-in-up 0.9s ease-out;
}
</style>