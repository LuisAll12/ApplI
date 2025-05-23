// backend/utils/generatePDF.js
import puppeteer from 'puppeteer'
import { writeFile } from 'fs/promises'

export async function generatePDF(html, outputPath) {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'networkidle0' })
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const pdfBuffer = await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '40px', bottom: '60px', left: '30px', right: '30px' }
  })

  await browser.close()
  return pdfBuffer
}
