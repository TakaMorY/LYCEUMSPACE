<template>
    <div class="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-12 px-4 sm:px-6">
        <div class="max-w-4xl mx-auto">
            <!-- Назад -->
            <NuxtLink to="/ege"
                class="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition">
                ← Назад к предметам
            </NuxtLink>

            <h1 class="text-4xl font-bold text-white mb-4">{{ subject?.name }}</h1>

            <!-- Поиск по темам -->
            <div class="relative mb-8">
                <input v-model="searchQuery" type="text" placeholder="Поиск темы..."
                    class="w-full px-6 py-4 bg-neutral-900/50 border border-white/10 rounded-2xl text-white placeholder-neutral-500 focus:border-blue-500 focus:outline-none transition-all duration-300" />
                <svg class="absolute right-4 top-4 w-6 h-6 text-neutral-500" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <!-- Список тем -->
            <div v-if="loadingTopics" class="flex justify-center py-12">
                <div class="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div v-else-if="filteredTopics.length === 0" class="text-center text-neutral-500 py-12">
                Нет тем по вашему запросу
            </div>
            <div v-else class="space-y-3">
                <NuxtLink v-for="topic in filteredTopics" :key="topic.id" :to="`/ege/topic/${topic.id}`"
                    class="group block relative bg-neutral-900/30 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-neutral-800/50 hover:border-white/20 transition-all duration-300">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-medium text-white group-hover:translate-x-2 transition-transform">{{
                            topic.title }}</h2>
                        <span class="text-neutral-400 text-sm">→</span>
                    </div>

                    <!-- Админские кнопки -->
                    <div v-if="isAdmin"
                        class="absolute top-4 right-12 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        <button @click.prevent.stop="editTopic(topic)"
                            class="p-2 bg-white/10 hover:bg-white/20 rounded-lg">✎</button>
                        <button @click.prevent.stop="deleteTopic(topic.id)"
                            class="p-2 bg-white/10 hover:bg-red-500/20 rounded-lg">🗑</button>
                    </div>
                </NuxtLink>

                <!-- Кнопка добавления темы для админа -->
                <div v-if="isAdmin" class="mt-6 flex justify-center">
                    <button @click="openAddTopicModal"
                        class="px-6 py-3 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl text-white flex items-center gap-2">
                        <span class="text-2xl">+</span> Добавить тему
                    </button>
                </div>
            </div>
        </div>

        <!-- Модалка добавления/редактирования темы -->
        <Modal v-if="topicModalOpen" @close="topicModalOpen = false">
            <TopicForm :topic="editingTopic" @save="saveTopic" @close="topicModalOpen = false" />
        </Modal>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const route = useRoute()
const user = useSupabaseUser()

const isAdmin = computed(() => user.value?.email === 'daniilosadcij20@gmail.com')

const subjectId = route.params.subjectId
const subject = ref(null)
const topics = ref([])
const loadingTopics = ref(false)
const searchQuery = ref('')

// Загрузка предмета
const loadSubject = async () => {
    const { data } = await supabase.from('subjects').select('*').eq('id', subjectId).single()
    subject.value = data
}
loadSubject()

// Загрузка тем
const loadTopics = async () => {
    loadingTopics.value = true
    const { data } = await supabase
        .from('topics')
        .select('*')
        .eq('subject_id', subjectId)
        .order('order')
        .order('id')
    topics.value = data || []
    loadingTopics.value = false
}
loadTopics()

// Фильтрация тем
const filteredTopics = computed(() => {
    if (!searchQuery.value) return topics.value
    const q = searchQuery.value.toLowerCase()
    return topics.value.filter(t => t.title.toLowerCase().includes(q))
})

// Модалки для тем
const topicModalOpen = ref(false)
const editingTopic = ref(null)
const openAddTopicModal = () => {
    editingTopic.value = null
    topicModalOpen.value = true
}
const editTopic = (topic) => {
    editingTopic.value = topic
    topicModalOpen.value = true
}
const saveTopic = async (form) => {
    if (form.id) {
        await supabase.from('topics').update({ title: form.title }).eq('id', form.id)
    } else {
        await supabase.from('topics').insert({ title: form.title, subject_id: subjectId })
    }
    topicModalOpen.value = false
    loadTopics()
}
const deleteTopic = async (id) => {
    if (!confirm('Удалить тему? Все материалы будут удалены.')) return
    await supabase.from('topics').delete().eq('id', id)
    loadTopics()
}
</script>