'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

const PLACEHOLDER_TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Founder',
    company: 'TechLaunch Inc.',
    message: 'Muzammal delivered an exceptional MERN stack application that exceeded our expectations. His attention to code quality and communication throughout the project was outstanding.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Ahmed Al-Hassan',
    role: 'CTO',
    company: 'DigitalWave',
    message: 'Working with Muzammal was a great experience. He built our Flutter app from scratch, handling complex integrations and delivering on time. Highly recommend!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'Product Manager',
    company: 'StartupBase',
    message: 'The admin dashboard Muzammal built for us is clean, fast, and exactly what we needed. He understood our requirements perfectly and implemented them beautifully.',
    rating: 5,
  },
]

export default function Testimonials({ initialTestimonials = [] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const testimonials = initialTestimonials.length > 0 ? initialTestimonials : PLACEHOLDER_TESTIMONIALS

  return (
    <section id="testimonials" className="relative py-32 px-6 grid-bg" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-tag mb-4">Client Reviews</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
            What Clients{' '}
            <span className="gradient-text">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(({ id, name, role, company, message, rating }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 border border-white/8 glass-hover"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, si) => (
                  <Star key={si} size={12} className="fill-white/60 text-white/60" />
                ))}
              </div>

              <p className="text-white/55 font-body text-sm leading-relaxed mb-6 italic">
                "{message}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full glass border border-white/15 flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-white/70">
                    {name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-white/90">{name}</p>
                  <p className="section-tag text-[0.6rem]">{role}, {company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
