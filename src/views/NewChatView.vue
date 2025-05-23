<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDarkMode } from '../composables/useDarkMode.js'
import DarkToggle from '../components/DarkToggle.vue'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@heroicons/vue/24/solid'
import phoneMockup from '../assets/images/phone-mockup.png'
import {
    fetchCompanyInsights, 
    buildApplicationPrompt, 
    generateApplicationLetter,
    formatPreview, 
    exportToPDF, 
    optionallySendMail
} from '../services/createApplication.js'

const route = useRoute()
const router = useRouter()
const STORAGE_KEY = 'bewerbungsForm'
const STEP_KEY = 'bewerbungsFormStep'
const SUBMITTED_STEP_KEY = 'submittedStep'
const PREVIEWS_KEY = 'applicationPreviews'

const jobTitle = route.query.title || null
const skipJobStep = !!jobTitle

const step = ref(1)
const maxStep = computed(() => skipJobStep ? 4 : 5)
const hasSubmitted = ref(false)
const submittedStep = ref(1)
const applicationPreviews = ref([])
let formatted = ref(null)

// const form = reactive({
//     personal: {
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//     },
//     experience: {
//         education: '',
//         currentJob: '',
//         yearsExperience: ''
//     },
//     motivation: {
//         strengths: '',
//         whyThisField: '',
//     },
//     job: {
//         companyName: jobTitle || '',
//         position: '',
//         employmentType: '100%',
//     }
// })
const form = reactive({
    personal: {
        firstName: 'Luis',
        lastName: 'Allamand',
        email: 'luis@g-12.ch',
        phone: '0783123399',
    },
    experience: {
        education: 'Applikationsentwickler EFZ mit Berufsmatur',
        currentJob: 'Informatikmitelschule',
        yearsExperience: '2'
    },
    motivation: {
        strengths: 'Mathe und Informatik',
        whyThisField: 'Es macht mir Spass und ich kann meine Stärken einsetzen',
    },
    job: {
        companyName: jobTitle || 'UBS Group AG',
        position: 'Informatiker',
        employmentType: '100%',
    }
})

const errors = reactive({
    personal: {},
    experience: {},
    motivation: {},
    job: {}
})

const statusMessage = computed(() => {
    if (submittedStep.value === 1) return 'Wir analysieren deine Benutzerdaten...'
    if (submittedStep.value === 2) return `Wir analysieren und suchen Informationen über deine Traumstelle (${form.job.companyName})...`
    if (submittedStep.value === 3) return 'Wir erstellen mehrere Varianten deines Bewerbungsschreibens...'
    if (submittedStep.value === 4) return 'Wir formatieren dein Bewerbungsschreiben...'
    if (submittedStep.value === 5) return '🚀 Vorschau bereit - dein Bewerbungsschreiben wird generiert...'
    return ''
})

onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
        const parsed = JSON.parse(saved)
        Object.assign(form.personal, parsed.personal || {})
        Object.assign(form.experience, parsed.experience || {})
        Object.assign(form.motivation, parsed.motivation || {})
        Object.assign(form.job, parsed.job || {})
    }

    const savedStep = localStorage.getItem(STEP_KEY)
    if (savedStep) {
        const parsedStep = parseInt(savedStep)
        if (!isNaN(parsedStep)) step.value = parsedStep
    }

    const savedSubmittedStep = localStorage.getItem(SUBMITTED_STEP_KEY)
    if (savedSubmittedStep) {
        submittedStep.value = parseInt(savedSubmittedStep)
    }

    const savedPreviews = localStorage.getItem(PREVIEWS_KEY)
    if (savedPreviews) {
        applicationPreviews.value = JSON.parse(savedPreviews)
    }
})
watch(submittedStep, (val) => {
    localStorage.setItem(SUBMITTED_STEP_KEY, val.toString())
})

watch(applicationPreviews, (val) => {
    localStorage.setItem(PREVIEWS_KEY, JSON.stringify(val))
})

const submitForm = () => {
    const valid = validateForm()
    if (!valid) return
    hasSubmitted.value = true

    // Hier wird die Bewerbung erstellt
    CreateApplication(form)
}


