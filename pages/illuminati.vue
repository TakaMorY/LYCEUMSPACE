<!-- pages/illuminati.vue -->
<template>
    <div
        class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <!-- Фоновые пасхалки (очень много) -->
        <div
            class="absolute inset-0 pointer-events-none opacity-5 text-white/20 text-6xl flex flex-wrap gap-8 justify-around items-start p-20">
            <span>⚙️</span><span>🌊</span><span>🐉</span><span>🗝️</span><span>⚶</span><span>☉</span><span>☽</span><span>♂</span><span>♀</span><span>♃</span><span>♄</span>
            <span>△</span><span>◈</span><span>⬟</span><span>⧫</span><span>⌘</span><span>⎔</span><span>⚡</span><span>🌀</span><span>🔱</span>
            <span class="text-4xl">23</span><span class="text-5xl">42</span><span class="text-6xl">666</span>
            <span class="text-3xl">MCMXC</span><span class="text-4xl">VLAD</span><span class="text-5xl">X</span>
            <!-- Руны -->
            <span>ᚨ</span><span>ᚱ</span><span>ᛞ</span><span>ᛟ</span><span>ᛉ</span>
            <!-- Китайские символы -->
            <span>東</span><span>海</span><span>龍</span>
            <!-- Математические знаки -->
            <span>∑</span><span>∞</span><span>∏</span><span>∫</span>
        </div>

        <!-- Дополнительные линии с числами (едва заметные) -->
        <div class="absolute inset-0 pointer-events-none opacity-10 text-white/10 text-[8px] font-mono">
            <div class="absolute top-20 left-[5%] rotate-12">23.42.666</div>
            <div class="absolute bottom-40 right-[8%] -rotate-6">MCMXC • IX • X</div>
            <div class="absolute top-1/3 left-[12%] rotate-45">ORDO MERIDIANI</div>
            <div class="absolute bottom-1/4 right-[15%] -rotate-12">EX ORIENTE LUX</div>
            <div class="absolute top-2/3 left-[30%] rotate-90">OVEMRIDAE • DRACO • OCEANUS</div>
            <div class="absolute top-10 right-[20%] text-xs">⚷</div>
            <div class="absolute bottom-10 left-[40%] text-lg">⌘</div>
            <div class="absolute top-1/2 left-[5%] text-[6px] rotate-12">OVEMRIDAE SEMPER</div>
        </div>

        <!-- Главный контент -->
        <div class="relative z-10 max-w-6xl w-full">
            <!-- Заголовок с символом (используем компонент) -->
            <div class="flex items-center justify-center gap-4 mb-8">
                <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-center">
                    <span class="text-white/90">ОРДЕН ВОСТОЧНОГО</span>
                    <span class="text-white/40 block md:inline md:ml-4">МЕРИДИАНА</span>
                </h1>
                <OrdoLogo :medium="true" colorClass="text-white/60 hover:text-white/80" />
            </div>

            <!-- Большая чёрно-белая композиция (логотип + элементы) -->
            <div class="relative w-full aspect-[21/9] bg-zinc-900/80 border border-white/10  mb-12 rounded-sm">
                <!-- ... (без изменений) ... -->
                <div class="absolute inset-0 flex items-center justify-center">
                    <!-- Основной логотип (увеличенный) -->
                    <div class="relative w-96 h-96">
                        <svg viewBox="0 0 200 200" class="w-full h-full text-white/15 stroke-current fill-none">
                            <circle cx="100" cy="90" r="50" stroke="white" stroke-width="1.5" />
                            <circle cx="100" cy="90" r="35" stroke="white" stroke-width="1" stroke-dasharray="3 3" />
                            <!-- Зубья -->
                            <line x1="45" y1="60" x2="25" y2="45" stroke="white" stroke-width="1.5" />
                            <line x1="45" y1="120" x2="25" y2="135" stroke="white" stroke-width="1.5" />
                            <line x1="100" y1="35" x2="90" y2="15" stroke="white" stroke-width="1.5" />
                            <line x1="155" y1="60" x2="175" y2="45" stroke="white" stroke-width="1.5" />
                            <line x1="155" y1="120" x2="175" y2="135" stroke="white" stroke-width="1.5" />
                            <line x1="100" y1="145" x2="110" y2="165" stroke="white" stroke-width="1.5" />
                            <!-- Глаз -->
                            <circle cx="100" cy="90" r="15" stroke="white" stroke-width="1.5" fill="none" />
                            <circle cx="100" cy="90" r="5" fill="white" class="opacity-30" />
                            <!-- Волны -->
                            <path d="M50 170 Q80 160, 100 170 T150 170" stroke="white" stroke-width="1" fill="none"
                                class="opacity-30" />
                            <path d="M40 180 Q80 170, 120 180 T160 180" stroke="white" stroke-width="1" fill="none"
                                class="opacity-30" />
                            <!-- Меридианы (линии долготы) -->
                            <line x1="100" y1="20" x2="100" y2="170" stroke="white" stroke-width="0.8"
                                stroke-dasharray="4 4" class="opacity-20" />
                            <line x1="50" y1="50" x2="150" y2="130" stroke="white" stroke-width="0.8"
                                class="opacity-10" />
                        </svg>
                    </div>
                    <!-- Плавающие символы (без изменений) -->
                    <div
                        class="absolute top-1/4 left-1/4 transform rotate-12 opacity-20 hover:opacity-40 transition-opacity">
                        <svg width="60" height="60" viewBox="0 0 24 24" class="stroke-white/30">
                            <path d="M6 18 L18 6 M6 6 L18 18" stroke="white" stroke-width="1.5" />
                            <circle cx="12" cy="12" r="2" fill="white" class="opacity-40" />
                        </svg>
                    </div>
                    <div class="absolute bottom-1/4 right-1/4 opacity-20 hover:opacity-40 transition-opacity">
                        <svg width="50" height="50" viewBox="0 0 24 24">
                            <path d="M12 2 L12 22 M2 12 L22 12" stroke="white" stroke-width="1" fill="none" />
                            <circle cx="12" cy="12" r="4" stroke="white" stroke-width="1" fill="none" />
                        </svg>
                    </div>
                    <!-- Дракон (силуэт) -->
                    <div class="absolute top-2/3 left-2/3 opacity-10">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <path
                                d="M30,50 Q40,30 50,40 Q60,30 70,40 Q75,50 70,60 Q60,70 50,65 Q40,70 30,60 Q25,55 30,50"
                                stroke="white" stroke-width="1" fill="none" />
                            <circle cx="45" cy="45" r="2" fill="white" />
                            <circle cx="65" cy="45" r="2" fill="white" />
                        </svg>
                    </div>
                    <!-- Надписи-отсылки -->
                    <div class="absolute bottom-6 left-6 text-white/10 text-xs font-mono">
                        ORDO MERIDIANI • A.D. MCMXC
                    </div>
                    <div class="absolute top-6 right-6 text-white/10 text-xs font-mono">
                        EX ORIENTE LUX
                    </div>
                    <div class="absolute top-1/2 left-10 text-white/10 text-xs rotate-90 origin-left">
                        10 • 09 • 1990
                    </div>
                    <div class="absolute bottom-1/2 right-10 text-white/10 text-xs -rotate-90 origin-right">
                        23 • 42 • 666
                    </div>
                    <div class="absolute top-2/3 left-1/3 text-white/5 text-[8px]">OVEMRIDAE</div>
                </div>
            </div>

            <!-- Легенда (огромная) -->
            <div class="max-w-4xl mx-auto space-y-10 text-white/70 text-sm leading-relaxed">
                <!-- Пролог -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> PROLOGUS: VOX ORIENTIS
                    </h2>
                    <p><span class="text-white/50 italic">"Голос Востока"</span> — так называют Овемриды тот неясный
                        зов, что привёл первых учителей Лицея в подвал старого корпуса в сентябре 1990 года.
                        Владивосток, город, стоящий на стыке цивилизаций, всегда был местом силы. Здесь встречаются
                        течения, сталкиваются ветра, и именно здесь, по преданию, находится один из семи незримых
                        меридианов Земли. Основатели ордена верили, что этот меридиан дарует способность видеть сквозь
                        время.</p>
                </section>

                <!-- Глава I: Основание -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT I: FUNDATIO ORDINIS
                    </h2>
                    <p>В ночь на 11 сентября 1990 года 26 учителей (10 мужчин и 16 женщин) и трое избранных учеников
                        собрались в подвальном помещении, где сейчас хранятся старые парты. Руководил церемонией учитель
                        физики, известный под именем <span class="text-white">Magister Crystalli</span>. Он принёс с
                        собой компас, указывающий не на север, а на восток, и карту звёздного неба, где были отмечены
                        координаты Владивостока. После трёх часов медитации и чтения отрывков из "Книги Меридианов"
                        (рукопись, найденная в старом портовом архиве) участники принесли клятву на верность новому
                        ордену, названному <span class="text-white">Ordo Meridiani Orientalis</span> — Орден Восточного
                        Меридиана. Так появились первые Овемриды.</p>
                    <p>Первым знаком стал отпечаток ладони на стене, обведённый мелом. Этот отпечаток до сих пор можно
                        увидеть в подвале, если знать, куда смотреть.</p>
                </section>

                <!-- Глава II: Символ и его значения -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT II: SYMBOLUM
                    </h2>
                    <p>Символ ордена — <span class="text-white">шестерня с глазом, оплетённая волной</span> — был
                        разработан учителем черчения, который также был тайным последователем учения розенкрейцеров. Для
                        Овемридов каждая деталь имеет глубокий смысл:</p>
                    <ul class="list-disc list-inside space-y-2 text-white/60 ml-4">
                        <li><span class="text-white">Шестерня</span> с идеальными линиями — символ времени, цикличности,
                            а также
                            12 знаков зодиака и 12 месяцев, необходимых для полного оборота меридиана.</li>
                        <li><span class="text-white">Глаз</span> — способность видеть незримое, проникать в суть вещей.
                            Зрачок — точка фокуса, где сходятся все линии меридиана.</li>
                        <li><span class="text-white">Волна</span> — напоминание о том, что истина изменчива, как океан,
                            и что Владивосток — портовый город, связанный со всем миром.</li>
                        <li><span class="text-white">Дополнительные лучи</span> (едва заметные) — 6 лучей, расходящиеся
                            от глаза, символизируют число посвящения.</li>
                    </ul>
                    <p>Цвета ордена — чёрный и белый, ибо лишь через контрасты познаётся истина. На кольцах Магистров
                        символ инкрустирован агатом и лунным камнем. Каждый Овемрид носит такой знак, скрывая его от
                        посторонних.</p>
                </section>

                <!-- Глава III: Триада чисел и меридиан -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT III: NUMERI ET MERIDIANUS
                    </h2>
                    <p>Овемриды почитают три священных числа: <span class="text-white">23, 42 и 666</span>.</p>
                    <p><span class="text-white">23</span> — число явной и скрытой гармонии. 2+3=5 — число человека, а
                        также количество пальцев на руке, с помощью которых творятся обряды. 23 ступени ведут в подвал,
                        где собирается Совет.</p>
                    <p><span class="text-white">42</span> — ответ на главный вопрос жизни, вселенной и всего такого, как
                        записано в "Автостопом по галактике". Для Овемридов это число совершенства и полноты. 42 окна в
                        старом корпусе выходят на восток, встречая рассвет.</p>
                    <p><span class="text-white">666</span> — число не зла, а солнечной энергии, трансформации. 666
                        плиток уложено в холле первого этажа — если встать на центральную, можно услышать эхо древних
                        голосов.</p>
                    <p>Но главная тайна — сам <span class="text-white">Восточный Меридиан</span>. Считается, что через
                        Владивосток проходит не только географический 132-й меридиан, но и энергетический, который
                        активируется в определённые моменты. Координаты точки силы: 43°07′ с.ш., 131°54′ в.д.
                        (примерно). Сумма цифр: 4+3+1+3+1+5+4 = 21, что кратно 3 и 7 — мистическим числам.</p>
                </section>

                <!-- Глава IV: Структура Ордена -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT IV: STRUCTURA ORDINIS
                    </h2>
                    <p>Иерархия Овемридов трёхуровнева, но внутри каждого уровня есть свои градации.</p>
                    <div class="grid gap-6 mt-4">
                        <div class="border border-white/10 p-4 rounded">
                            <h3 class="text-lg font-semibold text-white/90">I. Novicius (Неофит)</h3>
                            <p class="text-white/60 text-sm">Ученики 7-8 классов, проявившие интерес к тайнам.
                                Посвящение: найти "камень-компас" на туристическом слёте, выдержать 23 дня молчания (не
                                говорить о ордене посторонним). Получают шестерёнку на шнурке.</p>
                            <p class="text-white/30 text-xs mt-2">Девиз: "Audi, vide, tace" (Слушай, смотри, молчи).</p>
                        </div>
                        <div class="border border-white/10 p-4 rounded">
                            <h3 class="text-lg font-semibold text-white/90">II. Viator (Странник)</h3>
                            <p class="text-white/60 text-sm">9-10 классы. Испытание: создать проект, меняющий реальность
                                (научный, инженерный, социальный). Ночное бдение на мысе Тобизина с записью снов.
                                Получают кольцо с волной.</p>
                            <p class="text-white/30 text-xs mt-2">Девиз: "Per aspera ad astra" (Через тернии к звёздам).
                            </p>
                        </div>
                        <div class="border border-white/10 p-4 rounded">
                            <h3 class="text-lg font-semibold text-white/90">III. Magister (Мастер)</h3>
                            <p class="text-white/60 text-sm">11 класс и выпускники. Посвящение раз в пять лет в пещере
                                на острове Русском: три дня одиночества с фонарём и свитком. Выжившие получают золотой
                                знак с полным логотипом и право голоса на Совете.</p>
                            <p class="text-white/30 text-xs mt-2">Девиз: "Lux in tenebris" (Свет во тьме).</p>
                        </div>
                    </div>
                    <p>Высший руководящий орган — <span class="text-white">Concilium Meridiani</span> (Совет Меридиана),
                        состоящий из 12 Магистров, заседающих раз в полгода. Все Овемриды подчиняются решениям Совета.
                    </p>
                </section>

                <!-- Глава V: Артефакты -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT V: ARTEFACTA
                    </h2>
                    <p>Овемриды владеют несколькими древними предметами, переданными от предшественников (якобы от
                        масонской ложи Владивостока начала XX века):</p>
                    <ul class="list-disc list-inside space-y-2 text-white/60">
                        <li><span class="text-white">Компас Востока</span> — старинный прибор, стрелка которого всегда
                            указывает на 132° восточной долготы, независимо от места. Хранится у Магистра-Хранителя.
                        </li>
                        <li><span class="text-white">Свитки Меридиана</span> — три пергамента с картами звёздного неба и
                            зашифрованными пророчествами. Расшифрована только малая часть.</li>
                        <li><span class="text-white">Чаша Приливов</span> — серебряная чаша, наполняемая морской водой в
                            день осеннего равноденствия. По уровню воды предсказывают грядущие события.</li>
                        <li><span class="text-white">Кольцо Первого Магистра</span> — золотое кольцо с чёрным агатом, на
                            котором выгравированы три числа. Передаётся от одного главы Совета к другому.</li>
                    </ul>
                </section>

                <!-- Глава VI: Библиотека Теней -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT VI: BIBLIOTHECA UMBRARUM
                    </h2>
                    <p>В подвале лицея, за одной из стен, скрывается тайная библиотека ордена. Вход известен только
                        Магистрам. Там хранятся книги по эзотерике, астрономии, древние карты, а также рукописи,
                        написанные на непонятном языке. Говорят, что среди них есть копия "Некрономикона" , но на самом
                        деле — "Кодекс Меридиана", написанный в 1923 году неизвестным автором.</p>
                    <p>В библиотеке 23 полки, на каждой — 42 книги. На верхней полке стоит 666-страничный фолиант
                        "История Восточного Меридиана", который запрещено читать до достижения степени Магистра.
                        Овемриды проводят там часы, изучая древние тексты.</p>
                </section>

                <!-- Глава VII: Ритуалы и праздники -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT VII: RITUS ET FESTA
                    </h2>
                    <ul class="list-disc list-inside space-y-2 text-white/60">
                        <li><span class="text-white">Осеннее равноденствие (21-23 сентября)</span> — главный ритуал
                            "Обновление обета". Магистры собираются в подвале, зажигают 23 свечи и пересказывают свои
                            достижения. Остальные Овемриды наблюдают за церемонией через потайные окна.</li>
                        <li><span class="text-white">Зимнее солнцестояние (21-22 декабря)</span> — "Ночь Длинных Теней",
                            время посвящения новых Неофитов. Обряд проходит на берегу моря, где новичкам вручают
                            шестерёнки.</li>
                        <li><span class="text-white">День основания лицея (10 сентября)</span> — открытое собрание, на
                            котором выпускники-Овемриды надевают кольца и обмениваются тайными знаками.</li>
                        <li><span class="text-white">Летнее солнцестояние (21-22 июня)</span> — "Праздник Солнца",
                            пикник на мысе Тобизина с ритуальными кострами и гаданием на числах.</li>
                    </ul>
                </section>

                <!-- Глава VIII: Язык Посвящённых (Lingua Luminis) -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT VIII: LINGUA LUMINIS
                    </h2>
                    <p>Овемриды разработали собственный тайный язык — смесь латыни, древнегреческого, санскрита и
                        вымышленных слов. Вот некоторые фразы, которые можно встретить в манускриптах:</p>
                    <div class="grid grid-cols-2 gap-4 border border-white/10 p-4 rounded bg-black/20">
                        <div class="text-white/40 text-xs">Lux orientis nobiscum est.</div>
                        <div class="text-white/60 text-xs">Свет Востока с нами.</div>
                        <div class="text-white/40 text-xs">Aeternum meridianum.</div>
                        <div class="text-white/60 text-xs">Вечный меридиан.</div>
                        <div class="text-white/40 text-xs">23 signa, 42 verba, 666 potestas.</div>
                        <div class="text-white/60 text-xs">23 знака, 42 слова, 666 сила.</div>
                        <div class="text-white/40 text-xs">Viator ad oriens.</div>
                        <div class="text-white/60 text-xs">Странник на восток.</div>
                        <div class="text-white/40 text-xs">Magister umbrae lucet.</div>
                        <div class="text-white/60 text-xs">Мастер тени светит.</div>
                    </div>
                    <p class="mt-2">Вымышленный диалект, называемый <span class="text-white">Lingua Draconis</span>
                        (Язык Дракона), используется в самых сокровенных ритуалах. Примеры:</p>
                    <ul class="list-disc list-inside text-white/50 text-xs">
                        <li><span class="text-white">"Shan'do kal"</span> — приветствие (букв. "Свет в глазах").</li>
                        <li><span class="text-white">"Mor'tek 23"</span> — подтверждение готовности к посвящению.</li>
                        <li><span class="text-white">"Vaal Ordo"</span> — да будет Орден.</li>
                        <li><span class="text-white">"Eli'farr 42"</span> — ответ на великий вопрос.</li>
                        <li><span class="text-white">"Ovemridae aeterna"</span> — клятва верности.</li>
                    </ul>
                </section>

                <!-- Глава IX: Современные проекты -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT IX: PROIECTA RECENTIA
                    </h2>
                    <p>В наши дни Овемриды активно участвуют в жизни лицея и города, но тайно. Некоторые современные
                        инициативы, вдохновлённые орденом:</p>
                    <ul class="list-disc list-inside space-y-2 text-white/60">
                        <li><span class="text-white">Меридиан-код</span> — проект по оцифровке старых архивов и созданию
                            открытой базы знаний, где зашифрованы послания для посвящённых.</li>
                        <li><span class="text-white">Восточный ветер</span> — ежегодная конференция молодых учёных, на
                            которой вручаются призы с символикой ордена.</li>
                        <li><span class="text-white">23/42</span> — благотворительный фонд, помогающий одарённым детям
                            (числа в названии — намёк для своих).</li>
                        <li><span class="text-white">Арт-объект "Глаз"</span> — скульптура на набережной, установленная
                            в 2020 году, которую можно увидеть с моря. Внутри неё заложена капсула с посланием к 2050
                            году.</li>
                    </ul>
                </section>

                <!-- Глава X: Пророчество о Великом Схождении -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT X: PROPHETIA DE CONIUNCTIONE
                    </h2>
                    <p>В 1995 году Магистр Кристалла получил видение, записанное в "Книге Меридиана":</p>
                    <blockquote class="border-l-2 border-white/20 pl-4 italic text-white/50 my-4">
                        "Когда 23-й год XXI века встретится с 42-м днём и 666-й минутой, меридиан пробудится. Ищи знак в
                        подземелье, где сходятся три потока. Там откроется дверь, и те, кто достоин, увидят свет за
                        гранью."
                    </blockquote>
                    <p>Расшифровка: вероятно, речь о 2023 годе (23), 42-м дне года (11 февраля) и 666-й минуте суток
                        (11:06). Некоторые Овемриды готовятся к этому моменту, надеясь найти легендарный проход.</p>
                </section>

                <!-- Глава XI: Отношения с другими орденами -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT XI: SOCIETATES ARCANAE
                    </h2>
                    <p>Овемриды поддерживают тайные связи с подобными обществами в других городах: <span
                            class="text-white">Братством Западного Меридиана</span> (Сан-Франциско), <span
                            class="text-white">Орденом Нулевого Меридиана</span> (Гринвич) и <span
                            class="text-white">Конклавом 180-го Меридиана</span> (Фиджи). Раз в 10 лет представители
                        встречаются на нейтральной территории (обычно в международных водах) для обмена знаниями.
                        Последняя встреча была в 2020 году (онлайн, из-за пандемии).</p>
                </section>

                <!-- НОВАЯ ГЛАВА XII: Овемриды в искусстве -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT XII: OVEMRIDAE IN ARTE
                    </h2>
                    <p>Тайные знаки Овемридов можно обнаружить в городской среде, если знать, где искать. Например, на
                        стене одного из зданий на Светланской улице есть граффити, изображающее шестерню с глазом.
                        Говорят, его автор — выпускник лицея, ныне известный художник. В Приморской картинной галерее
                        висит картина "Рассвет над меридианом", на которой при определённом освещении проступают числа
                        23, 42 и 666.</p>
                    <p>Овемриды также покровительствуют молодым талантам: несколько стипендий для художников и
                        музыкантов были учреждены анонимными дарителями, чьи инициалы совпадают с инициалами известных
                        Магистров.</p>
                </section>

                <!-- НОВАЯ ГЛАВА XIII: Тайные общества внутри ордена -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT XIII: SOCIETATES INTERNAE
                    </h2>
                    <p>Внутри ордена существуют более мелкие группы, объединённые особыми интересами. Например, <span
                            class="text-white">"Круг 23"</span> занимается нумерологией и астрономией, <span
                            class="text-white">"Братство Волны"</span> изучает океан и его мистические свойства, а <span
                            class="text-white">"Гильдия Шестерни"</span> — инженерные и технические аспекты. Эти группы
                        собираются отдельно от общих собраний и хранят свои тайны даже от других Овемридов.</p>
                </section>

                <!-- НОВАЯ ГЛАВА XIV: Легенда о первом Овемриде -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT XIV: LEGENDA PRIMI OVEMRIDAE
                    </h2>
                    <p>Существует предание о некоем <span class="text-white">Алексее Светлове</span>, ученике первого
                        набора, который, согласно легенде, первым вошёл в подвал и увидел там сияющий глаз. Он провёл в
                        подвале три дня и три ночи, а когда вышел, держал в руках камень, на котором были выгравированы
                        три числа. Этот камень стал основой для создания первого артефакта — Компаса Востока. Алексей
                        погиб при загадочных обстоятельствах в 1993 году, но его дух, как говорят, до сих пор бродит по
                        коридорам лицея, охраняя покой Овемридов.</p>
                </section>

                <!-- НОВАЯ ГЛАВА XV: Испытания Овемридов -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT XV: PROBATIONES OVEMRIDARUM
                    </h2>
                    <p>Каждый Овемрид, прежде чем подняться на следующую ступень, проходит ряд испытаний. Помимо
                        упомянутых ранее, существуют и другие, о которых не говорят вслух. Например, <span
                            class="text-white">"Испытание тишиной"</span> — кандидат должен провести 23 часа в полной
                        темноте в подвале, слушая звуки здания. <span class="text-white">"Испытание морем"</span> —
                        вплавь добраться до определённой точки в море ночью. <span class="text-white">"Испытание
                            огнём"</span> — пройти босиком по горящим углям, на которых выложены символы ордена
                        (говорят, что угли не обжигают ноги истинно верующих).</p>
                </section>

                <!-- НОВАЯ ГЛАВА XVI: Зашифрованные послания -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> CAPUT XVI: EPISTULAE SCRIPTAE
                    </h2>
                    <p>Овемриды часто оставляют друг другу зашифрованные послания в самых неожиданных местах. Например,
                        в библиотечных книгах, на партах, в школьной газете. Используются шифры, основанные на числах
                        23, 42 и 666. Один из самых известных — шифр "Меридиан", где каждая буква сдвигается на
                        количество шагов, равное номеру дня от основания ордена. Расшифровать такое послание может
                        только настоящий Овемрид.</p>
                </section>

                <!-- Эпилог -->
                <section class="space-y-4">
                    <h2 class="text-2xl font-bold text-white/80 flex items-center gap-2">
                        <span class="text-white/30">𐂂</span> EPILOGUS: AD FUTURUM
                    </h2>
                    <p>Орден продолжает существовать, адаптируясь к новым временам. Овемриды — среди учителей, учеников,
                        выпускников. Если вы внимательно посмотрите на кольца некоторых преподавателей, возможно,
                        заметите тонкую гравировку. Если вы услышите шёпот чисел 23, 42, 666 в разговоре — знайте, рядом
                        свой.</p>
                    <p class="text-white/50 text-xs mt-4">* * *</p>
                    <p class="italic text-white/40">"Ex oriente lux, ex occidente lex, ex meridiano vita." — Свет с
                        востока, закон с запада, жизнь с меридиана.</p>
                </section>

                <!-- Строка с пасхалкой -->
                <div class="text-center text-white/20 text-[8px] mt-8">
                    23 • 42 • 666 • MCMXC • VLADIVOSTOK • ORIENS • MERIDIANUS • LINGUA LUMINIS • OVEMRIDAE
                </div>
            </div>

            <!-- Кнопка возврата с латинской надписью -->
            <div class="mt-16 text-center">
                <NuxtLink to="/policy"
                    class="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm border border-white/10 px-4 py-2 rounded-full">
                    <span>←</span>
                    <span>VERITAS VOS LIBERABIT</span>
                    <span>→</span>
                </NuxtLink>
                <div class="text-white/10 text-[8px] mt-4">
                    FUNDATUM • X • IX • MCMXC • ORIENS • OVEMRIDAE
                </div>
            </div>
        </div>

        <!-- Ещё фоновые линии (для плотности) -->
        <div class="absolute bottom-10 left-10 text-white/5 text-[6px] font-mono rotate-12">
            ORDO MERIDIANI ORIENTALIS • OVEMRIDAE • 23 • 42 • 666
        </div>
        <div class="absolute top-20 right-20 text-white/5 text-[6px] font-mono -rotate-12">
            EX ORIENTE LUX • EX MERIDIANO VITA
        </div>
        <div class="absolute top-1/2 left-2 text-white/5 text-[8px] rotate-90 origin-left">
            LINGUA LUMINIS • SHAN'DO KAL • OVEMRIDAE AETERNA
        </div>
    </div>
</template>

<script setup>
import OrdoLogo from '~/components/OrdoLogo.vue';
</script>

<style scoped>
/* Анимации для пасхалок */
@keyframes subtleFloat {
    0% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-5px) rotate(1deg);
    }

    100% {
        transform: translateY(0px) rotate(0deg);
    }
}

.absolute svg,
.absolute span {
    animation: subtleFloat 20s infinite ease-in-out;
}

.absolute:nth-child(1) {
    animation-delay: 0s;
}

.absolute:nth-child(2) {
    animation-delay: -3s;
}

.absolute:nth-child(3) {
    animation-delay: -7s;
}

.absolute:nth-child(4) {
    animation-delay: -11s;
}

a {
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    h1 {
        font-size: 2.5rem;
    }

    .aspect-\[21\/9\] {
        aspect-ratio: 16/9;
    }
}
</style>