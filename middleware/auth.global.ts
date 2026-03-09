export default defineNuxtRouteMiddleware(async (to) => {
  // Пропускаем публичные страницы
  if (to.path === '/login' || to.path === '/register' || to.path === '/forgot-password'  || to.path === '/' || to.path === '/rules' || to.path === '/policy') {
    return
  }

  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return navigateTo('/login')
  }
})