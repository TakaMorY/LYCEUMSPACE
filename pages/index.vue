<template>
    <section>
        <!-- Cookie consent banner -->
        <div v-if="!cookiesAccepted" class="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6 md:p-8 pointer-events-none">
            <div class="max-w-7xl mx-auto pointer-events-auto">
                <div
                    class="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div class="flex-1 text-sm text-neutral-300">
                        <span class="font-semibold text-white">Мы используем куки</span> для работы сайта.
                        Продолжая пользоваться сайтом, вы соглашаетесь с нашей
                        <NuxtLink to="/privacy" class="text-neutral-200 hover:text-white underline transition-colors">
                            политикой конфиденциальности</NuxtLink>.
                    </div>
                    <div class="flex gap-3">
                        <button @click="acceptCookies"
                            class="px-6 py-2 bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 text-white rounded-full text-sm font-medium transition-all duration-300">
                            Принять
                        </button>
                        <NuxtLink to="/policy"
                            class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-all duration-300 border border-white/10">
                            Подробнее
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>


        <!-- main -->
        <div class="modern-scroll-experience">
            <!-- Хедер появляется после прокрутки -->
            <header :class="['fixed top-0 left-0 w-full z-50 transition-all duration-700 transform',
                showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0']">
                <div class="bg-neutral-950/90 backdrop-blur-md border-b border-white/5">
                    <div class="container mx-auto px-6 py-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <!-- Логотип с использованием NuxtImg (если используете Nuxt) -->
                                <img src="/images/logo/logotip.png" alt="Logo" class="h-10 w-auto" />

                                <!-- Или обычный img -->
                                <!-- <img src="/logo.png" alt="Logo" class="h-10 w-auto"> -->

                                <span
                                    class="text-xss sm:text-sm md:text-base lg:text-xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                                    ЛИЦЕЙСКОЕПРОСТРАНСТВО
                                </span>
                            </div>


                            <!-- Десктоп навигация -->
                            <nav class="hidden md:flex items-center gap-8">
                                <NuxtLink to="/"
                                    class="text-neutral-300 hover:text-white transition-colors text-sm tracking-wider">
                                    ГЛАВНАЯ
                                </NuxtLink>
                                <NuxtLink to="/"
                                    class="text-neutral-300 hover:text-white transition-colors text-sm tracking-wider">
                                    ЕГЭ/ОГЭ
                                </NuxtLink>
                                <NuxtLink to="/"
                                    class="text-neutral-300 hover:text-white transition-colors text-sm tracking-wider">
                                    МЕРОПРИЯТИЯ
                                </NuxtLink>
                                <NuxtLink to="/forum"
                                    class="text-neutral-300 hover:text-white transition-colors text-sm tracking-wider">
                                    ФОРУМ
                                </NuxtLink>
                            </nav>

                            <!-- Десктоп кнопка и мобильное меню бургер -->
                            <div class="flex items-center gap-4">
                                <!-- Мобильный бургер -->
                                <button @click="toggleMobileMenu"
                                    class="md:hidden relative w-10 h-10 focus:outline-none z-50">
                                    <span class="sr-only">Открыть меню</span>
                                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6">
                                        <span :class="[
                                            'absolute h-0.5 w-6 bg-white transform transition-all duration-500 ease-out',
                                            mobileMenuOpen ? 'rotate-45 top-0' : '-top-2'
                                        ]"></span>
                                        <span :class="[
                                            'absolute h-0.5 w-6 bg-white transform transition-all duration-500 ease-out top-0',
                                            mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                                        ]"></span>
                                        <span :class="[
                                            'absolute h-0.5 w-6 bg-white transform transition-all duration-500 ease-out',
                                            mobileMenuOpen ? '-rotate-45 top-0' : 'top-2'
                                        ]"></span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Мобильное меню -->
            <transition name="menu">
                <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 md:hidden">
                    <!-- Затемнение фона с эффектом размытия -->
                    <div class="absolute inset-0 bg-black/80 backdrop-blur-xl" @click="closeMobileMenu"></div>

                    <!-- Панель меню -->
                    <div
                        class="absolute right-0 top-0 h-full w-full sm:w-96 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 shadow-2xl transform transition-all duration-500 ease-out">

                        <!-- Декоративный элемент сверху -->
                        <div
                            class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent">
                        </div>

                        <!-- Контент меню -->
                        <div class="relative h-full flex flex-col pt-24 px-8">

                            <!-- Заголовок меню с анимацией -->
                            <div class="mb-12 overflow-hidden">
                                <span class="block text-xs tracking-[0.3em] text-white/30 mb-2 animate-slide-down"
                                    style="animation-delay: 0.1s">Навигация</span>
                                <h3 class="text-4xl font-light text-white animate-slide-down"
                                    style="animation-delay: 0.2s">
                                    Меню<span class="text-white/40">.</span>
                                </h3>
                            </div>

                            <!-- Навигационные ссылки -->
                            <nav class="flex flex-col space-y-2">
                                <NuxtLink to="/" @click="closeMobileMenu"
                                    class="group relative flex items-center py-4 text-2xl font-light text-white/70 hover:text-white transition-all duration-300 transform hover:translate-x-2 animate-slide-right"
                                    style="animation-delay: 0.3s">
                                    <span
                                        class="absolute left-0 w-0 h-px bg-white group-hover:w-8 transition-all duration-300"></span>
                                    <span class="ml-0 group-hover:ml-12 transition-all duration-300">Главная</span>
                                    <span
                                        class="ml-auto text-xs text-white/20 group-hover:text-white/40 transition-all duration-300">01</span>
                                </NuxtLink>

                                <NuxtLink to="/" @click="closeMobileMenu"
                                    class="group relative flex items-center py-4 text-2xl font-light text-white/70 hover:text-white transition-all duration-300 transform hover:translate-x-2 animate-slide-right"
                                    style="animation-delay: 0.4s">
                                    <span
                                        class="absolute left-0 w-0 h-px bg-white group-hover:w-8 transition-all duration-300"></span>
                                    <span class="ml-0 group-hover:ml-12 transition-all duration-300">ЕГЭ/ОГЭ</span>
                                    <span
                                        class="ml-auto text-xs text-white/20 group-hover:text-white/40 transition-all duration-300">02</span>
                                </NuxtLink>

                                <NuxtLink to="/" @click="closeMobileMenu"
                                    class="group relative flex items-center py-4 text-2xl font-light text-white/70 hover:text-white transition-all duration-300 transform hover:translate-x-2 animate-slide-right"
                                    style="animation-delay: 0.5s">
                                    <span
                                        class="absolute left-0 w-0 h-px bg-white group-hover:w-8 transition-all duration-300"></span>
                                    <span class="ml-0 group-hover:ml-12 transition-all duration-300">Мероприятия</span>
                                    <span
                                        class="ml-auto text-xs text-white/20 group-hover:text-white/40 transition-all duration-300">03</span>
                                </NuxtLink>

                                <NuxtLink to="/forum" @click="closeMobileMenu"
                                    class="group relative flex items-center py-4 text-2xl font-light text-white/70 hover:text-white transition-all duration-300 transform hover:translate-x-2 animate-slide-right"
                                    style="animation-delay: 0.6s">
                                    <span
                                        class="absolute left-0 w-0 h-px bg-white group-hover:w-8 transition-all duration-300"></span>
                                    <span class="ml-0 group-hover:ml-12 transition-all duration-300">Форум</span>
                                    <span
                                        class="ml-auto text-xs text-white/20 group-hover:text-white/40 transition-all duration-300">04</span>
                                </NuxtLink>
                            </nav>

                            <!-- Разделитель -->
                            <div class="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent">
                            </div>

                            <!-- Секция с Telegram -->
                            <div class="space-y-6 animate-slide-up" style="animation-delay: 0.7s">
                                <span class="block text-xs tracking-[0.3em] text-white/30">СВЯЗАТЬСЯ С НАМИ</span>

                                <!-- Telegram ссылка с красивым оформлением -->
                                <a href="https://t.me/lyceum_space" target="_blank" rel="noopener noreferrer"
                                    class="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                                    <div class="flex items-center space-x-4">
                                        <div class="relative">
                                            <div
                                                class="w-12 h-12 bg-[#0088cc]/20 rounded-full flex items-center justify-center group-hover:bg-[#0088cc]/30 transition-all duration-300">
                                                <svg class="w-6 h-6 text-[#0088cc] group-hover:scale-110 transition-transform duration-300"
                                                    fill="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.36-.48.99-.74 3.9-1.7 6.5-2.82 7.8-3.37 3.72-1.56 4.49-1.83 4.99-1.84.11 0 .36.03.52.17.13.12.17.27.18.39-.01.1-.01.32-.02.5z" />
                                                </svg>
                                            </div>
                                            <!-- Пульсирующий кружок -->
                                            <div class="absolute -top-1 -right-1 w-3 h-3">
                                                <span
                                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0088cc] opacity-75"></span>
                                                <span
                                                    class="relative inline-flex rounded-full h-3 w-3 bg-[#0088cc]"></span>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="text-sm text-white/40">Telegram</p>
                                            <p
                                                class="text-lg font-medium text-white group-hover:text-[#0088cc] transition-colors duration-300">

                                                @lyceum_space</p>
                                        </div>
                                    </div>
                                    <div class="transform group-hover:translate-x-1 transition-transform duration-300">
                                        <svg class="w-5 h-5 text-white/40 group-hover:text-white" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </div>
                                </a>

                                <!-- Дополнительные соцсети (опционально) -->
                                <!-- <div class="flex justify-center space-x-4 pt-4">
                                    <a href="#"
                                        class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 transform hover:scale-110">
                                        <svg class="w-5 h-5 text-white/60 hover:text-white" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                    </a>
                                    <a href="#"
                                        class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 transform hover:scale-110">
                                        <svg class="w-5 h-5 text-white/60 hover:text-white" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.66.254 1.216.592 1.772 1.153.509.498.902 1.084 1.153 1.772.247.636.416 1.363.465 2.427.047 1.024.06 1.378.06 3.808 0 2.43-.013 2.784-.06 3.808-.049 1.064-.218 1.791-.465 2.427-.254.66-.592 1.216-1.153 1.772-.498.509-1.084.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.024.047-1.378.06-3.808.06-2.43 0-2.784-.013-3.808-.06-1.064-.049-1.791-.218-2.427-.465-.66-.254-1.216-.592-1.772-1.153-.509-.498-.902-1.084-1.153-1.772-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.378-.06-3.808 0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.254-.66.592-1.216 1.153-1.772.498-.509 1.084-.902 1.772-1.153.636-.247 1.363-.416 2.427-.465C9.531 2.013 9.885 2 12.315 2zm0 5.865a5.94 5.94 0 100 11.88 5.94 5.94 0 000-11.88zm6.16-3.093a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88zM12.315 9.86a3.42 3.42 0 110 6.84 3.42 3.42 0 010-6.84z" />
                                        </svg>
                                    </a>
                                    <a href="#"
                                        class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 transform hover:scale-110">
                                        <svg class="w-5 h-5 text-white/60 hover:text-white" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.082-12.256c0-.21-.005-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                </div> -->
                            </div>

                            <!-- Footer меню -->
                            <div class="mt-auto pb-8 text-center">
                                <p class="text-xs text-white/20 tracking-wider">© 2026 ЛИЦЕЙСКОЕПРОСТРАНСТВО. Все
                                    права
                                    защищены.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>

            <!-- Затемнение для плавности появления хедера -->
            <div :class="['fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none transition-opacity duration-700 z-40',
                showHeader ? 'opacity-100' : 'opacity-0']"></div>

            <!-- Основной контент с лэндингом - теперь без внутреннего скролла -->
            <div class="landing-wrapper">
                <!-- Three.js Canvas Client Component -->
                <ClientOnly>
                    <ThreeBackground />
                </ClientOnly>

                <!-- Секции лэндинга - теперь просто блоки, а не скролл-контейнер -->
                <div class="landing-sections">
                    <!-- Section 1 -->
                    <section class="landing-section relative flex-col md:flex-row">
                        <div class="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden group shine-effect">
                            <!-- Затемнение фона -->
                            <div class="absolute inset-0 bg-gradient-to-r from-neutral-950/70 to-neutral-950/50">
                            </div>

                            <!-- Надпись LYCEUMSPACE - прямая -->
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span
                                    class="text-white/60 text-xl md:text-xl lg:text-3xl font-bold tracking-[0.2em] uppercase transform hover:scale-105 hover:text-white/30 transition-all duration-700 cursor-default">
                                    ЛИЦЕЙСКОЕПРОСТРАНСТВО
                                </span>
                            </div>

                            <!-- Здесь может быть ваше изображение/контент -->
                        </div>

                        <div
                            class="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center p-8 bg-neutral-950">
                            <div class="max-w-lg card-3d float-animation text-center md:text-left">
                                <span
                                    class="text-neutral-400 tracking-wider text-sm font-mono opacity-0 text-reveal-delay"
                                    data-delay="0">01 / ПРОСМОТР</span>
                                <h2 class="mt-4 text-4xl md:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent opacity-0 text-reveal-delay"
                                    data-delay="200">Удобный <br class="hidden md:block">Интерфейс</h2>
                                <p class="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed opacity-0 text-reveal-delay"
                                    data-delay="400">Сайт удобен для использования на всех устройствах</p>
                                <button @click="scrollToBottom"
                                    class="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-all duration-300 hover:tracking-wider opacity-0 text-reveal-delay"
                                    data-delay="600">Пропустить →</button>
                            </div>
                        </div>
                    </section>

                    <!-- Section 2 -->
                    <section class="landing-section relative flex-col md:flex-row">
                        <div
                            class="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center p-8 bg-neutral-900 order-2 md:order-1">
                            <div class="max-w-lg card-3d float-animation text-center md:text-left">
                                <span
                                    class="text-neutral-400 tracking-wider text-sm font-mono opacity-0 text-reveal-delay"
                                    data-delay="0">02 / ДИЗАЙН</span>
                                <h2 class="mt-4 text-4xl md:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent opacity-0 text-reveal-delay"
                                    data-delay="200">Современный <br class="hidden md:block">Дизайн</h2>
                                <p class="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed opacity-0 text-reveal-delay"
                                    data-delay="400">Удобный и модный дизайн специально для вас.
                                </p>
                            </div>
                        </div>
                        <div
                            class="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden group shine-effect order-1 md:order-2">
                            <div class="absolute inset-0 bg-gradient-to-l from-neutral-950/70 to-neutral-950/50">
                            </div>
                        </div>
                    </section>

                    <!-- Section 3 -->
                    <section class="landing-section relative flex-col md:flex-row">
                        <div class="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden group shine-effect">
                            <div class="absolute inset-0 bg-gradient-to-r from-neutral-950/70 to-neutral-950/50">
                            </div>
                        </div>
                        <div
                            class="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center p-8 bg-neutral-950">
                            <div class="max-w-lg card-3d float-animation text-center md:text-left">
                                <span
                                    class="text-neutral-400 tracking-wider text-sm font-mono opacity-0 text-reveal-delay"
                                    data-delay="0">03 / ПРОСТРАНСТВО</span>
                                <h2 class="mt-4 text-4xl md:text-7xl font-bold leading-none bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent opacity-0 text-reveal-delay"
                                    data-delay="200">Учебная <br class="hidden md:block">Среда</h2>
                                <p class="mt-6 text-neutral-400 text-base md:text-lg leading-relaxed opacity-0 text-reveal-delay"
                                    data-delay="400">Платформа для эффективного обучения
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    </section>
    <section class="bg-neutral-900">
        <div
            class="p-20 sm:p-10 rounded-3xl bg-neutral-900 dark:text-white  flex items-center justify-center overflow-hidden shadow-2xl">
            <div class="w-full max-w-6xl px-4 sm:px-6">
                <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <!-- Left Section: Text Content -->
                    <div class="flex flex-col justify-center text-center md:text-left z-10">
                        <h1
                            class="text-4xl sm:text-4xl md:text-5xl lg:text-8xl font-extrabold uppercase leading-tight tracking-tight">
                            Поможем с <span class="text-gray-400">учёбой</span>
                        </h1>
                        <p
                            class="mt-4 text-base sm:text-lg md:text-xl font-medium text-gray-400 dark:text-gray-400 text-gray-700 text-balance">
                            На сайте представленно множество заданий, конспектов учеников и советов от 100
                            бальников.
                        </p>
                        <div class="mt-6 sm:mt-8 flex flex-wrap gap-4">
                            <NuxtLink to=""
                                class="rounded-sm p-3 grow border text-center border-white text-white font-bold uppercase text-sm tracking-widest hover:bg-neutral-700 hover:text-white transition">
                                Пора учиться
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Right Section: Visual Block -->
                    <div class="relative flex items-center sm:m-10">
                        <div
                            class="absolute -top-10 md:-top-20 -left-10 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-neutral-700 rotate-12 rounded-lg border-neutral-800 border-b-4 border-r-8 max-sm:hidden">
                        </div>
                        <div
                            class="relative z-10 bg-neutral-800/80 p-4 sm:p-6 -right-1/2 -translate-x-1/2 grow text-center shadow-xl -rotate-2 rounded-xl text-nowrap border-neutral-950 border-b-4 border-r-8">
                            <h2 class="text-2xl sm:text-3xl font-bold uppercase text-white ">
                                Всё бесплатно
                            </h2>
                            <p class="mt-1 text-sm sm:text-base font-light text-gray-400 ">
                                Учись в своё удовольствие
                            </p>
                        </div>
                        <div
                            class="absolute -bottom-10 md:-bottom-20 -right-16 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-neutral-600 -rotate-12 rounded-lg border-neutral-700 border-r-4 border-b-8 max-sm:hidden">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <AboutLyceum />
    </section>
    <section>
        <AboutForum />
    </section>



    <Footer />
