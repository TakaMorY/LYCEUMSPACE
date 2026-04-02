<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="px-4 py-2 rounded-lg shadow-lg text-white text-sm"
      :class="{
        'bg-green-600': toast.type === 'success',
        'bg-red-600': toast.type === 'error',
        'bg-blue-600': toast.type === 'info',
      }"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { useToast } from '~/composables/useToast'
const { toasts } = useToast()
</script>