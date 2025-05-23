<template>
  <div class="bg-white dark:bg-[#181c28] rounded-2xl shadow p-4 w-full">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <ChatBubbleLeftRightIcon class="w-5 h-5 mr-2 text-primary" />
      Letzte Chats
    </h2>
    <ul>
      <li v-for="chat in chats" :key="chat.id" class="mb-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-900 dark:text-gray-200">{{ chat.name }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ chat.timestamp }}</span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ chat.lastMessage }}</p>
      </li>
    </ul>
    <div class="mt-6">
      <button
        @click="$router.push('/job-search')"
        class="bg-primary text-white text-sm px-4 py-2 rounded hover:bg-primary-light transition">
        Zu den Job-Inseraten
      </button>
    </div>
  </div>
</template>

<script setup>
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'
defineProps(['chats'])
</script>
