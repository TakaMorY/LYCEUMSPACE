<template>
    <section class="relative py-32 overflow-hidden bg-neutral-950">
        <!-- Фоновый эффект с нейтральными тонами -->
        <div class="absolute inset-0 bg-neutral-950">
            <div
                class="absolute top-0 -left-40 w-80 h-80 bg-neutral-600/20 rounded-full filter blur-[128px] animate-pulse">
            </div>
            <div
                class="absolute bottom-0 -right-40 w-80 h-80 bg-neutral-700/20 rounded-full filter blur-[128px] animate-pulse delay-1000">
            </div>
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neutral-800/10 rounded-full filter blur-[128px]">
            </div>
        </div>

        <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Заголовок с эффектом появления -->
            <div class="text-center mb-20 reveal">
                <span class="text-neutral-400 text-sm font-mono tracking-[0.3em] block mb-4">ABOUT</span>
                <h2 class="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter leading-none">
                    <span
                        class="bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent block">О
                        ЛИЦЕЕ</span>
                    <span
                        class="text-neutral-800 text-4xl sm:text-5xl md:text-6xl block -mt-4 sm:-mt-6">ТЕХНИЧЕСКИЙ</span>
                </h2>
            </div>

            <!-- Главный акцент - уникальность -->
            <div class="max-w-5xl mx-auto mb-24">
                <div class="relative">
                    <!-- Декоративная линия -->
                    <div class="absolute left-0 top-0 w-32 h-[2px] bg-gradient-to-r from-neutral-400 to-transparent">
                    </div>

                    <p class="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-300 leading-relaxed pt-12">
                        Единственное в городе Владивостоке и Приморском крае
                        <span class="font-bold text-white relative inline-block">
                            образовательное учреждение
                            <span class="absolute -bottom-2 left-0 w-full h-[2px] bg-neutral-600"></span>
                        </span>
                        <br class="hidden sm:block" />где учатся
                        <span
                            class="text-5xl sm:text-6xl md:text-7xl font-black text-white block sm:inline-block mx-2">ТОЛЬКО</span>
                        мальчики
                    </p>
                </div>
            </div>

            <!-- Сетка с преимуществами -->
            <div class="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-24">
                <!-- Педагоги -->
                <div
                    class="group relative p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl hover:bg-neutral-800/50 transition-all duration-500 overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-neutral-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative">
                        <div
                            class="w-16 h-16 mb-6 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors duration-500">
                            <span class="text-3xl text-neutral-300"><img src="/images/AboutLyceum/graduate.png"
                                    class="h-12" alt=""></span>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-3">Педагогический состав</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed">Высокопрофессиональный коллектив, где каждый
                            учитель — мастер своего дела</p>
                        <div class="mt-6 flex items-center gap-2 text-neutral-500">
                            <span
                                class="w-8 h-[2px] bg-neutral-700 group-hover:bg-neutral-500 group-hover:w-12 transition-all"></span>
                            <span class="text-sm font-mono">Опытный коллектив</span>
                        </div>
                    </div>
                </div>

                <!-- Оборудование -->
                <div
                    class="group relative p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl hover:bg-neutral-800/50 transition-all duration-500 overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-neutral-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative">
                        <div
                            class="w-16 h-16 mb-6 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors duration-500">
                            <span class="text-3xl text-neutral-300"><img src="/images/AboutLyceum/internet.png"
                                    class="h-12" alt=""></span>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-3">Технологии</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed">Кабинеты оснащены современным оборудованием
                            для полного погружения в процесс</p>
                        <div class="mt-6 flex items-center gap-2 text-neutral-500">
                            <span
                                class="w-8 h-[2px] bg-neutral-700 group-hover:bg-neutral-500 group-hover:w-12 transition-all"></span>
                            <span class="text-sm font-mono">Оборудованные классы</span>
                        </div>
                    </div>
                </div>

                <!-- Творчество -->
                <div
                    class="group relative p-8 bg-neutral-900/50 border border-neutral-800 rounded-3xl hover:bg-neutral-800/50 transition-all duration-500 overflow-hidden">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-neutral-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div class="relative">
                        <div
                            class="w-16 h-16 mb-6 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors duration-500">
                            <span class="text-3xl text-neutral-300"><img src="/images/AboutLyceum/palitra.png"
                                    class="h-12" alt=""></span>
                        </div>
                        <h3 class="text-2xl font-bold text-white mb-3">Творческая свобода</h3>
                        <p class="text-neutral-400 text-lg leading-relaxed">Оптимальные условия для реализации
                            индивидуальных творческих запросов</p>
                        <div class="mt-6 flex items-center gap-2 text-neutral-500">
                            <span
                                class="w-8 h-[2px] bg-neutral-700 group-hover:bg-neutral-500 group-hover:w-12 transition-all"></span>
                            <span class="text-sm font-mono">Индивидуальный подход</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Блок с достижениями -->
            <div class="max-w-7xl mx-auto">
                <div class="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <!-- Левая колонка с наукой -->
                    <div class="space-y-8">
                        <div class="flex items-center gap-4">
                            <span class="text-neutral-500 text-4xl">🔬</span>
                            <span class="w-full h-[2px] bg-gradient-to-r from-neutral-700 to-transparent"></span>
                            <span class="text-neutral-500 text-4xl">⚡️</span>
                        </div>

                        <h3 class="text-4xl md:text-5xl font-light leading-tight text-white">
                            Научно-<br />
                            <span class="font-bold text-neutral-300">исследовательская</span>
                            <br />деятельность
                        </h3>

                        <p class="text-neutral-400 text-lg">
                            Овладение навыками научных исследований, участие в олимпиадах и конкурсах различных уровней
                        </p>

                        <!-- Статистика -->
                        <div class="flex gap-8 pt-4">
                            <div>
                                <div class="text-3xl font-bold text-white">100+</div>
                                <div class="text-neutral-500 text-sm">победителей</div>
                            </div>
                            <div>
                                <div class="text-3xl font-bold text-white">50+</div>
                                <div class="text-neutral-500 text-sm">олимпиад</div>
                            </div>
                        </div>
                    </div>

                    <!-- Правая колонка со спортом и событиями -->

                </div>

                <!-- Выпускники -->
                <div
                    class="relative p-12 md:p-16 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-neutral-800/20 rounded-full filter blur-3xl"></div>

                    <div class="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div class="text-8xl opacity-30 text-neutral-600"><img src="/images/AboutLyceum/graduate.png" class="h-24" alt=""></div>
                        <div>
                            <span class="text-neutral-500 text-sm font-mono tracking-wider">ДОСТИЖЕНИЯ</span>
                            <h4 class="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Выпускники лицея</h4>
                            <p class="text-neutral-400 text-xl leading-relaxed max-w-2xl">
                                Успешно проходят государственную итоговую аттестацию и поступают в лучшие вузы страны
                            </p>

                            <!-- Прогресс бар -->
                            <div class="mt-8 max-w-md">
                                <div class="flex justify-between text-sm text-neutral-500 mb-2">
                                    <span>Успеваемость</span>
                                    <span>99.99%</span>
                                </div>
                                <div class="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                                    <div
                                        class="w-full h-full bg-gradient-to-r from-neutral-400 to-neutral-600 animate-pulse">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

            <!-- Нижний слоган -->
            <div class="text-center mt-24">
                <p class="text-neutral-700 text-sm font-mono tracking-[0.3em]">
                    МАОУ ЛИЦЕЙ "ТЕХНИЧЕСКИЙ" • ВЛАДИВОСТОК • ПРИМОРСКИЙ КРАЙ
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

/* Эффекты при наведении */
.group:hover .group-hover\:w-12 {
    width: 3rem;
}

/* Адаптация для мобильных */
@media (max-width: 640px) {
    h2 .text-7xl {
        font-size: 3.5rem;
    }
}

/* Кастомные цвета нейтральной гаммы */
.bg-neutral-950 {
    background-color: #0a0a0a;
}
</style>