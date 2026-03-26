<template>
    <div class="max-w-6xl mx-auto h-full">
        <div
            class="bg-neutral-900/40 backdrop-blur-xl rounded-2xl border border-neutral-700/50 overflow-hidden h-[calc(100vh-8rem)] flex flex-col md:flex-row">
            <!-- Левая панель: список диалогов -->
            <div :class="[
                'w-full md:w-80 border-b md:border-b-0 md:border-r border-neutral-800 flex flex-col overflow-hidden transition-all duration-300',
                selectedUser && !isFavorites ? 'hidden md:flex' : 'flex'
            ]">
                <div class="p-4 border-b border-neutral-800 shrink-0">
                    <h2 class="text-xl font-bold text-white">Чаты</h2>
                </div>

                <div class="p-4 shrink-0">
                    <div class="relative">
                        <input v-model="searchQuery" type="text" placeholder="Поиск пользователя..."
                            class="w-full px-4 py-2 bg-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition" />
                    </div>
                </div>

                <div v-if="searchQuery" class="flex-1 overflow-y-auto custom-scroll">
                    <div v-if="searching" class="text-center py-8">
                        <div
                            class="inline-block w-6 h-6 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin">
                        </div>
                    </div>
                    <div v-else-if="userResults.length === 0" class="text-center py-8 text-neutral-500">
                        Пользователи не найдены
                    </div>
                    <div v-else>
                        <button v-for="user in userResults" :key="user.id" @click="startChat(user)"
                            class="w-full p-3 text-left hover:bg-neutral-800/50 transition-colors flex items-center gap-3">
                            <div class="relative">
                                <img :src="user.avatar_url || '/images/defaultavatar/default-avatar.png'"
                                    class="w-10 h-10 rounded-full" />
                                <div v-if="user.status?.is_online"
                                    class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-800">
                                </div>
                            </div>
                            <div>
                                <div class="font-medium text-white">{{ user.full_name || user.username }}</div>
                                <div class="text-sm text-neutral-400">@{{ user.username }}</div>
                            </div>
                        </button>
                    </div>
                </div>

                <div v-else class="flex-1 overflow-y-auto custom-scroll">
                    <button @click="openFavorites"
                        class="w-full p-3 text-left hover:bg-neutral-800/50 transition-colors flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                            <svg class="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <div>
                            <div class="font-medium text-white">Избранное</div>
                            <div class="text-sm text-neutral-400">Личные заметки</div>
                        </div>
                    </button>

                    <button v-for="chat in chats" :key="chat.user.id" @click="selectChat(chat.user)"
                        class="w-full p-3 text-left hover:bg-neutral-800/50 transition-colors flex items-center gap-3"
                        :class="{ 'bg-neutral-800/50': selectedUser?.id === chat.user.id }">
                        <div class="relative">
                            <img :src="chat.user.avatar_url || '/images/defaultavatar/default-avatar.png'"
                                class="w-10 h-10 rounded-full" />
                            <div v-if="chat.user.status?.is_online"
                                class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-800">
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="font-medium text-white truncate">{{ chat.user.full_name || chat.user.username }}
                            </div>
                            <div class="text-sm text-neutral-400 truncate">@{{ chat.user.username }}</div>
                        </div>
                        <div v-if="chat.unread > 0"
                            class="w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                            {{ chat.unread > 9 ? '9+' : chat.unread }}
                        </div>
                    </button>

                    <div v-if="!loadingChats && chats.length === 0" class="text-center py-8 text-neutral-500">
                        Нет чатов<br>Начните переписку с кем-нибудь
                    </div>
                </div>
            </div>

            <!-- Правая панель: активный диалог -->
            <div class="flex-1 flex flex-col h-full overflow-hidden">
                <div v-if="selectedUser" class="flex-1 flex flex-col h-full overflow-hidden">
                    <!-- Шапка диалога -->
                    <div class="p-4 border-b border-neutral-800 shrink-0">
                        <div class="flex items-center gap-3">
                            <button @click="closeChat" class="md:hidden text-white p-1">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <NuxtLink v-if="!isFavorites" :to="`/profile/${selectedUser.id}`"
                                class="flex items-center gap-3 hover:opacity-80 transition flex-1">
                                <div class="relative">
                                    <img :src="selectedUser.avatar_url || '/images/defaultavatar/default-avatar.png'"
                                        class="w-10 h-10 rounded-full" />
                                    <div v-if="!isFavorites && selectedUser.status?.is_online"
                                        class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-800">
                                    </div>
                                </div>
                                <div class="flex-1">
                                    <div class="font-medium text-white">{{ selectedUser.full_name ||
                                        selectedUser.username }}</div>
                                    <div class="text-sm text-neutral-400">
                                        @{{ selectedUser.username }}
                                        <span v-if="typingStatus && !isFavorites"
                                            class="text-blue-400 ml-2 animate-pulse">печатает...</span>
                                    </div>
                                </div>
                            </NuxtLink>
                            <div v-else class="flex items-center gap-3 flex-1">
                                <div class="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                                    <svg class="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </div>
                                <div>
                                    <div class="font-medium text-white">Избранное</div>
                                    <div class="text-sm text-neutral-400">Ваши личные заметки</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Область сообщений -->
                    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scroll"
                        @scroll="handleScroll">
                        <div v-for="msg in messages" :key="msg.id" class="flex"
                            :class="msg.sender_id === currentUserId ? 'justify-end' : 'justify-start'">
                            <div :class="[
                                'max-w-[75%] rounded-2xl p-3 shadow-sm transition-all duration-200',
                                msg.sender_id === currentUserId
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                                    : 'bg-neutral-800/80 text-white backdrop-blur-sm border border-neutral-700/30'
                            ]">
                                <p class="text-sm whitespace-pre-wrap leading-relaxed">{{ msg.content }}</p>
                                <img v-if="msg.image_url" :src="msg.image_url"
                                    class="mt-2 max-h-48 rounded-lg cursor-pointer" @click="openImage(msg.image_url)" />
                                <div class="flex items-center justify-end gap-1 mt-1">
                                    <span class="text-[10px] opacity-70">{{ formatTime(msg.created_at) }}</span>
                                    <span v-if="msg.sender_id === currentUserId && msg.read"
                                        class="text-[10px] text-blue-200">✓✓</span>
                                    <span v-else-if="msg.sender_id === currentUserId"
                                        class="text-[10px] opacity-70">✓</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="loadingMessages" class="text-center py-4">
                            <div
                                class="inline-block w-5 h-5 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin">
                            </div>
                        </div>
                    </div>

                    <!-- Панель ввода -->
                    <div class="p-4 border-t border-neutral-800 shrink-0">
                        <div class="flex flex-col gap-2">
                            <div v-if="imagePreview" class="relative inline-block self-start">
                                <img :src="imagePreview" class="h-16 rounded-lg" />
                                <button @click="clearImage"
                                    class="absolute -top-2 -right-2 bg-red-500 rounded-full p-1">
                                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div class="flex items-end gap-2">
                                <label
                                    class="cursor-pointer p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition shrink-0">
                                    <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
                                    <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </label>
                                <textarea v-model="newMessageText" @keydown.enter.exact.prevent="sendMessage"
                                    @input="onTyping" placeholder="Напишите сообщение..." rows="1"
                                    class="flex-1 px-4 py-2 bg-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"></textarea>
                                <button @click="sendMessage"
                                    :disabled="(!newMessageText.trim() && !imageFile) || sending"
                                    class="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-full transition shrink-0">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                            <div v-if="uploadingImage" class="text-xs text-neutral-400 flex items-center gap-2">
                                <div
                                    class="inline-block w-3 h-3 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin">
                                </div>
                                Загрузка фото...
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="flex-1 flex items-center justify-center text-neutral-500 p-4 hidden md:flex">
                    Выберите диалог для начала общения
                </div>
            </div>
        </div>

        <ImageViewer :image-url="selectedImage" @close="selectedImage = null" />
    </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })

