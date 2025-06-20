import express from 'express'
import cors from 'cors'
import './models/User.js'
import './models/Application.js'
import dotenv from 'dotenv'
import { connectDB, sequelize } from "./sequelize.js";


import usersRoute from './routes/users.js'
import jobsRoute from './routes/jobs.js'
import companyInsightsRoute from './routes/companyInsights.js'
import groqRoute from './routes/groq.js'
import pdfRoute from './routes/pdf.js'
import authRoute from './routes/auth.js'
import applicationRoutes from './routes/applications.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json()) 

const PORT = process.env.PORT || 3000

app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/jobs', jobsRoute)
app.use('/api/company-insights', companyInsightsRoute)
app.use('/api/groq', groqRoute)
app.use('/api/pdf', pdfRoute)
app.use('/pdf', express.static('public/pdf'))
app.use('/api/applications', applicationRoutes)

// ⛓️ Datenbank-Synchronisierung
async function startServer() {
    await connectDB();
    try {
        await sequelize.sync({ alter: true })
        console.log("✅ Datenbank synchronisiert!");
    } catch (error) {
        console.error("❌ Fehler beim Starten des Servers:", error);
    }
    finally {
        app.listen(PORT, () => {
            console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
        });
    }
}

startServer();
