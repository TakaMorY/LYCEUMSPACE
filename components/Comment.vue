<template>
  <NuxtLink :to="`/post/${comment.post_id}/comment/${comment.id}`" class="block hover:bg-white/5 transition rounded-xl">
    <div class="flex gap-3" :class="size === 'large' ? 'p-4' : 'p-3'">
      <NuxtLink :to="`/profile/${comment.user_id}`" class="flex-shrink-0">
        <img
          :src="comment.profiles?.avatar_url || '/images/defaultavatar/default-avatar.png'"
          class="rounded-full"
          :class="size === 'large' ? 'w-10 h-10' : 'w-8 h-8'"
        />
      </NuxtLink>
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-1">
          <NuxtLink :to="`/profile/${comment.user_id}`" class="font-semibold text-white hover:underline" :class="size === 'large' ? 'text-base' : 'text-sm'">
            {{ comment.profiles?.username }}
          </NuxtLink>
          <span class="text-xs text-neutral-500">{{ formatTime(comment.created_at) }}</span>
        </div>
        <p class="text-white/80 whitespace-pre-wrap" :class="size === 'large' ? 'text-base' : 'text-sm'">
          {{ comment.content }}
        </p>
        <img v-if="comment.image_url" :src="comment.image_url" class="mt-2 max-h-40 rounded-lg" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  comment: Object,
  size: { type: String, default: 'normal' } // новый пропс
})
const formatTime = (date) => new Date(date).toLocaleString()
</script>