import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useSupabaseClient } from '#imports'
import ImageViewer from '~/components/ImageViewer.vue'

const supabase = useSupabaseClient()
const currentUserId = ref(null)

// Состояния
const searchQuery = ref('')
const userResults = ref([])
const searching = ref(false)
const chats = ref([])
const loadingChats = ref(true)
const selectedUser = ref(null)
const messages = ref([])
const loadingMessages = ref(false)
const newMessageText = ref('')
const sending = ref(false)
const messagesContainer = ref(null)
const uploadingImage = ref(false)
const imageFile = ref(null)
const imagePreview = ref(null)
const selectedImage = ref(null)
const lastMessageId = ref(null)

// Статус печати
const typingStatus = ref(false)
let typingTimeout = null
let pollingInterval = null

// Переменная для отслеживания, прокручен ли пользователь вверх
const isUserScrolledUp = ref(false)

const isFavorites = computed(() => selectedUser.value && selectedUser.value.id === currentUserId.value)

// --- Функции прокрутки ---
const handleScroll = () => {
    if (!messagesContainer.value) return
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value
    isUserScrolledUp.value = scrollHeight - scrollTop - clientHeight > 50
}

const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
        isUserScrolledUp.value = false
    }
}

const scrollToBottomIfNeeded = async () => {
    await nextTick()
    if (!messagesContainer.value || isUserScrolledUp.value) return
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
}
// -------------------------

