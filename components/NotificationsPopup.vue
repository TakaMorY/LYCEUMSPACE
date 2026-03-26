<template>
    <div class="fixed bottom-4 right-4 z-50 space-y-2">
        <div v-for="notif in notifications" :key="notif.id"
            class="bg-neutral-800 border border-neutral-700 text-white p-4 rounded-xl shadow-lg max-w-sm animate-slide-in">
            <div class="font-medium">
                {{ notif.type === 'like' ? '❤️ Новый лайк' : '💬 Новый комментарий' }}
            </div>
            <div class="text-sm text-neutral-300">
                {{ notif.actor?.username }} {{ notif.type === 'like' ? 'оценил(а)' : 'прокомментировал(а)' }} ваш пост
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const notifications = ref([])

let channel

onMounted(() => {
    if (!user.value) return

    // Загрузить непрочитанные уведомления при старте
    loadNotifications()

    // Подписка на новые уведомления
    channel = supabase
        .channel('notifications')
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${user.value.id}`
            },
            async (payload) => {
                // Загружаем данные об авторе действия (actor)
                const { data: actor } = await supabase
                    .from('profiles')
                    .select('username')
                    .eq('id', payload.new.actor_id)
                    .single()

                const notif = { ...payload.new, actor }
                notifications.value.push(notif)

                // Автоматически скрыть через 5 секунд
                setTimeout(() => {
                    notifications.value = notifications.value.filter(n => n.id !== notif.id)
                }, 5000)
            }
        )
        .subscribe()
})

onUnmounted(() => {
    supabase.removeChannel(channel)
})

const loadNotifications = async () => {
    const { data } = await supabase
        .from('notifications')
        .select('*, actor:actor_id (username)')
        .eq('user_id', user.value.id)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(5)

    if (data) notifications.value = data
}
</script>

<style scoped>
@keyframes slide-in {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.animate-slide-in {
    animation: slide-in 0.3s ease-out;
}
</style>