<template>
  <div class="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3 bg-[#e4ecf9] dark:bg-[#101721] min-h-screen">
    <GraphicBannerWidget class="xl:col-span-3" />
    <UserInfoWidget :user="data.user" />
    <ChatListWidget :chats="data.chats" />
    <ApplicationPlacesWidget :applications="data.applications" />
    <FeedbackWidget :feedback="data.feedback" class="xl:col-span-3" />
  </div>
</template>

<script setup>
import data from '../data/dashboardMockData.json'
import ChatListWidget from '../components/Chat/ChatListWidget.vue'
import UserInfoWidget from '../components/Chat/UserInfoWidget.vue'
import ApplicationPlacesWidget from '../components/Chat/ApplicationPlacesWidget.vue'
import FeedbackWidget from '../components/Chat/FeedbackWidget.vue'
import GraphicBannerWidget from '../components/Chat/GraphicBannerWidget.vue'
</script>
