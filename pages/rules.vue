<template>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <!-- Карточка с правилами -->
        <div
            class="relative group bg-neutral-900/40 backdrop-blur-xl rounded-3xl border border-neutral-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
            <!-- Неоновая подсветка при наведении (как на странице входа) -->
            <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div
                    class="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl">
                </div>
                <div
                    class="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-2xl">
                </div>
            </div>

            <div class="relative p-6 sm:p-8">
                <h1 class="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                    <svg class="w-6 h-6 sm:w-7 sm:h-7 text-neutral-400" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Правила форума «ЛИЦЕЙСКОЕ ПРОСТРАНСТВО»
                </h1>

                <p class="text-white/70 text-sm sm:text-base mb-6 leading-relaxed">
                    Добро пожаловать в наше сообщество! Чтобы поддерживать дружелюбную и продуктивную атмосферу,
                    пожалуйста, соблюдайте следующие правила:
                </p>

                <div class="space-y-4 text-white/80">
                    <div class="flex items-start gap-3">
                        <span class="text-neutral-400 font-bold text-lg">1.</span>
                        <p><span class="font-semibold text-white">Уважение к другим:</span> Запрещены оскорбления,
                            травля, дискриминация и любые формы агрессии.</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-neutral-400 font-bold text-lg">2.</span>
                        <p><span class="font-semibold text-white">Конструктивность:</span> Старайтесь писать по делу,
                            аргументировать свою позицию, избегать флуда.</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-neutral-400 font-bold text-lg">3.</span>
                        <p><span class="font-semibold text-white">Запрет спама:</span> Не публикуйте рекламу, ссылки на
                            сторонние ресурсы без согласования, повторяющиеся сообщения.</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-neutral-400 font-bold text-lg">4.</span>
                        <p><span class="font-semibold text-white">Авторские права:</span> Уважайте чужой труд – не
                            копируйте контент без указания источника.</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-neutral-400 font-bold text-lg">5.</span>
                        <p><span class="font-semibold text-white">Безопасность:</span> Не публикуйте личную информацию –
                            ни свою, ни чужую.</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-neutral-400 font-bold text-lg">6.</span>
                        <p><span class="font-semibold text-white">Контент 18+:</span> Запрещён любой контент для
                            взрослых или материалы, нарушающие законодательство РФ.</p>
                    </div>
                    <div class="flex items-start gap-3">
                        <span class="text-neutral-400 font-bold text-lg">7.</span>
                        <p><span class="font-semibold text-white">Модерация:</span> Администрация оставляет за собой
                            право удалять сообщения и блокировать пользователей за нарушение правил.</p>
                    </div>
                </div>

                <div
                    class="mt-8 p-4 bg-neutral-800/40 backdrop-blur-sm rounded-xl border border-neutral-700/30 text-sm text-neutral-300">
                    <p class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Последнее обновление: 10 марта 2026 г.
                    </p>
                </div>

                <!-- Кнопка возврата на форум -->
                <div class="mt-8 text-center">
                    <NuxtLink to="/forum"
                        class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-neutral-700 to-neutral-600 hover:from-neutral-600 hover:to-neutral-500 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-lg">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 12h18M9 5l-7 7 7 7" />
                        </svg>
                        Вернуться на форум
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })
</script>