<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click="$emit('close')">
    <div class="bg-neutral-900 rounded-2xl max-w-lg w-full p-6 border border-white/10 max-h-[90vh] overflow-y-auto" @click.stop>
      <slot />
    </div>
  </div>
</template>
<script setup> defineEmits(['close']) </script>