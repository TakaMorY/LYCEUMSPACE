<template>
  <div class="max-w-7xl mx-auto h-full px-2 sm:px-4">
    <div
      class="bg-neutral-900/40 backdrop-blur-xl rounded-2xl border border-neutral-700/50 overflow-hidden h-[calc(100vh-8rem)] flex flex-col md:flex-row shadow-2xl"
    >
      <!-- Левая панель: список диалогов -->
      <div
        :class="[
          'w-full md:w-96 border-b md:border-b-0 md:border-r border-neutral-800/50 flex flex-col overflow-hidden transition-all duration-300 bg-gradient-to-b from-neutral-900/60 to-neutral-900/40',
          selectedUser && !isFavorites ? 'hidden md:flex' : 'flex',
        ]"
      >
        <div class="p-3 sm:p-5 border-b border-neutral-800/50 shrink-0 bg-neutral-900/30">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <h2
              class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent"
            >
              Сообщения
            </h2>
            <div class="text-xs sm:text-sm text-neutral-400">{{ chats.length }} чатов</div>
          </div>

          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск..."
              class="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base bg-neutral-800/50 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-neutral-800 transition-all border border-neutral-700/30"
            />
          </div>
        </div>

        <!-- Результаты поиска -->
        <div v-if="searchQuery" class="flex-1 overflow-y-auto custom-scroll">
          <div v-if="searching" class="text-center py-8 sm:py-12">
            <div
              class="inline-block w-6 h-6 sm:w-8 sm:h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
            ></div>
          </div>
          <div v-else-if="userResults.length === 0" class="text-center py-8 sm:py-12">
            <svg
              class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-neutral-600 mb-2 sm:mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p class="text-neutral-500 text-sm sm:text-base">Не найдены</p>
          </div>
          <div v-else>
            <div
              v-for="user in userResults"
              :key="user.id"
              @click="startChat(user)"
              class="group p-3 sm:p-4 hover:bg-gradient-to-r hover:from-neutral-800/50 hover:to-transparent transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-blue-500"
            >
              <div class="flex items-center gap-2 sm:gap-3">
                <div class="relative">
                  <img
                    :src="user.avatar_url || '/images/defaultavatar/default-avatar.png'"
                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-neutral-700 group-hover:ring-blue-500/50 transition-all"
                  />
                  <div
                    v-if="user.status?.is_online"
                    class="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-neutral-900"
                  ></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div
                    class="font-semibold text-white text-sm sm:text-base truncate group-hover:text-blue-400 transition"
                  >
                    {{ user.full_name || user.username }}
                  </div>
                  <div class="text-xs sm:text-sm text-neutral-400 truncate">@{{ user.username }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Список чатов -->
        <div v-else class="flex-1 overflow-y-auto custom-scroll">
          <button
            @click="openFavorites"
            class="w-full p-3 sm:p-4 text-left hover:bg-gradient-to-r hover:from-neutral-800/50 hover:to-transparent transition-all duration-200 flex items-center gap-2 sm:gap-3 border-l-2 border-transparent hover:border-pink-500 group"
          >
            <div class="relative">
              <div
                class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition"
              >
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="font-semibold text-white text-sm sm:text-base">Избранное</div>
              <div class="text-xs sm:text-sm text-neutral-400 truncate">Личные заметки</div>
            </div>
          </button>

          <div
            v-for="chat in chats"
            :key="chat.user.id"
            @click="selectChat(chat.user)"
            class="group relative p-3 sm:p-4 hover:bg-gradient-to-r hover:from-neutral-800/50 hover:to-transparent transition-all duration-200 cursor-pointer border-l-2"
            :class="[
              selectedUser?.id === chat.user.id
                ? 'border-l-blue-500 bg-gradient-to-r from-blue-500/10 to-transparent'
                : 'border-l-transparent',
            ]"
          >
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="relative">
                <img
                  :src="chat.user.avatar_url || '/images/defaultavatar/default-avatar.png'"
                  class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-neutral-700 group-hover:ring-blue-500/50 transition-all"
                  :class="{ 'ring-blue-500': selectedUser?.id === chat.user.id }"
                />
                <div
                  v-if="chat.user.status?.is_online"
                  class="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-neutral-900"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <div class="font-semibold text-white text-sm sm:text-base truncate">
                    {{ chat.user.full_name || chat.user.username }}
                  </div>
                  <div class="text-[10px] sm:text-xs text-neutral-500 shrink-0">
                    {{ chat.lastMessageTime || "" }}
                  </div>
                </div>
                <div class="text-xs sm:text-sm text-neutral-400 truncate">@{{ chat.user.username }}</div>
                <div
                  v-if="chat.lastMessage"
                  class="text-[11px] sm:text-xs text-neutral-500 truncate mt-0.5 sm:mt-1"
                >
                  {{ chat.lastMessage }}
                </div>
              </div>
              <div
                v-if="chat.unread > 0"
                class="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full text-[10px] sm:text-xs font-bold flex items-center justify-center text-white shadow-md shrink-0"
              >
                {{ chat.unread > 9 ? "9+" : chat.unread }}
              </div>
            </div>
          </div>

          <div v-if="!loadingChats && chats.length === 0" class="text-center py-8 sm:py-12">
            <svg
              class="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-neutral-600 mb-2 sm:mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p class="text-neutral-500 text-sm sm:text-base">Нет чатов</p>
            <p class="text-xs sm:text-sm text-neutral-600 mt-1">Начните переписку</p>
          </div>
        </div>
      </div>

      <!-- Правая панель: активный диалог -->
      <div
        class="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-b from-neutral-900/30 to-neutral-900/20"
      >
        <div v-if="selectedUser" class="flex-1 flex flex-col h-full overflow-hidden">
          <!-- Шапка диалога -->
          <div
            class="p-3 sm:p-4 border-b border-neutral-800/50 shrink-0 bg-neutral-900/30 backdrop-blur-sm"
          >
            <div class="flex items-center gap-2 sm:gap-3">
              <button
                @click="closeChat"
                class="md:hidden text-white p-1.5 sm:p-2 hover:bg-neutral-800 rounded-lg transition"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <NuxtLink
                v-if="!isFavorites"
                :to="`/profile/${selectedUser.id}`"
                class="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition flex-1 group"
              >
                <div class="relative">
                  <img
                    :src="selectedUser.avatar_url || '/images/defaultavatar/default-avatar.png'"
                    class="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-neutral-700 group-hover:ring-blue-500 transition"
                  />
                  <div
                    v-if="!isFavorites && selectedUser.status?.is_online"
                    class="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-neutral-900"
                  ></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-white text-sm sm:text-base truncate">
                    {{ selectedUser.full_name || selectedUser.username }}
                  </div>
                  <div class="text-xs sm:text-sm text-neutral-400 truncate">
                    @{{ selectedUser.username }}
                    <span
                      v-if="typingStatus && !isFavorites"
                      class="text-blue-400 ml-1 sm:ml-2 inline-flex gap-0.5"
                    >
                      <span class="animate-bounce">.</span>
                      <span class="animate-bounce" style="animation-delay: 0.2s">.</span>
                      <span class="animate-bounce" style="animation-delay: 0.4s">.</span>
                    </span>
                  </div>
                </div>
              </NuxtLink>
              <div v-else class="flex items-center gap-2 sm:gap-3 flex-1">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg"
                >
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-white text-sm sm:text-base">Избранное</div>
                  <div class="text-xs sm:text-sm text-neutral-400">Личные заметки</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Область сообщений -->
          <div
            ref="messagesContainer"
            class="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 custom-scroll touch-pan-y"
            @scroll="handleScroll"
          >
            <div v-if="loadingMoreMessages" class="text-center py-2">
              <div
                class="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
              ></div>
            </div>
            <div
              v-for="msg in messages"
              :key="msg.id"
              class="flex message-group relative"
              :class="[
                msg.sender_id === currentUserId ? 'justify-end' : 'justify-start',
                replyToMessageId === msg.id ? 'bg-blue-500/20 rounded-lg -mx-2 px-2' : '',
              ]"
              @contextmenu.prevent="handleContextMenu($event, msg)"
              @touchstart="onTouchStart($event, msg)"
              @touchmove="onTouchMove($event, msg)"
              @touchend="onTouchEnd($event, msg)"
            >
              <Teleport to="body">
                <div
                  v-if="contextMenuVisible && contextMenuMessage?.id === msg.id"
                  class="fixed z-50 bg-neutral-800 rounded-lg shadow-xl border border-neutral-700 py-1 min-w-[180px]"
                  :style="{ top: adjustedContextMenuY + 'px', left: adjustedContextMenuX + 'px' }"
                  @click.stop
                >
                  <button
                    @click="copyMessageText(contextMenuMessage)"
                    class="w-full px-4 py-2 text-left text-sm text-white hover:bg-neutral-700 transition flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Копировать текст
                  </button>
                  <button
                    v-if="contextMenuMessage.sender_id === currentUserId"
                    @click="editMessage(contextMenuMessage)"
                    class="w-full px-4 py-2 text-left text-sm text-white hover:bg-neutral-700 transition flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Редактировать
                  </button>
                  <button
                    @click="replyToMessageFromMenu(contextMenuMessage)"
                    class="w-full px-4 py-2 text-left text-sm text-white hover:bg-neutral-700 transition flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                    Ответить
                  </button>
                  <button
                    v-if="contextMenuMessage.sender_id === currentUserId"
                    @click="deleteMessage(contextMenuMessage)"
                    class="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-neutral-700 transition flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Удалить
                  </button>
                </div>
              </Teleport>

              <div
                :class="[
                  'max-w-[85%] sm:max-w-[70%] rounded-2xl p-2.5 sm:p-3 shadow-lg transition-all duration-200 relative',
                  msg.sender_id === currentUserId
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'
                    : 'bg-neutral-800/80 text-white backdrop-blur-sm border border-neutral-700/30',
                  isMessageSwiped === msg.id ? 'transform -translate-x-16 sm:-translate-x-20' : '',
                ]"
              >
                <div
                  v-if="msg.reply_to"
                  class="mb-1.5 sm:mb-2 p-1.5 sm:p-2 rounded-lg bg-black/30 text-xs border-l-2 border-blue-400"
                >
                  <div class="text-blue-300 text-[10px] sm:text-xs font-medium">Ответ на сообщение</div>
                  <div class="text-[11px] sm:text-sm truncate">{{ msg.reply_to.content }}</div>
                </div>

                <p class="text-sm sm:text-base whitespace-pre-wrap leading-relaxed break-words">
                  {{ msg.content }}
                </p>
                <img
                  v-if="msg.image_url"
                  :src="msg.image_url"
                  class="mt-1.5 sm:mt-2 max-h-48 sm:max-h-64 rounded-lg cursor-pointer hover:opacity-90 transition"
                  @click.stop="openImage(msg.image_url)"
                />
                <div class="flex items-center justify-end gap-1 mt-1">
                  <span class="text-[9px] sm:text-[10px] opacity-70">{{ formatTime(msg.created_at) }}</span>
                  <span
                    v-if="msg.sender_id === currentUserId && msg.read"
                    class="text-[9px] sm:text-[10px] text-blue-200"
                    >✓✓</span
                  >
                  <span v-else-if="msg.sender_id === currentUserId" class="text-[9px] sm:text-[10px] opacity-70"
                    >✓</span
                  >
                </div>
              </div>
            </div>

            <button
              v-if="isUserScrolledUp && messages.length > 5"
              @click="scrollToBottom"
              class="fixed bottom-24 right-4 md:bottom-28 md:right-8 bg-blue-600 rounded-full p-2 sm:p-3 shadow-lg hover:bg-blue-700 transition z-10"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7-7-7m14-6l-7 7-7-7"
                />
              </svg>
            </button>

            <div v-if="loadingMessages && !loadingMoreMessages" class="text-center py-4">
              <div
                class="inline-block w-5 h-5 sm:w-6 sm:h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
              ></div>
            </div>
            <div ref="scrollAnchor" class="h-0"></div>
          </div>

          <!-- Панель ввода -->
          <div class="p-3 sm:p-4 border-t border-neutral-800/50 shrink-0 bg-neutral-900/30 backdrop-blur-sm">
            <div
              v-if="replyToMessage"
              class="mb-2 p-2 sm:p-3 bg-neutral-800/50 rounded-lg flex items-center justify-between"
            >
              <div class="flex-1">
                <div class="text-xs sm:text-sm text-blue-400 font-medium">Ответ на сообщение:</div>
                <div class="text-xs sm:text-sm text-neutral-300 truncate">{{ replyToMessage.content }}</div>
              </div>
              <button @click="clearReply" class="p-1 hover:bg-neutral-700 rounded">
                <svg class="w-3 h-3 sm:w-4 sm:h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              v-if="editingMessage"
              class="mb-2 p-2 sm:p-3 bg-neutral-800/50 rounded-lg flex items-center justify-between"
            >
              <div class="flex-1">
                <div class="text-xs sm:text-sm text-yellow-400 font-medium">Редактирование:</div>
                <div class="text-xs sm:text-sm text-neutral-300 truncate">{{ editingMessage.content }}</div>
              </div>
              <button @click="cancelEdit" class="p-1 hover:bg-neutral-700 rounded">
                <svg class="w-3 h-3 sm:w-4 sm:h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div class="flex flex-col gap-2">
              <div v-if="imagePreview" class="relative inline-block self-start">
                <img :src="imagePreview" class="h-16 sm:h-20 rounded-lg shadow-lg" />
                <button
                  @click="clearImage"
                  class="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:scale-110 transition shadow-lg"
                >
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex items-end gap-1 sm:gap-2">
                <label
                  class="cursor-pointer p-2 sm:p-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-all hover:scale-110 shrink-0 group"
                >
                  <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-blue-400 transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </label>
                <textarea
                  v-model="newMessageText"
                  @keydown.enter.exact.prevent="sendMessage"
                  @input="onTyping"
                  placeholder="Напишите сообщение..."
                  rows="1"
                  class="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base bg-neutral-800/50 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none border border-neutral-700/30 focus:border-blue-500 transition"
                ></textarea>
                <button
                  @click="sendMessage"
                  :disabled="(!newMessageText.trim() && !imageFile) || sending"
                  class="p-2 sm:p-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 rounded-full transition-all hover:scale-110 shrink-0 shadow-lg"
                >
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
              <div v-if="uploadingImage" class="text-xs text-neutral-400 flex items-center gap-2">
                <div
                  class="inline-block w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"
                ></div>
                Загрузка фото...
              </div>
            </div>
          </div>
        </div>

        <div v-else class="flex-1 flex flex-col items-center justify-center text-neutral-500 p-4 sm:p-8">
          <svg
            class="w-16 h-16 sm:w-24 sm:h-24 mb-3 sm:mb-4 text-neutral-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p class="text-sm sm:text-base font-medium">Выберите диалог</p>
          <p class="text-xs sm:text-sm mt-1">Начните общение с друзьями</p>
        </div>
      </div>
    </div>

    <ImageViewer :image-url="selectedImage" @close="selectedImage = null" />
  </div>
