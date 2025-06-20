<script setup>
import { useDarkMode } from '../composables/useDarkMode.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const { dark, toggleDark } = useDarkMode()
</script>

<template>
    <div class="min-h-screen bg-white dark:bg-gray-dark-900 text-gray-dark-900 dark:text-white">
        
        <header class="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-dark-700 border-b dark:border-gray-dark-500">
        <h1 class="text-2xl font-bold text-primary">ApplI</h1>
        <button @click="toggleDark" class="text-xl">
            {{ dark ? '☀️' : '🌙' }}
        </button>
        </header>
        <!-- Hero Section with Text & Image -->
        <section class="bg-white dark:bg-gray-dark-800 py-20 px-6">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
            <h1 class="text-5xl font-bold mb-6 text-primary">Schnell. Persönlich. KI-basiert.</h1>
            <p class="text-lg mb-6 text-gray-dark-400 dark:text-gray-light-800">
                Sende, erhalte und toppe deine Bewerbung direkt auf dein Zielunternehmen ab. Intelligente Texte, automatisch formuliert.
            </p>
            <div class="flex gap-4 flex-wrap">
                <button @click="router.push('/chat')" class="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primaryLight transition">Jetzt starten</button>
                <button class="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition">Mehr erfahren</button>
            </div>
            </div>
            <div>
            <img src="../assets/images/F_HEAD.png" alt="Bewerbungstool" class="rounded-xl shadow-xl" />
            </div>
        </div>
        </section>

        <!-- Features Section -->
        <section class="bg-gray-light-200 dark:bg-gray-dark-800 py-20 px-6">
        <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div class="bg-white dark:bg-gray-dark-600 p-8 rounded-xl shadow">
            <h3 class="text-xl font-semibold mb-2">Sichere Bewerbung</h3>
            <p class="text-gray-dark-300 dark:text-gray-light-700">Deine Daten werden sicher übertragen und verarbeitet.</p>
            </div>
            <div class="bg-white dark:bg-gray-dark-600 p-8 rounded-xl shadow">
            <h3 class="text-xl font-semibold mb-2">Flexible Module</h3>
            <p class="text-gray-dark-300 dark:text-gray-light-700">Individuelle Inhalte je nach Unternehmen und Rolle.</p>
            </div>
            <div class="bg-white dark:bg-gray-dark-600 p-8 rounded-xl shadow">
            <h3 class="text-xl font-semibold mb-2">Keine versteckten Kosten</h3>
            <p class="text-gray-dark-300 dark:text-gray-light-700">Ein Preis - alles drin. Keine Abo-Falle.</p>
            </div>
        </div>
        </section>

        <!-- Statistiken Section -->
        <section class="py-20 px-6 bg-white dark:bg-gray-dark-900 text-center">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl font-bold mb-10 text-primary">Vertraut von Bewerber:innen</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div><p class="text-4xl font-bold">2'345+</p><p class="text-gray-dark-400 dark:text-gray-light-700">Anfragen</p></div>
            <div><p class="text-4xl font-bold">751+</p><p class="text-gray-dark-400 dark:text-gray-light-700">erstellte Bewerbungen</p></div>
            <div><p class="text-4xl font-bold">98%</p><p class="text-gray-dark-400 dark:text-gray-light-700">Zufriedenheit</p></div>
            <div><p class="text-4xl font-bold">4.9 ★</p><p class="text-gray-dark-400 dark:text-gray-light-700">TrustScore</p></div>
            </div>
        </div>
        </section>

        <!-- How It Works -->
        <section class="bg-gradient-to-br from-primary to-primaryLight text-white py-20 px-6">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <img src="../assets/images/F_MID.png" alt="App Mockup" class="rounded-xl" />
            <div>
                <h2 class="text-3xl font-semibold mb-4">So funktioniert's</h2>
                <ul class="space-y-4 text-white">
                    <li class="flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Daten eingeben</span>
                    </li>
                    <li class="flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553 2.276A1 1 0 0120 13.118v.764a1 1 0 01-.447.842L15 17M4 6h16M4 10h16M4 14h8" />
                        </svg>
                        <span>Zielunternehmen analysieren lassen</span>
                    </li>
                    <li class="flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16h8M8 12h8m-8-4h8m2 12H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
                        </svg>
                        <span>Vorschau prüfen & PDF downloaden</span>
                    </li>
                    <li class="flex items-start space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <span>Bewerben!</span>
                    </li>
                </ul>
            </div>
        </div>
        </section>

        <!-- Testimonials -->
        <section class="bg-gray-light-200 dark:bg-gray-dark-800 py-20 px-6">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-bold text-primary mb-10">Was unsere Nutzer sagen</h2>
            <blockquote class="bg-white dark:bg-gray-dark-600 p-8 rounded-xl shadow text-lg">
            „Mit ApplI hatte ich in zwei Tagen eine Einladung zum Gespräch. Noch nie war bewerben so angenehm.“
            <footer class="mt-4 text-sm text-gray-dark-400 dark:text-gray-light-700">- Melina S.</footer>
            </blockquote>
        </div>
        </section>

        <!-- CTA Newsletter -->
        <section class="py-20 px-6 bg-gradient-to-br from-primary to-primaryLight text-white text-center">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-semibold mb-4">Bleib auf dem Laufenden</h2>
            <p class="mb-8">Erhalte Tipps und neue Funktionen direkt ins Postfach.</p>
            <form class="flex flex-col md:flex-row justify-center gap-4">
            <input type="email" placeholder="Deine E-Mail" class="px-4 py-3 rounded-lg text-black w-full md:w-auto">
            <button type="submit" class="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100">
                Anmelden
            </button>
            </form>
        </div>
        </section>

        <!-- Footer -->
        <footer class="py-12 px-6 bg-gray-dark-900 text-white">
        <div class="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
            <div>
            <h3 class="text-xl font-bold">ApplI</h3>
            <p class="text-gray-light-700 mt-2">Smartes Bewerben für eine starke Zukunft.</p>
            </div>
            <div>
            <h4 class="font-semibold mb-2">Links</h4>
            <ul class="space-y-1 text-sm">
                <li><a href="#" class="hover:underline">Start</a></li>
                <li><a href="#" class="hover:underline">Features</a></li>
                <li><a href="#" class="hover:underline">Preise</a></li>
                <li><a href="#" class="hover:underline">Kontakt</a></li>
            </ul>
            </div>
            <div>
            <h4 class="font-semibold mb-2">Support</h4>
            <ul class="space-y-1 text-sm">
                <li><a href="#" class="hover:underline">Hilfe</a></li>
                <li><a href="#" class="hover:underline">FAQ</a></li>
                <li><a href="#" class="hover:underline">Datenschutz</a></li>
            </ul>
            </div>
            <div>
            <h4 class="font-semibold mb-2">Download</h4>
            <img src="/download.png" alt="Download App" class="w-24 rounded-lg">
            </div>
        </div>
            <div class="mt-10 text-center text-sm text-gray-light-700">&copy; 2025 ApplI - Alle Rechte vorbehalten.</div>
        </footer>
    </div>
</template>

<style>
:root {
  --color-bg: #ffffff;
  --color-text: #101721;
}

.dark {
  --color-bg: #101721;
  --color-text: #ffffff;
}
</style>