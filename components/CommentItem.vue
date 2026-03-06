<template>
  <div class="comment-item">
    <div class="flex gap-2">
      <NuxtLink :to="`/forum/profile?id=${comment.user_id}`">
        <UserAvatar :user="comment.user" class="w-8 h-8" />
      </NuxtLink>
      
      <div class="flex-1">
        <div class="flex items-center gap-2 flex-wrap">
          <NuxtLink :to="`/forum/profile?id=${comment.user_id}`" class="font-medium hover:text-blue-400">
            {{ comment.user?.name || comment.user?.username }}
          </NuxtLink>
          <span class="text-neutral-500 text-xs">· {{ formatDate(comment.created_at) }}</span>
        </div>
        
        <p class="mt-1 text-white text-sm">{{ comment.content }}</p>
        
        <button @click="$emit('reply', comment)" class="text-xs text-blue-500 hover:text-blue-400 mt-1 transition">
          Ответить
        </button>

        <!-- Вложенные комментарии -->
        <div v-if="comment.replies?.length" class="ml-6 mt-3 space-y-3 border-l-2 border-neutral-800 pl-3">
          <CommentItem
            v-for="reply in comment.replies"
            :key="reply.id"
            :comment="reply"
            @reply="$emit('reply', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserAvatar from './UserAvatar.vue'

defineProps({
  comment: Object
})
defineEmits(['reply'])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>