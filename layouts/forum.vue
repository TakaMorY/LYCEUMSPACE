<template>
  <div class="min-h-screen bg-neutral-950 text-white">
    <!-- Шапка -->
    <header class="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/forum" class="text-2xl font-bold text-white hover:text-neutral-300 transition">❖ Forum</NuxtLink>
        <div v-if="user" class="flex items-center space-x-4">
          <NuxtLink :to="`/profile/${user.id}`" class="flex items-center space-x-2 hover:bg-neutral-800 p-2 rounded-full transition">
            <img :src="userAvatar || '/default-avatar.png'" class="w-8 h-8 rounded-full" />
            <span class="hidden sm:inline text-sm">{{ userUsername }}</span>
          </NuxtLink>
          <button @click="signOut" class="text-neutral-400 hover:text-white text-sm">Выйти</button>
        </div>
        <NuxtLink v-else to="/login" class="bg-white text-neutral-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-neutral-200 transition">Войти</NuxtLink>
      </div>
    </header>

    <!-- Основной контент -->
    <main class="max-w-2xl mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { data: profile } = await useAsyncData('header-profile', async () => {
  if (!user.value) return null
  const { data } = await supabase
    .from('profiles')
    .select('username, avatar_url')
    .eq('id', user.value.id)
    .single()
  return data
})

const userUsername = computed(() => profile.value?.username || user.value?.email?.split('@')[0] || '')
const userAvatar = computed(() => profile.value?.avatar_url)

const signOut = async () => {
  await supabase.auth.signOut()
  await navigateTo('/login')
}
</script>