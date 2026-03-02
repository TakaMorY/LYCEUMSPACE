<!-- pages/forum/index.vue -->
<template>
    <div class="min-h-screen bg-black text-white">
        <!-- Хедер -->
        <header class="border-b border-white/10 bg-black/95 backdrop-blur sticky top-0 z-50">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Логотип -->
                    <div class="flex items-center gap-3">
                        <img src="/images/logo/logotip.png" alt="Logo" class="h-10 w-auto" />
                        <div class="text-2xl font-bold tracking-tighter">

                            <span class="text-white">ЛИЦЕЙСКИЙ</span>
                            <span class="text-white/60">ФОРУМ</span>
                        </div>
                    </div>
                    <!-- Поиск -->
                    <div class="hidden md:block flex-1 max-w-md mx-8">
                        <div class="relative">
                            <input type="text" placeholder="Поиск по форуму..."
                                class="w-full bg-black border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors">
                            <svg class="absolute right-3 top-2.5 w-5 h-5 text-white/40" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Иконки пользователя -->
                    <div class="flex items-center gap-4">
                        <button class="relative">
                            <svg class="w-6 h-6 text-white/70 hover:text-white transition-colors" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span
                                class="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-xs rounded-full flex items-center justify-center">3</span>
                        </button>
                        <div
                            class="w-10 h-10 rounded-full border-2 border-white/30 bg-gradient-to-br from-white/20 to-white/5">
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Основной контент -->
        <main class="container mx-auto px-4 py-8">
            <!-- Заголовок и кнопка создания поста -->
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-light tracking-wider">ЛЕНТА <span class="text-white/40">/ СООБЩЕСТВО</span>
                </h1>
                <button
                    class="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                    + НОВЫЙ ПОСТ
                </button>
            </div>

            <!-- Сетка постов -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Пост 1 -->
                <article
                    class="group bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
                    <!-- Шапка поста (автор) -->
                    <div class="flex items-center gap-3 mb-4">
                        <div
                            class="w-12 h-12 rounded-full border-2 border-white/30 bg-gradient-to-br from-white/20 to-white/5">
                        </div>
                        <div>
                            <div class="font-medium hover:text-white/80 cursor-pointer transition-colors">cyber_punk
                            </div>
                            <div class="text-white/40 text-sm">2 часа назад</div>
                        </div>
                    </div>

                    <!-- Контент поста -->
                    <h2 class="text-xl font-medium mb-2">Новый дизайн для форума</h2>
                    <p class="text-white/70 mb-4 line-clamp-3">
                        Решил полностью переработать дизайн форума в черно-белой стилистике.
                        Что думаете насчет такого минимализма? Интересно ваше мнение...
                    </p>

                    <!-- Медиа (опционально) -->
                    <div
                        class="bg-gradient-to-br from-white/5 to-white/10 rounded-lg h-32 mb-4 flex items-center justify-center border border-white/10">
                        <svg class="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <!-- Метрики и действия -->
                    <div class="flex items-center justify-between pt-4 border-t border-white/10">
                        <div class="flex items-center gap-4">
                            <!-- Лайки -->
                            <button
                                class="flex items-center gap-1 text-white/60 hover:text-white transition-colors group">
                                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span class="text-sm">24</span>
                            </button>

                            <!-- Комментарии -->
                            <button class="flex items-center gap-1 text-white/60 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span class="text-sm">8</span>
                            </button>

                            <!-- Репост -->
                            <button class="text-white/60 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                        </div>

                        <!-- Просмотры -->
                        <div class="flex items-center gap-1 text-white/40 text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>1.2K</span>
                        </div>
                    </div>
                </article>

                <!-- Пост 2 -->
                <article
                    class="group bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300">
                    <div class="flex items-center gap-3 mb-4">
                        <div
                            class="w-12 h-12 rounded-full border-2 border-white/30 bg-gradient-to-br from-white/20 to-white/5">
                        </div>
                        <div>
                            <div class="font-medium hover:text-white/80 cursor-pointer transition-colors">dark_angel
                            </div>
                            <div class="text-white/40 text-sm">5 часов назад</div>
                        </div>
                    </div>
                    <h2 class="text-xl font-medium mb-2">Минимализм в веб-дизайне</h2>
                    <p class="text-white/70 mb-6 line-clamp-3">
                        Черный цвет - это не скучно, это элегантно. Показываю свои работы в темной теме...
                    </p>
                    <div class="flex items-center justify-between pt-4 border-t border-white/10">
                        <div class="flex items-center gap-4">
                            <button
                                class="flex items-center gap-1 text-white/60 hover:text-white transition-colors group">
                                <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span class="text-sm">56</span>
                            </button>
                            <button class="flex items-center gap-1 text-white/60 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span class="text-sm">12</span>
                            </button>
                            <button class="text-white/60 hover:text-white transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                        </div>
                        <div class="flex items-center gap-1 text-white/40 text-sm">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>856</span>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    </div>
    <Footer />
</template>




<script setup>
import Footer from '~/components/Footer.vue';
</script>
