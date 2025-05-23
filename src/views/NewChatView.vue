<script setup>
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
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
    <div class="min-h-screen w-full p-6 text-white" style="background-color: #101721;">
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
        <div class="flex justify-between mt-6">
            <button @click="prevStep" :disabled="step === 1" class="btn">Zurück</button>
            <button @click="step < maxStep ? nextStep() : submitForm()" class="btn">
                {{ step < maxStep ? 'Weiter' : 'Abschliessen' }}
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.input {
  @apply border border-gray-700 rounded-md px-3 py-2 bg-[#161a25] text-white;
}
.btn {
  @apply bg-primary text-white px-4 py-2 rounded hover:bg-primary-light transition;
}
</style>