</template>

<script setup>
definePageMeta({ layout: "forum" })

import { ref, watch, nextTick, onMounted, onUnmounted, computed } from "vue"
import { useSupabaseClient } from "#imports"
import ImageViewer from "~/components/ImageViewer.vue"

const supabase = useSupabaseClient()
const currentUserId = ref(null)

// Состояния
const searchQuery = ref("")
const userResults = ref([])
const searching = ref(false)
const chats = ref([])
const loadingChats = ref(true)
const selectedUser = ref(null)
const messages = ref([])
const loadingMessages = ref(false)
const loadingMoreMessages = ref(false)
const newMessageText = ref("")
const sending = ref(false)
const messagesContainer = ref(null)
const scrollAnchor = ref(null)
const uploadingImage = ref(false)
const imageFile = ref(null)
const imagePreview = ref(null)
const selectedImage = ref(null)

// Ответы и редактирование
const replyToMessage = ref(null)
const replyToMessageId = ref(null)
const editingMessage = ref(null)

// Контекстное меню
const contextMenuVisible = ref(false)
const contextMenuMessage = ref(null)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const adjustedContextMenuX = ref(0)
const adjustedContextMenuY = ref(0)

// Свайп
let touchStartX = 0
let touchStartTime = 0
const isMessageSwiped = ref(null)
let swipeTimeout = null
let longPressTimeout = null