</template>

<style scoped>
.modern-scroll-experience {
    min-height: 100vh;
    background-color: #0a0a0a;
    color: white;
}

.landing-wrapper {
    position: relative;
    z-index: 10;
}

/* Удален scroll-container */
.landing-section {
    height: 100vh;
    display: flex;
    transform-style: preserve-3d;
}

@media (max-width: 768px) {
    .landing-section {
        flex-direction: column;
        height: 100vh;
    }

    .landing-section>div {
        height: 50vh;
    }
}

/* Animations */
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-12px);
    }
}

@keyframes shine {
    from {
        transform: translateX(-100%) rotate(45deg);
    }

    to {
        transform: translateX(200%) rotate(45deg);
    }
}

.float-animation {
    animation: float 6s ease-in-out infinite;
}

.shine-effect {
    position: relative;
    overflow: hidden;
}

.shine-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: translateX(-100%) rotate(45deg);
    z-index: 10;
    pointer-events: none;
}

.group:hover .shine-effect::before {
    animation: shine 1.2s ease-out;
}

.card-3d {
    transform: translateZ(30px);
    transition: transform 0.6s ease, box-shadow 0.4s ease;
}

.card-3d:hover {
    transform: translateZ(50px) rotateX(5deg) rotateY(5deg);
}

