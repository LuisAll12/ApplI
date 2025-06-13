import express from 'express'
import cors from 'cors'
import { sequelize } from './sequelize.js'
import './models/User.js'
import './models/Application.js'

import usersRoute from './routes/users.js'
import jobsRoute from './routes/jobs.js'
import companyInsightsRoute from './routes/companyInsights.js'
import groqRoute from './routes/groq.js'
import pdfRoute from './routes/pdf.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', usersRoute)
app.use('/api/jobs', jobsRoute)
app.use('/api/company-insights', companyInsightsRoute)
app.use('/api/groq', groqRoute)
app.use('/api/pdf', pdfRoute)
app.use('/pdf', express.static('public/pdf'))

// ⛓️ Datenbank-Synchronisierung
sequelize.sync({ alter: true })  // ⚠️ Nutze alter:true nur in dev!
  .then(() => {
    console.log('✅ Datenbank synchronisiert.')
    app.listen(3000, () => console.log('API läuft auf http://localhost:3000'))
  })
  .catch(err => {
    console.error('❌ Fehler beim DB-Sync:', err)
  })
