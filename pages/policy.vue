<!-- pages/privacy.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Footer from '~/components/Footer.vue';

const showIlluminati = ref(false);
const manualOverride = ref(false); // флаг, что пользователь управляет вручную

const toggleIlluminati = () => {
    showIlluminati.value = !showIlluminati.value;
    manualOverride.value = showIlluminati.value; // если включил вручную, запоминаем
};

// Таймер для периодического показа (каждые 10 сек на 2 сек)
let interval: ReturnType<typeof setInterval>;
onMounted(() => {
    interval = setInterval(() => {
        // Если пользователь не включил ручной режим, показываем пасхалки на 2 секунды
        if (!manualOverride.value) {
            showIlluminati.value = true;
            setTimeout(() => {
                // Если за это время пользователь не включил ручной режим, выключаем
                if (!manualOverride.value) {
                    showIlluminati.value = false;
                }
            }, 5000);
        }
    }, 10000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<template>
    <div class="min-h-screen bg-black text-white">
        <!-- Хедер форума -->
        <header class="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16 sm:h-20 lg:h-24">
                    <!-- Логотип -->
                    <NuxtLink to="/"
                        class="text-sm sm:text-base md:text-xl lg:text-2xl font-bold tracking-tighter max-w-[140px] xs:max-w-[180px] sm:max-w-none leading-tight">
                        <span class="text-white block xs:inline">ЛИЦЕЙСКОЕ</span>
                        <span class="text-white/40 block xs:inline xs:ml-1">ПРОСТРАНСТВО</span>
                    </NuxtLink>

                    <!-- Десктоп навигация -->
                    <nav class="hidden md:flex items-center gap-6 lg:gap-8">
                        <a href="/forum"
                            class="text-white/60 hover:text-white transition-colors text-sm lg:text-base">Форум</a>
                        <a href="/profile"
                            class="text-white/60 hover:text-white transition-colors text-sm lg:text-base">Профиль</a>
                        <a href="/privacy"
                            class="text-white border-b border-white pb-1 text-sm lg:text-base">Политика</a>
                    </nav>
                </div>
            </div>
        </header>

        <!-- Hero секция -->
        <div class="relative h-auto min-h-[40vh] sm:min-h-[45vh] lg:min-h-[50vh] overflow-hidden py-8 sm:py-0">
            <div class="absolute inset-0">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60"></div>
            </div>

            <div class="relative h-full container mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-8 sm:pb-12 lg:pb-16">
                <div class="w-full max-w-4xl">
                    <!-- Информация о некоммерческом статусе + кликабельная икона иллюминатов -->
                    <div
                        class="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 mb-2 sm:mb-3">
                        <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white/80 flex-shrink-0" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span class="text-white/80 text-[10px] sm:text-xs font-medium whitespace-nowrap">Образовательный
                            проект • Некоммерческий</span>
                        <!-- Кликабельная икона иллюминатов (пирамида с глазом) -->
                        <button @click="toggleIlluminati"
                            class="focus:outline-none transition-transform hover:scale-110" title="Открыть тайное">
                            <div class="h-10 w-10">
                                <svg viewBox="0 0 100 100" class="w-full h-full text-current">
                                    <!-- Шестерня (основная форма) -->
                                    <circle cx="50" cy="45" r="20" stroke="currentColor" stroke-width="2" fill="none" />
                                    <circle cx="50" cy="45" r="15" stroke="currentColor" stroke-width="1.5" fill="none"
                                        stroke-dasharray="2 3" />
                                    <!-- Зубья шестерни -->
                                    <line x1="30" y1="35" x2="20" y2="30" stroke="currentColor" stroke-width="1.5" />
                                    <line x1="30" y1="55" x2="20" y2="60" stroke="currentColor" stroke-width="1.5" />
                                    <line x1="50" y1="25" x2="45" y2="15" stroke="currentColor" stroke-width="1.5" />
                                    <line x1="70" y1="35" x2="80" y2="30" stroke="currentColor" stroke-width="1.5" />
                                    <line x1="70" y1="55" x2="80" y2="60" stroke="currentColor" stroke-width="1.5" />
                                    <line x1="50" y1="65" x2="55" y2="75" stroke="currentColor" stroke-width="1.5" />
                                    <!-- Глаз внутри -->
                                    <circle cx="50" cy="45" r="6" stroke="currentColor" stroke-width="1.5"
                                        fill="none" />
                                    <circle cx="50" cy="45" r="2" fill="currentColor" />
                                    <!-- Волна снизу (стилизованная) -->
                                    <path d="M30 75 Q40 70, 50 75 T70 75" stroke="currentColor" stroke-width="1.5"
                                        fill="none" />
                                    <path d="M30 80 Q40 75, 50 80 T70 80" stroke="currentColor" stroke-width="1.5"
                                        fill="none" />
                                    <!-- Точка над i – намёк на звезду -->
                                    <circle cx="52" cy="25" r="1" fill="currentColor" class="opacity-50" />
                                    <!-- Дополнительные лучи (едва заметные) -->
                                    <line x1="50" y1="25" x2="50" y2="15" stroke="currentColor" stroke-width="0.8"
                                        class="opacity-20" />
                                    <line x1="60" y1="30" x2="70" y2="20" stroke="currentColor" stroke-width="0.8"
                                        class="opacity-20" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    <div
                        class="flex flex-wrap items-center gap-1.5 sm:gap-2 text-white/30 sm:text-white/40 text-[10px] sm:text-xs mb-2 sm:mb-3">
                        <span>ЛИЦЕЙСКОЕПРОСТРАНСТВО</span>
                        <span>•</span>
                        <span>ИНФОРМАЦИОННЫЙ ДОКУМЕНТ</span>
                        <span>•</span>
                        <!-- Пасхалка: символ глаза в дате -->
                        <span class="relative">
                            АКТУАЛЬНО: 03.03.2026
                            <span
                                :class="['absolute -top-1 -right-2 text-[6px] transition-opacity duration-300', showIlluminati ? 'opacity-30' : 'opacity-0']">👁️</span>
                        </span>
                    </div>

                    <h1
                        class="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-2 sm:mb-4 break-words hyphens-auto">
                        <span class="block">ПОЛИТИКА</span>
                        <span class="font-bold block">КОНФИДЕНЦИАЛЬНОСТИ</span>
                    </h1>

                    <p class="text-white/50 sm:text-white/60 text-sm sm:text-base lg:text-lg max-w-2xl">
                        Настоящий документ определяет порядок обработки и защиты персональных данных участников
                        лицейского форума ЛИЦЕЙСКОЕПРОСТРАНСТВО, созданного в образовательных и некоммерческих целях.
                    </p>
                </div>
            </div>
        </div>

        <!-- Основное содержание -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div class="max-w-4xl mx-auto">
                <!-- Преамбула с указанием некоммерческого статуса -->
                <div class="mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8 bg-white/5 border border-white/10 rounded-lg">
                    <div class="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <div
                            class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white/60" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-white/70 leading-relaxed text-sm sm:text-base mb-3">
                                ЛИЦЕЙСКОЕПРОСТРАНСТВО создан учеником МАОУ Лицей "Технический" (далее — «Создатель») как
                                некоммерческий образовательный проект для общения и взаимодействия учащихся. Форум не
                                осуществляет предпринимательскую деятельность, не собирает платежи и не извлекает
                                прибыль из
                                обработки персональных данных.
                            </p>
                            <p class="text-white/50 text-xs sm:text-sm">
                                В соответствии с ч. 2 ст. 1 Федерального закона «О персональных данных» № 152-ФЗ,
                                особенности обработки персональных данных в личных, семейных и некоммерческих
                                образовательных целях регулируются с учетом их специфики.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Оглавление + пасхалка: пункт 10 -->
                <div class="mb-8 sm:mb-12 p-4 sm:p-6 border border-white/10 rounded-lg overflow-hidden">
                    <h2 class="text-xs sm:text-sm font-bold text-white/40 tracking-wider mb-3 sm:mb-4">СОДЕРЖАНИЕ</h2>
                    <div
                        class="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2 text-[11px] xs:text-xs sm:text-sm">
                        <a href="#section1"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">1.
                            Общие положения</a>
                        <a href="#section2"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">2.
                            Какие данные</a>
                        <a href="#section3"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">3.
                            Правовые основания</a>
                        <a href="#section4"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">4.
                            Цели обработки</a>
                        <a href="#section5"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">5.
                            Согласие</a>
                        <a href="#section6"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">6.
                            Где хранятся</a>
                        <a href="#section7"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">7.
                            Защита данных</a>
                        <a href="#section8"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">8.
                            Права</a>
                        <a href="#section9"
                            class="text-white/60 hover:text-white transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate">9.
                            Контакты</a>
                        <!-- Пасхалка: 10. Иллюминаты (ссылка никуда) -->
                        <a href="#"
                            :class="['transition-colors py-1.5 px-1.5 sm:px-2 hover:bg-white/5 rounded truncate', showIlluminati ? 'text-white/30 hover:text-white/60' : 'text-white/0']">10.
                            Иллюминаты</a>
                    </div>
                </div>

                <!-- Раздел 1 - Общие положения -->
                <section id="section1" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">1.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold break-words">ОБЩИЕ ПОЛОЖЕНИЯ</h2>
                    </div>
                    <div class="space-y-3 sm:space-y-4 text-white/70 leading-relaxed pl-4 sm:pl-8">
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">1.1</span>
                            <span class="break-words">Настоящая Политика конфиденциальности (далее — «Политика»)
                                разработана для информирования потребителей сайта ЛИЦЕЙСКОЕПРОСТРАНСТВО (далее — «Сайт»)
                                о порядке обработки их персональных данных.</span>
                        </p>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">1.2</span>
                            <span class="break-words">Сайт создан и поддерживается учеником МАОУ Лицей "Технический" в
                                некоммерческих образовательных целях для организации общения между учащимися. Создатель
                                Сайта не является юридическим лицом и не осуществляет предпринимательскую
                                деятельность.</span>
                        </p>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">1.3</span>
                            <span class="break-words">Использование Сайта означает согласие с настоящей Политикой. Если
                                вы не согласны с условиями, пожалуйста, воздержитесь от использования Сайта.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 2 - Какие данные собираются + пасхалки 2.4 и 2.5 -->
                <section id="section2" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">2.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold break-words">КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ</h2>
                    </div>
                    <div class="space-y-3 sm:space-y-4 text-white/70 leading-relaxed pl-4 sm:pl-8">
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">2.1</span>
                            <span class="break-words"><span class="text-white">Для регистрации на Сайте
                                    необходимы:</span> имя пользователя (никнейм) и адрес электронной почты. Эти данные
                                минимально необходимы для создания аккаунта и обеспечения возможности восстановления
                                доступа.</span>
                        </p>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">2.2</span>
                            <span class="break-words"><span class="text-white">Автоматически собираемые данные:</span>
                                IP-адрес, тип браузера, время посещения. Эти данные используются исключительно для
                                технического обеспечения работы Сайта и не передаются третьим лицам.</span>
                        </p>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">2.3</span>
                            <span class="break-words"><span class="text-white">Информация в профиле:</span> Вы можете
                                добровольно добавить фотографию, информацию о себе, классе и т.д. Эти данные видны
                                другим участникам Сайта.</span>
                        </p>
                        <!-- пасхалка 2.4 -->
                        <p
                            :class="['flex items-start gap-2 sm:gap-3 text-sm sm:text-base transition-opacity duration-300', showIlluminati ? 'opacity-100' : 'opacity-0']">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">2.4</span>
                            <span class="break-words"><span class="text-white">Данные, которые мы не собираем:</span>
                                мысли, сны, предсказания, движения зрачков.</span>
                        </p>
                        <!-- пасхалка 2.5 - 42 -->
                        <p
                            :class="['flex items-start gap-2 sm:gap-3 text-sm sm:text-base transition-opacity duration-300', showIlluminati ? 'opacity-100' : 'opacity-0']">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">2.5</span>
                            <span class="break-words"><span class="text-white">Ответ на главный вопрос:</span>
                                42.</span>
                        </p>
                        <div
                            class="flex items-start gap-2 sm:gap-3 text-white/50 text-xs sm:text-sm mt-3 sm:mt-4 p-3 sm:p-4 bg-white/5 rounded-lg">
                            <span class="text-white/30 font-mono text-xs sm:text-sm whitespace-nowrap">Важно:</span>
                            <span class="break-words">Мы не собираем паспортные данные, финансовую информацию, сведения
                                о здоровье или другие чувствительные данные. Сайт создан исключительно для общения
                                учащихся и в образовательных целях.</span>
                        </div>
                    </div>
                </section>

                <!-- Раздел 3 - Правовые основания + пасхалки 3.3 и 3.4 -->
                <section id="section3" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">3.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold">НА КАКОМ ОСНОВАНИИ МЫ ОБРАБАТЫВАЕМ ДАННЫЕ</h2>
                    </div>
                    <div class="space-y-3 sm:space-y-4 text-white/70 leading-relaxed pl-4 sm:pl-8">
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">3.1</span>
                            <span>Мы обрабатываем ваши данные на следующих основаниях:</span>
                        </p>
                        <ul class="space-y-1.5 sm:space-y-2 ml-8 sm:ml-12 text-white/60 text-sm sm:text-base list-disc">
                            <li>Ваше согласие, которое вы даете при регистрации на Сайте;</li>
                            <li>Необходимость для функционирования Сайта (создание аккаунта, публикация сообщений);</li>
                            <li>Законные интересы Создателя по обеспечению работы и безопасности Форума.</li>
                        </ul>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base mt-2">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">3.2</span>
                            <span>Учитывая некоммерческий характер Сайта и отсутствие юридического лица, мы стремимся к
                                максимальной прозрачности и минимизации собираемых данных.</span>
                        </p>
                        <!-- пасхалка 3.3 -->
                        <p
                            :class="['flex items-start gap-2 sm:gap-3 text-sm sm:text-base transition-opacity duration-300', showIlluminati ? 'opacity-100' : 'opacity-0']">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">3.3</span>
                            <span>Данные также обрабатываются в соответствии с древними законами, известными лишь
                                посвящённым.</span>
                        </p>
                        <!-- пасхалка 3.4 - 23 -->
                        <p
                            :class="['flex items-start gap-2 sm:gap-3 text-sm sm:text-base transition-opacity duration-300', showIlluminati ? 'opacity-100' : 'opacity-0']">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">3.4</span>
                            <span>Число 23 встречается повсюду. Присмотрись.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 4 - Цели обработки -->
                <section id="section4" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">4.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold">ЗАЧЕМ МЫ ИСПОЛЬЗУЕМ ВАШИ ДАННЫЕ</h2>
                    </div>
                    <div class="space-y-2 sm:space-y-3 pl-4 sm:pl-8">
                        <div class="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded">
                            <div
                                class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/80 text-[10px] sm:text-xs">
                                ✓</div>
                            <div>
                                <span class="text-white block text-xs sm:text-sm font-medium">Для регистрации и входа на
                                    Сайт</span>
                                <span class="text-white/50 text-[10px] sm:text-xs">Чтобы вы могли создать аккаунт и
                                    заходить в него</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded">
                            <div
                                class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/80 text-[10px] sm:text-xs">
                                ✓</div>
                            <div>
                                <span class="text-white block text-xs sm:text-sm font-medium">Для показа ваших сообщений
                                    другим участникам</span>
                                <span class="text-white/50 text-[10px] sm:text-xs">Посты, комментарии, лайки видны на
                                    Сайте</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded">
                            <div
                                class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/80 text-[10px] sm:text-xs">
                                ✓</div>
                            <div>
                                <span class="text-white block text-xs sm:text-sm font-medium">Для технической поддержки
                                    и безопасности</span>
                                <span class="text-white/50 text-[10px] sm:text-xs">Чтобы решать проблемы с доступом и
                                    предотвращать спам</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/5 rounded">
                            <div
                                class="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/80 text-[10px] sm:text-xs">
                                ✓</div>
                            <div>
                                <span class="text-white block text-xs sm:text-sm font-medium">Для восстановления
                                    пароля</span>
                                <span class="text-white/50 text-[10px] sm:text-xs">Отправляем ссылку для сброса пароля
                                    на email</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Раздел 5 - Согласие + пасхалка 5.2 (1984) -->
                <section id="section5" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">5.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold">СОГЛАСИЕ НА ОБРАБОТКУ ДАННЫХ</h2>
                    </div>
                    <div class="space-y-3 sm:space-y-4 text-white/70 leading-relaxed pl-4 sm:pl-8">
                        <div class="p-3 sm:p-5 border border-white/10 rounded-lg bg-white/5 mb-3 sm:mb-4">
                            <p class="text-white/70 text-xs sm:text-sm">При регистрации на Сайте вы ставите галочку,
                                подтверждая, что:</p>
                            <ul class="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-white/60 text-xs sm:text-sm">
                                <li class="flex items-start gap-1.5 sm:gap-2">• Ознакомились с настоящей Политикой
                                    конфиденциальности</li>
                                <li class="flex items-start gap-1.5 sm:gap-2">• Согласны на обработку указанных при
                                    регистрации данных (email и никнейм)</li>
                                <li class="flex items-start gap-1.5 sm:gap-2">• Понимаете, что ваши сообщения будут
                                    видны другим участникам Сайта</li>
                            </ul>
                        </div>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">5.1</span>
                            <span>Вы можете в любой момент отозвать свое согласие, удалив аккаунт в настройках профиля
                                или написав Создателю Сайта. После удаления аккаунта ваши данные будут удалены в течение
                                30 дней.</span>
                        </p>
                        <!-- пасхалка 5.2 - 1984 -->
                        <p
                            :class="['flex items-start gap-2 sm:gap-3 text-sm sm:text-base transition-opacity duration-300', showIlluminati ? 'opacity-100' : 'opacity-0']">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">5.2</span>
                            <span>Большой брат следит за тобой? Нет, мы просто хотим напомнить про Овемрид.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 6 - Где хранятся данные -->
                <section id="section6" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">6.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold">ГДЕ ХРАНЯТСЯ ВАШИ ДАННЫЕ</h2>
                    </div>
                    <div class="space-y-3 sm:space-y-4 text-white/70 leading-relaxed pl-4 sm:pl-8">
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">6.1</span>
                            <span>Форум размещен на бесплатном хостинге Vercel. База данных форума находится на
                                серверах, которые могут располагаться как в России, так и за рубежом, в зависимости от
                                выбранного хостинг-провайдера.</span>
                        </p>
                        <div class="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-3">
                            <div class="border border-white/10 rounded p-2 sm:p-3">
                                <span class="text-white/40 block text-[10px] sm:text-xs">Хостинг</span>
                                <span class="text-white text-xs sm:text-sm">Vercel Inc. (США)</span>
                            </div>
                            <div class="border border-white/10 rounded p-2 sm:p-3">
                                <span class="text-white/40 block text-[10px] sm:text-xs">База данных</span>
                                <span class="text-white text-xs sm:text-sm">Supabase</span>
                            </div>
                        </div>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base mt-2">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">6.2</span>
                            <span>Учитывая некоммерческий характер проекта и отсутствие финансирования, мы используем
                                доступные бесплатные решения для хостинга. При этом мы принимаем разумные меры для
                                защиты данных.</span>
                        </p>
                        <div
                            class="flex items-start gap-2 sm:gap-3 text-white/50 text-xs sm:text-sm p-3 sm:p-4 bg-white/5 rounded-lg">
                            <span class="text-white/30 font-mono text-xs sm:text-sm">Обратите внимание:</span>
                            <span>Сайт создан учеником в учебных целях. Если у вас есть вопросы о хранении данных, вы
                                можете связаться с Создателем для получения дополнительной информации.</span>
                        </div>
                    </div>
                </section>

                <!-- Раздел 7 - Защита данных + пасхалки 7.2 и 7.3 (666) -->
                <section id="section7" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">7.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold">КАК МЫ ЗАЩИЩАЕМ ВАШИ ДАННЫЕ</h2>
                    </div>
                    <div class="space-y-3 sm:space-y-4 text-white/70 leading-relaxed pl-4 sm:pl-8">
                        <ul class="space-y-1.5 sm:space-y-2 text-white/60 text-sm sm:text-base list-disc ml-4 sm:ml-6">
                            <li>Пароли хранятся в зашифрованном виде (хешируются), мы не видим ваши пароли</li>
                            <li>Сайт работает по защищенному протоколу HTTPS</li>
                            <li>Доступ к базе данных ограничен и защищен паролем</li>
                            <li>Регулярно создаются резервные копии для предотвращения потери данных</li>
                            <li>Мы не передаем ваши данные третьим лицам (кроме технической необходимости работы
                                хостинга)</li>
                        </ul>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base mt-2 sm:mt-3">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">7.1</span>
                            <span>Несмотря на принятые меры, помните, что ни один способ передачи данных через Интернет
                                не является 100% безопасным. Используйте надежные пароли и не сообщайте их
                                другим.</span>
                        </p>
                        <!-- пасхалка 7.2 -->
                        <p
                            :class="['flex items-start gap-2 sm:gap-3 text-sm sm:text-base transition-opacity duration-300', showIlluminati ? 'opacity-100' : 'opacity-0']">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">7.2</span>
                            <span>Дополнительную защиту обеспечивает тайное общество, наблюдающее за порядком.</span>
                        </p>
                        <!-- пасхалка 7.3 - 666 -->
                        <p
                            :class="['flex items-start gap-2 sm:gap-3 text-sm sm:text-base transition-opacity duration-300', showIlluminati ? 'opacity-100' : 'opacity-0']">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">7.3</span>
                            <span>Знаки вокруг и вы видите их.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 8 - Права участников + символ -->
                <section id="section8" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">8.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold">ВАШИ ПРАВА</h2>
                    </div>
                    <div class="space-y-3 sm:space-y-4 text-white/70 leading-relaxed pl-4 sm:pl-8">
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">8.1</span>
                            <span>Как участник Сайта, вы имеете право:</span>
                        </p>
                        <ul class="space-y-1.5 sm:space-y-2 ml-8 sm:ml-12 text-white/60 text-sm sm:text-base list-disc">
                            <li>Получить информацию о том, какие ваши данные хранятся</li>
                            <li>Исправить неточные данные (в настройках профиля)</li>
                            <li>Удалить свой аккаунт и все связанные с ним данные</li>
                            <li>Отозвать согласие на обработку данных</li>
                            <li>Получить копию ваших данных</li>
                        </ul>
                        <div class="mt-4 sm:mt-6 p-3 sm:p-5 border border-white/10 rounded-lg bg-white/5">
                            <h3 class="text-white text-xs sm:text-sm font-bold mb-2 sm:mb-3">КАК СВЯЗАТЬСЯ ДЛЯ РЕШЕНИЯ
                                ВОПРОСОВ С ДАННЫМИ</h3>
                            <p class="text-white/60 text-xs sm:text-sm mb-2 sm:mb-3">
                                По всем вопросам, связанным с вашими данными, вы можете написать Создателю Сайта:
                            </p>
                            <div class="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-3">
                                <span class="text-white/80 font-mono text-xs sm:text-sm break-all">@TakaMorY</span>
                                <span class="text-white/40 text-[10px] sm:text-xs">(ученик 11 класса)</span>
                                <!-- символ пасхалки -->
                                <span
                                    :class="['text-[10px] transition-opacity duration-300', showIlluminati ? 'opacity-100 text-white/30' : 'opacity-0']"
                                    title="🜁">
                                    <div class="h-10 w-10">
                                        <svg viewBox="0 0 100 100" class="w-full h-full text-current">
                                            <!-- Шестерня (основная форма) -->
                                            <circle cx="50" cy="45" r="20" stroke="currentColor" stroke-width="2"
                                                fill="none" />
                                            <circle cx="50" cy="45" r="15" stroke="currentColor" stroke-width="1.5"
                                                fill="none" stroke-dasharray="2 3" />
                                            <!-- Зубья шестерни -->
                                            <line x1="30" y1="35" x2="20" y2="30" stroke="currentColor"
                                                stroke-width="1.5" />
                                            <line x1="30" y1="55" x2="20" y2="60" stroke="currentColor"
                                                stroke-width="1.5" />
                                            <line x1="50" y1="25" x2="45" y2="15" stroke="currentColor"
                                                stroke-width="1.5" />
                                            <line x1="70" y1="35" x2="80" y2="30" stroke="currentColor"
                                                stroke-width="1.5" />
                                            <line x1="70" y1="55" x2="80" y2="60" stroke="currentColor"
                                                stroke-width="1.5" />
                                            <line x1="50" y1="65" x2="55" y2="75" stroke="currentColor"
                                                stroke-width="1.5" />
                                            <!-- Глаз внутри -->
                                            <circle cx="50" cy="45" r="6" stroke="currentColor" stroke-width="1.5"
                                                fill="none" />
                                            <circle cx="50" cy="45" r="2" fill="currentColor" />
                                            <!-- Волна снизу (стилизованная) -->
                                            <path d="M30 75 Q40 70, 50 75 T70 75" stroke="currentColor"
                                                stroke-width="1.5" fill="none" />
                                            <path d="M30 80 Q40 75, 50 80 T70 80" stroke="currentColor"
                                                stroke-width="1.5" fill="none" />
                                            <!-- Точка над i – намёк на звезду -->
                                            <circle cx="52" cy="25" r="1" fill="currentColor" class="opacity-50" />
                                            <!-- Дополнительные лучи (едва заметные) -->
                                            <line x1="50" y1="25" x2="50" y2="15" stroke="currentColor"
                                                stroke-width="0.8" class="opacity-20" />
                                            <line x1="60" y1="30" x2="70" y2="20" stroke="currentColor"
                                                stroke-width="0.8" class="opacity-20" />
                                        </svg>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Раздел 9 - Контакты + скрытые строки (белый кролик) -->
                <section id="section9" class="mb-8 sm:mb-12 scroll-mt-20">
                    <div class="flex items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                        <span class="text-white/30 sm:text-white/40 font-mono text-xs sm:text-sm">9.0</span>
                        <h2 class="text-xl sm:text-2xl font-bold">КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
                    </div>
                    <div class="space-y-3 sm:space-y-4 text-white/70 leading-relaxed pl-4 sm:pl-8">
                        <div class="p-4 sm:p-6 border border-white/10 rounded-lg bg-white/5">
                            <p class="text-white/80 mb-2">
                                <span class="text-white/40 block text-[10px] sm:text-xs mb-0.5 sm:mb-1">СОЗДАТЕЛЬ
                                    САЙТА</span>
                                <span class="text-white text-base sm:text-lg">Осадчий Даниил</span>
                                <span class="text-white/40 text-xs sm:text-sm block">ученик 11 класса, МАОУ Лицей
                                    "Технический"</span>
                            </p>
                            <p class="text-white/80 mb-2 mt-2 sm:mt-3">
                                <span class="text-white/40 block text-[10px] sm:text-xs mb-0.5 sm:mb-1">КОНТАКТЫ</span>
                                <span class="text-white block text-sm sm:text-base">Телеграм канал: @lyceum_space</span>
                                <span class="text-white block text-sm sm:text-base">Телеграм: @TakaMorY</span>
                                <!-- скрытая строка: секретный канал -->
                                <span
                                    :class="['block text-[8px] sm:text-[10px] mt-1 transition-opacity duration-300', showIlluminati ? 'opacity-100 text-white/20' : 'opacity-0']">Секретный
                                    канал: @illuminati_intern</span>
                                <!-- пасхалка: белый кролик -->

                            </p>
                        </div>
                        <p class="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
                            <span
                                class="text-white/20 sm:text-white/30 font-mono text-xs sm:text-sm min-w-[2.2rem] sm:min-w-[2.5rem]">9.1</span>
                            <span>Если у вас возникли вопросы, предложения или замечания по работе Сайта или обработке
                                ваших данных, пожалуйста, обращайтесь. Мы открыты к диалогу и готовы помочь.</span>
                        </p>
                    </div>
                </section>

                <!-- Информация о проекте + пасхалка благодарность -->
                <div class="mt-12 sm:mt-16 p-4 sm:p-6 lg:p-8 border border-white/10 rounded-lg bg-white/5">
                    <h3 class="text-base sm:text-lg font-bold mb-3 sm:mb-4">О ПРОЕКТЕ</h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
                        <div>
                            <p class="text-white/40 mb-1">Название проекта</p>
                            <p class="text-white/80">ЛИЦЕЙСКОЕПРОСТРАНСТВО — лицейское сообщество</p>
                        </div>
                        <div>
                            <p class="text-white/40 mb-1">Тип проекта</p>
                            <p class="text-white/80">Некоммерческий образовательный</p>
                        </div>
                        <div>
                            <p class="text-white/40 mb-1">Цель создания</p>
                            <p class="text-white/80">Общение учащихся, обмен знаниями, обсуждение учебных и внеучебных
                                вопросов</p>
                        </div>
                        <div>
                            <p class="text-white/40 mb-1">Аудитория</p>
                            <p class="text-white/80">Ученики МАОУ Лицей "Технический" и приглашённые участники</p>
                        </div>
                        <div>
                            <p class="text-white/40 mb-1">Дата создания</p>
                            <p class="text-white/80">2 марта 2026 года</p>
                        </div>
                        <!-- пасхалка благодарность -->
                        <div
                            class="col-span-1 sm:col-span-2 mt-2 text-white/20 text-[10px] sm:text-xs border-t border-white/10 pt-2">
                            <span
                                :class="['transition-opacity duration-300', showIlluminati ? 'opacity-30' : 'opacity-0']">Особая
                                благодарность: обществу Овемридов за духовное руководство.</span>
                        </div>
                    </div>
                </div>

                <!-- Подпись + пасхалка эпоха -->
                <div
                    class="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-0">
                    <div>
                        <p class="text-white/30 sm:text-white/40 text-xs sm:text-sm">Создатель Сайта</p>
                        <p class="text-white font-bold text-base sm:text-lg mt-1 sm:mt-2 break-words">Осадчий Даниил</p>
                        <p class="text-white/30 text-[10px] sm:text-xs mt-0.5 sm:mt-1 break-words">ученик 11 класса,
                            МАОУ Лицей "Технический"</p>
                    </div>
                    <div class="text-left sm:text-right">
                        <p class="text-white/30 sm:text-white/40 text-xs sm:text-sm">Дата последнего обновления</p>
                        <p class="text-white font-bold text-base sm:text-lg mt-1 sm:mt-2 break-words">3 марта 2026 г.
                            <span
                                :class="['text-[8px] transition-opacity duration-300', showIlluminati ? 'opacity-30 text-white/20' : 'opacity-0']">(эпоха
                                водолея)</span>
                        </p>
                    </div>
                </div>

                <!-- Главная пасхалка: создано при помощи общества Иллюминантов -->
                <div
                    :class="['mt-8 text-center flex items-center justify-center gap-1 transition-opacity duration-300', showIlluminati ? 'opacity-30' : 'opacity-0']">
                    <span class="text-white/10 text-[8px] sm:text-[10px]">создано при помощи общества
                        Овемридов</span>
                    <svg class="w-3 h-3 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1">
                        <path d="M12 2L22 20H2L12 2z" />
                        <circle cx="12" cy="10" r="2" fill="currentColor" />
                    </svg>
                </div>

                <!-- Простое уведомление -->
                <div class="mt-6 sm:mt-8 text-white/20 text-[10px] sm:text-xs text-center break-words">
                    ЛИЦЕЙСКОЕПРОСТРАНСТВО — некоммерческий проект, созданный учеником лицея. Мы ценим вашу
                    конфиденциальность
                    и стремимся к прозрачности. Актуально на 3 марта 2026 года.
                </div>
            </div>
        </div>

        <!-- Футер -->
        <Footer :showIlluminati="showIlluminati" />
    </div>
</template>

<style scoped>
/* Кастомный брейкпоинт для очень маленьких устройств */
@media (min-width: 480px) {
    .xs\:inline {
        display: inline;
    }

    .xs\:ml-1 {
        margin-left: 0.25rem;
    }

    .xs\:text-4xl {
        font-size: 2.25rem;
        line-height: 1.1;
    }
}

/* Плавный скролл */
html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
}

@media (max-width: 640px) {
    html {
        scroll-padding-top: 64px;
    }
}

/* Улучшенная читаемость на мобильных */
@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .text-sm {
        font-size: 0.875rem;
        line-height: 1.5;
    }

    .text-base {
        font-size: 1rem;
        line-height: 1.5;
    }
}

/* Принудительный перенос слов */
.break-words {
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
}

@media (max-width: 480px) {
    .truncate {
        overflow: visible;
        white-space: normal;
        text-overflow: clip;
    }

    .gap-1 a {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        line-height: 1.3;
    }
}

@media (max-width: 360px) {
    .text-3xl {
        font-size: 2rem;
        line-height: 1.1;
    }

    h1 .font-bold {
        font-size: 1.8rem;
    }
}

/* Стили для пасхалок */
.opacity-0 {
    opacity: 0;
}

.opacity-30 {
    opacity: 0.3;
}

.opacity-100 {
    opacity: 1;
}

.transition-opacity {
    transition: opacity 0.3s ease;
}

/* Анимация пульсации для иконки */
@keyframes subtle-pulse {
    0% {
        opacity: 0.7;
        transform: scale(1);
    }

    50% {
        opacity: 1;
        transform: scale(1.1);
    }

    100% {
        opacity: 0.7;
        transform: scale(1);
    }
}

button:hover svg {
    animation: subtle-pulse 1.5s infinite;
}
</style>