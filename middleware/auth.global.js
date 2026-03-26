export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  // Ждем, пока пользователь загрузится
  await nextTick()
  
  if (user.value) {
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
  }
})