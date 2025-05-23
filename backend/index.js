import express from 'express'
import cors from 'cors'
import jobsRoute from './routes/jobs.js'

const app = express()
app.use(cors())
app.use('/api/jobs', jobsRoute)

app.listen(3000, () => console.log('API läuft auf http://localhost:3000'))
