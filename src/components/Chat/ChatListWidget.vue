<template>
  <div class="bg-white dark:bg-[#181c28] rounded-2xl shadow p-4 w-full">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <ChatBubbleLeftRightIcon class="w-5 h-5 mr-2 text-primary" />
      Letzte Chats
    </h2>
    <ul>
      <li v-for="chat in displayChats" :key="chat.id" class="mb-2">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium text-gray-900 dark:text-gray-200">{{ chat.name }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ chat.timestamp }}</span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ chat.lastMessage }}</p>
      </li>
    </ul>
    <div class="mt-6">
      <button
        @click="router.push('/job-search')"
        class="bg-primary text-white text-sm px-4 py-2 rounded hover:bg-primary-light transition">
        Zu den Job-Inseraten
      </button>
    </div>
  </div>
</template>

<script setup>
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const displayChats = ref([])

onMounted(() => {
  const jobData = localStorage.getItem('selectedJob')
  if (jobData) {
    const job = JSON.parse(jobData)
    displayChats.value.unshift({
      id: `job-${job.id || Date.now()}`,
      name: job.title,
      timestamp: 'vor kurzem',
      lastMessage: `Job bei ${job.company.display_name} in ${job.location.display_name}`
    })
    console.log('Job aus localStorage in Chats eingefügt:', job)
  }
})
</script>
