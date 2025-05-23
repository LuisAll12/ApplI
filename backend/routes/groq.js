import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

router.post('/', async (req, res) => {
    const { prompt } = req.body

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
        console.log('Groq API response:', data)
        const text = data.choices?.[0]?.message?.content || ''

        // Optional: 3 Varianten aus einem Text splitten
        const variants = text.split(/---+/).map(str => str.trim()).filter(Boolean)

        res.json({ variants })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Fehler bei Groq API' })
    }
})

export default router