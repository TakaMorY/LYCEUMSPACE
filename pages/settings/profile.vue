<template>
    <div class="max-w-2xl mx-auto">
        <h1 class="text-2xl font-bold text-white mb-6">Настройки профиля</h1>

        <form @submit.prevent="saveProfile" class="space-y-6">
            <!-- Аватар с загрузкой -->
            <div class="flex items-center space-x-4">
                <img :src="avatarPreview || '/images/defaultavatar/default-avatar.png'" class="w-20 h-20 rounded-full border-2 border-neutral-700 object-cover" />
                   
                <div>
                    <label
                        class="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition">
                        Загрузить аватар
                        <input type="file" accept="image/*" class="hidden" @change="handleAvatarUpload"
                            ref="fileInput" />
                    </label>
                    <p v-if="uploading" class="text-neutral-400 text-xs mt-1">Загрузка...</p>
                    <p v-else-if="uploadError" class="text-red-400 text-xs mt-1">{{ uploadError }}</p>
                    <p v-else class="text-neutral-500 text-xs mt-1">PNG, JPG, до 2MB</p>
                </div>
            </div>

            <!-- Имя -->
            <div>
                <label class="block text-sm text-neutral-300 mb-1">Имя</label>
                <input v-model="form.full_name" type="text"
                    class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition" />
            </div>

            <!-- Никнейм (с проверкой уникальности) -->
            <div>
                <label class="block text-sm text-neutral-300 mb-1">Никнейм</label>
                <div class="relative">
                    <input v-model="form.username" @input="debouncedCheckUsername" type="text"
                        class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition pr-10"
                        :class="{ 'border-green-500': usernameAvailable === true, 'border-red-500': usernameAvailable === false }"
                        required />
                    <div v-if="form.username && form.username !== originalUsername"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg v-if="usernameAvailable === true" class="h-5 w-5 text-green-500" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <svg v-else-if="usernameAvailable === false" class="h-5 w-5 text-red-500" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <div v-else
                            class="h-5 w-5 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin">
                        </div>
                    </div>
                </div>
                <p v-if="usernameAvailable === false" class="text-xs text-red-400 mt-1">Никнейм уже занят</p>
            </div>

            <!-- Био -->
            <div>
                <label class="block text-sm text-neutral-300 mb-1">О себе</label>
                <textarea v-model="form.bio" rows="3"
                    class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition"></textarea>
            </div>

            <!-- Класс -->
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm text-neutral-300 mb-1">Класс (число)</label>
                    <input v-model.number="form.class_number" type="number" min="1" max="11"
                        class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition" />
                </div>
                <div>
                    <label class="block text-sm text-neutral-300 mb-1">Буква класса</label>
                    <input v-model="form.class_letter" type="text" maxlength="1"
                        class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white uppercase focus:border-white focus:outline-none transition" />
                </div>
            </div>

            <!-- Кнопки -->
            <div class="flex justify-end space-x-3 pt-4">
                <NuxtLink :to="`/profile/${user?.id}`"
                    class="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-full font-semibold transition">
                    Отмена
                </NuxtLink>
                <button type="submit"
                    :disabled="loading || (usernameChanged && usernameAvailable !== true) || uploading"
                    class="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-neutral-200 disabled:opacity-50 transition">
                    {{ loading ? 'Сохранение...' : 'Сохранить' }}
                </button>
            </div>
        </form>

        <!-- Ссылка на смену пароля -->
        <div class="mt-8 pt-6 border-t border-neutral-800">
            <NuxtLink to="/settings/password" class="text-blue-400 hover:text-blue-300 transition">
                Сменить пароль →
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const form = ref({
    full_name: '',
    username: '',
    bio: '',
    class_number: null,
    class_letter: '',
    avatar_url: ''
})
const originalUsername = ref('')
const loading = ref(false)
const usernameAvailable = ref(null)
let checkTimeout = null

// Загрузка аватара
const fileInput = ref(null)
const uploading = ref(false)
const uploadError = ref('')
const avatarPreview = ref(null)

// Загружаем текущие данные профиля
const { data: profile } = await useAsyncData('profile-settings', async () => {
    if (!user.value) return null
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single()
    if (error) throw error
    return data
})

// Заполняем форму
if (profile.value) {
    form.value = { ...profile.value }
    originalUsername.value = profile.value.username
    avatarPreview.value = profile.value.avatar_url
}

const usernameChanged = computed(() => form.value.username !== originalUsername.value)

const debouncedCheckUsername = () => {
    if (checkTimeout) clearTimeout(checkTimeout)
    if (!form.value.username || form.value.username.length < 3) {
        usernameAvailable.value = null
        return
    }
    if (form.value.username === originalUsername.value) {
        usernameAvailable.value = true
        return
    }
    usernameAvailable.value = null
    checkTimeout = setTimeout(async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', form.value.username)
            .maybeSingle()
        if (error) {
            console.error(error)
            usernameAvailable.value = null
        } else {
            usernameAvailable.value = !data
        }
    }, 500)
}

const handleAvatarUpload = async (event) => {
    if (!user.value) {
        uploadError.value = 'Необходимо войти в систему'
        return
    }
    const file = event.target.files[0]
    if (!file) return

    // Проверка размера и типа
    if (file.size > 2 * 1024 * 1024) {
        uploadError.value = 'Файл слишком большой (макс. 2MB)'
        return
    }
    if (!file.type.startsWith('image/')) {
        uploadError.value = 'Можно загружать только изображения'
        return
    }

    uploading.value = true
    uploadError.value = ''

    try {
        // Генерируем уникальное имя файла
        const fileExt = file.name.split('.').pop()
        const fileName = `${user.value.id}_${Date.now()}.${fileExt}`
        const filePath = `avatars/${fileName}`

        // Загружаем в Supabase Storage
        const { error: uploadErr } = await supabase.storage
            .from('avatars')
            .upload(filePath, file)

        if (uploadErr) throw uploadErr

        // Получаем публичный URL
        const { data: urlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath)

        const publicUrl = urlData.publicUrl
        avatarPreview.value = publicUrl
        form.value.avatar_url = publicUrl
    } catch (err) {
        console.error(err)
        uploadError.value = 'Ошибка при загрузке. Убедитесь, что bucket "avatars" существует и доступен.'
    } finally {
        uploading.value = false
    }
}

const saveProfile = async () => {
    if (!user.value) return
    if (usernameChanged.value && usernameAvailable.value !== true) {
        alert('Никнейм недоступен или не проверен')
        return
    }

    loading.value = true
    try {
        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: form.value.full_name,
                username: form.value.username,
                bio: form.value.bio,
                class_number: form.value.class_number,
                class_letter: form.value.class_letter?.toUpperCase(),
                avatar_url: form.value.avatar_url
            })
            .eq('id', user.value.id)
        if (error) throw error
        await router.push(`/profile/${user.value.id}`)
    } catch (err) {
        console.error(err)
        alert('Ошибка при сохранении: ' + err.message)
    } finally {
        loading.value = false
    }
}
</script>