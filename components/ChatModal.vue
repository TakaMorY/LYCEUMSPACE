<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        <div
            class="bg-neutral-900/95 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden border border-neutral-700/50 shadow-2xl">
            <!-- Заголовок -->
            <div class="flex items-center justify-between p-4 border-b border-neutral-800">
                <h2 class="text-xl font-bold text-white">Личные сообщения</h2>
                <button @click="$emit('close')" class="p-1 hover:bg-neutral-800 rounded-lg transition">
                    <svg class="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="flex flex-1 overflow-hidden">
                <!-- Список чатов -->
                <div class="w-80 border-r border-neutral-800 overflow-y-auto">
                    <div class="p-4">
                        <input v-model="searchQuery" type="text" placeholder="Поиск пользователей..."
                            class="w-full px-4 py-2 bg-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-600" />
                    </div>

                    <div class="space-y-1">
                        <button v-for="chat in filteredChats" :key="chat.user.id" @click="selectChat(chat.user)"
                            class="w-full p-4 text-left hover:bg-neutral-800/50 transition-colors"
                            :class="{ 'bg-neutral-800': selectedUser?.id === chat.user.id }">
                            <div class="flex items-center gap-3">
                                <img :src="chat.user.avatar_url || '/images/defaultavatar/default-avatar.png'"
                                    class="w-10 h-10 rounded-full" />
                                <div class="flex-1 min-w-0">
                                    <div class="font-medium text-white truncate">
                                        {{ chat.user.full_name || chat.user.username }}
                                    </div>
                                    <div class="text-sm text-neutral-400 truncate">
                                        @{{ chat.user.username }}
                                    </div>
                                </div>
                                <div v-if="chat.unread > 0"
                                    class="w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                                    {{ chat.unread }}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Область чата -->
                <div class="flex-1 flex flex-col">
                    <div v-if="selectedUser" class="flex-1 flex flex-col">
                        <!-- Информация о собеседнике -->
                        <div class="p-4 border-b border-neutral-800">
                            <div class="flex items-center gap-3">
                                <img :src="selectedUser.avatar_url || '/images/defaultavatar/default-avatar.png'"
                                    class="w-10 h-10 rounded-full" />
                                <div>
                                    <div class="font-medium text-white">{{ selectedUser.full_name ||
                                        selectedUser.username }}</div>
                                    <div class="text-sm text-neutral-400">@{{ selectedUser.username }}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Сообщения -->
                        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-3">
                            <div v-for="msg in messages" :key="msg.id" class="flex"
                                :class="msg.sender_id === user?.id ? 'justify-end' : 'justify-start'">
                                <div :class="msg.sender_id === user?.id ? 'bg-blue-600' : 'bg-neutral-800'"
                                    class="max-w-[70%] rounded-lg p-3">
                                    <p class="text-white text-sm whitespace-pre-wrap">{{ msg.content }}</p>
                                    <span class="text-xs text-neutral-400 mt-1 block">
                                        {{ formatTime(msg.created_at) }}
                                        <span v-if="msg.sender_id === user?.id && msg.read" class="ml-1">✓✓</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Форма отправки -->
                        <div class="p-4 border-t border-neutral-800">
                            <div class="flex gap-2">
                                <textarea v-model="newMessage" @keydown.enter.exact.prevent="sendMessage"
                                    placeholder="Напишите сообщение..." rows="2"
                                    class="flex-1 px-4 py-2 bg-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"></textarea>
                                <button @click="sendMessage" :disabled="!newMessage.trim()"
                                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-white font-medium transition">
                                    Отправить
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-else class="flex-1 flex items-center justify-center text-neutral-500">
                        Выберите чат для начала общения
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

const emit = defineEmits(['close'])
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const searchQuery = ref('')
const selectedUser = ref(null)
const messages = ref([])
const newMessage = ref('')
const messagesContainer = ref(null)
const chats = ref([])

// Загрузка списка чатов
const loadChats = async () => {
    if (!user.value) return

    // Получаем всех пользователей, с которыми были сообщения
    const { data: conversations } = await supabase
        .from('messages')
        .select('sender_id, receiver_id')
        .or(`sender_id.eq.${user.value.id},receiver_id.eq.${user.value.id}`)

    const userIds = new Set()
    conversations?.forEach(conv => {
        if (conv.sender_id !== user.value.id) userIds.add(conv.sender_id)
        if (conv.receiver_id !== user.value.id) userIds.add(conv.receiver_id)
    })

    if (userIds.size === 0) return

    // Получаем информацию о пользователях
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, full_name, avatar_url')
        .in('id', Array.from(userIds))

    // Получаем количество непрочитанных сообщений для каждого чата
    const chatsWithUnread = await Promise.all(profiles.map(async (profile) => {
        const { count } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('sender_id', profile.id)
            .eq('receiver_id', user.value.id)
            .eq('read', false)

        return {
            user: profile,
            unread: count || 0
        }
    }))

    chats.value = chatsWithUnread.sort((a, b) => b.unread - a.unread)
}

// Фильтрация чатов
const filteredChats = computed(() => {
    if (!searchQuery.value) return chats.value
    const q = searchQuery.value.toLowerCase()
    return chats.value.filter(chat =>
        chat.user.username?.toLowerCase().includes(q) ||
        chat.user.full_name?.toLowerCase().includes(q)
    )
})

// Загрузка сообщений с выбранным пользователем
const loadMessages = async () => {
    if (!selectedUser.value || !user.value) return

    const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user.value.id},receiver_id.eq.${selectedUser.value.id}),and(sender_id.eq.${selectedUser.value.id},receiver_id.eq.${user.value.id})`)
        .order('created_at', { ascending: true })

    messages.value = data || []

    // Отмечаем сообщения как прочитанные
    await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_id', selectedUser.value.id)
        .eq('receiver_id', user.value.id)
        .eq('read', false)

    // Прокручиваем вниз
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }

    // Обновляем список чатов
    loadChats()
}

// Отправка сообщения
const sendMessage = async () => {
    if (!newMessage.value.trim() || !selectedUser.value) return

    const { error } = await supabase
        .from('messages')
        .insert({
            sender_id: user.value.id,
            receiver_id: selectedUser.value.id,
            content: newMessage.value.trim()
        })

    if (!error) {
        newMessage.value = ''
        await loadMessages()
    }
}

// Выбор чата
const selectChat = async (user) => {
    selectedUser.value = user
    await loadMessages()
}

// Realtime подписка на новые сообщения
let messagesChannel

onMounted(() => {
    loadChats()

    messagesChannel = supabase
        .channel('private:messages')
        .on('postgres_changes', {
            event: 'INSERT',
            schema: 'private',
            table: 'messages',
            filter: `receiver_id=eq.${user.value?.id}`
        }, () => {
            if (selectedUser.value) {
                loadMessages()
            }
            loadChats()
        })
        .subscribe()
})

onUnmounted(() => {
    if (messagesChannel) {
        supabase.removeChannel(messagesChannel)
    }
})

const formatTime = (date) => {
    const d = new Date(date)
    return d.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 0.2s ease-out;
}
</style>