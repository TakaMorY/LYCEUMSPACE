<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
    <header class="sticky top-0 z-50 bg-neutral-900/70 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/forum" class="text-xxs font-bold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent ">
          ЛИЦЕЙСКОЕПРОСТРАНСТВО
        </NuxtLink>
        <div class="flex items-center gap-4">
          <button v-if="user" @click="signOut" class="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-white/10">
            Выйти
          </button>
          <NuxtLink v-else to="/login" class="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full text-sm font-medium shadow-lg shadow-purple-500/20 transition-all duration-300">
            Войти
          </NuxtLink>
        </div>
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