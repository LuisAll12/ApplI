<template>
  <div class="rounded-2xl overflow-hidden shadow w-full bg-cover bg-center" style="background-image: url('/graphic-banner.png')">
    <div class="p-6 text-white md:flex-row items-start md:items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold mb-1 flex items-center">
          <ChatBubbleLeftRightIcon class="w-5 h-5 mr-2 text-white" />
          Neuer Chat starten
        </h2>
        <p class="text-sm text-white/90 max-w-md">
          Mit Hilfe unserer KI-Analyse, kannst du ein für dich Personalisiertes Bewerbungsschreiben erschaffen.
        </p>
      </div>
      <div class="mt-10 flex gap-2">
        <button class="bg-white text-[#5529ee] px-4 py-1.5 rounded-xl font-medium shadow hover:bg-gray-100">Neuer Chat</button>
        <button class="bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-xl font-medium flex items-center gap-1 hover:bg-white/10">
          Weiter lesen
          <ArrowRightIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon, ArrowRightIcon, ChatBubbleLeftRightIcon } from '@heroicons/vue/24/solid'
</script>