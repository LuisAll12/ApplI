import { ref, onMounted } from 'vue'

const dark = ref(false)

export function useDarkMode() {
  const initDarkMode = () => {
    dark.value = localStorage.theme === 'dark'
    document.documentElement.classList.toggle('dark', dark.value)
  }

  const toggleDark = () => {
    dark.value = !dark.value
    document.documentElement.classList.toggle('dark', dark.value)
    localStorage.theme = dark.value ? 'dark' : 'light'
  }

  return { dark, toggleDark, initDarkMode }
}
