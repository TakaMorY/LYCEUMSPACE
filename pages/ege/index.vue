<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden">
    <!-- Декоративный фон -->
    <div class="absolute inset-0 pointer-events-none opacity-10">
      <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 z-10">
      <h1 class="text-3xl sm:text-4xl font-bold text-white mb-8">Подготовка к ЕГЭ и ОГЭ</h1>

      <!-- Переключатель уровней -->
      <div class="flex gap-4 mb-8">
        <button
          v-for="level in levels"
          :key="level.id"
          @click="selectedLevel = level"
          class="px-6 py-3 rounded-xl font-medium transition-all duration-300"
          :class="selectedLevel?.id === level.id ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' : 'bg-neutral-800/50 text-neutral-400 hover:text-white'"
        >
          {{ level.name }}
        </button>
      </div>

      <!-- Карточки предметов -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="subject in subjects"
          :key="subject.id"
          @click="goToSubject(subject.id)"
          class="group relative bg-neutral-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <!-- Кнопки админа -->
          <div v-if="isAdmin" class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition" @click.stop>
            <button @click="editSubject(subject)" class="p-1 bg-neutral-800 rounded-full hover:bg-neutral-700">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button @click="deleteSubject(subject.id)" class="p-1 bg-red-500/20 rounded-full hover:bg-red-500/40">
              <svg class="w-4 h-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <h2 class="text-2xl font-bold text-white mb-2">{{ subject.name }}</h2>
          <p class="text-neutral-400">{{ subject.topics_count }} тем</p>
          <div class="mt-4 text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition">Перейти →</div>
        </div>
      </div>

      <!-- Кнопка добавления предмета (только для админа) -->
      <button
        v-if="isAdmin"
        @click="openAddSubjectModal"
        class="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl shadow-lg hover:scale-110 transition"
      >
        +
      </button>
    </div>

    <!-- Модальное окно для добавления/редактирования предмета -->
    <Teleport to="body">
      <div v-if="showSubjectModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" @click.self="closeSubjectModal">
        <div class="bg-neutral-900 rounded-2xl max-w-md w-full p-6 border border-white/10">
          <h2 class="text-xl font-bold text-white mb-4">{{ editingSubject ? 'Редактировать предмет' : 'Добавить предмет' }}</h2>
          <input v-model="subjectForm.name" placeholder="Название предмета" class="w-full p-3 bg-neutral-800 border border-white/10 rounded-xl text-white mb-4" />
          <div class="flex justify-end gap-2">
            <button @click="closeSubjectModal" class="px-4 py-2 bg-neutral-800 rounded-lg text-neutral-300">Отмена</button>
            <button @click="saveSubject" class="px-4 py-2 bg-blue-600 rounded-lg text-white">Сохранить</button>
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

const isAdmin = computed(() => user.value?.email === 'daniilosadcij20@gmail.com')

const levels = ref([])
const selectedLevel = ref(null)
const subjects = ref([])

// Состояние модалки предмета
const showSubjectModal = ref(false)
const editingSubject = ref(null)
const subjectForm = ref({ name: '' })

// Загрузка уровней
const loadLevels = async () => {
  const { data } = await supabase.from('exam_levels').select('*').order('id')
  levels.value = data || []
  if (levels.value.length) selectedLevel.value = levels.value[0]
}
loadLevels()

// Загрузка предметов с количеством тем
const loadSubjects = async () => {
  if (!selectedLevel.value) return
  const { data } = await supabase
    .from('subjects')
    .select(`
      *,
      topics:topics(count)
    `)
    .eq('level_id', selectedLevel.value.id)
    .order('name')
  subjects.value = (data || []).map(s => ({
    ...s,
    topics_count: s.topics?.[0]?.count || 0
  }))
}
watch(selectedLevel, loadSubjects)

// Навигация
const goToSubject = (id) => navigateTo(`/ege/subject/${id}`)

// Методы для админа
const openAddSubjectModal = () => {
  editingSubject.value = null
  subjectForm.value = { name: '' }
  showSubjectModal.value = true
}
const editSubject = (subject) => {
  editingSubject.value = subject
  subjectForm.value = { name: subject.name }
  showSubjectModal.value = true
}
const closeSubjectModal = () => {
  showSubjectModal.value = false
  editingSubject.value = null
}
const saveSubject = async () => {
  const name = subjectForm.value.name.trim()
  if (!name) return
  if (editingSubject.value) {
    await supabase.from('subjects').update({ name }).eq('id', editingSubject.value.id)
  } else {
    await supabase.from('subjects').insert({ name, level_id: selectedLevel.value.id })
  }
  closeSubjectModal()
  loadSubjects()
}
const deleteSubject = async (id) => {
  if (!confirm('Удалить предмет? Все темы и материалы будут удалены.')) return
  await supabase.from('subjects').delete().eq('id', id)
  loadSubjects()
}
</script>