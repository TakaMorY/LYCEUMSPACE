<template>
  <div class="space-y-4">
    <!-- Форма комментария -->
    <div v-if="user" class="flex gap-3">
      <img
        v-if="user.user_metadata?.avatar"
        :src="user.user_metadata.avatar"
        class="avatar avatar-sm"
      />
      <div v-else class="avatar avatar-sm bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
        {{ user.email?.charAt(0).toUpperCase() }}
      </div>
      <div class="flex-1">
        <textarea
          v-model="newComment"
          placeholder="Напишите комментарий..."
          rows="2"
          class="w-full p-2 border border-gray-200 dark:border-gray-800 rounded-lg focus:ring-1 focus:ring-blue-500 bg-transparent resize-none"
        ></textarea>
        <div class="flex justify-end mt-2">
          <button
            @click="submitComment"
            :disabled="!newComment.trim()"
            class="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full text-sm font-medium"
          >
            {{ commenting ? 'Отправка...' : 'Ответить' }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Список комментариев -->
    <div v-if="rootComments.length" class="space-y-3">
      <div
        v-for="comment in rootComments"
        :key="comment.id"
        class="flex gap-2 text-sm"
      >
        <img
          v-if="comment.profiles?.avatar"
          :src="comment.profiles.avatar"
          class="avatar avatar-xs"
        />
        <div v-else class="avatar avatar-xs bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
          {{ comment.profiles?.name?.charAt(0) }}
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-medium">{{ comment.profiles?.name }}</span>
            <span class="text-gray-500 text-xs">{{ formatDate(comment.created_at) }}</span>
          </div>
          <p class="mt-1 text-gray-800 dark:text-gray-200">{{ comment.content }}</p>
          <button
            @click="replyTo(comment)"
            class="mt-1 text-xs text-gray-500 hover:text-blue-600"
          >
            Ответить
          </button>
          
          <!-- Вложенные комментарии -->
          <div v-if="comment.replies?.length" class="mt-2 space-y-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <div v-for="reply in comment.replies" :key="reply.id" class="flex gap-2">
              <img
                v-if="reply.profiles?.avatar"
                :src="reply.profiles.avatar"
                class="avatar avatar-xs"
              />
              <div v-else class="avatar avatar-xs bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                {{ reply.profiles?.name?.charAt(0) }}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ reply.profiles?.name }}</span>
                  <span class="text-gray-500 text-xs">{{ formatDate(reply.created_at) }}</span>
                </div>
                <p class="text-gray-800 dark:text-gray-200">{{ reply.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-gray-500 text-center py-4">Нет комментариев</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({ postId: String })
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const comments = ref([])
const newComment = ref('')
const commenting = ref(false)
const replyingTo = ref(null)

const rootComments = computed(() => comments.value.filter(c => !c.parent_id))

onMounted(async () => {
  await fetchComments()
  subscribeToComments()
})

async function fetchComments() {
  const { data } = await supabase
    .from('comments')
    .select(`
      *,
      profiles:user_id ( name, username, avatar )
    `)
    .eq('post_id', props.postId)
    .order('created_at', { ascending: true })
  
  if (data) {
    const map = {}
    data.forEach(c => map[c.id] = { ...c, replies: [] })
    data.forEach(c => {
      if (c.parent_id && map[c.parent_id]) {
        map[c.parent_id].replies.push(map[c.id])
      }
    })
    comments.value = data.filter(c => !c.parent_id)
  }
}

function subscribeToComments() {
  supabase
    .channel(`comments-${props.postId}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${props.postId}` }, async (payload) => {
      const { data } = await supabase
        .from('comments')
        .select('*, profiles:user_id ( name, username, avatar )')
        .eq('id', payload.new.id)
        .single()
      if (data) {
        if (data.parent_id) {
          const parent = comments.value.find(c => c.id === data.parent_id)
          if (parent) parent.replies.push(data)
        } else {
          comments.value.push(data)
        }
      }
    })
    .subscribe()
}

async function submitComment() {
  if (!newComment.value.trim() || !user.value) return
  commenting.value = true
  await supabase
    .from('comments')
    .insert({
      post_id: props.postId,
      user_id: user.value.id,
      content: newComment.value,
      parent_id: replyingTo.value?.id || null
    })
  newComment.value = ''
  replyingTo.value = null
  commenting.value = false
}

function replyTo(comment) {
  replyingTo.value = comment
  // Можно фокусировать поле
}
</script>