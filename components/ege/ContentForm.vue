<template>
  <div>
    <h2 class="text-2xl font-bold text-white mb-6">{{ content ? 'Редактировать' : 'Добавить' }} материал</h2>
    <input v-model="form.title" placeholder="Заголовок (необязательно)" class="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-xl text-white mb-4" />
    <textarea v-model="form.content" rows="6" placeholder="Текст" class="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-xl text-white mb-6"></textarea>

    <div class="mb-6">
      <label class="block text-sm text-neutral-400 mb-2">Изображения</label>
      <div class="flex flex-wrap gap-3">
        <div v-for="(img, i) in form.images" :key="i" class="relative">
          <img :src="img" class="w-24 h-24 object-cover rounded-lg" />
          <button @click="removeImage(i)" class="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white text-xs">✕</button>
        </div>
        <label class="cursor-pointer w-24 h-24 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center text-3xl text-neutral-400 border border-dashed border-white/20">
          +
          <input type="file" accept="image/*" class="hidden" @change="uploadImage" />
        </label>
      </div>
    </div>

    <div class="flex justify-end gap-3">
      <button @click="$emit('close')" class="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 transition">Отмена</button>
      <button @click="save" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition">Сохранить</button>
    </div>
  </div>
</template>
<script setup>
const supabase = useSupabaseClient()
const props = defineProps({ content: Object, activeTab: String })
const emit = defineEmits(['save', 'close'])
const form = ref({
  id: props.content?.id,
  title: props.content?.title || '',
  content: props.content?.content || '',
  images: props.content?.images || []
})

const uploadImage = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 2*1024*1024) { alert('Файл > 2MB'); return }
  const fileName = `ege_${Date.now()}_${file.name}`
  const { error } = await supabase.storage.from('ege-images').upload(fileName, file)
  if (error) { alert('Ошибка загрузки'); return }
  const { data: { publicUrl } } = supabase.storage.from('ege-images').getPublicUrl(fileName)
  form.value.images.push(publicUrl)
}

const removeImage = (idx) => {
  form.value.images.splice(idx, 1)
}

const save = () => emit('save', { ...form.value })
</script>