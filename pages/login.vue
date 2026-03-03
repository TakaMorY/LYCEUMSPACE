<template>
    <div class="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
        <!-- Частицы (анимированные точки) -->
        <div class="absolute inset-0 opacity-30">
            <div class="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping-slow"></div>
            <div class="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-neutral-300 rounded-full animate-pulse-slow"></div>
            <div
                class="absolute bottom-1/4 right-1/4 w-1 h-1 bg-neutral-400 rounded-full animate-ping-slow animation-delay-1000">
            </div>
            <div
                class="absolute top-1/2 left-2/3 w-1 h-1 bg-white rounded-full animate-pulse-slow animation-delay-2000">
            </div>
        </div>

        <!-- Крупные размытые фигуры (блобсы) с неоновым свечением -->
        <div class="absolute inset-0 overflow-hidden">
            <div
                class="absolute -top-40 -right-40 w-96 h-96 bg-neutral-600 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob">
            </div>
            <div
                class="absolute -bottom-40 -left-40 w-96 h-96 bg-neutral-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000">
            </div>
            <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neutral-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000">
            </div>
        </div>

        <!-- Основная карточка -->
        <div class="relative w-full max-w-md animate-fade-in-up">
            <!-- Двойное стекло: внешний слой с большим размытием -->
            <div class="absolute inset-0 bg-neutral-900/20 backdrop-blur-2xl rounded-3xl -z-10"></div>

            <!-- Основной контент карточки с внутренним свечением -->
            <div
                class="bg-neutral-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-neutral-700/50 overflow-hidden relative group">
                <!-- Неоновая подсветка по краям при наведении на карточку -->
                <div
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div
                        class="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl">
                    </div>
                    <div
                        class="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-2xl">
                    </div>
                </div>

                <!-- Шапка с переключателем -->
                <div class="flex p-1 bg-neutral-800/60 m-2 rounded-2xl backdrop-blur-sm border border-neutral-700/30">
                    <button @click="isLogin = true"
                        class="flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden"
                        :class="isLogin ? 'text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-200'">
                        <span v-if="isLogin"
                            class="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-600 animate-gradient"></span>
                        <span class="relative z-10">Вход</span>
                    </button>
                    <button @click="isLogin = false"
                        class="flex-1 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden"
                        :class="!isLogin ? 'text-white shadow-lg' : 'text-neutral-400 hover:text-neutral-200'">
                        <span v-if="!isLogin"
                            class="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-600 animate-gradient"></span>
                        <span class="relative z-10">Регистрация</span>
                    </button>
                </div>

                <!-- Контент -->
                <div class="p-8">
                    <!-- Заголовок с анимацией -->
                    <h2 class="text-4xl font-light text-white mb-2 animate-slide-down tracking-tight">
                        {{ isLogin ? 'С возвращением' : 'Присоединяйтесь' }}
                    </h2>
                    <p class="text-neutral-400 text-sm mb-8 animate-slide-down animation-delay-100">
                        {{ isLogin ? 'Введите свои данные для входа' : 'Создайте аккаунт за пару секунд' }}
                    </p>

                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <!-- Поле Email -->
                        <div class="space-y-2 animate-slide-down animation-delay-200">
                            <label class="block text-sm text-neutral-300">Email</label>
                            <div class="relative group/input">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-neutral-400 group-focus-within/input:text-white transition-colors"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input v-model="email" type="email" required
                                    class="w-full pl-10 pr-4 py-3 bg-transparent border-b border-neutral-700 text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                    placeholder="your@email.com" />
                            </div>
                        </div>

                        <!-- Поле Пароль -->
                        <div class="space-y-2 animate-slide-down animation-delay-300">
                            <label class="block text-sm text-neutral-300">Пароль</label>
                            <div class="relative group/input">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg class="h-5 w-5 text-neutral-400 group-focus-within/input:text-white transition-colors"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input v-model="password" :type="showPassword ? 'text' : 'password'" required
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

                        <!-- Чекбокс согласия (только регистрация) -->
                        <div v-if="!isLogin" class="flex items-center animate-slide-down animation-delay-400">
                            <label class="flex items-center cursor-pointer group/checkbox">
                                <div class="relative">
                                    <input type="checkbox" v-model="agreed" class="sr-only" />
                                    <div class="w-10 h-6 bg-neutral-700 rounded-full shadow-inner transition-all duration-300 group-hover/checkbox:shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                                        :class="{ 'bg-neutral-400': agreed }"></div>
                                    <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ease-in-out"
                                        :class="{ 'transform translate-x-4 bg-neutral-100': agreed }"></div>
                                </div>
                                <span class="ml-3 text-sm text-neutral-300">
                                    Я соглашаюсь с
                                    <a href="/privacy"
                                        class="text-neutral-200 hover:text-white underline transition-colors relative group/link">
                                        политикой конфиденциальности
                                        <span
                                            class="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover/link:scale-x-100 transition-transform"></span>
                                    </a>
                                    и
                                    <a href="/rules"
                                        class="text-neutral-200 hover:text-white underline transition-colors relative group/link">
                                        правилами форума
                                        <span
                                            class="absolute bottom-0 left-0 w-full h-px bg-white scale-x-0 group-hover/link:scale-x-100 transition-transform"></span>
                                    </a>
                                </span>
                            </label>
                        </div>

                        <!-- Сообщение об ошибке -->
                        <div v-if="error"
                            class="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm animate-shake backdrop-blur-sm">
                            {{ error }}
                        </div>

                        <!-- Кнопка отправки -->
                        <button type="submit" :disabled="loading || (!isLogin && !agreed)"
                            class="relative w-full group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-700 bg-[length:200%_100%] animate-gradient-x px-6 py-4 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed animate-slide-down animation-delay-500">
                            <span class="relative z-10">{{ loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Создать аккаунт') }}</span>
                            <span
                                class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                        </button>

                        <!-- Ссылка на восстановление пароля (только вход) -->
                        <div v-if="isLogin" class="text-center animate-fade-in animation-delay-600">
                            <NuxtLink to="/forgot-password"
                                class="text-sm text-neutral-400 hover:text-white transition-colors relative group/link">
                                Забыли пароль?
                                <span
                                    class="absolute -bottom-0.5 left-1/2 w-0 h-px bg-white group-hover/link:w-full group-hover/link:left-0 transition-all duration-300"></span>
                            </NuxtLink>
                        </div>
                    </form>


                    <!-- <div class="mt-8 animate-fade-in animation-delay-700">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-neutral-700"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-4 bg-neutral-900/60 text-neutral-400 backdrop-blur-sm rounded-full">или
                                    войти с помощью</span>
                            </div>
                        </div>

                        <div class="mt-6 grid grid-cols-2 gap-3">
                            
                            <button @click="signInWithOAuth('google')"
                                class="flex items-center justify-center px-4 py-3 border border-neutral-700 rounded-xl hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 group/btn">
                                <svg class="h-5 w-5 text-neutral-300 group-hover/btn:text-white transition-colors"
                                    viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4" />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853" />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05" />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335" />
                                </svg>
                                <span class="ml-2 text-sm text-neutral-300 group-hover/btn:text-white">Google</span>
                            </button>

                            
                            <button @click="signInWithOAuth('yandex')"
                                class="flex items-center justify-center px-4 py-3 border border-neutral-700 rounded-xl hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 group/btn">
                                <svg class="h-5 w-5 text-neutral-300 group-hover/btn:text-white" viewBox="0 0 24 24"
                                    fill="currentColor">
                                    <path
                                        d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z"
                                        fill="#FC3F1D" />
                                    <path
                                        d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.265.782 1.991 2.007 2.697l1.122.648-1.486 2.514h-1.962l1.287-2.18c-1.094-.66-1.916-1.555-1.916-3.057 0-2.123 1.518-3.295 3.547-3.295h2.164v8.532h-1.79V7.666h.636z"
                                        fill="#fff" />
                                </svg>
                                <span class="ml-2 text-sm text-neutral-300 group-hover/btn:text-white">Yandex</span>
                            </button>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const agreed = ref(false)
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)

// Универсальная функция для OAuth
const signInWithOAuth = async (provider) => {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: window.location.origin // после OAuth вернёт сюда
            }
        })
        if (error) throw error
    } catch (err) {
        error.value = err.message
    }
}

