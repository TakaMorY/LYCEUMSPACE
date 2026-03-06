<template>
  <div class="flex-shrink-0">
    <img
      v-if="user?.avatar"
      :src="user.avatar"
      :alt="user.name"
      class="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-800"
    />
    <div
      v-else
      class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold"
    >
      {{ initial }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: Object
})

const initial = computed(() => {
  if (!props.user) return '?'
  if (props.user.name) return props.user.name.charAt(0).toUpperCase()
  if (props.user.username) return props.user.username.charAt(0).toUpperCase()
  if (props.user.email) return props.user.email.charAt(0).toUpperCase()
  return '?'
})
</script>