<template>
  <div class="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-neutral-800/20 rounded-xl border border-neutral-700/30 hover:bg-neutral-800/30 transition-colors">
    <NuxtLink :to="`/profile/${comment.user_id}`" class="flex-shrink-0">
      <img :src="comment.profiles?.avatar_url || '/images/defaultavatar/default-avatar.png'" class="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-neutral-700/50" />
    </NuxtLink>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1 flex-wrap text-xs sm:text-sm">
        <NuxtLink :to="`/profile/${comment.user_id}`" class="font-semibold text-white hover:underline">{{ comment.profiles?.username }}</NuxtLink>
        <span class="text-neutral-500">{{ formatTime(comment.created_at) }}</span>
      </div>
      <p class="text-white/80 text-xs sm:text-sm whitespace-pre-wrap">{{ comment.content }}</p>
      <img
        v-if="comment.image_url"
        :src="comment.image_url"
        class="mt-2 max-h-32 sm:max-h-40 rounded-lg cursor-pointer hover:opacity-90 transition"
        @click="$emit('open-image', comment.image_url)"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({ comment: Object })
defineEmits(['open-image'])
const formatTime = (date) => new Date(date).toLocaleString()
</script>