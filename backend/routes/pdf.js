// backend/routes/pdf.js
import express from 'express'
import { writeFileSync } from 'fs'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { create } from 'html-pdf-node'

const router = express.Router()

router.post('/', async (req, res) => {
  const { letters } = req.body

  if (!letters || !Array.isArray(letters)) {
    return res.status(400).json({ message: 'Keine gültigen Daten empfangen.' })
  }

  try {
    const html = letters.map(l => `<h2>${l.style}</h2>${l.html}`).join('<hr/>')
    const fileName = `${uuidv4()}.pdf`
    const filePath = join('public', 'pdf', fileName)

    // mit html-pdf-node oder puppeteer, je nach Setup
    const options = { format: 'A4' }
    const file = { content: html }

    const pdfBuffer = await create(file, options)

    writeFileSync(filePath, pdfBuffer)
    res.json({ fileUrl: `/pdf/${fileName}` })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'PDF-Erstellung fehlgeschlagen' })
  }
})

export default router
