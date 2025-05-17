<template>
  <div class="rounded-2xl overflow-hidden shadow w-full bg-cover bg-center" style="background-image: url('/graphic-banner.png')">
    <div class="p-6 text-white md:flex-row items-start md:items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold mb-1 flex items-center">
          <InformationCircleIcon class="w-5 h-5 mr-2 text-white" />
          Oktober Report
        </h2>
        <p class="text-sm text-white/90 max-w-md">
          Mit Hilfe unserer KI-Analyse erhältst du eine umfassende und fundierte Auswertung deiner Daten.
        </p>
      </div>
      <div class="mt-10 flex gap-2">
        <button class="bg-white text-[#5529ee] px-4 py-1.5 rounded-xl font-medium shadow hover:bg-gray-100">Try AI</button>
        <button class="bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-xl font-medium flex items-center gap-1 hover:bg-white/10">
          Learn More
          <ArrowRightIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InformationCircleIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'
</script>