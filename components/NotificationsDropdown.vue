<template>
    <div class="relative" v-click-outside="closeDropdown">
        <button @click="toggleDropdown"
            class="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10 relative"
            title="Уведомления">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadCount > 0"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center text-[10px] font-medium">{{
                    unreadCount > 9 ? '9+' : unreadCount }}</span>
        </button>

        <div v-if="isOpen"
            class="absolute right-0 mt-2 w-80 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden z-50">
            <div class="p-3 border-b border-neutral-700 flex justify-between items-center">
                <h3 class="text-white font-semibold">Уведомления</h3>
                <button v-if="unreadCount > 0" @click="markAllRead"
                    class="text-xs text-blue-400 hover:text-blue-300 transition">
                    Прочитать все
                </button>
            </div>
            <div class="max-h-96 overflow-y-auto">
                <div v-if="loading" class="p-4 text-center text-neutral-400">
                    <div
                        class="inline-block w-6 h-6 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin">
                    </div>
                </div>
                <div v-else-if="notifications.length === 0" class="p-4 text-center text-neutral-500">
                    Нет уведомлений
                </div>
                <div v-else>
                    <div v-for="notif in notifications" :key="notif.id"
                        class="p-3 hover:bg-neutral-700/50 border-b border-neutral-700/30 cursor-pointer transition"
                        :class="{ 'bg-neutral-700/20': !notif.read }" @click="handleNotificationClick(notif)">
                        <div class="flex items-start gap-2">
                            <img :src="notif.actor?.avatar_url || '/images/defaultavatar/default-avatar.png'"
                                class="w-8 h-8 rounded-full flex-shrink-0" />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm text-white">
                                    <span class="font-semibold">{{ notif.actor?.username }}</span>
                                    <span class="text-neutral-300">
                                        {{ notif.type === 'like_post' ? 'лайкнул(а) ваш пост' : '' }}
                                        {{ notif.type === 'comment' ? 'оставил(а) комментарий' : '' }}
                                        {{ notif.type === 'like_comment' ? 'лайкнул(а) ваш комментарий' : '' }}
                                    </span>
                                </p>
                                <p class="text-xs text-neutral-400 mt-1">{{ formatTime(notif.created_at) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const isOpen = ref(false)
const notifications = ref([])
const loading = ref(true)
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

// Загрузка уведомлений
const loadNotifications = async () => {
    if (!user.value) return
    loading.value = true
    const { data, error } = await supabase
        .from('notifications')
        .select(`
      *,
      actor:actor_id (id, username, avatar_url)
    `)
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false })
        .limit(20)
    if (!error) notifications.value = data || []
    loading.value = false
}

// Подписка на новые уведомления
let channel
onMounted(() => {
    if (!user.value) return
    loadNotifications()
    channel = supabase
        .channel('notifications')
        .on('postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.value.id}` },
            async (payload) => {
                const { data: actor } = await supabase
                    .from('profiles')
                    .select('id, username, avatar_url')
                    .eq('id', payload.new.actor_id)
                    .single()
                notifications.value = [{ ...payload.new, actor }, ...notifications.value]
            }
        )
        .subscribe()
})

onUnmounted(() => {
    if (channel) supabase.removeChannel(channel)
})

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const closeDropdown = () => {
    isOpen.value = false
}

const markAllRead = async () => {
    const ids = notifications.value.filter(n => !n.read).map(n => n.id)
    if (ids.length === 0) return
    const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .in('id', ids)
    if (!error) {
        notifications.value.forEach(n => { if (!n.read) n.read = true })
    }
}

const handleNotificationClick = async (notif) => {
    if (!notif.read) {
        await supabase.from('notifications').update({ read: true }).eq('id', notif.id)
        notif.read = true
    }
    // Переход к посту или комментарию
    if (notif.post_id) {
        await navigateTo(`/post/${notif.post_id}`)
    }
    closeDropdown()
}

const formatTime = (date) => {
    const d = new Date(date)
    const now = new Date()
    const diff = now - d
    // менее часа назад
    if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000))
        return `${minutes} мин. назад`
    }
    // сегодня
    if (d.toDateString() === now.toDateString()) {
        return d.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
    }
    // вчера
    const yesterday = new Date(now)
    yesterday.setDate(yesterday.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) {
        return 'вчера'
    }
    // иначе дата
    return d.toLocaleDateString('ru', { day: 'numeric', month: 'short' })
}
</script>

<!-- Директива v-click-outside -->
<script>
export default {
    directives: {
        clickOutside: {
            mounted(el, binding) {
                el._clickOutside = (event) => {
                    if (!(el === event.target || el.contains(event.target))) {
                        binding.value(event)
                    }
                }
                document.addEventListener('click', el._clickOutside)
            },
            unmounted(el) {
                document.removeEventListener('click', el._clickOutside)
            }
        }
    }
}
</script>