const handleSubmit = async () => {
    error.value = ''
    loading.value = true

    try {
        if (isLogin.value) {
            const { data, error: authError } = await supabase.auth.signInWithPassword({
                email: email.value,
                password: password.value,
            })
            if (authError) throw authError
        } else {
            if (!agreed.value) {
                throw new Error('Необходимо согласие с правилами')
            }

            const { data, error: authError } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
                options: {
                    data: {
                        agreed_to_terms: true,
                        agreed_at: new Date().toISOString()
                    }
                }
            })
            if (authError) throw authError

            if (data.user && !data.session) {
                error.value = 'Проверьте почту для подтверждения регистрации'
                loading.value = false
                return
            }
        }
        await navigateTo('/')
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
/* Анимации */
@keyframes blob {

    0%,
    100% {
        transform: scale(1) translate(0, 0) rotate(0deg);
    }

    33% {
        transform: scale(1.2) translate(50px, -50px) rotate(120deg);
    }

    66% {
        transform: scale(0.8) translate(-20px, 20px) rotate(240deg);
    }
}

.animate-blob {
    animation: blob 20s infinite;
}

@keyframes ping-slow {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    80%,
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-ping-slow {
    animation: ping-slow 4s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes pulse-slow {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.3;
    }
}

.animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
}

@keyframes gradient-x {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.animate-gradient-x {
    animation: gradient-x 3s ease infinite;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.9s ease-out;
}

@keyframes slide-down {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-down {
    animation: slide-down 0.6s ease-out forwards;
    opacity: 0;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
    opacity: 0;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    20% {
        transform: translateX(-8px);
    }

    40% {
        transform: translateX(8px);
    }

    60% {
        transform: translateX(-4px);
    }

    80% {
        transform: translateX(4px);
    }
}

.animate-shake {
    animation: shake 0.5s ease-in-out;
}

/* Задержки */
.animation-delay-100 {
    animation-delay: 0.1s;
}

.animation-delay-200 {
    animation-delay: 0.2s;
}

.animation-delay-300 {
    animation-delay: 0.3s;
}

.animation-delay-400 {
    animation-delay: 0.4s;
}

.animation-delay-500 {
    animation-delay: 0.5s;
}

.animation-delay-600 {
    animation-delay: 0.6s;
}

.animation-delay-700 {
    animation-delay: 0.7s;
}

.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

/* Дополнительные эффекты */
.group:hover .group-hover\:opacity-100 {
    opacity: 1;
}
</style>