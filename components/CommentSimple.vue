<template>
    <div class="flex gap-4 p-4 bg-white/5 rounded-xl">
        <NuxtLink :to="`/profile/${comment.user_id}`" class="flex-shrink-0">
            <img :src="comment.profiles?.avatar_url || '/images/defaultavatar/default-avatar.png'"
                class="w-10 h-10 rounded-full" />
        </NuxtLink>
        <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
                <NuxtLink :to="`/profile/${comment.user_id}`" class="font-semibold text-white hover:underline">
                    {{ comment.profiles?.username }}
                </NuxtLink>
                <span class="text-sm text-neutral-500">{{ formatTime(comment.created_at) }}</span>
            </div>
            <p class="text-white/80 whitespace-pre-wrap">{{ comment.content }}</p>
            <img v-if="comment.image_url" :src="comment.image_url" class="mt-2 max-h-40 rounded-lg" />
        </div>
    </div>
</template>

<script setup>
defineProps({ comment: Object })
const formatTime = (date) => new Date(date).toLocaleString()
</script>