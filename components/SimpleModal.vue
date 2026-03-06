<template>
    <Teleport to="body">
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="modelValue" class="fixed inset-0 z-50" @click.self="close">
                <!-- Оверлей -->
                <div class="absolute inset-0 bg-black/40 dark:bg-black/60" @click="close"></div>

                <!-- Модалка -->
                <div class="absolute inset-x-0 bottom-0 sm:inset-10 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:max-w-2xl sm:mx-auto"
                    :class="{ 'h-full sm:h-auto': fullscreen }">
                    <div
                        class="bg-white dark:bg-gray-900 rounded-t-xl sm:rounded-xl shadow-2xl h-full sm:h-auto flex flex-col">
                        <!-- Заголовок -->
                        <div class="flex items-center justify-between p-4 border-b dark:border-gray-800">
                            <h3 class="text-lg font-semibold">{{ title }}</h3>
                            <button @click="close" class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                                <Icon name="heroicons:x-mark" class="w-5 h-5" />
                            </button>
                        </div>
                        <!-- Контент -->
                        <div class="flex-1 overflow-y-auto p-4">
                            <slot />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
defineProps({
    modelValue: Boolean,
    fullscreen: Boolean,
    title: String
})
const emit = defineEmits(['update:modelValue'])
const close = () => emit('update:modelValue', false)
</script>