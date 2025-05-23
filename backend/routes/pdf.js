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
      <html lang="de">
      <head>
        <meta charset="UTF-8" />
        <title>Bewerbung</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; line-height: 1.5; }
          h2 { color: #5529ee; margin-bottom: 0.5rem; }
          hr { margin: 2rem 0; border: none; border-top: 1px solid #ccc; }
        </style>
      </head>
      <body>
        ${letters.map(l => `<h2>${l.style}</h2>${l.html}<hr/>`).join('\n')}
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
