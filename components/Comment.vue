<template>
  <div class="flex items-start space-x-2 text-sm">
    <img :src="comment.profiles?.avatar_url || '/images/defaultavatar/default-avatar.png'" class="w-6 h-6 rounded-full" />
    <div>
      <span class="font-semibold text-white">{{ comment.profiles?.username }}</span>
      <span class="text-neutral-500 ml-2">{{ formatDate(comment.created_at) }}</span>
      <p class="mt-0.5 text-white/90">{{ comment.content }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  comment: Object
})
const formatDate = (date) => new Date(date).toLocaleDateString('ru', { day: 'numeric', month: 'short' })
</script>