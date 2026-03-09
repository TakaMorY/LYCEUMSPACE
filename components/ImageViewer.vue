<template>
  <Teleport to="body">
    <div v-if="imageUrl" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" @click="close">
      <div class="relative max-w-full max-h-full" @click.stop>
        <img :src="imageUrl" class="max-w-full max-h-screen object-contain rounded-lg" />
        <button @click="close" class="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    default: null
  }
})
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>