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
    const groqRes = await fetch('https://api.groq.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768', // oder anderes Modell
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    })

    const data = await groqRes.json()
    const responseText = data.choices[0]?.message?.content

    const parsed = JSON.parse(responseText)
    res.json(parsed)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Fehler bei Groq-Anfrage' })
  }
})

export default router
