<template>
  <div class="max-w-2xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6">Уведомления</h1>
    
    <div v-if="notifications.length" class="space-y-2">
      <div
        v-for="notif in notifications"
        :key="notif.id"
        class="card"
        :class="{ 'bg-blue-50 dark:bg-blue-900/20': !notif.read }"
      >
        <div class="card-body">
          <div class="flex items-start gap-3">
            <img
              v-if="notif.source_user?.avatar"
              :src="notif.source_user.avatar"
              class="avatar avatar-sm"
            />
            <div v-else class="avatar avatar-sm bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              {{ notif.source_user?.name?.charAt(0) }}
            </div>
            <div class="flex-1">
              <p>
                <NuxtLink :to="`/forum/profile/${notif.source_user_id}`" class="font-semibold hover:underline">
                  {{ notif.source_user?.name }}
                </NuxtLink>
                {{ notificationText(notif) }}
                <span class="text-gray-500 text-sm ml-2">{{ formatDate(notif.created_at) }}</span>
              </p>
              <NuxtLink
                v-if="notif.post_id"
                :to="`/forum/post/${notif.post_id}`"
                class="text-blue-600 hover:underline text-sm"
              >
                Перейти к посту
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-16 text-gray-500">
      <Icon name="heroicons:bell" class="text-6xl text-gray-300 mx-auto mb-4" />
      Нет уведомлений
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const notifications = ref([])

onMounted(async () => {
  if (!user.value) return navigateTo('/login')
  await fetchNotifications()
  subscribeToNotifications()
})

async function fetchNotifications() {
  const { data } = await supabase
    .from('notifications')
    .select(`
      *,
      source_user:source_user_id ( name, username, avatar )
    `)
    .eq('user_id', user.value.id)
    .order('created_at', { ascending: false })
  
  if (data) notifications.value = data
}

function subscribeToNotifications() {
  supabase
    .channel('notifications')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.value.id}` }, async (payload) => {
      const { data } = await supabase
        .from('notifications')
        .select('*, source_user:source_user_id ( name, username, avatar )')
        .eq('id', payload.new.id)
        .single()
      if (data) notifications.value = [data, ...notifications.value]
    })
    .subscribe()
}

function notificationText(notif) {
  const map = {
    like: 'лайкнул ваш пост',
    comment: 'оставил комментарий',
    follow: 'подписался на вас',
    repost: 'сделал репост вашего поста'
  }
  return map[notif.type] || 'взаимодействовал с вами'
}
</script>