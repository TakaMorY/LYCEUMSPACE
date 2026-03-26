<template>
    <button @click="startChat" :disabled="loading"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg text-white text-sm font-medium transition">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {{ loading ? 'Загрузка...' : 'Написать сообщение' }}
    </button>
</template>

<script setup>
const props = defineProps({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        default: ''
    }
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const loading = ref(false)

const startChat = async () => {
    if (!user.value) {
        alert('Войдите, чтобы отправить сообщение')
        return
    }

    loading.value = true
    try {
        // Проверяем, существует ли уже чат между пользователями
        const { data: existing } = await supabase
            .from('private.messages')
            .select('id')
            .or(`and(sender_id.eq.${user.value.id},receiver_id.eq.${props.userId}),and(sender_id.eq.${props.userId},receiver_id.eq.${user.value.id})`)
            .limit(1)

        // Перенаправляем на страницу чата с этим пользователем
        router.push(`/messages?user=${props.userId}`)
    } catch (error) {
        console.error('Ошибка:', error)
    } finally {
        loading.value = false
    }
}
</script>