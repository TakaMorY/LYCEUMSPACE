export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()
  
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

  try {
    // Получаем текущего пользователя напрямую через API
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    // Если есть ошибка или пользователь не найден
    if (userError || !user) {
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
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle() // используем maybeSingle вместо single, чтобы не было ошибки

    // Если профиль не найден, создаем его
    if (!profile && !profileError) {
      console.log('Создаем профиль для пользователя:', user.id)

      const username = user.user_metadata?.username || user.email?.split('@')[0] || `user_${Date.now()}`
      const full_name = user.user_metadata?.full_name || ''

      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: username,
          full_name: full_name,
          avatar_url: '/images/defaultavatar/default-avatar.png',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (insertError) {
        console.error('Ошибка создания профиля:', insertError)
      } else {
        console.log('Профиль успешно создан')
      }
    }
    
    // Если всё хорошо, пропускаем на любую страницу
    return
    
  } catch (err) {
    console.error('Ошибка в middleware:', err)
    // В случае ошибки, если страница не публичная - редирект на логин
    if (!isPublicPage) {
      return navigateTo('/login')
    }
  }
})
