<!-- components/OrdoLogo.vue -->
<template>
    <div class="ordo-logo" :class="{ 'w-12 h-12': small, 'w-16 h-16': medium, 'w-24 h-24': large }">
        <svg viewBox="0 0 100 100" class="w-full h-full text-current" :class="colorClass">
            <!-- Шестерня (основная форма) -->
            <circle cx="50" cy="45" r="20" stroke="currentColor" stroke-width="2" fill="none" />
            <circle cx="50" cy="45" r="15" stroke="currentColor" stroke-width="1.5" fill="none"
                stroke-dasharray="2 3" />
            <!-- Зубья шестерни -->
            <line x1="30" y1="35" x2="20" y2="30" stroke="currentColor" stroke-width="1.5" />
            <line x1="30" y1="55" x2="20" y2="60" stroke="currentColor" stroke-width="1.5" />
            <line x1="50" y1="25" x2="45" y2="15" stroke="currentColor" stroke-width="1.5" />
            <line x1="70" y1="35" x2="80" y2="30" stroke="currentColor" stroke-width="1.5" />
            <line x1="70" y1="55" x2="80" y2="60" stroke="currentColor" stroke-width="1.5" />
            <line x1="50" y1="65" x2="55" y2="75" stroke="currentColor" stroke-width="1.5" />
            <!-- Глаз внутри -->
            <circle cx="50" cy="45" r="6" stroke="currentColor" stroke-width="1.5" fill="none" />
            <circle cx="50" cy="45" r="2" fill="currentColor" />
            <!-- Волна снизу (стилизованная) -->
            <path d="M30 75 Q40 70, 50 75 T70 75" stroke="currentColor" stroke-width="1.5" fill="none" />
            <path d="M30 80 Q40 75, 50 80 T70 80" stroke="currentColor" stroke-width="1.5" fill="none" />
            <!-- Точка над i – намёк на звезду -->
            <circle cx="52" cy="25" r="1" fill="currentColor" class="opacity-50" />
            <!-- Дополнительные лучи (едва заметные) -->
            <line x1="50" y1="25" x2="50" y2="15" stroke="currentColor" stroke-width="0.8" class="opacity-20" />
            <line x1="60" y1="30" x2="70" y2="20" stroke="currentColor" stroke-width="0.8" class="opacity-20" />
        </svg>
    </div>
</template>

<script setup>
defineProps({
    small: Boolean,
    medium: Boolean,
    large: Boolean,
    colorClass: {
        type: String,
        default: 'text-white/60'
    }
});
</script>