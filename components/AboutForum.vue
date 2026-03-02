<template>
    <section class="relative py-32 overflow-hidden bg-neutral-900">
        <!-- Фоновый эффект -->
        <div class="absolute inset-0 bg-neutral-900">
            <div
                class="absolute top-20 right-20 w-96 h-96 bg-neutral-700/20 rounded-full filter blur-[128px] animate-pulse">
            </div>
            <div
                class="absolute bottom-20 left-20 w-96 h-96 bg-neutral-800/20 rounded-full filter blur-[128px] animate-pulse delay-1000">
            </div>
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-600/10 rounded-full filter blur-[128px]">
            </div>
        </div>

        <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Заголовок секции -->
            <div class="text-center mb-20 reveal">
                <span class="text-neutral-400 text-sm font-mono tracking-[0.3em] block mb-4">ЛИЦЕЙ</span>
                <h2 class="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-none">
                    <span
                        class="bg-gradient-to-r from-white via-white to-neutral-500 bg-clip-text text-transparent block">ФОРУМ</span>
                    <span class="text-neutral-700 text-3xl sm:text-4xl md:text-5xl block mt-2">ОБЩЕНИЕ • ВОПРОСЫ •
                        ОТВЕТЫ</span>
                </h2>
            </div>

            <!-- Главный посыл -->
            <div class="max-w-5xl mx-auto mb-32">
                <div class="relative">
                    <!-- Декоративный элемент -->
                    <div class="absolute -top-8 left-0 w-20 h-20 border-l-2 border-t-2 border-neutral-700"></div>
                    <div class="absolute -bottom-8 right-0 w-20 h-20 border-r-2 border-b-2 border-neutral-700"></div>

                    <div class="text-center px-8 py-16">
                        <p class="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-200 leading-relaxed">
                            Пространство, где
                            <span class="font-bold text-white relative inline-block mx-2">
                                ученики
                                <span class="absolute -bottom-2 left-0 w-full h-0.5 bg-neutral-600"></span>
                            </span>
                            могут
                            <span class="font-bold text-white">общаться</span>,
                            <br class="hidden sm:block" />
                            задавать вопросы по
                            <span class="font-bold text-white">учебе</span>
                            и получать
                            <span class="font-bold text-white">ответы</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Альтернативный дизайн для блока преимуществ - модный минимализм -->
            <div class="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-32">
                <!-- Общение - стеклянный эффект -->
                <div class="group relative">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-neutral-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl">
                    </div>
                    <div
                        class="relative p-10 bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 rounded-2xl h-full overflow-hidden">
                        <!-- Декоративный элемент -->
                        <div
                            class="absolute top-0 right-0 w-32 h-32 bg-neutral-800/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700">
                        </div>

                        <div class="relative">
                            <div class="flex items-center justify-between mb-8">
                                <span
                                    class="text-5xl font-light text-white/20 group-hover:text-white/30 transition-colors">01</span>
                                <div
                                    class="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-neutral-500 transition-all">
                                    <svg class="w-5 h-5 text-neutral-400 group-hover:text-neutral-300 transition-colors"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                            </div>

                            <h3 class="text-3xl font-light text-white mb-3 tracking-tight">Живое<br>общение</h3>
                            <p class="text-neutral-500 text-sm leading-relaxed mb-6">
                                Обсуждайте школьные темы, делитесь мнениями
                            </p>

                            <div class="flex flex-wrap gap-2">
                                <span
                                    class="text-[10px] uppercase tracking-wider text-neutral-600 border border-neutral-800 px-3 py-1 rounded-full">чат</span>
                                <span
                                    class="text-[10px] uppercase tracking-wider text-neutral-600 border border-neutral-800 px-3 py-1 rounded-full">дискуссии</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Вопросы по учебе - градиентный -->
                <div class="group relative">
                    <div
                        class="relative p-10 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl h-full border border-neutral-700 overflow-hidden">
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-neutral-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        </div>

                        <div class="relative">
                            <div class="mb-8">
                                <span class="text-neutral-400 text-sm font-mono block mb-2">/02</span>
                                <div class="w-16 h-0.5 bg-neutral-700 group-hover:w-24 transition-all duration-500">
                                </div>
                            </div>

                            <h3 class="text-3xl font-medium text-white mb-4">Вопросы<br>по учебе</h3>
                            <p class="text-neutral-400 text-sm leading-relaxed mb-8">
                                По предметам, домашним заданиям<br>и сложным темам
                            </p>

                            <div class="flex items-center gap-3 text-xs">
                                <span class="text-neutral-500">ПОМОЩЬ</span>
                                <span class="w-1 h-1 rounded-full bg-neutral-600"></span>
                                <span class="text-neutral-500">КОНСУЛЬТАЦИИ</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ответы - с акцентной линией -->
                <div class="group relative">
                    <div class="relative p-10 bg-neutral-900 rounded-2xl h-full border border-neutral-800">
                        <!-- Акцентная линия слева -->
                        <div
                            class="absolute left-0 top-10 bottom-10 w-0.5 bg-gradient-to-b from-neutral-700 via-neutral-600 to-neutral-700 opacity-50 group-hover:opacity-100 transition-opacity">
                        </div>

                        <div class="relative pl-6">
                            <span
                                class="text-6xl font-thin text-neutral-700 block mb-6 group-hover:text-neutral-600 transition-colors">→</span>

                            <h3 class="text-3xl font-light text-white mb-4 tracking-tight">Быстрые<br>ответы</h3>
                            <p class="text-neutral-500 text-sm leading-relaxed mb-8">
                                От старшеклассников и учителей
                            </p>

                            <div class="space-y-2">
                                <div class="flex items-center gap-3">
                                    <span class="w-2 h-2 bg-neutral-700 rounded-full"></span>
                                    <span class="text-xs text-neutral-400">РЕШЕНИЯ</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="w-2 h-2 bg-neutral-700 rounded-full"></span>
                                    <span class="text-xs text-neutral-400">ОБЪЯСНЕНИЯ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Альтернативный дизайн для статистики - типографический -->
            <div class="max-w-5xl mx-auto mb-32">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div class="text-center group">
                        <div
                            class="text-6xl md:text-7xl font-black text-white mb-2 tracking-tighter group-hover:scale-105 transition-transform">
                            150</div>
                        <div class="text-neutral-600 text-xs font-mono tracking-widest">УЧАСТНИКОВ</div>
                        <div class="text-4xl font-thin text-neutral-800 mt-2">+</div>
                    </div>
                    <div class="text-center group">
                        <div
                            class="text-6xl md:text-7xl font-black text-white mb-2 tracking-tighter group-hover:scale-105 transition-transform">
                            1K</div>
                        <div class="text-neutral-600 text-xs font-mono tracking-widest">СООБЩЕНИЙ</div>
                        <div class="text-4xl font-thin text-neutral-800 mt-2">+</div>
                    </div>
                    <div class="text-center group">
                        <div
                            class="text-6xl md:text-7xl font-black text-white mb-2 tracking-tighter group-hover:scale-105 transition-transform">
                            24</div>
                        <div class="text-neutral-600 text-xs font-mono tracking-widest">ДОСТУП</div>
                        <div class="text-2xl font-thin text-neutral-700 mt-2">/7</div>
                    </div>
                    <div class="text-center group">
                        <div
                            class="text-6xl md:text-7xl font-black text-white mb-2 tracking-tighter group-hover:scale-105 transition-transform">
                            100
                        </div>
                        <div class="text-neutral-600 text-xs font-mono tracking-widest">БЕСПЛАТНО</div>
                        <div class="text-3xl font-thin text-neutral-700 mt-2">%</div>

                    </div>
                </div>
            </div>

            <div class="max-w-6xl mx-auto mb-32">
                <div class="text-center mb-16">
                    <span class="text-neutral-500 text-xs font-mono tracking-[0.3em] block mb-4">/
                        ОБСУЖДЕНИЯ</span>
                    <h3 class="text-5xl md:text-6xl font-black text-white tracking-tight">
                        <span
                            class="bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">Актуальные</span>
                        <span class="block text-3xl md:text-4xl font-light text-neutral-400 mt-2">темы</span>
                    </h3>
                </div>

                <!-- Вертикальный список с превью -->
                <div class="space-y-3">
                    <!-- Тема 1 - с акцентной полосой -->
                    <div
                        class="group relative flex items-center justify-between p-6 bg-neutral-900/20 border-l-4 border-neutral-700 hover:border-white transition-all duration-300 hover:bg-neutral-900/40">
                        <div class="flex items-center gap-8">
                            <span class="text-4xl opacity-60 group-hover:opacity-100 transition-opacity"></span>
                            <div>
                                <h4 class="text-xl font-medium text-white mb-1">Подготовка к ЕГЭ</h4>
                                <p class="text-neutral-500 text-sm">Советы и материалы для экзаменов</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-6">
                            <span class="text-sm text-neutral-600 font-mono bg-neutral-800/50 px-4 py-2 rounded-full">24
                                ответа</span>
                            <span
                                class="text-2xl text-neutral-600 group-hover:text-white group-hover:translate-x-2 transition-all">→</span>
                        </div>
                    </div>

                    <!-- Тема 2 - с градиентным фоном при ховере -->
                    <div
                        class="group relative flex items-center justify-between p-6 bg-neutral-900/20 rounded-2xl hover:bg-gradient-to-r hover:from-neutral-800/50 hover:to-neutral-900/20 transition-all duration-500">
                        <div class="flex items-center gap-8">
                            <span class="text-4xl opacity-60 group-hover:opacity-100 transition-opacity"></span>
                            <div>
                                <h4 class="text-xl font-medium text-white mb-1">Сложная задача по физике</h4>
                                <p class="text-neutral-500 text-sm">Помогите решить олимпиадную задачу</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-6">
                            <span
                                class="text-sm text-neutral-600 font-mono border border-neutral-800 px-4 py-2 rounded-full group-hover:border-neutral-600 transition-colors">12
                                ответов</span>
                            <span class="text-2xl text-neutral-600 group-hover:text-white transition-colors">→</span>
                        </div>
                    </div>

                    <!-- Тема 3 - с боковой линией -->
                    <div class="group relative flex items-center justify-between p-6 bg-neutral-900/20 overflow-hidden">
                        <div
                            class="absolute left-0 top-0 bottom-0 w-1 bg-neutral-700 group-hover:w-2 group-hover:bg-white transition-all duration-300">
                        </div>
                        <div class="flex items-center gap-8 pl-4">
                            <span class="text-4xl opacity-60 group-hover:opacity-100 transition-opacity"></span>
                            <div>
                                <h4 class="text-xl font-medium text-white mb-1">Книги по истории</h4>
                                <p class="text-neutral-500 text-sm">Что почитать для углубленного изучения</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-6">
                            <span class="text-sm text-neutral-600 font-mono">8 ответов</span>
                            <div
                                class="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-neutral-500 group-hover:border-neutral-600 transition-colors">
                                <span class="text-xl text-neutral-600 group-hover:text-white">→</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Кнопка "Все темы" -->
                <div class="text-center mt-12">
                    <button
                        class="group inline-flex items-center gap-3 px-8 py-4 border border-neutral-800 rounded-full hover:border-neutral-600 transition-all duration-300">
                        <span class="text-neutral-400 text-sm font-mono tracking-wider group-hover:text-white">ВСЕ
                            ОБСУЖДЕНИЯ</span>
                        <span
                            class="text-xl text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
                    </button>
                </div>
            </div>

            <!-- Призыв к действию -->
            <div class="relative max-w-4xl mx-auto text-center">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 rounded-3xl blur-2xl">
                </div>
                <div
                    class="relative p-12 md:p-16 border border-neutral-700 rounded-3xl bg-neutral-900/80 backdrop-blur-sm">
                    <span class="text-neutral-400 text-sm font-mono tracking-wider block mb-4">ПРИСОЕДИНИТЬСЯ
                        СЕЙЧАС</span>
                    <h3 class="text-4xl md:text-5xl font-bold text-white mb-6">Стань частью сообщества</h3>
                    <p class="text-neutral-300 text-xl max-w-2xl mx-auto mb-8">
                        Присоединяйся к обсуждениям, задавай вопросы и помогай другим
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            class="px-8 py-4 bg-white text-neutral-900 rounded-xl font-medium text-lg hover:bg-neutral-200 transition-all duration-300 hover:scale-105">
                            Присоединиться
                        </button>
                        <button
                            class="px-8 py-4 border border-neutral-700 text-neutral-300 rounded-xl font-medium text-lg hover:bg-neutral-800 transition-all duration-300">
                            Узнать больше
                        </button>
                    </div>
                </div>
            </div>

            <!-- Нижний слоган -->
            <div class="text-center mt-24">
                <p class="text-neutral-700 text-sm font-mono tracking-[0.3em]">
                    ЛИЦЕЙСКОЕПРОСТРАНСТВО • ФОРУМ • 2026
                </p>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes reveal {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.reveal {
    animation: reveal 1s ease-out forwards;
}

.delay-1000 {
    animation-delay: 1s;
}

.group:hover .group-hover\:w-12 {
    width: 3rem;
}

@media (max-width: 640px) {
    h2 .text-6xl {
        font-size: 3rem;
    }
}
</style>