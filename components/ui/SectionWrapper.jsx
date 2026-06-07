'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionWrapper({ children, className = '', id }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative py-24 px-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export function SectionHeader({ tag, title, subtitle }) {
  return (
    <div className="text-center mb-16">
      {tag && <p className="section-tag mb-4">{tag}</p>}
      <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/40 font-body max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
