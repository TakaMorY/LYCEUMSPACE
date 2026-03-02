<!-- components/MobileLayout.vue -->
<template>
    <div class="min-h-screen bg-black text-white md:hidden">
        <!-- Мобильный хедер -->
        <header class="border-b border-white/10 bg-black/95 backdrop-blur sticky top-0 z-50">
            <div class="px-4 py-3">
                <div class="flex items-center justify-between">
                    <button class="p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <span class="text-lg font-bold tracking-tighter">BLACK/FORUM</span>

                    <button class="p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>
                </div>

                <!-- Мобильный поиск -->
                <div class="mt-3">
                    <div class="relative">
                        <input type="text" placeholder="Поиск..."
                            class="w-full bg-black border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white">
                    </div>
                </div>
            </div>
        </header>

        <main class="pb-20">
            <!-- Лента для мобильных -->
            <div class="divide-y divide-white/10">
                <!-- Мобильный пост -->
                <article class="p-4">
                    <!-- Автор -->
                    <div class="flex items-center gap-2 mb-3">
                        <div
                            class="w-10 h-10 rounded-full border border-white/30 bg-gradient-to-br from-white/20 to-white/5">
                        </div>
                        <div>
                            <div class="font-medium text-sm">cyber_punk</div>
                            <div class="text-white/40 text-xs">2 часа назад</div>
                        </div>
                    </div>

                    <!-- Контент -->
                    <h3 class="font-medium mb-1">Обновление дизайна</h3>
                    <p class="text-white/70 text-sm mb-3">
                        Полностью переработал мобильную версию форума. Стало гораздо удобнее...
                    </p>

                    <!-- Медиа (опционально) -->
                    <div
                        class="bg-gradient-to-br from-white/5 to-white/10 rounded-lg h-48 mb-3 flex items-center justify-center border border-white/10">
                        <svg class="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <!-- Действия (мобильные) -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <button class="flex items-center gap-1.5">
                                <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span class="text-sm text-white/60">24</span>
                            </button>

                            <button class="flex items-center gap-1.5">
                                <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span class="text-sm text-white/60">8</span>
                            </button>

                            <button>
                                <svg class="w-5 h-5 text-white/60" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </button>
                        </div>

                        <div class="flex items-center gap-1 text-white/40 text-xs">
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
            </div>
        </main>

        <!-- Мобильная навигация (bottom bar) -->
        <nav class="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 py-2 px-4">
            <div class="flex justify-around">
                <button class="flex flex-col items-center p-2 text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span class="text-xs mt-1">Главная</span>
                </button>

                <button class="flex flex-col items-center p-2 text-white/60">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span class="text-xs mt-1">Поиск</span>
                </button>

                <button class="flex flex-col items-center p-2 text-white/60">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span class="text-xs mt-1">Профиль</span>
                </button>
            </div>
        </nav>
    </div>
</template>