// Статус печати
const typingStatus = ref(false)
let typingTimeout = null

// Realtime подписки
let messagesChannel = null
let typingChannel = null
let statusChannel = null

// Пагинация
let hasMoreMessages = true
const MESSAGES_PAGE_SIZE = 30

const isUserScrolledUp = ref(false)
const isFavorites = computed(() => selectedUser.value?.id === currentUserId.value)

// --- Вспомогательные функции ---
const formatTime = (date) => {
  if (!date) return ""
  try {
    return new Date(date).toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" })
  } catch {
    return ""
  }
}

const formatTimeShort = (date) => {
  if (!date) return ""
  try {
    const d = new Date(date)
    const now = new Date()
    const diff = now - d
    if (diff < 60000) return "только что"
    if (diff < 3600000) return `${Math.floor(diff / 60000)} мин`
    if (diff < 86400000) return d.toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" })
    return d.toLocaleDateString("ru", { day: "numeric", month: "short" })
  } catch {
    return ""
  }
}

const scrollToBottom = async () => {
  await nextTick()
  if (scrollAnchor.value) {
    scrollAnchor.value.scrollIntoView({ behavior: "smooth", block: "end" })
    isUserScrolledUp.value = false
  }
}

const scrollToBottomIfNeeded = async () => {
  await nextTick()
  if (!messagesContainer.value || isUserScrolledUp.value) return
  if (scrollAnchor.value) {
    scrollAnchor.value.scrollIntoView({ behavior: "smooth", block: "end" })
  }
}

