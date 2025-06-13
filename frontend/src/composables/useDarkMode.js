// composables/useDarkMode.ts
import { ref } from 'vue'

const dark = ref(false)

const updateDom = () => {
  document.documentElement.classList.toggle('dark', dark.value)
}

const initDarkMode = () => {
  const saved = localStorage.theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  dark.value = saved === 'dark' || (!saved && prefersDark)
  updateDom()
}

const toggleDark = () => {
  dark.value = !dark.value
  updateDom()
  localStorage.theme = dark.value ? 'dark' : 'light'
}

export function useDarkMode() {
  return { dark, toggleDark, initDarkMode }
}