/* Анимации мобильного меню */
.menu-enter-active,
.menu-leave-active {
    transition: opacity 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
}

.menu-enter-active .absolute.right-0,
.menu-leave-active .absolute.right-0 {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from .absolute.right-0,
.menu-leave-to .absolute.right-0 {
    transform: translateX(100%);
}

/* Анимации для элементов меню */
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideRight {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-down {
    animation: slideDown 0.5s ease forwards;
    opacity: 0;
}

.animate-slide-right {
    animation: slideRight 0.5s ease forwards;
    opacity: 0;
}

.animate-slide-up {
    animation: slideUp 0.5s ease forwards;
    opacity: 0;
}

/* Удалены стили скролла из компонента - они теперь глобальные */
</style>

<script setup>
const cookiesAccepted = ref(false)

onMounted(() => {
    // Проверяем, есть ли сохранённое согласие
    const accepted = localStorage.getItem('cookiesAccepted')
    if (accepted === 'true') {
        cookiesAccepted.value = true
    }
})

const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    cookiesAccepted.value = true
}

import { ref, onMounted, onUnmounted } from 'vue'
import AboutLyceum from '~/components/AboutLyceum.vue'

// Refs
const isScrolling = ref(false)
const showHeader = ref(false)
const mobileMenuOpen = ref(false)
const headerThreshold = 100

// Функция прокрутки к последней секции
const scrollToBottom = () => {
    const sections = document.querySelectorAll('.landing-section')
    const lastSection = sections[sections.length - 1]

    if (lastSection) {
        isScrolling.value = true
        lastSection.scrollIntoView({ behavior: 'smooth', block: 'end' })

        setTimeout(() => {
            isScrolling.value = false
        }, 1200)
    }
}

// Toggle mobile menu
const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
    if (mobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
}

const closeMobileMenu = () => {
    mobileMenuOpen.value = false
    document.body.style.overflow = ''
}

// Update header visibility
const updateHeader = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    showHeader.value = scrollTop > headerThreshold
}

// Text reveal on scroll
onMounted(() => {
    document.querySelectorAll('.text-reveal-delay').forEach(el => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(20px)'
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    })

    const observerOptions = { threshold: 0.3 }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.text-reveal-delay')
                elements.forEach(el => {
                    const delay = parseInt(el.dataset.delay) || 0
                    setTimeout(() => {
                        el.style.opacity = '1'
                        el.style.transform = 'translateY(0)'
                    }, delay)
                })
            } else {
                const elements = entry.target.querySelectorAll('.text-reveal-delay')
                elements.forEach(el => {
                    el.style.opacity = '0'
                    el.style.transform = 'translateY(20px)'
                })
            }
        })
    }, observerOptions)

    document.querySelectorAll('.landing-section').forEach(section => {
        observer.observe(section)
    })

    window.addEventListener('scroll', updateHeader)
    updateHeader()
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateHeader)
    document.body.style.overflow = ''
})
</script>