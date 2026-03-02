<!-- pages/profile/[id].vue -->
<template>
    <div class="min-h-screen bg-black text-white">
        <!-- Хедер такой же как на форуме -->
        <header class="border-b border-white/10 bg-black/95 backdrop-blur sticky top-0 z-50">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <!-- Логотип -->
                    <div class="text-2xl font-bold tracking-tighter">
                        <span class="text-white">ЛИЦЕЙСКИЙ</span>
                        <span class="text-white/60">ФОРУМ</span>
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

        <main class="container mx-auto px-4 py-8">
            <!-- Шапка профиля -->
            <div class="relative mb-12">
                <!-- Обложка -->
                <div
                    class="h-48 md:h-64 rounded-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 border border-white/10 mb-16">
                </div>

                <!-- Аватар и основная информация -->
                <div class="absolute -bottom-12 left-8 flex items-end gap-6">
                    <div
                        class="w-32 h-32 rounded-full border-4 border-black bg-gradient-to-br from-white/30 to-white/10">
                    </div>
                    <div class="mb-2">
                        <h1 class="text-3xl font-bold">cyber_punk</h1>
                        <div class="flex items-center gap-2 text-white/60">
                            <span>Подписчиков: 1.2K</span>
                            <span class="w-1 h-1 rounded-full bg-white/60"></span>
                            <span>Подписок: 342</span>
                        </div>
                    </div>
                </div>

                <!-- Кнопка редактирования/подписки -->
                <div class="absolute right-0 bottom-0">
                    <button
                        class="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors">
                        РЕДАКТИРОВАТЬ
                    </button>
                </div>
            </div>

            <!-- Статистика -->
            <div class="grid grid-cols-4 gap-4 mb-8">
                <div
                    class="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold">156</div>
                    <div class="text-white/40 text-sm">Постов</div>
                </div>
                <div
                    class="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold">2.3K</div>
                    <div class="text-white/40 text-sm">Лайков</div>
                </div>
                <div
                    class="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold">89</div>
                    <div class="text-white/40 text-sm">Комментариев</div>
                </div>
                <div
                    class="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-lg p-4 text-center">
                    <div class="text-2xl font-bold">45.6K</div>
                    <div class="text-white/40 text-sm">Просмотров</div>
                </div>
            </div>

            <!-- Табы -->
            <div class="flex gap-6 border-b border-white/10 mb-6">
                <button class="pb-2 px-1 text-white border-b-2 border-white font-medium">Посты</button>
                <button class="pb-2 px-1 text-white/60 hover:text-white transition-colors">Комментарии</button>
                <button class="pb-2 px-1 text-white/60 hover:text-white transition-colors">Медиа</button>
                <button class="pb-2 px-1 text-white/60 hover:text-white transition-colors">О себе</button>
            </div>

            <!-- Сетка постов пользователя (уменьшенные карточки) -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Пост пользователя -->
                <article
                    class="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-lg p-4 hover:border-white/30 transition-all">
                    <h3 class="font-medium mb-2">Новый проект в работе</h3>
                    <p class="text-white/60 text-sm mb-3 line-clamp-2">
                        Работаю над новым дизайном, делюсь процессом...
                    </p>
                    <div class="flex items-center justify-between text-sm">
                        <div class="flex items-center gap-3">
                            <span class="flex items-center gap-1 text-white/40">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                45
                            </span>
                            <span class="flex items-center gap-1 text-white/40">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                12
                            </span>
                        </div>
                        <span class="text-white/40 text-xs">2 дня назад</span>
                    </div>
                </article>
            </div>
        </main>
    </div>
</template>