// Закрыть чат на мобильных
const closeChat = () => {
    selectedUser.value = null
}

// Получаем ID текущего пользователя
const loadCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        currentUserId.value = user.id
        await supabase
            .from('user_status')
            .upsert({
                user_id: user.id,
                is_online: true,
                last_seen: new Date().toISOString()
            }, { onConflict: 'user_id' })
    } else {
        currentUserId.value = null
    }
}

// Загрузка статусов пользователей
const loadUsersStatus = async (userIds) => {
    if (!userIds.length) return {}
    const { data } = await supabase
        .from('user_status')
        .select('user_id, is_online')
        .in('user_id', userIds)
    const statusMap = {}
    data?.forEach(s => statusMap[s.user_id] = s)
    return statusMap
}

// Загрузка списка чатов
const loadChats = async () => {
    if (!currentUserId.value) return
    try {
        const { data: messagesData } = await supabase
            .from('user_messages')
            .select('sender_id, receiver_id')
            .or(`sender_id.eq.${currentUserId.value},receiver_id.eq.${currentUserId.value}`)

        const userIds = new Set()
        messagesData?.forEach(msg => {
            if (msg.sender_id !== currentUserId.value) userIds.add(msg.sender_id)
            if (msg.receiver_id !== currentUserId.value) userIds.add(msg.receiver_id)
        })

        if (userIds.size === 0) {
            chats.value = []
            return
        }

        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, username, full_name, avatar_url')
            .in('id', Array.from(userIds))

        const statuses = await loadUsersStatus(Array.from(userIds))

        const chatsWithUnread = await Promise.all(profiles.map(async (profile) => {
            const { count } = await supabase
                .from('user_messages')
                .select('*', { count: 'exact', head: true })
                .eq('sender_id', profile.id)
                .eq('receiver_id', currentUserId.value)
                .eq('read', false)
            return {
                user: { ...profile, status: statuses[profile.id] },
                unread: count || 0
            }
        }))

        chats.value = chatsWithUnread.sort((a, b) => b.unread - a.unread)
    } catch (err) {
        console.error('Ошибка загрузки чатов:', err)
    }
}

// Поиск пользователей
let searchTimeout
watch(searchQuery, (query) => {
    if (!query.trim()) {
        userResults.value = []
        return
    }
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(async () => {
        searching.value = true
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, username, full_name, avatar_url')
                .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
                .limit(20)
            if (error) throw error
            const userIds = data.map(u => u.id)
            const statuses = await loadUsersStatus(userIds)
            userResults.value = data.map(u => ({ ...u, status: statuses[u.id] }))
        } catch (err) {
            console.error('Ошибка поиска:', err)
            userResults.value = []
        } finally {
            searching.value = false
        }
    }, 300)
})

