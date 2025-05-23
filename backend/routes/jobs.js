import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.get('/search', async (req, res) => {
  const { what = '', where = '' } = req.query

  if (!process.env.ADZUNA_APP_ID || !process.env.ADZUNA_APP_KEY) {
    return res.status(500).json({ error: 'API-Schlüssel fehlen' })
  }

  try {
    const response = await axios.get('https://api.adzuna.com/v1/api/jobs/ch/search/1', {
        params: {
            app_id: process.env.ADZUNA_APP_ID,
            app_key: process.env.ADZUNA_APP_KEY,
            what: what,
            where: where, 
            results_per_page: 5
        }
    })
    res.json(response.data)
  } catch (error) {
    console.error('Adzuna API Fehler:', error.response?.data || error.message)
    res.status(400).json({ error: 'Ungültiger Request an Adzuna' })
  }
})


export default router
