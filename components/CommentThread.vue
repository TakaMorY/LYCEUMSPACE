<template>
  <div class="comment-thread space-y-4">
    <!-- Форма нового комментария -->
    <div class="flex gap-3">
      <UserAvatar :user="user" />
      <div class="flex-1">
        <textarea
          v-model="newComment"
          :placeholder="replyingTo ? `Ответить ${replyingTo.user?.name}...` : 'Напишите комментарий...'"
          rows="2"
          class="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        ></textarea>
        
        <div v-if="replyingTo" class="flex items-center justify-between mt-2">
          <span class="text-sm text-neutral-500">
            Ответ @{{ replyingTo.user?.username }}
          </span>
          <button @click="cancelReply" class="text-sm text-red-400 hover:text-red-300">
            Отмена
          </button>
        </div>
        
        <button
          @click="submitComment"
          :disabled="!newComment.trim()"
          class="mt-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm disabled:opacity-50 hover:bg-blue-700 transition"
        >
          {{ replyingTo ? 'Ответить' : 'Отправить' }}
        </button>
      </div>
    </div>

    <!-- Список комментариев -->
    <div v-if="loading" class="text-center py-4">
      <Icon name="heroicons:arrow-path" class="w-6 h-6 animate-spin text-neutral-600 mx-auto" />
    </div>

    <div v-else class="space-y-4">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        @reply="startReply"
      />
    </div>

    <div v-if="!comments.length && !loading" class="text-center py-6 text-neutral-500">
      Пока нет комментариев
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import UserAvatar from './UserAvatar.vue'
import CommentItem from './CommentItem.vue'

const props = defineProps({
  postId: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['update'])

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const comments = ref([])
const loading = ref(true)
const newComment = ref('')
const replyingTo = ref(null)

const fetchComments = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      user:user_id ( id, name, username, avatar )
    `)
    .eq('post_id', props.postId)
    .order('created_at', { ascending: true })

  if (!error && data) {
    // Строим дерево комментариев
    const commentMap = {}
    data.forEach(c => commentMap[c.id] = { ...c, replies: [] })
    const roots = []
    data.forEach(c => {
      if (c.parent_id) {
        if (commentMap[c.parent_id]) {
          commentMap[c.parent_id].replies.push(commentMap[c.id])
        }
      } else {
        roots.push(commentMap[c.id])
      }
    })
    comments.value = roots
  }
  loading.value = false
}

const submitComment = async () => {
  if (!newComment.value.trim() || !user.value) return

  const { error } = await supabase
    .from('comments')
    .insert({
      post_id: props.postId,
      user_id: user.value.id,
      content: newComment.value,
      parent_id: replyingTo.value?.id || null
    })

  if (!error) {
    newComment.value = ''
    replyingTo.value = null
    await fetchComments()
    emit('update')
  }
}

const startReply = (comment) => {
  replyingTo.value = comment
}

const cancelReply = () => {
  replyingTo.value = null
  newComment.value = ''
}

onMounted(() => {
  fetchComments()
  
  // Realtime подписка
  const subscription = supabase
    .channel(`comments:${props.postId}`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'comments',
      filter: `post_id=eq.${props.postId}`
    }, () => {
      fetchComments()
    })
    .subscribe()

  onUnmounted(() => subscription.unsubscribe())
})
</script>