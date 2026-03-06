// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  // Публичные маршруты (доступны без авторизации)
  const publicRoutes = ['/login', '/forgot-password', '/update-password', '/',]

  if (!user.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  if (user.value && publicRoutes.includes(to.path) && to.path !== '/') {
    // Редирект с публичных страниц (кроме главной) для авторизованных
    return navigateTo('/')
  }
})