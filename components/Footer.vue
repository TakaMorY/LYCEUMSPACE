<!-- components/Footer.vue -->
<script setup lang="ts">
defineProps<{
    showIlluminati?: boolean;
}>();

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="bg-black text-white border-t border-white/10 pt-12 pb-6 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <!-- Основная сетка футера -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 lg:gap-8 mb-8">

                <!-- Колонка с логотипом и описанием -->
                <div class="md:col-span-1 space-y-3">
                    <NuxtLink to="/" class="text-xl font-bold tracking-tight inline-block">
                        <span class="text-white">ЛИЦЕЙСКОЕ</span>
                        <span class="text-white/40">ПРОСТРАНСТВО</span>
                    </NuxtLink>
                    <p class="text-white/40 text-xs leading-relaxed max-w-xs">
                        Некоммерческое образовательное сообщество учеников МАОУ Лицей "Технический". Общение, обмен
                        знаниями и поддержка.
                    </p>
                    <!-- Иконка иллюминатов (только если showIlluminati) -->
                    <div v-if="showIlluminati" class="flex items-center gap-2 text-white/20 text-xs">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                            <path d="M12 2 L22 20 L2 20 Z" />
                            <circle cx="12" cy="10" r="3" fill="currentColor" stroke="currentColor"
                                stroke-width="0.5" />
                            <circle cx="12" cy="10" r="1.5" fill="black" />
                        </svg>
                        <span>Одобренно овермидами</span>
                    </div>
                </div>

                <!-- Колонка ссылок: навигация -->
                <div class="md:col-span-1">
                    <h3 class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Навигация</h3>
                    <ul class="space-y-2">
                        <li>
                            <NuxtLink to="/" class="text-white/40 hover:text-white transition-colors text-sm">Главная
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forum" class="text-white/40 hover:text-white transition-colors text-sm">Форум
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/privacy" class="text-white/40 hover:text-white transition-colors text-sm">
                                Политика конфиденциальности</NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Колонка ссылок: проекты и помощь -->
                <div class="md:col-span-1">
                    <h3 class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Поддержка</h3>
                    <ul class="space-y-2">
                        <li>
                            <a href="https://github.com/TakaMorY/LYCEUMSPACE" target="_blank" rel="noopener noreferrer"
                                class="text-white/40 hover:text-white transition-colors text-sm inline-flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.294 2.75-1.025 2.75-1.025.545 1.376.201 2.393.099 2.646.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://t.me/lyceum_space" target="_blank" rel="noopener noreferrer"
                                class="text-white/40 hover:text-white transition-colors text-sm inline-flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.53 3.65-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.27-.48.74-.74 2.94-1.28 4.9-2.12 5.87-2.53 2.8-1.16 3.38-1.36 3.76-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06-.01.15-.02.23z" />
                                </svg>
                                Telegram-канал
                            </a>
                        </li>
                        <li>
                            <a href="https://messenger.online.sberbank.ru/sl/qD6gSe0WFQUOhgpdr" target="_blank"
                                rel="noopener noreferrer"
                                class="text-white/40 hover:text-white transition-colors text-sm inline-flex items-center gap-1.5">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Поддержать проект
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Колонка для тайных ссылок (иллюминаты + новые пасхалки) -->
                <div class="md:col-span-1">
                    <h3 class="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Секретно</h3>
                    <ul class="space-y-2">
                        <!-- Ссылка на страницу иллюминатов (всегда полупрозрачна, при show становится ярче) -->
                        <li>
                            <NuxtLink to="/illuminati"
                                :class="['text-xs transition-opacity duration-300 inline-flex items-center gap-1.5', showIlluminati ? 'text-white/80' : 'text-white/30']">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.5">
                                    <path d="M12 2 L22 20 L2 20 Z" />
                                    <circle cx="12" cy="10" r="2" fill="currentColor" />
                                </svg>
                                Об Овемридах
                            </NuxtLink>
                        </li>
                        <!-- Дополнительные скрытые элементы -->
                        <li v-if="showIlluminati" class="text-white/20 text-[10px]">@illuminati_intern</li>
                        <li v-if="showIlluminati" class="text-white/20 text-[10px]">42</li>
                        <li v-if="showIlluminati" class="text-white/20 text-[10px]">Ходит слух, что в Кодексе есть
                            информация об происшествии на уроке Астрономии, связанная с Ярмаком</li>
                        <li v-if="showIlluminati" class="text-white/20 text-[10px]">Заяц указывает на паблик лицея</li>
                        <li v-else class="text-white/20 text-xs italic">???</li>
                    </ul>
                </div>
            </div>

            <!-- Нижняя часть с копирайтом -->
            <div class="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div class="text-white/40 text-xs text-center sm:text-left">
                    © {{ currentYear }} ЛИЦЕЙСКОЕПРОСТРАНСТВО. Все права защищены.
                    <span v-if="showIlluminati" class="block sm:inline sm:ml-2 text-white/20">• Одобренно </span>
                </div>
                <div class="flex flex-wrap justify-center gap-4 text-xs">
                    <NuxtLink to="/policy" class="text-white/40 hover:text-white transition-colors">Политика
                        конфиденциальности</NuxtLink>
                    <NuxtLink to="/" class="text-white/40 hover:text-white transition-colors">Главная</NuxtLink>

                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
html {
    scroll-behavior: smooth;
}
</style>