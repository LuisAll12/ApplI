<template>
  <div class="bg-white dark:bg-[#181c28] rounded-2xl shadow p-4 w-full">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <ChatBubbleLeftEllipsisIcon class="w-5 h-5 mr-2 text-primary" />
      Nutzer-Feedback
    </h2>
    <p class="text-sm text-gray-700 dark:text-gray-300 italic">"{{ feedback.text }}"</p>
    <div class="flex mt-2 space-x-1">
      <StarIcon v-for="n in feedback.rating" :key="n" class="w-5 h-5 text-yellow-400" />
    </div>
  </div>
</template>

<script setup>
import { ChatBubbleLeftEllipsisIcon, StarIcon } from '@heroicons/vue/24/solid'
defineProps(['feedback'])
</script>
