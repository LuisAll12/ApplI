import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

const router = express.Router()
const SECRET = process.env.JWT_SECRET || 'dein_geheimes_jwt_secret'

// 🔐 Registrierung
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Alle Felder sind erforderlich' })
    }

    const existing = await User.findOne({ where: { email } })
    if (existing) {
      return res.status(409).json({ message: 'Benutzer existiert bereits' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password: hashed,
      firstName,
      lastName,
      phone
    })

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' })

    // Passwort nicht mit zurückgeben
    const { password: _, ...userData } = user.toJSON()

    res.status(201).json({ token, user: userData })
  } catch (err) {
    console.error('Fehler bei Registrierung:', err)
    res.status(500).json({ message: 'Serverfehler bei Registrierung' })
  }
})

// 🔑 Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email und Passwort erforderlich' })
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ message: 'Falsche Login-Daten' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ message: 'Falsche Login-Daten' })
    }

    const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' })

    // Passwort entfernen
    const { password: _, ...userData } = user.toJSON()

    res.json({ token, user: userData })
  } catch (err) {
    console.error('Fehler beim Login:', err)
    res.status(500).json({ message: 'Serverfehler beim Login' })
  }
})

export default router
