

import express from 'express'
// import nodemailer from 'nodemailer'
import { Application } from '../models/Application.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
  try {
    const { job, motivation, experience, applicationHtml } = req.body
    const userId = req.user.id

    const newApp = await Application.create({
        userId,
        jobCompany: job.companyName,
        jobPosition: job.position,
        jobEmploymentType: job.employmentType,
        motivation: motivation.whyThisField,
        strengths: motivation.strengths,
        education: experience.education,
        currentJob: experience.currentJob,
        yearsExperience: experience.yearsExperience,
        generatedLetter: applicationHtml
    })

    res.status(201).json({ message: 'Bewerbung gespeichert', applicationId: newApp.id })
  } catch (err) {
    console.error('❌ Fehler beim Speichern der Bewerbung:', err)
    res.status(500).json({ message: 'Interner Serverfehler' })
  }
})

// router.post('/send-mail', verifyToken, async (req, res) => {
//   try {
//     const { email, html, subject } = req.body

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//       }
//     })

//     const mailOptions = {
//       from: `"ApplI Generator" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: subject || 'Dein Bewerbungsschreiben',
//       html
//     }

//     await transporter.sendMail(mailOptions)
//     res.status(200).json({ message: 'E-Mail wurde gesendet' })
//   } catch (err) {
//     console.error('❌ Fehler beim E-Mail-Versand:', err)
//     res.status(500).json({ message: 'Fehler beim Senden der E-Mail' })
//   }
// })

export default router
