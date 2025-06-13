<template>
  <div class="bg-white dark:bg-[#181c28] rounded-2xl shadow p-4 w-full">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
      <UserIcon class="w-5 h-5 mr-2 text-primary" />
      Benutzerinfo
    </h2>
    <div class="text-sm text-gray-700 dark:text-gray-300" v-if="displayUser.name">
      <p><strong>Name:</strong> {{ displayUser.name }}</p>
      <p><strong>Email:</strong> {{ displayUser.email }}</p>
      <p><strong>Beigetreten:</strong> {{ formatDate(displayUser.joined) }}</p>
      <p><strong>Anzahl Bewerbungen:</strong> {{ displayUser.applications }}</p>
    </div>
    <div v-else class="text-sm text-red-500">
      Benutzerdaten konnten nicht geladen werden.
    </div>
  </div>
</template>

<script setup>
import { UserIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const displayUser = ref({})

function formatDate(isoDate) {
  if (!isoDate) return ''
  return new Intl.DateTimeFormat('de-CH').format(new Date(isoDate))
}

onMounted(async () => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData')) // Achtung: Key muss stimmen
    if (!userData || !userData.token || !userData.id) {
      console.warn('Kein gültiger Benutzer im LocalStorage.')
      return
    }

    const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/users/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })

    displayUser.value = res.data
    console.log('Benutzerdaten geladen:', displayUser.value)  
  } catch (err) {
    console.error('Fehler beim Laden der Benutzerdaten:', err)
  }
})
</script>
