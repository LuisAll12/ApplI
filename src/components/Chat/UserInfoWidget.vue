<template>
  <div class="bg-white dark:bg-[#181c28] rounded-2xl shadow p-4 w-full">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <UserIcon class="w-5 h-5 mr-2 text-primary" />
      Benutzerinfo
    </h2>
    <div class="text-sm text-gray-700 dark:text-gray-300">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Beigetreten:</strong> {{ user.joined }}</p>
      <p><strong>Letzter Login:</strong> {{ user.lastLogin }}</p>
      <p><strong>Anzahl Bewerbungen:</strong> {{ user.applications }}</p>
    </div>
    <button class="mt-4 text-primary hover:underline">See more</button>
  </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/24/solid'
defineProps(['user'])
</script>