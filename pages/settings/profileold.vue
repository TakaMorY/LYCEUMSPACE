<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold text-white mb-6">Настройки профиля</h1>

    <!-- Аватар (сохраняется автоматически после загрузки) -->
    <div class="flex items-center space-x-4 border-b border-neutral-800 pb-6 mb-6">
      <img
        :src="avatarPreview || '/images/defaultavatar/default-avatar.png'"
        class="w-20 h-20 rounded-full border-2 border-neutral-700 object-cover"
      />
      <div>
        <label
          class="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition"
          :class="{ 'opacity-50 pointer-events-none': uploadingAvatar }"
        >
          {{ uploadingAvatar ? 'Загрузка...' : 'Загрузить аватар' }}
          <input
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleAvatarUpload"
            ref="fileInput"
            :disabled="uploadingAvatar"
          />
        </label>
        <p v-if="uploadingAvatar" class="text-neutral-400 text-xs mt-1">Загрузка и сохранение...</p>
        <p v-else-if="avatarError" class="text-red-400 text-xs mt-1">{{ avatarError }}</p>
        <p v-else class="text-neutral-500 text-xs mt-1">PNG, JPG, до 2MB</p>
      </div>
    </div>

    <!-- Никнейм с отдельным сохранением -->
    <div class="border-b border-neutral-800 pb-6 mb-6">
      <label class="block text-sm text-neutral-300 mb-1">Никнейм</label>
      <div class="flex gap-2">
        <div class="relative flex-1">
          <input
            v-model="form.username"
            @input="debouncedCheckUsername"
            type="text"
            class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition pr-10"
            :class="{
              'border-green-500': usernameAvailable === true,
              'border-red-500': usernameAvailable === false,
            }"
            required
          />
          <div
            v-if="form.username && form.username !== originalUsername"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg
              v-if="usernameAvailable === true"
              class="h-5 w-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <svg
              v-else-if="usernameAvailable === false"
              class="h-5 w-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div
              v-else
              class="h-5 w-5 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
        </div>
        <button
          @click="saveUsername"
          :disabled="!usernameChanged || usernameAvailable !== true || savingUsername"
          class="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-neutral-200 disabled:opacity-50 transition whitespace-nowrap"
        >
          {{ savingUsername ? 'Сохранение...' : 'Сохранить никнейм' }}
        </button>
      </div>
      <p v-if="usernameAvailable === false" class="text-xs text-red-400 mt-1">Никнейм уже занят</p>
    </div>

    <!-- Остальные поля (имя, био, класс) — сохраняются вместе -->
    <div class="space-y-6">
      <div>
        <label class="block text-sm text-neutral-300 mb-1">Имя</label>
        <input
          v-model="form.full_name"
          type="text"
          class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition"
        />
      </div>

      <div>
        <label class="block text-sm text-neutral-300 mb-1">О себе</label>
        <textarea
          v-model="form.bio"
          rows="3"
          class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition"
        ></textarea>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-neutral-300 mb-1">Класс (число)</label>
          <input
            v-model.number="form.class_number"
            type="number"
            min="1"
            max="11"
            class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-white focus:outline-none transition"
          />
        </div>
        <div>
          <label class="block text-sm text-neutral-300 mb-1">Буква класса</label>
          <input
            v-model="form.class_letter"
            type="text"
            maxlength="1"
            class="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white uppercase focus:border-white focus:outline-none transition"
          />
        </div>
      </div>

      <!-- Кнопка сохранения основной информации -->
      <div class="flex justify-end space-x-3 pt-4">
        <NuxtLink
          :to="`/profile/${user?.id}`"
          class="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Отмена
        </NuxtLink>
        <button
          @click="saveProfile"
          :disabled="savingProfile || uploadingAvatar"
          class="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-neutral-200 disabled:opacity-50 transition"
        >
          {{ savingProfile ? 'Сохранение...' : 'Сохранить изменения' }}
        </button>
      </div>
    </div>

    <!-- Ссылка на смену пароля -->
    <div class="mt-8 pt-6 border-t border-neutral-800">
      <NuxtLink to="/settings/password" class="text-blue-400 hover:text-blue-300 transition">
        Сменить пароль →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { refreshNuxtData } from '#app'

