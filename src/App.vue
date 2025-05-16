<script setup>
import { useDarkMode } from './composables/useDarkMode'

const { initDarkMode } = useDarkMode()
initDarkMode()
</script>

<template>
  <router-view />
</template>