export default defineNuxtRouteMiddleware(async (to) => {
  // Пропускаем публичные страницы
  if (to.path === '/login' || to.path === '/register' || to.path === '/forgot-password' || to.path === '/index.vue') {
    return
  }

  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    return navigateTo('/login')
  }
})