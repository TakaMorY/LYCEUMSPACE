// middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser() // реактивная ссылка на пользователя

  // Если пользователь не залогинен и пытается зайти на защищённую страницу (не /login)
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  // Если пользователь уже залогинен, но идёт на страницу входа – перенаправляем на главную
  if (user.value && to.path === '/login') {
    return navigateTo('/')
  }
})