<template>
    <div
        class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
        <!-- Декоративный фон -->
        <div class="absolute inset-0 pointer-events-none opacity-10">
            <div class="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        </div>

        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 z-10">
            <div class="flex items-center gap-4 mb-6">
                <button @click="navigateTo('/ege')" class="text-neutral-400 hover:text-white transition">
                    ← Назад
                </button>
                <h1 class="text-3xl font-bold text-white">{{ subject?.name }}</h1>
            </div>

            <!-- Поиск по темам -->
            <div class="mb-8">
                <input v-model="search" type="text" placeholder="Поиск темы..."
                    class="w-full max-w-md px-4 py-3 bg-neutral-900/50 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:border-blue-400 focus:outline-none" />
            </div>

            <!-- Список тем -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="topic in filteredTopics" :key="topic.id" @click="goToTopic(topic.id)"
                    class="group relative bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-4 cursor-pointer hover:border-blue-500/50 transition">
                    <div v-if="isAdmin"
                        class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition"
                        @click.stop>
                        <button @click="editTopic(topic)" class="p-1 bg-neutral-800 rounded-full hover:bg-neutral-700">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button @click="deleteTopic(topic.id)"
                            class="p-1 bg-red-500/20 rounded-full hover:bg-red-500/40">
                            <svg class="w-4 h-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                    <h3 class="text-lg font-semibold text-white">{{ topic.title }}</h3>
                </div>
            </div>

            <!-- Кнопка добавления темы (только админ) -->
            <button v-if="isAdmin" @click="openAddTopicModal"
                class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:scale-110 transition">
                +
            </button>
        </div>

        <!-- Модалка для темы -->
        <Teleport to="body">
            <div v-if="showTopicModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                @click.self="closeTopicModal">
                <div class="bg-neutral-900 rounded-2xl max-w-md w-full p-6 border border-white/10">
                    <h2 class="text-xl font-bold text-white mb-4">{{ editingTopic ? 'Редактировать тему' : 'Добавить тему' }}</h2>
                    <input v-model="topicForm.title" placeholder="Название темы"
                        class="w-full p-3 bg-neutral-800 border border-white/10 rounded-xl text-white mb-4" />
                    <div class="flex justify-end gap-2">
                        <button @click="closeTopicModal"
                            class="px-4 py-2 bg-neutral-800 rounded-lg text-neutral-300">Отмена</button>
                        <button @click="saveTopic"
                            class="px-4 py-2 bg-blue-600 rounded-lg text-white">Сохранить</button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const router = useRouter()

const isAdmin = computed(() => user.value?.email === 'daniilosadcij20@gmail.com')
const subjectId = route.params.id

const subject = ref(null)
const topics = ref([])
const search = ref('')

// Загрузка предмета и тем
const loadData = async () => {
    const { data: subj } = await supabase.from('subjects').select('*').eq('id', subjectId).single()
    subject.value = subj
    const { data: t } = await supabase.from('topics').select('*').eq('subject_id', subjectId).order('order')
    topics.value = t || []
}
loadData()

const filteredTopics = computed(() => {
    if (!search.value) return topics.value
    return topics.value.filter(t => t.title.toLowerCase().includes(search.value.toLowerCase()))
})

const goToTopic = (id) => router.push(`/ege/topic/${id}`)

// Модалка темы
const showTopicModal = ref(false)
const editingTopic = ref(null)
const topicForm = ref({ title: '' })

const openAddTopicModal = () => {
    editingTopic.value = null
    topicForm.value = { title: '' }
    showTopicModal.value = true
}
const editTopic = (topic) => {
    editingTopic.value = topic
    topicForm.value = { title: topic.title }
    showTopicModal.value = true
}
const closeTopicModal = () => {
    showTopicModal.value = false
    editingTopic.value = null
}
const saveTopic = async () => {
    const title = topicForm.value.title.trim()
    if (!title) return
    if (editingTopic.value) {
        await supabase.from('topics').update({ title }).eq('id', editingTopic.value.id)
    } else {
        await supabase.from('topics').insert({ title, subject_id: subjectId })
    }
    closeTopicModal()
    loadData()
}
const deleteTopic = async (id) => {
    if (!confirm('Удалить тему? Все материалы будут удалены.')) return
    await supabase.from('topics').delete().eq('id', id)
    loadData()
}
</script>