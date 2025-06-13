// middleware/verifyToken.js
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Kein Token übergeben.' })

  try {
    const SECRET = process.env.JWT_SECRET || 'dein_geheimes_jwt_secret'
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Token ungültig.' })
  }
}
