export async function fetchCompanyInsights(companyName) {
    const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/company-insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName })
    })

    if (!res.ok) throw new Error('Fehler bei der Unternehmensanalyse')

    return await res.json()
}

export function buildApplicationPrompt(userData, insights) {
    return `
        Erstelle ein professionelles Bewerbungsschreiben für die Firma "${userData.job.companyName}".
        Der Bewerber heisst ${userData.personal.firstName} ${userData.personal.lastName}.
        Stärken: ${userData.motivation.strengths}
        Motivation: ${userData.motivation.whyThisField}
        Kenntnisse: ${userData.experience.education}, ${userData.experience.currentJob}
        
        Unternehmensfokus: ${insights.mission}
        Wichtige Werte: ${insights.values.join(', ')}
        Technologien: ${insights.technologies.join(', ')}
        
        Format: Motivationsschreiben im PDF-Stil.
    `
}

export async function generateApplicationLetter(prompt) {
    const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/groq`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
    })
    const result = await response.json()
    return result.variants // z. B. [formal, kreativ, direkt]
}


export function formatPreview(variants) {
    return variants.map((text, i) => ({
        style: ['Formell', 'Kreativ', 'Direkt'][i],
        html: convertMarkdownToHTML(text)
    }))
    }

    function convertMarkdownToHTML(markdown) {
    // z. B. mit marked.js oder DOMPurify
    return markdown.replace(/\n/g, '<br>')
}


export async function exportToPDF(formattedLetters) {
    // Beispiel: POST an Backend, das PDF generiert und speichert
    const res = await fetch('/api/pdf', {
        method: 'POST',
        body: JSON.stringify({ letters: formattedLetters })
    })
    const { filePath } = await res.json()
    return filePath
}

export async function optionallySendMail(letter, formData) {
    if (!formData.sendMail) return
    return fetch('/api/mail', {
        method: 'POST',
        body: JSON.stringify({
        to: formData.personal.email,
        subject: `Bewerbung für ${formData.job.position}`,
        body: letter.html
        })
    })
}

// async function storeInHistory(formData, result) {
//     await fetch('/api/history', {
//         method: 'POST',
//         body: JSON.stringify({
//             user: formData.personal.email,
//             application: {
//                 to: formData.job.companyName,
//                 variant: result,
//                 date: new Date().toISOString()
//             }
//         })
//     })
// }

