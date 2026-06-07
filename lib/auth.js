import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_token')?.value
}

export async function isAuthenticated() {
  const token = await getTokenFromCookies()
  if (!token) return false
  return !!verifyToken(token)
}

export async function getAdminFromToken() {
  const token = await getTokenFromCookies()
  if (!token) return null
  return verifyToken(token)
}
