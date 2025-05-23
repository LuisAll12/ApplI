// backend/routes/pdf.js
import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { join } from 'path'
import { generatePDF } from '../utils/generatePDF.js'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'

const router = express.Router()

router.post('/', async (req, res) => {
  const { letters } = req.body
  if (!letters || !Array.isArray(letters)) {
    return res.status(400).json({ message: 'Ungültige Eingabe' })
  }

  try {
    const html = `
    <html>
        <head>
            <meta charset="UTF-8" />
            <style>
                body { font-family: Arial, sans-serif; font-size: 14px; padding: 40px; color: #000; }
                h2 { color: #5529ee; }
            </style>
        </head>
        <body>
            <h2>Formell</h2>
            <p>Sehr geehrte Damen und Herren,</p>
            <p>ich bewerbe mich hiermit auf Ihre ausgeschriebene Stelle...</p>
        </body>
    </html>
    `

    const fileName = `${uuidv4()}.pdf`
    const outputPath = join('public/pdf', fileName)
    const outputDir = join('public', 'pdf')
    if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true })
    }
    await generatePDF(html, outputPath)
    res.json({ fileUrl: `/pdf/${fileName}` })
  } catch (err) {
    console.error('PDF Fehler:', err)
    res.status(500).json({ message: 'PDF-Erstellung fehlgeschlagen', error: err.message })
  }
})

export default router