// Начать чат
const startChat = async (userProfile) => {
    searchQuery.value = ''
    selectedUser.value = userProfile
    await loadMessages()
    if (!chats.value.some(c => c.user.id === userProfile.id)) {
        chats.value.unshift({ user: userProfile, unread: 0 })
    }
}

// Открыть избранное
const openFavorites = async () => {
    if (!currentUserId.value) return
    selectedUser.value = {
        id: currentUserId.value,
        username: currentUserId.value,
        full_name: 'Избранное',
        avatar_url: null
    }
    await loadMessages()
}

// Загрузка сообщений
const loadMessages = async () => {
    if (!selectedUser.value || !currentUserId.value) return
    loadingMessages.value = true
    try {
        let query
        if (isFavorites.value) {
            query = supabase
                .from('user_messages')
                .select('*')
                .eq('sender_id', currentUserId.value)
                .eq('receiver_id', currentUserId.value)
                .order('created_at', { ascending: true })
        } else {
            query = supabase
                .from('user_messages')
                .select('*')
                .or(`and(sender_id.eq.${currentUserId.value},receiver_id.eq.${selectedUser.value.id}),and(sender_id.eq.${selectedUser.value.id},receiver_id.eq.${currentUserId.value})`)
                .order('created_at', { ascending: true })
        }
        const { data } = await query
        messages.value = data || []

        // Сохраняем ID последнего сообщения
        if (messages.value.length > 0) {
            lastMessageId.value = messages.value[messages.value.length - 1].id
        }

        if (!isFavorites.value) {
            // Отмечаем непрочитанные сообщения от собеседника
            const unreadMessages = messages.value.filter(m => m.sender_id === selectedUser.value.id && !m.read)
            if (unreadMessages.length > 0) {
                await supabase
                    .from('user_messages')
                    .update({ read: true })
                    .eq('sender_id', selectedUser.value.id)
                    .eq('receiver_id', currentUserId.value)
                    .eq('read', false)

                messages.value = messages.value.map(m =>
                    m.sender_id === selectedUser.value.id && !m.read ? { ...m, read: true } : m
                )
            }

            const chatIndex = chats.value.findIndex(c => c.user.id === selectedUser.value.id)
            if (chatIndex !== -1) chats.value[chatIndex].unread = 0
        }

        await scrollToBottom()
    } catch (err) {
        console.error('Ошибка загрузки сообщений:', err)
    } finally {
        loadingMessages.value = false
    }
}

// Проверка новых сообщений (polling)
const checkForNewMessages = async () => {
    if (!selectedUser.value || !currentUserId.value || isFavorites.value) return

    try {
        // Проверяем новые сообщения от собеседника
        const { data: newMessages, error } = await supabase
            .from('user_messages')
            .select('*')
            .eq('sender_id', selectedUser.value.id)
            .eq('receiver_id', currentUserId.value)
            .gt('created_at', messages.value[messages.value.length - 1]?.created_at || '2000-01-01')
            .order('created_at', { ascending: true })

        if (error) throw error

        if (newMessages && newMessages.length > 0) {
            // Добавляем новые сообщения
            messages.value.push(...newMessages)

            // Отмечаем их как прочитанные
            await supabase
                .from('user_messages')
                .update({ read: true })
                .eq('sender_id', selectedUser.value.id)
                .eq('receiver_id', currentUserId.value)
                .eq('read', false)

            // Обновляем статус прочтения локально
            messages.value = messages.value.map(m =>
                m.sender_id === selectedUser.value.id && !m.read ? { ...m, read: true } : m
            )

            // Обновляем счетчик непрочитанных в чатах
            const chatIndex = chats.value.findIndex(c => c.user.id === selectedUser.value.id)
            if (chatIndex !== -1) chats.value[chatIndex].unread = 0

            await scrollToBottomIfNeeded()
        }

        // Проверяем статус прочтения наших отправленных сообщений
        if (messages.value.length > 0) {
            const { data: updatedMessages } = await supabase
                .from('user_messages')
                .select('id, read')
                .eq('sender_id', currentUserId.value)
                .eq('receiver_id', selectedUser.value.id)
                .eq('read', true)

            if (updatedMessages && updatedMessages.length > 0) {
                updatedMessages.forEach(updated => {
                    const index = messages.value.findIndex(m => m.id === updated.id)
                    if (index !== -1 && !messages.value[index].read) {
                        messages.value[index].read = true
                    }
                })
            }
        }
    } catch (err) {
        console.error('Ошибка проверки новых сообщений:', err)
    }
}

