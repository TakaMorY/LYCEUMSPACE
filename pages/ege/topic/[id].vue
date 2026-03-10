<template>
    <div
        class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 z-10">
            <div class="flex items-center gap-4 mb-6">
                <button @click="router.back()" class="text-neutral-400 hover:text-white transition">
                    ← Назад
                </button>
                <h1 class="text-3xl font-bold text-white">{{ topic?.title }}</h1>
            </div>

            <!-- Вкладки -->
            <div class="flex gap-2 border-b border-white/10 mb-6">
                <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value"
                    class="px-4 py-2 text-sm font-medium transition-colors"
                    :class="activeTab === tab.value ? 'text-white border-b-2 border-blue-500' : 'text-neutral-400 hover:text-white'">
                    {{ tab.label }}
                </button>
            </div>

            <!-- Список материалов -->
            <div v-if="filteredContent.length" class="space-y-6">
                <div v-for="item in filteredContent" :key="item.id"
                    class="bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                    <div v-if="isAdmin" class="flex justify-end gap-2 mb-2">
                        <button @click="editContent(item)"
                            class="px-3 py-1 text-xs bg-neutral-800 rounded-lg text-neutral-300 hover:bg-neutral-700">Редактировать</button>
                        <button @click="deleteContent(item.id)"
                            class="px-3 py-1 text-xs bg-red-500/20 rounded-lg text-red-300 hover:bg-red-500/30">Удалить</button>
                    </div>
                    <h3 v-if="item.title" class="text-xl font-semibold text-white mb-3">{{ item.title }}</h3>
                    <p class="text-white/80 whitespace-pre-wrap">{{ item.content }}</p>
                    <div v-if="item.images && item.images.length" class="mt-4 flex flex-wrap gap-3">
                        <img v-for="(img, idx) in item.images" :key="idx" :src="img"
                            class="max-h-40 rounded-lg cursor-pointer hover:scale-105 transition"
                            @click="openImage(img)" />
                    </div>
                </div>
            </div>
            <div v-else class="text-neutral-500 text-center py-12">Нет материалов</div>

            <!-- Кнопка добавления материала (админ) -->
            <button v-if="isAdmin" @click="openAddContentModal"
                class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:scale-110 transition">
                +
            </button>
        </div>

        <!-- Модалка для контента -->
        <Teleport to="body">
            <div v-if="showContentModal"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
                @click.self="closeContentModal">
                <div
                    class="bg-neutral-900 rounded-2xl max-w-2xl w-full p-6 border border-white/10 max-h-[90vh] overflow-y-auto">
                    <h2 class="text-xl font-bold text-white mb-4">{{ editingContent ? 'Редактировать' : 'Добавить' }}
                        материал</h2>
                    <div class="space-y-4">
                        <input v-model="contentForm.title" placeholder="Заголовок (необязательно)"
                            class="w-full p-3 bg-neutral-800 border border-white/10 rounded-xl text-white" />
                        <textarea v-model="contentForm.content" rows="6" placeholder="Текст"
                            class="w-full p-3 bg-neutral-800 border border-white/10 rounded-xl text-white"></textarea>

                        <div>
                            <label class="block text-sm text-neutral-300 mb-2">Изображения</label>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="(img, i) in contentForm.images" :key="i" class="relative">
                                    <img :src="img" class="h-20 w-20 object-cover rounded-lg" />
                                    <button @click="removeImage(i)"
                                        class="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white">✕</button>
                                </div>
                                <label
                                    class="cursor-pointer bg-neutral-800 hover:bg-neutral-700 w-20 h-20 rounded-lg flex items-center justify-center text-2xl text-neutral-400">
                                    +
                                    <input type="file" accept="image/*" class="hidden" @change="uploadImage" />
                                </label>
                            </div>
                        </div>

                        <div class="flex justify-end gap-2 pt-4">
                            <button @click="closeContentModal"
                                class="px-4 py-2 bg-neutral-800 rounded-lg text-neutral-300">Отмена</button>
                            <button @click="saveContent"
                                class="px-4 py-2 bg-blue-600 rounded-lg text-white">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>

        <!-- Просмотр изображения -->
        <Teleport to="body">
            <div v-if="modalImage" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                @click="modalImage = null">
                <img :src="modalImage" class="max-w-full max-h-screen object-contain rounded-lg" />
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
const topicId = route.params.id

const topic = ref(null)
const content = ref([])
const activeTab = ref('theory')
const tabs = [
    { label: 'Теория', value: 'theory' },
    { label: 'Примеры', value: 'examples' },
    { label: 'Задачи', value: 'problems' }
]

const filteredContent = computed(() => content.value.filter(c => c.type === activeTab.value))

// Загрузка данных
const loadData = async () => {
    const { data: t } = await supabase.from('topics').select('*').eq('id', topicId).single()
    topic.value = t
    const { data: c } = await supabase.from('topic_content').select('*').eq('topic_id', topicId).order('order')
    content.value = c || []
}
loadData()

// Модалка контента
const showContentModal = ref(false)
const editingContent = ref(null)
const contentForm = ref({ title: '', content: '', images: [] })
const modalImage = ref(null)

const openAddContentModal = () => {
    editingContent.value = null
    contentForm.value = { title: '', content: '', images: [] }
    showContentModal.value = true
}
const editContent = (item) => {
    editingContent.value = item
    contentForm.value = { title: item.title || '', content: item.content || '', images: item.images || [] }
    showContentModal.value = true
}
const closeContentModal = () => {
    showContentModal.value = false
    editingContent.value = null
}

const uploadImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
        alert('Файл слишком большой (макс. 2MB)')
        return
    }
    const fileName = `ege_${Date.now()}_${file.name}`
    const { error } = await supabase.storage.from('ege-images').upload(fileName, file)
    if (error) {
        alert('Ошибка загрузки')
        return
    }
    const { data: { publicUrl } } = supabase.storage.from('ege-images').getPublicUrl(fileName)
    contentForm.value.images.push(publicUrl)
}
const removeImage = (idx) => contentForm.value.images.splice(idx, 1)

const saveContent = async () => {
    const data = {
        topic_id: topicId,
        type: activeTab.value,
        title: contentForm.value.title || null,
        content: contentForm.value.content,
        images: contentForm.value.images
    }
    if (editingContent.value) {
        await supabase.from('topic_content').update(data).eq('id', editingContent.value.id)
    } else {
        await supabase.from('topic_content').insert(data)
    }
    closeContentModal()
    loadData()
}
const deleteContent = async (id) => {
    if (!confirm('Удалить этот материал?')) return
    await supabase.from('topic_content').delete().eq('id', id)
    loadData()
}

const openImage = (url) => modalImage.value = url
</script>