const handleScroll = () => {
  if (!messagesContainer.value) return
  const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value
  isUserScrolledUp.value = scrollHeight - scrollTop - clientHeight > 100

  if (scrollTop === 0 && !loadingMoreMessages && hasMoreMessages && selectedUser.value && messages.value.length) {
    loadMoreMessages()
  }
}

// --- Загрузка старых сообщений (пагинация) ---
const loadMoreMessages = async () => {
  if (loadingMoreMessages.value || !hasMoreMessages) return
  loadingMoreMessages.value = true
  try {
    const oldestMessage = messages.value[0]
    if (!oldestMessage) return

    let query = supabase
      .from("user_messages")
      .select("*")
      .lt("created_at", oldestMessage.created_at)
      .order("created_at", { ascending: false })
      .limit(MESSAGES_PAGE_SIZE)

    if (isFavorites.value) {
      query = query.eq("sender_id", currentUserId.value).eq("receiver_id", currentUserId.value)
    } else {
      query = query.or(
        `and(sender_id.eq.${currentUserId.value},receiver_id.eq.${selectedUser.value.id}),and(sender_id.eq.${selectedUser.value.id},receiver_id.eq.${currentUserId.value})`
      )
    }

    const { data, error } = await query
    if (error) throw error

    if (data.length === 0) {
      hasMoreMessages = false
    } else {
      const newMessages = data.reverse()
      const scrollHeightBefore = messagesContainer.value?.scrollHeight || 0
      messages.value = [...newMessages, ...messages.value]
      await nextTick()
      const scrollHeightAfter = messagesContainer.value?.scrollHeight || 0
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = scrollHeightAfter - scrollHeightBefore
      }
    }
  } catch (err) {
    console.error("Ошибка загрузки старых сообщений:", err)
  } finally {
    loadingMoreMessages.value = false
  }
}

