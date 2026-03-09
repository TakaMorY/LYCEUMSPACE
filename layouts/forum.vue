<template>
  <div class="min-h-screen bg-neutral-950 text-white">
    <header class="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/forum" class="text-2xl font-bold text-white hover:text-neutral-300 transition">
          ❖ Forum
        </NuxtLink>

        <div v-if="user" class="flex items-center space-x-4">
          <!-- Ссылка на профиль только когда user.id определён -->
          <NuxtLink
           
            :to="`/profile/${user.id}`"
            class="flex items-center space-x-2 hover:bg-neutral-800 p-2 rounded-full transition"
          >
            <img
              src="/images/defaultavatar/default-avatar.png"
              class="w-8 h-8 rounded-full"
            />
            <span class="hidden sm:inline text-sm">
              {{ user.email?.split('@')[0] }}
            </span>
          </NuxtLink>
          <!-- Заглушка, пока user.id не загружен -->
          

          <NuxtLink to="/settings/profile" class="text-neutral-400 hover:text-white transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </NuxtLink>

          <button @click="signOut" class="text-neutral-400 hover:text-white text-sm">Выйти</button>
        </div>

        <NuxtLink
         v-else="user"
          to="/login"
          class="bg-white text-neutral-950 px-4 py-2 rounded-full text-sm font-bold hover:bg-neutral-200 transition"
        >
          Войти
        </NuxtLink>
      </div>
    </header>
    <main class="max-w-2xl mx-auto px-4 py-6">
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