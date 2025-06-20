<template>
  <div class="p-6 bg-white dark:bg-gray-dark-700 min-h-screen text-gray-900 dark:text-white space-y-4">
    <!-- Zurück-Button -->
    <button @click="goBack" class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-light-300 hover:text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Zurück
    </button>

    <h2 class="text-2xl font-bold text-primary">Job Suche</h2>

    <div class="flex flex-col md:flex-row gap-4">
      <input v-model="searchParams.what" placeholder="Beruf (z.B. Entwickler)"  
              class="p-2 rounded-md bg-gray-200 dark:bg-gray-dark-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-light-300 w-full" />
      
      <input v-model="searchParams.where" placeholder="Ort (z.B. Zürich)" 
              class="p-2 rounded-md bg-gray-200 dark:bg-gray-dark-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-light-300 w-full" />
      
      <button @click="searchJobs" class="bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded-md">
        Suchen
      </button>
    </div>

    <div v-if="loading">Lade Jobs...</div>

    <ul v-if="jobs.length" class="space-y-2">
      <li v-for="job in jobs" :key="job.id" class="p-4 bg-gray-100 dark:bg-gray-dark-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-dark-500 space-y-1">
        <h3 class="text-lg font-semibold">{{ job.title }}</h3>
        <p class="text-gray-700 dark:text-gray-light-300">{{ job.company.display_name }} – {{ job.location.display_name }}</p>
        <a :href="job.redirect_url" target="_blank" class="text-secondary underline">Zum Job</a>
        <div class="pt-2">
          <button @click="startChat(job)" class="bg-secondary hover:bg-[#58cae7] text-black font-semibold py-1 px-3 rounded-md">
            Chat starten
          </button>
        </div>
      </li>
    </ul>

    <div v-else-if="!loading">Keine Jobs gefunden.</div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const searchParams = ref({
  what: '',
  where: '',
})

const jobs = ref([])
const loading = ref(false)

const goBack = () => {
  router.back()
}

const searchJobs = async () => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/jobs/search`, {
        params: {
            what: searchParams.value.what,
            where: searchParams.value.where,
        }
    })
    jobs.value = response.data.results
  } catch (err) {
    console.error('Fehler beim Laden:', err)
  } finally {
    loading.value = false
  }
}

// 🟣 Chat starten mit Job-Inserat
const startChat = (job) => {
  localStorage.setItem('selectedJob', JSON.stringify(job))

  router.push({
    name: 'NewChat',
    query: {
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      url: job.redirect_url
    }
  })
}
</script>
