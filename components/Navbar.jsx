'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
    setActive(href)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className={`mx-auto px-6 max-w-6xl ${scrolled ? 'glass rounded-2xl mx-4' : ''} transition-all duration-500`}>
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="font-display text-xl font-semibold tracking-tight"
              whileHover={{ opacity: 0.7 }}
            >
              <span className="text-white">MH</span>
              <span className="text-white/30">.</span>
            </motion.a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className={`section-tag hover:text-white transition-colors duration-200 hover-line ${
                      active === link.href ? 'text-white' : ''
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Hire Me CTA */}
            <motion.button
              onClick={() => scrollTo('#contact')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:flex items-center gap-2 px-5 py-2 glass rounded-full border border-white/10 text-white/80 text-sm hover:border-white/30 hover:text-white transition-all duration-300 font-body"
            >
              Hire Me
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white/70 hover:text-white"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 z-40 glass rounded-2xl p-6 border border-white/10"
          >
            <ul className="flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="w-full text-left text-white/70 hover:text-white transition-colors font-body py-2 border-b border-white/5 last:border-0"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
