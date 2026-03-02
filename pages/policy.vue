<script setup lang="ts">
import Footer from '~/components/Footer.vue';

</script>

<!-- pages/privacy.vue -->
<template>
    <div class="min-h-screen bg-black text-white">
        <!-- Хедер форума -->
        <header class="border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
            <div class="container mx-auto ">
                <div class="flex items-center justify-between h-24">
                    <div class=" text-xl font-bold tracking-tighter">
                        <span class="text-white">ЛИЦЕСКОЕПРОСТРАНСТВО</span>

                    </div>

                    <nav class="hidden md:flex items-center gap-8">
                        <a href="/forum" class="text-white/60 hover:text-white transition-colors">Форум</a>
                        <a href="/profile" class="text-white/60 hover:text-white transition-colors">Профиль</a>
                        <a href="/privacy" class="text-white border-b border-white pb-1">Политика</a>
                    </nav>

                    <!-- Индикатор некоммерческого статуса -->
                    <div class="flex items-center gap-2 text-xs">
                        <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        <span class="text-white/40 hidden sm:inline">Некоммерческий проект • МАОУ Лицей
                            "Техничсекий"</span>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero секция -->
        <div class="relative h-[50vh] min-h-[400px] overflow-hidden">
            <div class="absolute inset-0">
                <img src="" alt="School forum concept" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60"></div>
            </div>

            <div class="relative h-full container mx-auto px-6 sm:px-8 lg:px-12 flex items-end pb-16">
                <div class="max-w-4xl">
                    <!-- Информация о некоммерческом статусе -->
                    <div class="inline-flex items-center gap-2  backdrop-blur  px-3 py-3 mb-3 mx-3">
                        <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span class="text-white/80 text-xs font-medium mx-3">Образовательный проект •
                            Некоммерческий</span>
                    </div>

                    <div class="flex items-center gap-2 text-white/40 text-sm mb-3">
                        <span>ЛИЦЕСКОЕПРОСТРАНСТВО</span>
                        <span>•</span>
                        <span>ИНФОРМАЦИОННЫЙ ДОКУМЕНТ</span>
                        <span>•</span>
                        <span>АКТУАЛЬНО: 03.03.2026</span>
                    </div>

                    <h1 class="text-5xl sm:text-6xl font-light tracking-tight mb-4">
                        ПОЛИТИКА<br />
                        <span class="font-bold">КОНФИДЕНЦИАЛЬНОСТИ</span>
                    </h1>

                    <p class="text-white/60 text-lg max-w-2xl">
                        Настоящий документ определяет порядок обработки и защиты персональных данных участников
                        лицейского форума ЛИЦЕСКОЕПРОСТРАНСТВО, созданного в образовательных и некоммерческих целях.
                    </p>
                </div>
            </div>
        </div>

        <!-- Основное содержание -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="max-w-4xl mx-auto">
                <!-- Преамбула с указанием некоммерческого статуса -->
                <div class="mb-12 p-8 bg-white/5 border border-white/10 rounded-lg">
                    <div class="flex items-start gap-4">
                        <div class="w-12 h-12 rounded-full  flex items-center justify-center flex-shrink-0">
                            <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-white/70 leading-relaxed mb-3">
                                ЛИЦЕСКОЕПРОСТРАНСТВО создан учеником МАОУ Лицей "Техничсекий" (далее — «Создатель») как
                                некоммерческий
                                образовательный проект для общения и взаимодействия учащихся. Форум не осуществляет
                                предпринимательскую деятельность, не собирает платежи и не извлекает прибыль из
                                обработки персональных данных.
                            </p>
                            <p class="text-white/50 text-sm">
                                В соответствии с ч. 2 ст. 1 Федерального закона «О персональных данных» № 152-ФЗ,
                                особенности обработки персональных данных в личных, семейных и некоммерческих
                                образовательных целях регулируются с учетом их специфики.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Упрощенное оглавление -->
                <div class="mb-12 p-6 border border-white/10 rounded-lg">
                    <h2 class="text-sm font-bold text-white/40 tracking-wider mb-4">СОДЕРЖАНИЕ</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        <a href="#section1" class="text-white/60 hover:text-white transition-colors">1. Общие
                            положения</a>
                        <a href="#section2" class="text-white/60 hover:text-white transition-colors">2. Какие данные
                            собираются</a>
                        <a href="#section3" class="text-white/60 hover:text-white transition-colors">3. Правовые
                            основания</a>
                        <a href="#section4" class="text-white/60 hover:text-white transition-colors">4. Цели
                            обработки</a>
                        <a href="#section5" class="text-white/60 hover:text-white transition-colors">5. Согласие</a>
                        <a href="#section6" class="text-white/60 hover:text-white transition-colors">6. Где хранятся
                            данные</a>
                        <a href="#section7" class="text-white/60 hover:text-white transition-colors">7. Защита
                            данных</a>
                        <a href="#section8" class="text-white/60 hover:text-white transition-colors">8. Права
                            участников</a>
                        <a href="#section9" class="text-white/60 hover:text-white transition-colors">9. Контакты</a>
                    </div>
                </div>

                <!-- Раздел 1 - Общие положения -->
                <section id="section1" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">1.0</span>
                        <h2 class="text-2xl font-bold">ОБЩИЕ ПОЛОЖЕНИЯ</h2>
                    </div>

                    <div class="space-y-4 text-white/70 leading-relaxed pl-8">
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">1.1</span>
                            <span>Настоящая Политика конфиденциальности (далее — «Политика») разработана для
                                информирования потребителей сайта ЛИЦЕСКОЕПРОСТРАНСТВО (далее — «Сайт») о порядке
                                обработки их персональных данных.</span>
                        </p>
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">1.2</span>
                            <span>Сайт создан и поддерживается учеником МАОУ Лицей "Техничсекий" в некоммерческих
                                образовательных
                                целях для организации общения между учащимися. Создатель Сайта не является юридическим
                                лицом и не осуществляет предпринимательскую деятельность.</span>
                        </p>
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">1.3</span>
                            <span>Использование Сайта означает согласие с настоящей Политикой. Если вы не согласны с
                                условиями, пожалуйста, воздержитесь от использования Сайта.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 2 - Какие данные собираются (упрощенно) -->
                <section id="section2" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">2.0</span>
                        <h2 class="text-2xl font-bold">КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ</h2>
                    </div>

                    <div class="space-y-4 text-white/70 leading-relaxed pl-8">
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">2.1</span>
                            <span><span class="text-white">Для регистрации на Сайте необходимы:</span> имя пользователя
                                (никнейм) и адрес электронной почты. Эти данные минимально необходимы для создания
                                аккаунта и обеспечения возможности восстановления доступа.</span>
                        </p>
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">2.2</span>
                            <span><span class="text-white">Автоматически собираемые данные:</span> IP-адрес, тип
                                браузера, время посещения. Эти данные используются исключительно для технического
                                обеспечения работы Сайта и не передаются третьим лицам.</span>
                        </p>
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">2.3</span>
                            <span><span class="text-white">Информация в профиле:</span> Вы можете добровольно добавить
                                фотографию, информацию о себе, классе и т.д. Эти данные видны другим участникам
                                Сайта.</span>
                        </p>
                        <p class="flex items-start gap-3 text-white/50 text-sm mt-4 p-4 bg-white/5 rounded-lg">
                            <span class="text-white/30 font-mono">Важно:</span>
                            <span>Мы не собираем паспортные данные, финансовую информацию, сведения о здоровье или
                                другие чувствительные данные. Сайт создан исключительно для общения учащихся и в
                                образовательных целях.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 3 - Правовые основания (упрощенные) -->
                <section id="section3" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">3.0</span>
                        <h2 class="text-2xl font-bold">НА КАКОМ ОСНОВАНИИ МЫ ОБРАБАТЫВАЕМ ДАННЫЕ</h2>
                    </div>

                    <div class="space-y-4 text-white/70 leading-relaxed pl-8">
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">3.1</span>
                            <span>Мы обрабатываем ваши данные на следующих основаниях:</span>
                        </p>
                        <ul class="space-y-2 ml-12 text-white/60 list-disc">
                            <li>Ваше согласие, которое вы даете при регистрации на Сайте;</li>
                            <li>Необходимость для функционирования Сайта (создание аккаунта, публикация сообщений);
                            </li>
                            <li>Законные интересы Создателя по обеспечению работы и безопасности Форума.</li>
                        </ul>
                        <p class="flex items-start gap-3 mt-2">
                            <span class="text-white/30 font-mono">3.2</span>
                            <span>Учитывая некоммерческий характер Сайта и отсутствие юридического лица, мы стремимся к
                                максимальной прозрачности и минимизации собираемых данных.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 4 - Цели обработки (простым языком) -->
                <section id="section4" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">4.0</span>
                        <h2 class="text-2xl font-bold">ЗАЧЕМ МЫ ИСПОЛЬЗУЕМ ВАШИ ДАННЫЕ</h2>
                    </div>

                    <div class="space-y-3 pl-8">
                        <div class="flex items-start gap-3 p-3 bg-white/5 ">
                            <div
                                class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/80 text-xs">
                                ✓</div>
                            <div>
                                <span class="text-white block text-sm font-medium">Для регистрации и входа на
                                    Сайт</span>
                                <span class="text-white/50 text-xs">Чтобы вы могли создать аккаунт и заходить в
                                    него</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-3 bg-white/5 ">
                            <div
                                class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/80 text-xs">
                                ✓</div>
                            <div>
                                <span class="text-white block text-sm font-medium">Для показа ваших сообщений другим
                                    участникам</span>
                                <span class="text-white/50 text-xs">Посты, комментарии, лайки видны на Сайте</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-3 bg-white/5 ">
                            <div
                                class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/80 text-xs">
                                ✓</div>
                            <div>
                                <span class="text-white block text-sm font-medium">Для технической поддержки и
                                    безопасности</span>
                                <span class="text-white/50 text-xs">Чтобы решать проблемы с доступом и предотвращать
                                    спам</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 p-3 bg-white/5 ">
                            <div
                                class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-white/80 text-xs">
                                ✓</div>
                            <div>
                                <span class="text-white block text-sm font-medium">Для восстановления пароля</span>
                                <span class="text-white/50 text-xs">Отправляем ссылку для сброса пароля на email</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Раздел 5 - Согласие (упрощенное) -->
                <section id="section5" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">5.0</span>
                        <h2 class="text-2xl font-bold">СОГЛАСИЕ НА ОБРАБОТКУ ДАННЫХ</h2>
                    </div>

                    <div class="space-y-4 text-white/70 leading-relaxed pl-8">
                        <div class="p-5 border border-white/10 rounded-lg bg-white/5 mb-4">
                            <p class="text-white/70 text-sm">
                                При регистрации на Сайте вы ставите галочку, подтверждая, что:
                            </p>
                            <ul class="mt-3 space-y-2 text-white/60 text-sm">
                                <li class="flex items-start gap-2">• Ознакомились с настоящей Политикой
                                    конфиденциальности</li>
                                <li class="flex items-start gap-2">• Согласны на обработку указанных при регистрации
                                    данных (email и никнейм)</li>
                                <li class="flex items-start gap-2">• Понимаете, что ваши сообщения будут видны другим
                                    участникам Сайта</li>
                            </ul>
                        </div>

                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">5.1</span>
                            <span>Вы можете в любой момент отозвать свое согласие, удалив аккаунт в настройках профиля
                                или написав Создателю Сайта. После удаления аккаунта ваши данные будут удалены в
                                течение 30 дней.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 6 - Где хранятся данные (упрощенно) -->
                <section id="section6" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">6.0</span>
                        <h2 class="text-2xl font-bold">ГДЕ ХРАНЯТСЯ ВАШИ ДАННЫЕ</h2>
                    </div>

                    <div class="space-y-4 text-white/70 leading-relaxed pl-8">
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">6.1</span>
                            <span>Форум размещен на бесплатном хостинге Vercel. База данных форума находится на
                                серверах, которые
                                могут располагаться как в России, так и за рубежом, в зависимости от выбранного
                                хостинг-провайдера.</span>
                        </p>

                        <div class="grid grid-cols-2 gap-3 mt-3">
                            <div class="border border-white/10 rounded p-3">
                                <span class="text-white/40 block text-xs">Хостинг</span>
                                <span class="text-white text-sm">Vercel Inc. (США)</span>
                            </div>
                            <div class="border border-white/10 rounded p-3">
                                <span class="text-white/40 block text-xs">База данных</span>
                                <span class="text-white text-sm">MongoDB Atlas (регион: Франкфурт)</span>
                            </div>
                        </div>

                        <p class="flex items-start gap-3 mt-2">
                            <span class="text-white/30 font-mono">6.2</span>
                            <span>Учитывая некоммерческий характер проекта и отсутствие финансирования, мы используем
                                доступные бесплатные решения для хостинга. При этом мы принимаем разумные меры для
                                защиты данных.</span>
                        </p>
                        <p class="flex items-start gap-3 text-white/50 text-sm p-4 bg-white/5 rounded-lg">
                            <span class="text-white/30 font-mono">Обратите внимание:</span>
                            <span>Сайт создан учеником в учебных целях. Если у вас есть вопросы о хранении данных, вы
                                можете связаться с Создателем для получения дополнительной информации.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 7 - Защита данных (простые меры) -->
                <section id="section7" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">7.0</span>
                        <h2 class="text-2xl font-bold">КАК МЫ ЗАЩИЩАЕМ ВАШИ ДАННЫЕ</h2>
                    </div>

                    <div class="space-y-4 text-white/70 leading-relaxed pl-8">
                        <ul class="space-y-2 text-white/60 list-disc ml-4">
                            <li>Пароли хранятся в зашифрованном виде (хешируются), мы не видим ваши пароли</li>
                            <li>Сайт работает по защищенному протоколу HTTPS</li>
                            <li>Доступ к базе данных ограничен и защищен паролем</li>
                            <li>Регулярно создаются резервные копии для предотвращения потери данных</li>
                            <li>Мы не передаем ваши данные третьим лицам (кроме технической необходимости работы
                                хостинга)</li>
                        </ul>

                        <p class="flex items-start gap-3 mt-3">
                            <span class="text-white/30 font-mono">7.1</span>
                            <span>Несмотря на принятые меры, помните, что ни один способ передачи данных через Интернет
                                не является 100% безопасным. Используйте надежные пароли и не сообщайте их
                                другим.</span>
                        </p>
                    </div>
                </section>

                <!-- Раздел 8 - Права участников -->
                <section id="section8" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">8.0</span>
                        <h2 class="text-2xl font-bold">ВАШИ ПРАВА</h2>
                    </div>

                    <div class="space-y-4 text-white/70 leading-relaxed pl-8">
                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">8.1</span>
                            <span>Как участник Сайта, вы имеете право:</span>
                        </p>
                        <ul class="space-y-2 ml-12 text-white/60 list-disc">
                            <li>Получить информацию о том, какие ваши данные хранятся</li>
                            <li>Исправить неточные данные (в настройках профиля)</li>
                            <li>Удалить свой аккаунт и все связанные с ним данные</li>
                            <li>Отозвать согласие на обработку данных</li>
                            <li>Получить копию ваших данных</li>
                        </ul>

                        <!-- Простая форма запроса -->
                        <div class="mt-6 p-5 border border-white/10 rounded-lg bg-white/5">
                            <h3 class="text-white text-sm font-bold mb-3">КАК СВЯЗАТЬСЯ ДЛЯ РЕШЕНИЯ ВОПРОСОВ С ДАННЫМИ
                            </h3>
                            <p class="text-white/60 text-sm mb-3">
                                По всем вопросам, связанным с вашими данными, вы можете написать Создателю Сайта:
                            </p>
                            <div class="flex items-center gap-3">
                                <span class="text-white/80 font-mono text-sm">creator@blackforum.tech</span>
                                <span class="text-white/40 text-xs">(ученик 11 класса МАОУ Лицей "Техничсекий")</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Раздел 9 - Контакты -->
                <section id="section9" class="mb-12 scroll-mt-20">
                    <div class="flex items-start gap-4 mb-4">
                        <span class="text-white/40 font-mono text-sm">9.0</span>
                        <h2 class="text-2xl font-bold">КОНТАКТНАЯ ИНФОРМАЦИЯ</h2>
                    </div>

                    <div class="space-y-4 text-white/70 leading-relaxed pl-8">
                        <div class="p-6 border border-white/10 rounded-lg bg-white/5">
                            <p class="text-white/80 mb-2">
                                <span class="text-white/40 block text-xs mb-1">СОЗДАТЕЛЬ САЙТА</span>
                                <span class="text-white text-lg">Осадчий Даниил</span>
                                <span class="text-white/40 text-sm block">ученик 11 класса, МАОУ Лицей
                                    "Техничсекий"</span>
                            </p>
                            <p class="text-white/80 mb-2 mt-3">
                                <span class="text-white/40 block text-xs mb-1">КОНТАКТЫ</span>
                                <span class="text-white block">Email: a.ivanov@lyceum-student.ru</span>
                                <span class="text-white block">Телеграм: @alex_lyceum</span>
                            </p>
                        </div>

                        <p class="flex items-start gap-3">
                            <span class="text-white/30 font-mono">9.1</span>
                            <span>Если у вас возникли вопросы, предложения или замечания по работе Сайтв или обработке
                                ваших данных, пожалуйста, обращайтесь. Мы открыты к диалогу и готовы помочь.</span>
                        </p>
                    </div>
                </section>

                <!-- Информация о проекте -->
                <div class="mt-16 p-8 border border-white/10 rounded-lg bg-white/5">
                    <h3 class="text-lg font-bold mb-4">О ПРОЕКТЕ</h3>

                    <div class="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <p class="text-white/40 mb-1">Название проекта</p>
                            <p class="text-white/80">ЛИЦЕСКОЕПРОСТРАНСТВО — лицейское сообщество</p>
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
                            <p class="text-white/80">Ученики МАОУ Лицей "Техничсекий" и приглашённые участники</p>
                        </div>
                        <div>
                            <p class="text-white/40 mb-1">Дата создания</p>
                            <p class="text-white/80">2 марта 2026 года</p>
                        </div>
                    </div>
                </div>

                <!-- Подпись -->
                <div class="mt-8 flex justify-between items-end">
                    <div>
                        <p class="text-white/40 text-sm">Создатель Сайта</p>
                        <p class="text-white font-bold mt-2">Осадчий Даниил</p>
                        <p class="text-white/30 text-xs mt-1">ученик 11 класса, МАОУ Лицей "Техничсекий"</p>
                    </div>
                    <div class="text-right">
                        <p class="text-white/40 text-sm">Дата последнего обновления</p>
                        <p class="text-white font-bold mt-2">3 марта 2026 г.</p>
                    </div>
                </div>

            </div>
        </div>

        <!-- Футер -->
        <Footer />
    </div>
</template>