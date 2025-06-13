<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white dark:bg-gray-dark-800 p-6 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">{{ isRegister ? 'Registrieren' : 'Login' }}</h2>
      <form @submit.prevent="submit">
        <input v-model="email" type="email" placeholder="E-Mail" class="border px-3 py-2 rounded bg-gray-100 dark:bg-gray-dark-600 w-full mb-3" required />
        <input v-model="password" type="password" placeholder="Passwort" class="border px-3 py-2 rounded bg-gray-100 dark:bg-gray-dark-600 w-full mb-3" required />
        <input v-if="isRegister" v-model="firstName" type="text" placeholder="Vorname" class="border px-3 py-2 rounded bg-gray-100 dark:bg-gray-dark-600 w-full mb-3" />
        <input v-if="isRegister" v-model="lastName" type="text" placeholder="Nachname" class="border px-3 py-2 rounded bg-gray-100 dark:bg-gray-dark-600 w-full mb-3" />
        <button type="submit" class="bg-primary text-white w-full py-2 rounded">
          {{ isRegister ? 'Registrieren' : 'Login' }}
        </button>
      </form>
      <p class="mt-4 text-sm text-center">
        {{ isRegister ? 'Schon registriert?' : 'Noch kein Konto?' }}
        <button @click="isRegister = !isRegister" class="text-primary underline">
          {{ isRegister ? 'Einloggen' : 'Registrieren' }}
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['auth-success'])

const isRegister = ref(false)
const email = ref('')
const password = ref('')
const firstName = ref('')
const lastName = ref('')

console.log('URL:', import.meta.env.VITE_APP_BACKEND_URL)

const submit = async () => {
  const body = isRegister.value
    ? { email: email.value, password: password.value, firstName: firstName.value, lastName: lastName.value }
    : { email: email.value, password: password.value }

  try {
    const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/auth/${isRegister.value ? 'register' : 'login'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    let data = {}
    try {
      data = await res.json()
    } catch (jsonErr) {
      console.error('⚠️ Server returned invalid JSON:', jsonErr)
      alert('Serverfehler – keine Antwort erhalten.')
      return
    }

    if (res.ok && data.token && data.user) {
      localStorage.setItem('userData', JSON.stringify({
        id: data.user.id,
        token: data.token
      }))
      emit('auth-success', data.user)
    } else {
      alert(data.message || 'Fehler beim Authentifizieren')
    }
  } catch (err) {
    console.error('❌ Network Error:', err)
    alert('Verbindungsfehler zum Server.')
  }
}


</script>

<style scoped>
.input {
  @apply border px-3 py-2 rounded bg-gray-100 dark:bg-gray-dark-600;
}
</style>
