// backend/routes/users.js
import express from 'express'
import { User } from '../models/User.js'
import { Application } from '../models/Application.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { personal, experience, motivation, job, applicationHtml } = req.body

    const user = await User.create({
      firstName: personal.firstName,
      lastName: personal.lastName,
      email: personal.email,
      phone: personal.phone
    })

    await Application.create({
      userId: user.id,
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

    res.status(201).json({ message: 'Gespeichert!' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Fehler beim Speichern' })
  }
})

export default router
