// backend/routes/companyInsights.js
import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.post('/', async (req, res) => {
  const { companyName } = req.body

  const prompt = `
Du bist eine Webrecherche-KI. Recherchiere aktuelle Informationen über das Unternehmen "${companyName}".
Fasse zusammen:
- Mission / Vision
- Wichtige Werte
- Verwendete Technologien
- Auffällige Merkmale der Unternehmenskultur

Antwort im JSON-Format mit den Keys: mission, values[], technologies[], keyPoints[]
`

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    })

    const data = await groqRes.json()

    const responseText = data.choices?.[0]?.message?.content
    if (!responseText) throw new Error('Groq lieferte keine gültige Antwort')

    const match = responseText.match(/```json([\s\S]*?)```/)
    if (!match) throw new Error('Kein JSON-Block gefunden')

    const parsed = JSON.parse(match[1].trim())
    res.json(parsed)
  } catch (err) {
    console.error('Groq Fehler:', err)
    res.status(500).json({ error: 'Fehler bei Groq-Anfrage', details: err.message })
  }
})

export default router
