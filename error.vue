<template>

    <section class="relative min-h-screen bg-neutral-900 overflow-hidden flex items-center justify-center ">
        <!-- Background elements -->
        <div class="absolute inset-0 opacity-20">
            <div class="absolute top-20 left-10 w-40 h-40 rounded-full bg-neutral-600 blur-3xl"></div>
            <div class="absolute bottom-20 right-10 w-60 h-60 bg-neutral-600 blur-3xl"></div>
        </div>



        <!-- Glitch text container -->
        <div class="relative z-10 text-center max-w-2xl mx-auto">
            <!-- 404 with glitch effect -->
            <div class="relative mb-12">
                <h1 class="text-[120px] md:text-[180px] font-bold text-white tracking-tighter">
                    <span class="relative">
                        <span class="absolute inset-0 text-neutral-400 opacity-70 animate-glitch-1">404</span>
                        <span class="absolute inset-0 text-neutral-800 opacity-70 animate-glitch-2">404</span>
                        <span class="relative">404</span>
                    </span>
                </h1>
            </div>

            <!-- Main heading -->
            <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
                Страница не найдена
            </h2>

            <!-- Description -->
            <p class="text-gray-400 text-lg mb-10">
                Ой! Кажется вы забрели не туда. Мы не смогли найти такой страницы.
            </p>

            <!-- Animated button -->
            <button
                class="relative px-8 py-4 bg-gradient-to-r from-neutral-700 to-neutral-500 text-white font-bold rounded-lg overflow-hidden group">
                <NuxtLink to="/" class="relative z-10">Вернуться на главную</NuxtLink>
                <span
                    class="absolute inset-0 bg-gradient-to-r from-neutral-500 to-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
        </div>

        <!-- Floating elements -->
        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <div class="w-3 h-3 bg-neutral-700 rounded-full animate-float delay-100"></div>
            <div class="w-2 h-2 bg-neutral-500 rounded-full animate-float delay-300"></div>
            <div class="w-4 h-4 bg-white rounded-full animate-float delay-500"></div>
        </div>
    </section>
</template>
<style>
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

@keyframes glitch-1 {
    0% {
        transform: translate(0);
    }

    20% {
        transform: translate(-5px, 5px);
    }

    40% {
        transform: translate(-5px, -5px);
    }

    60% {
        transform: translate(5px, 5px);
    }

    80% {
        transform: translate(5px, -5px);
    }

    100% {
        transform: translate(0);
    }
}

@keyframes glitch-2 {
    0% {
        transform: translate(0);
    }

    25% {
        transform: translate(5px, -5px);
    }

    50% {
        transform: translate(-5px, 5px);
    }

    75% {
        transform: translate(5px, 5px);
    }

    100% {
        transform: translate(0);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-glitch-1 {
    animation: glitch-1 2.5s infinite;
}

.animate-glitch-2 {
    animation: glitch-2 3s infinite;
}
</style>
