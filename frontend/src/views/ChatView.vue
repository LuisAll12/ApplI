<template>
  <header class="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-dark-700 border-b dark:border-gray-dark-500">
    <h1 @click="router.push('/')" class="text-2xl font-bold text-primary">ApplI</h1>
    <button @click="toggleDark" class="text-xl">
      {{ dark ? '☀️' : '🌙' }}
    </button>
  </header>
  <div class="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3 bg-[#e4ecf9] dark:bg-[#101721] min-h-screen">
    <GraphicBannerWidget class="xl:col-span-3" />
    <UserInfoWidget :user="data.user" />
    <ChatListWidget :chats="data.chats" />
    <ApplicationPlacesWidget :applications="data.applications" />
    <FeedbackWidget :feedback="data.feedback" class="xl:col-span-3" />
  </div>
  <AuthModal v-if="showAuthModal" @auth-success="handleAuthSuccess" />
</template>

<script setup>
import data from '../data/dashboardMockData.json'
import ChatListWidget from '../components/Chat/ChatListWidget.vue'
import UserInfoWidget from '../components/Chat/UserInfoWidget.vue'
import ApplicationPlacesWidget from '../components/Chat/ApplicationPlacesWidget.vue'
import FeedbackWidget from '../components/Chat/FeedbackWidget.vue'
import GraphicBannerWidget from '../components/Chat/GraphicBannerWidget.vue'
import AuthModal from '../components/AuthModal.vue'

import { useDarkMode } from '../composables/useDarkMode.js'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'


const router = useRouter()
const { dark, toggleDark } = useDarkMode()


const isAuthenticated = ref(false)
const showAuthModal = ref(false)

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('userData'))
  isAuthenticated.value = !!userData?.token
  if (!isAuthenticated.value) showAuthModal.value = true
})

const handleAuthSuccess = (user) => {
  isAuthenticated.value = true
  showAuthModal.value = false
  console.log('✅ Authentifiziert:', user)
}

</script>
