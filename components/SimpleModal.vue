<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <!-- Затемнение фона -->
          <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" @click="close"></div>
          
          <!-- Модальное окно -->
          <div class="relative bg-neutral-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-neutral-800 shadow-2xl">
            <!-- Заголовок -->
            <div class="flex items-center justify-between p-4 border-b border-neutral-800">
              <h3 class="text-lg font-semibold">{{ title }}</h3>
              <button @click="close" class="p-1 hover:bg-neutral-800 rounded-full transition">
                <Icon name="heroicons:x-mark" class="w-6 h-6" />
              </button>
            </div>
            
            <!-- Контент -->
            <div class="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
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
  title: String
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>