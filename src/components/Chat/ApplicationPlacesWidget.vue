<template>
  <div class="bg-white dark:bg-[#181c28] rounded-2xl shadow p-4 w-full">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <BuildingOfficeIcon class="w-5 h-5 mr-2 text-primary" />
      Letzte Bewerbungen
    </h2>
    <ul class="space-y-2">
      <li v-for="(app, index) in applications" :key="index" class="text-sm text-gray-700 dark:text-gray-300">
        {{ app.company }} – <span class="text-gray-500 dark:text-gray-400 text-xs">{{ app.date }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { BuildingOfficeIcon } from '@heroicons/vue/24/solid'
defineProps(['applications'])
</script>