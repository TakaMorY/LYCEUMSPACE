export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Список публичных страниц (доступны без авторизации)
  const publicPages = [
    '/',
    '/privacy',
    '/forgot-password',
    '/illuminati',
    '/login',
    '/rules'
  ]

  // Проверяем, является ли текущий маршрут публичным
  const isPublicPage = publicPages.some(page => to.path === page)

  // Ждем, пока пользователь загрузится
  await nextTick()

  // Если пользователь не авторизован
  if (!user.value) {
    // Если страница не публичная, перенаправляем на логин
    if (!isPublicPage) {
      return navigateTo('/login')
    }
    // Если публичная - пропускаем
    return
  }

  // Пользователь авторизован
  // Если пытается зайти на страницу логина - перенаправляем на главную
  if (to.path === '/login') {
    return navigateTo('/')
  }

  // Проверяем, существует ли профиль пользователя
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.value.id)
    .single()

  // Если профиль не найден, создаем его
  if (error && error.code === 'PGRST116') {
    console.log('Создаем профиль для пользователя:', user.value.id)

    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: user.value.id,
        username: user.value.user_metadata?.username || user.value.email?.split('@')[0],
        full_name: user.value.user_metadata?.full_name || '',
        avatar_url: '/images/defaultavatar/default-avatar.png',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('Ошибка создания профиля:', insertError)
    }
  }
})