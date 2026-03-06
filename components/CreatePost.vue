<template>
    <div class="space-y-4">
        <div class="flex gap-3">
            <UserAvatar :user="user" />

            <div class="flex-1">
                <textarea v-model="content" placeholder="Что происходит?" rows="3"
                    class="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

                <div class="flex items-center justify-between mt-3">
                    <button @click="triggerFileUpload" class="p-2 text-neutral-400 hover:text-blue-500 transition">
                        <Icon name="heroicons:photo" class="w-5 h-5" />
                    </button>
                    <input ref="fileInput" type="file" multiple accept="image/*" class="hidden"
                        @change="handleFileUpload" />

                    <button @click="createPost" :disabled="!content.trim() || loading"
                        class="px-4 py-2 bg-blue-600 text-white rounded-full disabled:opacity-50 hover:bg-blue-700 transition">
                        {{ loading ? 'Публикация...' : 'Опубликовать' }}
                    </button>
                </div>

                <!-- Предпросмотр -->
                <div v-if="previews.length" class="flex gap-2 mt-3 flex-wrap">
                    <div v-for="(preview, idx) in previews" :key="idx" class="relative">
                        <img :src="preview" class="w-16 h-16 object-cover rounded-lg" />
                        <button @click="removeFile(idx)"
                            class="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs">✕</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSupabaseUser, useSupabaseClient } from '#imports'
import UserAvatar from './UserAvatar.vue'

const emit = defineEmits(['created'])

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const content = ref('')
const loading = ref(false)
const fileInput = ref(null)
const uploadedFiles = ref([])
const previews = ref([])

const triggerFileUpload = () => fileInput.value?.click()

const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    uploadedFiles.value.push(...files)

    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => previews.value.push(e.target.result)
            reader.readAsDataURL(file)
        }
    })
}

const removeFile = (index) => {
    uploadedFiles.value.splice(index, 1)
    previews.value.splice(index, 1)
}

const createPost = async () => {
    if (!content.value.trim() || !user.value) return

    loading.value = true
    try {
        // Создаём пост
        const { data: post, error: postError } = await supabase
            .from('posts')
            .insert({
                user_id: user.value.id,
                content: content.value.trim()
            })
            .select()
            .single()

        if (postError) throw postError

        // Загружаем файлы (упрощённо, без реального storage)
        content.value = ''
        uploadedFiles.value = []
        previews.value = []
        emit('created', post)
    } catch (error) {
        console.error('Ошибка:', error)
    } finally {
        loading.value = false
    }
}
</script>