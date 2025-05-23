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

const errors = reactive({
    personal: {},
    experience: {},
    motivation: {},
    job: {}
})

const submitForm = () => {
    if (!validateForm()) return
    alert('Formular erfolgreich abgeschlossen!') // oder Weiterleitung:
    // router.push('/vorschau') oder ein API Call
}


const validateForm = () => {
    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = {})

    let valid = true

    // Persönliche Daten
    if (!form.personal.firstName) {
        errors.personal.firstName = 'Vorname ist erforderlich'
        valid = false
    }
    if (!form.personal.lastName) {
        errors.personal.lastName = 'Nachname ist erforderlich'
        valid = false
    }
    if (!form.personal.email) {
        errors.personal.email = 'E-Mail ist erforderlich'
        valid = false
    }
    if (!form.personal.phone) {
        errors.personal.phone = 'Telefonnummer ist erforderlich'
        valid = false
    }

    // Erfahrung
    if (!form.experience.education) {
        errors.experience.education = 'Ausbildung ist erforderlich'
        valid = false
    }
    if (!form.experience.currentJob) {
        errors.experience.currentJob = 'Aktueller Beruf ist erforderlich'
        valid = false
    }
    if (!form.experience.yearsExperience) {
        errors.experience.yearsExperience = 'Erfahrung ist erforderlich'
        valid = false
    }

    // Motivation
    if (!form.motivation.strengths) {
        errors.motivation.strengths = 'Stärken müssen angegeben werden'
        valid = false
    }
    if (!form.motivation.whyThisField) {
        errors.motivation.whyThisField = 'Motivation ist erforderlich'
        valid = false
    }

    // Jobdaten nur wenn nicht übersprungen
    if (!skipJobStep) {
        if (!form.job.companyName) {
        errors.job.companyName = 'Unternehmen fehlt'
        valid = false
        }
        if (!form.job.position) {
        errors.job.position = 'Position fehlt'
        valid = false
        }
        if (!form.job.employmentType) {
        errors.job.employmentType = 'Pensum fehlt'
        valid = false
        }
    }

    return valid
}

const nextStep = () => {
    if (step.value === maxStep.value) return
    const currentStepValid = validateCurrentStep()
    if (currentStepValid) step.value++
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
                <input
                v-model="form.personal.firstName"
                :class="['w-full mt-1 input', errors.personal.firstName && 'inputError']"
                type="text"
                />
                <p v-if="errors.personal.firstName" class="text-red-500 text-sm mt-1">{{ errors.personal.firstName }}</p>
            </label>

            <label class="block">
                <span class="text-sm">Nachname</span>
                <input
                v-model="form.personal.lastName"
                :class="['w-full mt-1 input', errors.personal.lastName && 'inputError']"
                type="text"
                />
                <p v-if="errors.personal.lastName" class="text-red-500 text-sm mt-1">{{ errors.personal.lastName }}</p>
            </label>

            <label class="block">
                <span class="text-sm">E-Mail</span>
                <input
                v-model="form.personal.email"
                :class="['w-full mt-1 input', errors.personal.email && 'inputError']"
                type="email"
                />
                <p v-if="errors.personal.email" class="text-red-500 text-sm mt-1">{{ errors.personal.email }}</p>
            </label>

            <label class="block">
                <span class="text-sm">Telefon</span>
                <input
                v-model="form.personal.phone"
                :class="['w-full mt-1 input', errors.personal.phone && 'inputError']"
                type="tel"
                />
                <p v-if="errors.personal.phone" class="text-red-500 text-sm mt-1">{{ errors.personal.phone }}</p>
            </label>
        </div>


        <!-- Step 2: Ausbildung & Berufserfahrung -->
        <div v-if="step === 2" class="space-y-4">
            <label class="block">
                <span class="text-sm">Ausbildung</span>
                <input v-model="form.experience.education"
                        :class="['w-full mt-1 input', errors.experience.education && 'inputError']"
                        type="text" />
                <p v-if="errors.experience.education" class="text-red-500 text-sm mt-1">{{ errors.experience.education }}</p>
            </label>

            <label class="block">
                <span class="text-sm">Aktueller Beruf / Position</span>
                <input v-model="form.experience.currentJob"
                        :class="['w-full mt-1 input', errors.experience.currentJob && 'inputError']"
                        type="text" />
                <p v-if="errors.experience.currentJob" class="text-red-500 text-sm mt-1">{{ errors.experience.currentJob }}</p>
            </label>

            <label class="block">
                <span class="text-sm">Berufserfahrung in Jahren</span>
                <input v-model="form.experience.yearsExperience"
                        :class="['w-full mt-1 input', errors.experience.yearsExperience && 'inputError']"
                        type="number" />
                <p v-if="errors.experience.yearsExperience" class="text-red-500 text-sm mt-1">{{ errors.experience.yearsExperience }}</p>
            </label>
        </div>

        <div v-if="step === 3" class="space-y-4">
            <label class="block">
                <span class="text-sm">Was sind deine Stärken?</span>
                <textarea v-model="form.motivation.strengths"
                            :class="['w-full mt-1 input', errors.motivation.strengths && 'inputError']"
                            rows="3"></textarea>
                <p v-if="errors.motivation.strengths" class="text-red-500 text-sm mt-1">{{ errors.motivation.strengths }}</p>
            </label>

            <label class="block">
                <span class="text-sm">Warum interessierst du dich für dieses Berufsfeld?</span>
                <textarea v-model="form.motivation.whyThisField"
                            :class="['w-full mt-1 input', errors.motivation.whyThisField && 'inputError']"
                            rows="3"></textarea>
                <p v-if="errors.motivation.whyThisField" class="text-red-500 text-sm mt-1">{{ errors.motivation.whyThisField }}</p>
            </label>
        </div>


        <!-- Step 4: Zielunternehmen & Stelle -->
        <div v-if="step === 4 && !skipJobStep" class="space-y-4">
            <label class="block">
                <span class="text-sm">Unternehmen</span>
                <input v-model="form.job.companyName"
                        :class="['w-full mt-1 input', errors.job.companyName && 'inputError']"
                        type="text" />
                <p v-if="errors.job.companyName" class="text-red-500 text-sm mt-1">{{ errors.job.companyName }}</p>
            </label>

            <label class="block">
                <span class="text-sm">Stellenbezeichnung</span>
                <input v-model="form.job.position"
                        :class="['w-full mt-1 input', errors.job.position && 'inputError']"
                        type="text" />
                <p v-if="errors.job.position" class="text-red-500 text-sm mt-1">{{ errors.job.position }}</p>
            </label>

            <label class="block">
                <span class="text-sm">Pensum (in %)</span>
                <input v-model="form.job.employmentType"
                        :class="['w-full mt-1 input', errors.job.employmentType && 'inputError']"
                        type="text" />
                <p v-if="errors.job.employmentType" class="text-red-500 text-sm mt-1">{{ errors.job.employmentType }}</p>
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
                @click="step < maxStep ? nextStep() : (validateForm() && submitForm())"
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

.inputError {
    @apply border-red-500 dark:border-red-500;
}
</style>
