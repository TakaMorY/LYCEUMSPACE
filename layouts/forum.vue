<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
    <header class="sticky top-0 z-50 bg-neutral-900/70 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/forum" class="text-xxs font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent">
          ЛИЦЕЙСКОЕПРОСТРАНСТВО
        </NuxtLink>
        <div v-if="user" class="flex items-center gap-4">
          <!-- Шестеренка настроек -->
          <NuxtLink
            to="/settings/profile"
            class="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/10"
            title="Настройки профиля"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </NuxtLink>
          <button @click="signOut" class="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/10">
            Выйти
          </button>
        </div>
        <NuxtLink v-else to="/login" class="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full text-sm font-medium shadow-lg shadow-purple-500/20 transition-all duration-300">
          Войти
        </NuxtLink>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const signOut = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>