// Проверка новых чатов и обновление статусов
const checkForUpdates = async () => {
    if (!currentUserId.value) return

    // Обновляем список чатов (для непрочитанных)
    await loadChats()

    // Обновляем статусы онлайн
    const userIds = [...new Set([
        ...chats.value.map(c => c.user.id),
        ...(selectedUser.value && !isFavorites.value ? [selectedUser.value.id] : [])
    ])]

    if (userIds.length > 0) {
        const statuses = await loadUsersStatus(userIds)
        chats.value.forEach(chat => {
            if (statuses[chat.user.id]) {
                chat.user.status = statuses[chat.user.id]
            }
        })
        if (selectedUser.value && !isFavorites.value && statuses[selectedUser.value.id]) {
            selectedUser.value.status = statuses[selectedUser.value.id]
        }
    }
}

// Функции печати
const sendTypingStatus = async (isTyping) => {
    if (!currentUserId.value || !selectedUser.value || isFavorites.value) return
    try {
        await supabase
            .from('typing_status')
            .upsert({
                user_id: currentUserId.value,
                chat_with: selectedUser.value.id,
                is_typing: isTyping,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id,chat_with' })
    } catch (err) {
        console.error('Ошибка отправки статуса печати:', err)
    }
}

// Проверка статуса печати собеседника
const checkTypingStatus = async () => {
    if (!selectedUser.value || isFavorites.value) return

    try {
        const { data } = await supabase
            .from('typing_status')
            .select('is_typing, updated_at')
            .eq('user_id', selectedUser.value.id)
            .eq('chat_with', currentUserId.value)
            .single()

        if (data) {
            // Если статус печати был обновлён менее 3 секунд назад
            const updatedAt = new Date(data.updated_at)
            const now = new Date()
            const diffSeconds = (now - updatedAt) / 1000

            if (data.is_typing && diffSeconds < 3) {
                typingStatus.value = true
                setTimeout(() => {
                    if (typingStatus.value) typingStatus.value = false
                }, 3000)
            } else {
                typingStatus.value = false
            }
        } else {
            typingStatus.value = false
        }
    } catch (err) {
        // Если записи нет, просто сбрасываем статус
        typingStatus.value = false
    }
}

const onTyping = () => {
    if (!selectedUser.value || isFavorites.value) return
    sendTypingStatus(true)
    if (typingTimeout) clearTimeout(typingTimeout)
    typingTimeout = setTimeout(() => {
        sendTypingStatus(false)
    }, 2000)
}

// Обработка изображений
const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
        alert('Файл слишком большой (макс. 2MB)')
        return
    }
    if (!file.type.startsWith('image/')) {
        alert('Можно загружать только изображения')
        return
    }
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
}

const clearImage = () => {
    if (imagePreview.value) URL.revokeObjectURL(imagePreview.value)
    imageFile.value = null
    imagePreview.value = null
}