const validateForm = () => {
    // Alle Schritte durchvalidieren
    const currentStepBackup = step.value
    let allValid = true

    for (let i = 1; i <= maxStep.value; i++) {
        step.value = i
        if (!validateCurrentStep()) {
        allValid = false
        break
        }
    }

    step.value = currentStepBackup
    return allValid
}

const validateCurrentStep = () => {
  // nur Fehler für aktuellen Step prüfen
    Object.keys(errors).forEach(key => errors[key] = {})

    let valid = true

    if (step.value === 1) {
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
    }

    if (step.value === 2) {
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
    }

    if (step.value === 3) {
        if (!form.motivation.strengths) {
            errors.motivation.strengths = 'Stärken müssen angegeben werden'
            valid = false
        }
        if (!form.motivation.whyThisField) {
            errors.motivation.whyThisField = 'Motivation ist erforderlich'
            valid = false
        }
    }

    if (step.value === 4 && !skipJobStep) {
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
watch(hasSubmitted, val => {
    console.log('🌀 hasSubmitted geändert auf:', val)
})




async function CreateApplication(formData) {
    submittedStep.value = 1
    // wait 3.5 seconds
    await new Promise(resolve => setTimeout(resolve, 3500))
    submittedStep.value = 2
    const insights = await fetchCompanyInsights(formData.job.companyName)
    await new Promise(resolve => setTimeout(resolve, 2500))
    submittedStep.value = 3
    const prompt = buildApplicationPrompt(formData, insights)
    const variants = await generateApplicationLetter(prompt)
    console.log('generated variants', variants)
    submittedStep.value = 4
    formatted = formatPreview(variants)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('formatted', formatted)
    submittedStep.value = 5
    await new Promise(resolve => setTimeout(resolve, 1500))
    applicationPreviews.value = formatted
    submittedStep.value = 6
//     const resultPath = await exportToPDF(formatted)
//     await optionallySendMail(formatted, formData)
//     await storeInHistory(formData, formatted)
}


const resultPath = async() => {
    const downloadUrl = await exportToPDF(applicationPreviews.value)
    window.open(downloadUrl, '_blank')
}
const nextStep = () => {
    if (step.value === maxStep.value) return
    const currentStepValid = validateCurrentStep()
    if (currentStepValid) step.value++

}
const prevStep = () => {
  if (step.value > 1) step.value--
}

const submittedProgress = computed(() => {
    const maxSteps = 4
    return `${(submittedStep.value / maxSteps) * 100}%`
})
</script>

<template>
    <header class="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-dark-700 border-b dark:border-gray-dark-500">
        <h1 @click="router.push('/')" class="text-2xl font-bold text-primary cursor-pointer">ApplI</h1>
        <DarkToggle />
    </header>
    <div class="min-h-screen w-full p-6 bg-white text-gray-900 dark:bg-gray-dark-900 dark:text-white transition-colors">
        <div v-if="hasSubmitted === false">
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
                    <p v-if="errors.job.position" class="text-error text-sm mt-1">{{ errors.job.position }}</p>
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
            <div v-if="step === maxStep" class="relative flex flex-col lg:flex-row justify-between items-start min-h-[600px] overflow-hidden">

                <!-- 🔵 Dekorative Kreise im Hintergrund (z-index 0) -->
                <div class="absolute top-[-170px] right-[-150px] w-[700px] h-[700px] z-0 pointer-events-none">
                    <div class="absolute w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-light opacity-70"></div>
                    <div class="absolute top-[80px] right-[80px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-light to-secondary opacity-60"></div>
                </div>

                <!-- 📱 Phone-Mockup separat -->
                <div class="absolute top-[20px] right-[80px] z-10 hidden lg:block">
                    <img :src="phoneMockup" alt="Phone Mockup" class="w-[280px] lg:w-[320px] drop-shadow-2xl" />
                </div>
                <div class="z-10 w-full lg:w-2/3 space-y-6">
                    <h3 class="text-2xl font-semibold">Zusammenfassung</h3>

                    <!-- Persönliches -->
                    <section>
                        <h4 class="text-lg font-semibold text-primary mb-2">Persönliche Angaben</h4>
                        <ul class="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                            <li><strong>Vorname:</strong> {{ form.personal.firstName }}</li>
                            <li><strong>Nachname:</strong> {{ form.personal.lastName }}</li>
                            <li><strong>E-Mail:</strong> {{ form.personal.email }}</li>
                            <li><strong>Telefon:</strong> {{ form.personal.phone }}</li>
                        </ul>
                    </section>

                    <!-- Berufserfahrung -->
                    <section>
                        <h4 class="text-lg font-semibold text-primary mb-2">Ausbildung & Beruf</h4>
                        <ul class="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                            <li><strong>Ausbildung:</strong> {{ form.experience.education }}</li>
                            <li><strong>Aktueller Beruf:</strong> {{ form.experience.currentJob }}</li>
                            <li><strong>Erfahrung:</strong> {{ form.experience.yearsExperience }} Jahre</li>
                        </ul>
                    </section>

                    <!-- Motivation -->
                    <section>
                        <h4 class="text-lg font-semibold text-primary mb-2">Motivation</h4>
                        <ul class="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                            <li><strong>Stärken:</strong> {{ form.motivation.strengths }}</li>
                            <li><strong>Interesse am Berufsfeld:</strong> {{ form.motivation.whyThisField }}</li>
                        </ul>
                    </section>

                    <!-- Jobinfos (wenn nicht übersprungen) -->
                    <section v-if="!skipJobStep">
                        <h4 class="text-lg font-semibold text-primary mb-2">Stelleninformationen</h4>
                        <ul class="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                            <li><strong>Unternehmen:</strong> {{ form.job.companyName }}</li>
                            <li><strong>Position:</strong> {{ form.job.position }}</li>
                            <li><strong>Pensum:</strong> {{ form.job.employmentType }}</li>
                        </ul>
                    </section>
                </div>
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
                    {{ step < maxStep ? 'Weiter' : 'Bewerbungsschreiben erstellen' }}
                </button>
            </div>
        </div>
            <!-- statusMessage -->      
        <div v-else-if="hasSubmitted && submittedStep < 6" class="text-center py-24">
            <h2 class="text-3xl font-bold mb-4 text-primary">🎉 Danke, {{ form.personal.firstName }}!</h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Deine Angaben wurden erfolgreich übermittelt.<br />
                {{ statusMessage }}
            </p>
            <div class="w-full max-w-md mx-auto mt-8">
                <div class="w-full h-3 bg-gray-200 dark:bg-gray-dark-700 rounded-full overflow-hidden shadow-inner">
                    <div class="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500" :style="{ width: submittedProgress }">
                        </div>
                </div>
                <p class="text-sm text-gray-500 mt-2 dark:text-gray-400">Dies kann einige Sekunden dauern...</p>
            </div>
        </div>



        <div v-if="submittedStep == 6" class="text-center py-24">
            <h2 class="text-3xl font-bold mb-4 text-primary">🚀 Bewerbungsschreiben bereit!</h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Dein Bewerbungsschreiben wurde erfolgreich erstellt.<br />
                Du kannst es jetzt herunterladen oder per E-Mail versenden.
            </p>
            <br>
            <div class="mt-12 space-y-8 max-w-4xl mx-auto text-left" v-if="applicationPreviews.length > 0">
                <h3 class="text-2xl font-semibold mb-4">Vorschau deiner Bewerbung:</h3>

                <div v-for="(letter, index) in applicationPreviews" :key="index" class="bg-white dark:bg-gray-dark-800 p-6 rounded-lg shadow-lg border dark:border-gray-dark-600">
                    <h4 class="text-lg font-bold text-primary mb-2">{{ letter.style }}</h4>
                    <div class="prose prose-sm dark:prose-invert max-w-none" v-html="letter.html"></div>
                </div>
            </div>
            <div class="flex justify-center gap-4 mt-8">

                <button class="bg-primary hover:bg-primary-light text-white font-semibold py-2 px-4 rounded-md" @click="resultPath">
                    Bewerbungsschreiben herunterladen  
                </button>
                <button class="bg-secondary hover:bg-[#58cae7] text-black font-semibold py-2 px-4 rounded-md">
                    Bewerbungsschreiben per E-Mail versenden
                </button>
            </div>
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
