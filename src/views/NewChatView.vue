<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDarkMode } from '../composables/useDarkMode.js'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const router = useRoute()
const { dark, toggleDark } = useDarkMode()
const jobTitle = route.query.title || null
const skipJobStep = !!jobTitle

const step = ref(1)
const maxStep = computed(() => skipJobStep ? 4 : 5)

const form = reactive({
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  experience: {
    education: '',
    currentJob: '',
    yearsExperience: ''
  },
  motivation: {
    strengths: '',
    whyThisField: '',
  },
  job: {
    companyName: jobTitle || '',
    position: '',
    employmentType: '100%',
  }
})

const nextStep = () => {
  if (step.value < maxStep.value) step.value++
}
const prevStep = () => {
  if (step.value > 1) step.value--
}
</script>

<template>
    <header class="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-dark-700 border-b dark:border-gray-dark-500">
        <h1 @click="router.push('/')" class="text-2xl font-bold text-primary">ApplI</h1>
        <button @click="toggleDark" class="text-xl">
        {{ dark ? '☀️' : '🌙' }}
    </button>
    </header>
    <div class="min-h-screen w-full p-6 bg-white text-gray-900 dark:bg-gray-dark-900 dark:text-white transition-colors">
        
        <h2 class="text-2xl font-bold mb-4">Bewerbung - Schritt {{ step }}</h2>

        <!-- Step 1: Persönliches -->
        <div v-if="step === 1" class="space-y-4">
        <label class="block">
            <span class="text-sm">Vorname</span>
            <input v-model="form.personal.firstName" type="text" class="w-full mt-1 input" />
        </label>
        <label class="block">
            <span class="text-sm">Nachname</span>
            <input v-model="form.personal.lastName" type="text" class="w-full mt-1 input" />
        </label>
        <label class="block">
            <span class="text-sm">E-Mail</span>
            <input v-model="form.personal.email" type="email" class="w-full mt-1 input" />
        </label>
        <label class="block">
            <span class="text-sm">Telefon</span>
            <input v-model="form.personal.phone" type="tel" class="w-full mt-1 input" />
        </label>
        </div>

            <!-- Step 2: Ausbildung & Berufserfahrung -->
        <div v-if="step === 2" class="space-y-4">
            <label class="block">
                <span class="text-sm">Ausbildung</span>
                <input v-model="form.experience.education" type="text" class="w-full mt-1 input" placeholder="z. B. KV EFZ, Informatikmittelschule" />
            </label>
            <label class="block">
                <span class="text-sm">Aktueller Beruf / Position</span>
                <input v-model="form.experience.currentJob" type="text" class="w-full mt-1 input" placeholder="z. B. Praktikant, Webentwickler" />
            </label>
            <label class="block">
                <span class="text-sm">Berufserfahrung in Jahren</span>
                <input v-model="form.experience.yearsExperience" type="number" class="w-full mt-1 input" placeholder="z. B. 1" />
            </label>
        </div>

        <!-- Step 3: Motivation & Stärken -->
        <div v-if="step === 3" class="space-y-4">
            <label class="block">
                <span class="text-sm">Was sind deine Stärken?</span>
                <textarea v-model="form.motivation.strengths" class="w-full mt-1 input" rows="3" placeholder="z. B. Teamfähig, organisiert, analytisch"></textarea>
            </label>
            <label class="block">
                <span class="text-sm">Warum interessierst du dich für dieses Berufsfeld?</span>
                <textarea v-model="form.motivation.whyThisField" class="w-full mt-1 input" rows="3" placeholder="z. B. Ich liebe es, Probleme logisch zu lösen..."></textarea>
            </label>
        </div>


        <!-- Step 4: Zielunternehmen & Stelle -->
        <div v-if="step === 4 && !skipJobStep" class="space-y-4">
            <label class="block">
                <span class="text-sm">Unternehmen</span>
                <input v-model="form.job.companyName" type="text" class="w-full mt-1 input" placeholder="z. B. UBS Group" />
            </label>
            <label class="block">
                <span class="text-sm">Stellenbezeichnung</span>
                <input v-model="form.job.position" type="text" class="w-full mt-1 input" placeholder="z. B. Buchhalter" />
            </label>
            <label class="block">
                <span class="text-sm">Pensum (in %)</span>
                <input v-model="form.job.employmentType" type="text" class="w-full mt-1 input" placeholder="z. B. 100%" />
            </label>
        </div>  


        <!-- Step 5: Zusammenfassung -->
        <div v-if="step === maxStep" class="space-y-4">
            <h3 class="text-lg font-semibold">Zusammenfassung:</h3>
            <pre class="bg-gray-800 p-4 rounded text-sm">{{ form }}</pre>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-8">
            <!-- Zurück-Button -->
            <button
                @click="prevStep"
                :disabled="step === 1"
                class="flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition
                    bg-gray-400 dark:bg-gray-dark-400 text-white 
                    hover:bg-gray-500 dark:hover:bg-gray-dark-300
                    disabled:opacity-50 disabled:cursor-not-allowed">
                <ArrowLeftIcon class="w-5 h-5" />
                Zurück
            </button>

            <!-- Weiter/Abschliessen-Button -->
            <button
                @click="step < maxStep ? nextStep() : submitForm()"
                class="flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition 
                    bg-primary hover:bg-primary-light 
                    text-white shadow-md">
                <component :is="step < maxStep ? ArrowRightIcon : CheckIcon" class="w-5 h-5" />
                {{ step < maxStep ? 'Weiter' : 'Abschliessen' }}
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.input {
    @apply border border-gray-300 dark:border-gray-700 
            rounded-md px-3 py-2 
            bg-gray-100 dark:bg-gray-dark-600 
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-light-300;
}
</style>