// --- Принудительное обновление счётчиков ---
const refreshUnreadCounts = async () => {
  if (!currentUserId.value) return
  
  for (let i = 0; i < chats.value.length; i++) {
    const chat = chats.value[i]
    const { count } = await supabase
      .from("user_messages")
      .select("*", { count: "exact", head: true })
      .eq("sender_id", chat.user.id)
      .eq("receiver_id", currentUserId.value)
      .eq("read", false)
    
    chats.value[i].unread = count || 0
  }
}

// --- Загрузка списка чатов ---
const loadChats = async () => {
  if (!currentUserId.value) return
  loadingChats.value = true
  try {
    const { data: messagesData } = await supabase
      .from("user_messages")
      .select("sender_id, receiver_id")
      .or(`sender_id.eq.${currentUserId.value},receiver_id.eq.${currentUserId.value}`)

    const userIds = new Set()
    messagesData?.forEach((msg) => {
      if (msg.sender_id !== currentUserId.value) userIds.add(msg.sender_id)
      if (msg.receiver_id !== currentUserId.value) userIds.add(msg.receiver_id)
    })

    if (userIds.size === 0) {
      chats.value = []
      loadingChats.value = false
      return
    }

    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, full_name, avatar_url")
      .in("id", Array.from(userIds))

    const statuses = await loadUsersStatus(Array.from(userIds))

    const chatsWithData = await Promise.all(
      profiles.map(async (profile) => {
        const { count: unread } = await supabase
          .from("user_messages")
          .select("*", { count: "exact", head: true })
          .eq("sender_id", profile.id)
          .eq("receiver_id", currentUserId.value)
          .eq("read", false)

        const { data: lastMsg } = await supabase
          .from("user_messages")
          .select("content, created_at")
          .or(
            `and(sender_id.eq.${currentUserId.value},receiver_id.eq.${profile.id}),and(sender_id.eq.${profile.id},receiver_id.eq.${currentUserId.value})`
          )
          .order("created_at", { ascending: false })
          .limit(1)

        return {
          user: { ...profile, status: statuses[profile.id] || { is_online: false } },
          unread: unread || 0,
          lastMessage: lastMsg?.[0]?.content?.substring(0, 40) || null,
          lastMessageTime: lastMsg?.[0]?.created_at ? formatTimeShort(lastMsg[0].created_at) : null,
        }
      })
    )

    chats.value = chatsWithData.sort((a, b) => b.unread - a.unread)
  } catch (err) {
    console.error("Ошибка загрузки чатов:", err)
  } finally {
    loadingChats.value = false
  }
}