definePageMeta({ layout: 'forum' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

// Состояние формы
const form = ref({
  full_name: '',
  username: '',
  bio: '',
  class_number: null,
  class_letter: '',
  avatar_url: ''
})
const originalUsername = ref('')
const originalAvatar = ref('')

// Для предпросмотра аватара
const avatarPreview = ref('/images/defaultavatar/default-avatar.png')

// Флаги загрузки
const uploadingAvatar = ref(false)
const savingUsername = ref(false)
const savingProfile = ref(false)
const avatarError = ref('')

// Валидация никнейма
const usernameAvailable = ref(null)
let checkTimeout = null

// Ссылка на input файла (нужна для сброса)
const fileInput = ref(null)

// Загрузка текущих данных профиля
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

if (profile.value) {
  form.value = { ...profile.value }
  originalUsername.value = profile.value.username
  originalAvatar.value = profile.value.avatar_url
  avatarPreview.value = profile.value.avatar_url || '/images/defaultavatar/default-avatar.png'
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

// Вспомогательная функция для получения текущего пользователя
async function getCurrentUserId() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) throw new Error('Не удалось получить данные пользователя')
  return user.id
}

// Загрузка аватара + немедленное сохранение в БД
const handleAvatarUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    avatarError.value = 'Файл слишком большой (макс. 2MB)'
    return
  }
  if (!file.type.startsWith('image/')) {
    avatarError.value = 'Можно загружать только изображения'
    return
  }

  uploadingAvatar.value = true
  avatarError.value = ''

  try {
    const userId = await getCurrentUserId()

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}_${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadErr } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)
    if (uploadErr) throw uploadErr

    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)
    const publicUrl = urlData.publicUrl

    const { error: updateErr } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId)
    if (updateErr) throw updateErr

    // Обновляем локальное состояние
    form.value.avatar_url = publicUrl
    originalAvatar.value = publicUrl
    avatarPreview.value = publicUrl

    // Очищаем input, чтобы можно было загрузить тот же файл снова
    if (fileInput.value) fileInput.value.value = ''

    refreshNuxtData('feed')
    alert('Аватар успешно обновлён!')
  } catch (err) {
    console.error('Ошибка при загрузке аватара:', err)
    avatarError.value = err.message || 'Неизвестная ошибка'
  } finally {
    uploadingAvatar.value = false
  }
}

// Сохранение только никнейма
const saveUsername = async () => {
  if (!usernameChanged.value || usernameAvailable.value !== true) return

  savingUsername.value = true
  try {
    const userId = await getCurrentUserId()

    const { error } = await supabase
      .from('profiles')
      .update({ username: form.value.username })
      .eq('id', userId)
    if (error) throw error

    originalUsername.value = form.value.username
    usernameAvailable.value = true
    refreshNuxtData('feed')
    alert('Никнейм успешно обновлён!')
  } catch (err) {
    console.error('Ошибка при сохранении никнейма:', err)
    alert('Ошибка при сохранении никнейма: ' + err.message)
  } finally {
    savingUsername.value = false
  }
}

// Сохранение остальных полей (имя, био, класс)
const saveProfile = async () => {
  savingProfile.value = true
  try {
    const userId = await getCurrentUserId()

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: form.value.full_name,
        bio: form.value.bio,
        class_number: form.value.class_number,
        class_letter: form.value.class_letter?.toUpperCase()
      })
      .eq('id', userId)
    if (error) throw error

    refreshNuxtData('feed')
    await router.push(`/profile/${userId}`)
  } catch (err) {
    console.error('Ошибка при сохранении профиля:', err)
    alert('Ошибка при сохранении: ' + err.message)
  } finally {
    savingProfile.value = false
  }
}
</script>