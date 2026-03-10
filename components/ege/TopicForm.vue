<template>
  <div>
    <h2 class="text-2xl font-bold text-white mb-6">{{ topic ? 'Редактировать тему' : 'Новая тема' }}</h2>
    <input v-model="form.title" placeholder="Название темы" class="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-xl text-white mb-6" />
    <div class="flex justify-end gap-3">
      <button @click="$emit('close')" class="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 transition">Отмена</button>
      <button @click="save" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition">Сохранить</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ topic: Object })
const emit = defineEmits(['save', 'close'])
const form = ref({ title: props.topic?.title || '' })
const save = () => emit('save', { id: props.topic?.id, title: form.value.title })
</script>