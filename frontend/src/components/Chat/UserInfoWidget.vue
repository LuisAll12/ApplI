<template>
  <div class="bg-white dark:bg-[#181c28] rounded-2xl shadow p-4 w-full">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <UserIcon class="w-5 h-5 mr-2 text-primary" />
      Benutzerinfo
    </h2>
    <div class="text-sm text-gray-700 dark:text-gray-300">
      <p><strong>Name:</strong> {{ displayUser.name }}</p>
      <p><strong>Email:</strong> {{ displayUser.email }}</p>
      <p><strong>Beigetreten:</strong> {{ displayUser.joined }}</p>
      <p><strong>Letzter Login:</strong> {{ displayUser.lastLogin }}</p>
      <p><strong>Anzahl Bewerbungen:</strong> {{ displayUser.applications }}</p>
    </div>
  </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted } from 'vue'

const displayUser = ref({})

onMounted(() => {
    const storedUser = localStorage.getItem('userData')
    if (storedUser) {
      displayUser.value = JSON.parse(storedUser)
  }
})
</script>