// --- Загрузка сообщений и отметка прочитанных ---
const loadMessages = async () => {
  if (!selectedUser.value || !currentUserId.value) return
  loadingMessages.value = true
  hasMoreMessages = true
  try {
    let query = supabase
      .from("user_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(MESSAGES_PAGE_SIZE)

    if (isFavorites.value) {
      query = query.eq("sender_id", currentUserId.value).eq("receiver_id", currentUserId.value)
    } else {
      query = query.or(
        `and(sender_id.eq.${currentUserId.value},receiver_id.eq.${selectedUser.value.id}),and(sender_id.eq.${selectedUser.value.id},receiver_id.eq.${currentUserId.value})`
      )
    }

    const { data, error } = await query
    if (error) throw error

    messages.value = data || []

    if (!isFavorites.value) {
      const unreadMessages = messages.value.filter((m) => m.sender_id === selectedUser.value.id && !m.read)
      if (unreadMessages.length) {
        const unreadIds = unreadMessages.map((m) => m.id)
        
        await supabase
          .from("user_messages")
          .update({ read: true })
          .in("id", unreadIds)
          .eq("read", false)

        messages.value = messages.value.map((m) =>
          unreadIds.includes(m.id) ? { ...m, read: true } : m
        )
        
        // Обновляем счётчик в списке чатов
        const chatIndex = chats.value.findIndex(c => c.user.id === selectedUser.value.id)
        if (chatIndex !== -1) {
          chats.value[chatIndex].unread = 0
        }
      }
    }

    await scrollToBottom()
  } catch (err) {
    console.error("Ошибка загрузки сообщений:", err)
  } finally {
    loadingMessages.value = false
  }
}

// --- Realtime подписки ---
const subscribeToMessages = () => {
  if (messagesChannel) supabase.removeChannel(messagesChannel)
  if (!selectedUser.value || isFavorites.value) return

  messagesChannel = supabase
    .channel(`messages-${selectedUser.value.id}-${currentUserId.value}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "user_messages",
        filter: `sender_id=eq.${selectedUser.value.id},receiver_id=eq.${currentUserId.value}`,
      },
      async (payload) => {
        const newMessage = payload.new
        if (!messages.value.some((m) => m.id === newMessage.id)) {
          messages.value.push(newMessage)
          await supabase.from("user_messages").update({ read: true }).eq("id", newMessage.id)
          
          const chatIndex = chats.value.findIndex(c => c.user.id === selectedUser.value.id)
          if (chatIndex !== -1) {
            chats.value[chatIndex].unread = 0
          }
          
          scrollToBottomIfNeeded()
        }
      }
    )
    .subscribe()
}

const subscribeToTyping = () => {
  if (typingChannel) supabase.removeChannel(typingChannel)
  if (!selectedUser.value || isFavorites.value) return

  typingChannel = supabase
    .channel(`typing-${selectedUser.value.id}-${currentUserId.value}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "typing_status",
        filter: `user_id=eq.${selectedUser.value.id},chat_with=eq.${currentUserId.value}`,
      },
      (payload) => {
        if (payload.new && payload.new.is_typing) {
          typingStatus.value = true
          setTimeout(() => {
            if (typingStatus.value) typingStatus.value = false
          }, 3000)
        } else {
          typingStatus.value = false
        }
      }
    )
    .subscribe()
}

const subscribeToStatus = () => {
  if (statusChannel) supabase.removeChannel(statusChannel)
  statusChannel = supabase
    .channel("user-status")
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "user_status" }, (payload) => {
      const updated = payload.new
      const chat = chats.value.find((c) => c.user.id === updated.user_id)
      if (chat) chat.user.status = { is_online: updated.is_online, last_activity: updated.last_activity }
      if (selectedUser.value && selectedUser.value.id === updated.user_id) {
        selectedUser.value.status = { is_online: updated.is_online, last_activity: updated.last_activity }
      }
    })
    .subscribe()
}

// --- Отправка сообщения ---
const sendMessage = async () => {
  if (sending.value) return
  const hasText = newMessageText.value?.trim()
  const hasImage = imageFile.value
  if (!hasText && !hasImage) return
  if (!selectedUser.value) return alert("Выберите получателя")
  if (!currentUserId.value) return alert("Вы не авторизованы")

  if (typingTimeout) clearTimeout(typingTimeout)
  await sendTypingStatus(false)

  sending.value = true
  try {
    let imageUrl = null
    if (imageFile.value) {
      imageUrl = await uploadImage()
      if (!imageUrl && imageFile.value) return
    }

    const receiverId = isFavorites.value ? currentUserId.value : selectedUser.value.id
    const content = newMessageText.value.trim()

    if (editingMessage.value) {
      const { error } = await supabase
        .from("user_messages")
        .update({ content })
        .eq("id", editingMessage.value.id)
        .eq("sender_id", currentUserId.value)

      if (error) throw error

      const index = messages.value.findIndex((m) => m.id === editingMessage.value.id)
      if (index !== -1) {
        messages.value[index] = { ...messages.value[index], content }
      }
      cancelEdit()
      return
    }

    const messageData = {
      sender_id: currentUserId.value,
      receiver_id: receiverId,
      content: content || "",
      image_url: imageUrl,
      read: false,
    }
    if (replyToMessage.value) {
      messageData.reply_to = {
        id: replyToMessage.value.id,
        content: replyToMessage.value.content?.substring(0, 100),
        sender_id: replyToMessage.value.sender_id,
      }
    }

    const { data, error } = await supabase.from("user_messages").insert(messageData).select().single()
    if (error) throw error

    messages.value.push(data)
    newMessageText.value = ""
    clearImage()
    clearReply()
    await scrollToBottom()
  } catch (err) {
    console.error("Ошибка отправки:", err)
    alert(`Ошибка: ${err.message || "неизвестная ошибка"}`)
  } finally {
    sending.value = false
  }
}

const editMessage = (msg) => {
  if (msg.sender_id !== currentUserId.value) return
  editingMessage.value = msg
  newMessageText.value = msg.content
  contextMenuVisible.value = false
  nextTick(() => document.querySelector("textarea")?.focus())
}

