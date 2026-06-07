'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/8 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <span className="font-display text-xl font-semibold text-white/80">
            MH<span className="text-white/20">.</span>
          </span>
          <span className="text-white/25 font-body text-xs">
            © {new Date().getFullYear()} Muzammal Hussain. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { Icon: Github, href: 'https://github.com/MuzammalHussain007' },
            { Icon: Linkedin, href: 'https://www.linkedin.com/in/muzammal88809/' },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/30 hover:text-white border border-white/8 hover:border-white/25 transition-all"
            >
              <Icon size={14} />
            </motion.a>
          ))}

          <motion.button
            onClick={scrollTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/30 hover:text-white border border-white/8 hover:border-white/25 transition-all"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