const uploadImage = async () => {
    if (!imageFile.value) return null
    uploadingImage.value = true
    try {
        const fileName = `chat_${currentUserId.value}_${Date.now()}.${imageFile.value.name.split('.').pop()}`
        const { error } = await supabase.storage
            .from('chat-images')
            .upload(fileName, imageFile.value)
        if (error) throw error
        const { data: { publicUrl } } = supabase.storage
            .from('chat-images')
            .getPublicUrl(fileName)
        return publicUrl
    } catch (err) {
        console.error('Ошибка загрузки изображения:', err)
        alert('Не удалось загрузить изображение')
        return null
    } finally {
        uploadingImage.value = false
        clearImage()
    }
}

// Отправка сообщения
const sendMessage = async () => {
    if ((!newMessageText.value.trim() && !imageFile.value) || sending.value) return
    if (!selectedUser.value) return alert('Выберите получателя')
    if (!currentUserId.value) return alert('Вы не авторизованы')

    const messageText = newMessageText.value.trim()
    const currentImageFile = imageFile.value

    if (typingTimeout) clearTimeout(typingTimeout)
    await sendTypingStatus(false)

    sending.value = true
    try {
        let imageUrl = null
        if (currentImageFile) {
            imageUrl = await uploadImage()
            if (!imageUrl && currentImageFile) {
                sending.value = false
                return
            }
        }

        const receiverId = isFavorites.value ? currentUserId.value : selectedUser.value.id

        const { data, error } = await supabase
            .from('user_messages')
            .insert({
                sender_id: currentUserId.value,
                receiver_id: receiverId,
                content: messageText,
                image_url: imageUrl,
                read: false
            })
            .select()
            .single()

        if (error) throw error

        // Добавляем сообщение локально
        messages.value.push(data)
        newMessageText.value = ''
        clearImage()

        // Обновляем список чатов
        await loadChats()
        await scrollToBottom()
    } catch (err) {
        console.error('Ошибка отправки:', err)
        alert(`Не удалось отправить сообщение: ${err.message || 'неизвестная ошибка'}`)
    } finally {
        sending.value = false
    }
}

// Выбор чата
const selectChat = async (user) => {
    selectedUser.value = user
    await loadMessages()
    // Сбрасываем таймеры и запускаем polling для нового чата
    if (pollingInterval) {
        clearInterval(pollingInterval)
    }
    pollingInterval = setInterval(() => {
        checkForNewMessages()
        checkTypingStatus()
    }, 2000) // Проверяем каждые 2 секунды
}

// При смене собеседника
watch(selectedUser, async (newUser) => {
    if (newUser) {
        await loadMessages()
        // Сбрасываем таймеры
        if (pollingInterval) {
            clearInterval(pollingInterval)
        }
        pollingInterval = setInterval(() => {
            checkForNewMessages()
            checkTypingStatus()
        }, 2000)
    } else {
        if (pollingInterval) {
            clearInterval(pollingInterval)
            pollingInterval = null
        }
    }
})

onMounted(async () => {
    await loadCurrentUser()
    if (currentUserId.value) {
        await loadChats()
        // Запускаем общий polling для обновления чатов и статусов
        setInterval(() => {
            checkForUpdates()
        }, 5000)
    }
})

onUnmounted(() => {
    if (pollingInterval) {
        clearInterval(pollingInterval)
    }
    if (typingTimeout) clearTimeout(typingTimeout)
    if (currentUserId.value) {
        supabase
            .from('user_status')
            .update({ is_online: false, last_seen: new Date().toISOString() })
            .eq('user_id', currentUserId.value)
    }
})

const formatTime = (date) => new Date(date).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })
const openImage = (url) => { selectedImage.value = url }
</script>

<style scoped>
/* Кастомный скроллбар */
.custom-scroll::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
    background: rgba(30, 30, 35, 0.5);
    border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
    background: rgba(100, 100, 110, 0.6);
    border-radius: 10px;
    transition: background 0.2s ease;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(150, 150, 160, 0.8);
}

.custom-scroll::-webkit-scrollbar-corner {
    background: transparent;
}

/* Для Firefox */
.custom-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(100, 100, 110, 0.6) rgba(30, 30, 35, 0.5);
}
</style>