const cancelEdit = () => {
  editingMessage.value = null
  newMessageText.value = ""
}

const loadUsersStatus = async (userIds) => {
  if (!userIds.length) return {}
  try {
    const { data } = await supabase
      .from("user_status")
      .select("user_id, is_online, last_activity")
      .in("user_id", userIds)
    const statusMap = {}
    data?.forEach((s) => {
      const isOnline = s.is_online && new Date(s.last_activity) > new Date(Date.now() - 2 * 60 * 1000)
      statusMap[s.user_id] = { is_online: isOnline, last_activity: s.last_activity }
    })
    return statusMap
  } catch {
    return {}
  }
}

const updateUserOnlineStatus = async () => {
  if (!currentUserId.value) return
  try {
    await supabase.from("user_status").upsert(
      {
        user_id: currentUserId.value,
        is_online: true,
        last_seen: new Date().toISOString(),
        last_activity: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
  } catch (err) {
    console.error("Ошибка обновления статуса:", err)
  }
}

const sendTypingStatus = async (isTyping) => {
  if (!currentUserId.value || !selectedUser.value || isFavorites.value) return
  try {
    await supabase.from("typing_status").upsert(
      {
        user_id: currentUserId.value,
        chat_with: selectedUser.value.id,
        is_typing: isTyping,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,chat_with" }
    )
  } catch {}
}

const onTyping = () => {
  if (!selectedUser.value || isFavorites.value) return
  sendTypingStatus(true)
  if (typingTimeout) clearTimeout(typingTimeout)
  typingTimeout = setTimeout(() => sendTypingStatus(false), 2000)
}

const startChat = async (userProfile) => {
  searchQuery.value = ""
  selectedUser.value = userProfile
  await loadMessages()
  if (!chats.value.some((c) => c.user.id === userProfile.id)) {
    await loadChats()
  }
}

const selectChat = async (user) => {
  selectedUser.value = user
  await loadMessages()
  clearReply()
  cancelEdit()
  subscribeToMessages()
  subscribeToTyping()
}

const closeChat = () => {
  selectedUser.value = null
  if (messagesChannel) supabase.removeChannel(messagesChannel)
  if (typingChannel) supabase.removeChannel(typingChannel)
}

const openFavorites = async () => {
  if (!currentUserId.value) return
  selectedUser.value = {
    id: currentUserId.value,
    username: "favorites",
    full_name: "Избранное",
    avatar_url: null,
    status: { is_online: false },
  }
  await loadMessages()
  if (messagesChannel) supabase.removeChannel(messagesChannel)
  if (typingChannel) supabase.removeChannel(typingChannel)
}

// --- Изображения ---
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 10 * 1024 * 1024) {
    alert("Файл слишком большой (макс. 10MB)")
    return
  }
  if (!file.type.startsWith("image/")) {
    alert("Можно загружать только изображения")
    return
  }
  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}

const clearImage = () => {
  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value)
  imageFile.value = null
  imagePreview.value = null
}

const uploadImage = async () => {
  if (!imageFile.value) return null
  uploadingImage.value = true
  try {
    const ext = imageFile.value.name.split(".").pop()
    const fileName = `chat_${currentUserId.value}_${Date.now()}.${ext}`
    const { error } = await supabase.storage.from("chat-images").upload(fileName, imageFile.value)
    if (error) throw error
    const { data } = supabase.storage.from("chat-images").getPublicUrl(fileName)
    return data.publicUrl
  } catch (err) {
    console.error("Ошибка загрузки изображения:", err)
    alert("Не удалось загрузить изображение")
    return null
  } finally {
    uploadingImage.value = false
    clearImage()
  }
}

// --- Контекстное меню ---
const handleContextMenu = (event, message) => {
  event.preventDefault()
  contextMenuVisible.value = false
  contextMenuMessage.value = message
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY

  nextTick(() => {
    const menuWidth = 180
    const menuHeight = message.sender_id === currentUserId.value ? 180 : 120
    let x = contextMenuX.value
    let y = contextMenuY.value
    if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10
    adjustedContextMenuX.value = x
    adjustedContextMenuY.value = y
    contextMenuVisible.value = true
  })

  const closeMenu = () => {
    contextMenuVisible.value = false
    document.removeEventListener("click", closeMenu)
  }
  setTimeout(() => document.addEventListener("click", closeMenu, { once: true }), 0)
}

const copyMessageText = (msg) => {
  if (msg.content) {
    navigator.clipboard.writeText(msg.content)
    alert("Текст скопирован")
  }
  contextMenuVisible.value = false
}

