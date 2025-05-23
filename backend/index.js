import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'
import jobsRoute from './routes/jobs.js'
import companyInsightsRoute from './routes/companyInsights.js'
import groqRoute from './routes/groq.js'
import pdfRoute from './routes/pdf.js'

const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/jobs', jobsRoute)
app.use('/api/company-insights', companyInsightsRoute)
app.use('/api/groq', groqRoute)
app.use('/api/pdf', pdfRoute)
app.use('/pdf', express.static('public/pdf'))

app.listen(3000, () => console.log('API läuft auf http://localhost:3000'))
