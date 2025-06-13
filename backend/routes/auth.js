import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../models/User.js'

const router = express.Router()
const SECRET = 'dein_geheimes_jwt_secret'

router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body
  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashed, firstName, lastName })
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' })
  res.json({ token, user })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Falsche Login-Daten' })
  }
  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' })
  res.json({ token, user })
})

export default router
