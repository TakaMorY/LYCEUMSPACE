<template>
  <div>
    <h2 class="text-2xl font-bold text-white mb-6">{{ subject ? 'Редактировать предмет' : 'Новый предмет' }}</h2>
    <input v-model="form.name" placeholder="Название предмета" class="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-xl text-white mb-6" />
    <div class="flex justify-end gap-3">
      <button @click="$emit('close')" class="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 transition">Отмена</button>
      <button @click="save" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition">Сохранить</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ subject: Object })
const emit = defineEmits(['save', 'close'])
const form = ref({ name: props.subject?.name || '' })
const save = () => emit('save', { id: props.subject?.id, name: form.value.name })
</script>