const deleteMessage = async (msg) => {
  if (!confirm("Удалить это сообщение?")) return
  try {
    const { error } = await supabase
      .from("user_messages")
      .delete()
      .eq("id", msg.id)
      .eq("sender_id", currentUserId.value)
    if (error) throw error
    messages.value = messages.value.filter((m) => m.id !== msg.id)
  } catch (err) {
    console.error("Ошибка удаления:", err)
    alert("Не удалось удалить сообщение")
  } finally {
    contextMenuVisible.value = false
  }
}

const replyToMessageFromMenu = (msg) => {
  setReplyToMessage(msg)
  contextMenuVisible.value = false
}

const setReplyToMessage = (msg) => {
  replyToMessage.value = {
    id: msg.id,
    content: msg.content?.length > 100 ? msg.content.substring(0, 100) + "..." : msg.content || "Изображение",
    sender_id: msg.sender_id,
  }
  replyToMessageId.value = msg.id
  nextTick(() => document.querySelector("textarea")?.focus())
  setTimeout(() => (replyToMessageId.value = null), 1000)
}

const clearReply = () => {
  replyToMessage.value = null
  replyToMessageId.value = null
}

// --- Touch ---
const onTouchStart = (e, msg) => {
  touchStartX = e.touches[0].clientX
  touchStartTime = Date.now()
  longPressTimeout = setTimeout(() => {
    handleContextMenu(e, msg)
  }, 500)
}

const onTouchMove = (e, msg) => {
  if (longPressTimeout) clearTimeout(longPressTimeout)
  const diffX = touchStartX - e.touches[0].clientX
  if (diffX > 30 && diffX < 100) {
    e.preventDefault()
    isMessageSwiped.value = msg.id
    if (swipeTimeout) clearTimeout(swipeTimeout)
    swipeTimeout = setTimeout(() => (isMessageSwiped.value = null), 2000)
  }
}

const onTouchEnd = (e, msg) => {
  if (longPressTimeout) clearTimeout(longPressTimeout)
  const diffX = touchStartX - e.changedTouches[0].clientX
  if (diffX > 50 && Date.now() - touchStartTime < 300) {
    setReplyToMessage(msg)
    isMessageSwiped.value = null
  }
}

const openImage = (url) => (selectedImage.value = url)

// --- Поиск пользователей ---
const searchUsers = async (query) => {
  if (!query.trim()) {
    userResults.value = []
    searching.value = false
    return
  }
  searching.value = true
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, full_name, avatar_url")
      .or(`username.ilike.%${query}%,full_name.ilike.%${query}%`)
      .limit(20)
    if (error) throw error
    if (data?.length) {
      const statuses = await loadUsersStatus(data.map((u) => u.id))
      userResults.value = data.map((u) => ({ ...u, status: statuses[u.id] || { is_online: false } }))
    } else {
      userResults.value = []
    }
  } catch (err) {
    console.error("Ошибка поиска:", err)
    userResults.value = []
  } finally {
    searching.value = false
  }
}

// --- Жизненный цикл ---
onMounted(async () => {
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()
  if (authUser) {
    currentUserId.value = authUser.id
    await updateUserOnlineStatus()
    await loadChats()
    subscribeToStatus()
    setInterval(() => updateUserOnlineStatus(), 30000)
    // Обновляем счётчики каждые 5 секунд
    setInterval(() => refreshUnreadCounts(), 5000)
  }
})

onUnmounted(() => {
  if (messagesChannel) supabase.removeChannel(messagesChannel)
  if (typingChannel) supabase.removeChannel(typingChannel)
  if (statusChannel) supabase.removeChannel(statusChannel)
  if (typingTimeout) clearTimeout(typingTimeout)
  if (swipeTimeout) clearTimeout(swipeTimeout)
  if (longPressTimeout) clearTimeout(longPressTimeout)
  if (currentUserId.value) {
    supabase
      .from("user_status")
      .update({ is_online: false, last_seen: new Date().toISOString() })
      .eq("user_id", currentUserId.value)
  }
})

watch(selectedUser, (newUser) => {
  if (newUser && !isFavorites.value) {
    subscribeToMessages()
    subscribeToTyping()
  } else {
    if (messagesChannel) supabase.removeChannel(messagesChannel)
    if (typingChannel) supabase.removeChannel(typingChannel)
  }
})

let searchTimeout
watch(searchQuery, (query) => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => searchUsers(query), 300)
})
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: rgba(30, 30, 35, 0.5);
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 110, 0.6);
  border-radius: 10px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(150, 150, 160, 0.8);
}
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 100, 110, 0.6) rgba(30, 30, 35, 0.5);
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
.message-group {
  transition: transform 0.2s ease;
}
@media (max-width: 768px) {
  .custom-scroll::-webkit-scrollbar {
    width: 3px;
  }
  button,
  [role="button"],
  .cursor-pointer {
    min-height: 44px;
  }
  .message-group {
    touch-action: pan-y pinch-zoom;
  }
}
</style>