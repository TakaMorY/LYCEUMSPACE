<template>
    <div class="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
        <!-- Фоновые эффекты (как на странице входа) -->
        <div class="absolute inset-0 opacity-30">
            <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping-slow"></div>
            <div class="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-neutral-300 rounded-full animate-pulse-slow"></div>
            <div
                class="absolute bottom-1/4 right-1/4 w-1 h-1 bg-neutral-400 rounded-full animate-ping-slow animation-delay-1000">
            </div>
        </div>
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="absolute -top-40 -right-40 w-96 h-96 bg-neutral-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob">
            </div>
            <div
                class="absolute -bottom-40 -left-40 w-96 h-96 bg-neutral-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000">
            </div>
        </div>

        <!-- Карточка -->
        <div class="relative w-full max-w-md animate-fade-in-up">
            <div
                class="bg-neutral-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-700/50 overflow-hidden p-8">
                <h2 class="text-3xl font-light text-white mb-2">Сброс пароля</h2>
                <p class="text-neutral-400 text-sm mb-8">Введите email, на который придёт ссылка для восстановления</p>

                <form @submit.prevent="handleReset" class="space-y-6">
                    <!-- Email -->
                    <div class="space-y-2">
                        <label class="block text-sm text-neutral-300">Email</label>
                        <div class="relative group/input">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="h-5 w-5 text-neutral-400 group-focus-within/input:text-white" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <input v-model="email" type="email" required
                                class="w-full pl-10 pr-4 py-3 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                placeholder="your@email.com" />
                        </div>
                    </div>

                    <!-- Сообщение об успехе/ошибке -->
                    <div v-if="message" class="px-4 py-3 rounded-xl text-sm backdrop-blur-sm"
                        :class="messageType === 'success' ? 'bg-green-500/10 border border-green-500/50 text-green-200' : 'bg-red-500/10 border border-red-500/50 text-red-200'">
                        {{ message }}
                    </div>

                    <!-- Кнопка -->
                    <button type="submit" :disabled="loading"
                        class="relative w-full group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 bg-[length:200%_100%] animate-gradient-x px-6 py-4 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] disabled:opacity-50">
                        <span class="relative z-10">{{ loading ? 'Отправка...' : 'Отправить ссылку' }}</span>
                        <span
                            class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                    </button>

                    <!-- Ссылка назад -->
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
const email = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('success') // 'success' или 'error'

const handleReset = async () => {
    message.value = ''
    loading.value = true

    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
            redirectTo: `${window.location.origin}/update-password`, // куда придёт пользователь после клика
        })
        if (error) throw error
        messageType.value = 'success'
        message.value = 'Ссылка для сброса пароля отправлена на ваш email'
        email.value = '' // очищаем поле
    } catch (err) {
        messageType.value = 'error'
        message.value = err.message
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
/* Подключаем те же анимации, что и на login */
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

.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}
</style>