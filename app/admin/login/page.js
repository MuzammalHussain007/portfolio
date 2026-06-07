'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        setError(data.error || 'Login failed')
        setStatus('idle')
      }
    } catch {
      setError('Network error. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] grid-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 glass rounded-2xl border border-white/15 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-white/60" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-1">Admin Panel</h1>
          <p className="section-tag">Muzammal Hussain Portfolio</p>
        </div>

        {/* Form */}
        <div className="glass rounded-3xl border border-white/10 p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="section-tag block mb-2">Email</label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none z-10"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="admin@email.com"
                  className="form-input form-input-with-icon"
                />
              </div>
            </div>

            <div>
              <label className="section-tag block mb-2">Password</label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none z-10"
                  aria-hidden="true"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  placeholder="••••••••"
                  className="form-input form-input-with-icon form-input-with-icon-right"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 bg-white text-black rounded-xl font-body font-medium text-sm flex items-center justify-center gap-2 mt-6 hover:bg-white/90 transition-all disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs font-mono mt-6">
          Secured with JWT Authentication
        </p>
      </motion.div>
    </div>
  )
}
