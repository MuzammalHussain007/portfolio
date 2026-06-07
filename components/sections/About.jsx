'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Smartphone, Globe, Zap } from 'lucide-react'

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  { value: '99%', label: 'Client Satisfaction' },
]

const cards = [
  { Icon: Globe, title: 'Web Development', desc: 'Building scalable MERN stack applications with clean, maintainable code.' },
  { Icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform mobile apps using Flutter and React Native.' },
  { Icon: Code2, title: 'Clean Code', desc: 'Writing readable, testable, and performance-optimized code.' },
  { Icon: Zap, title: 'Fast Delivery', desc: 'Meeting deadlines without compromising quality.' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-32 px-6 grid-bg" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-tag mb-4">Who I Am</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Crafting Digital
            <br />
            <span className="gradient-text">Experiences</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-5 text-white/55 font-body leading-relaxed">
              <p>
                I'm <strong className="text-white font-medium">Muzammal Hussain</strong>, a passionate full-stack
                developer with over 3 years of experience building production-ready web and mobile applications.
              </p>
              <p>
                My journey began with a fascination for turning complex problems into elegant digital solutions.
                I specialize in the MERN stack — MongoDB, Express.js, React, and Node.js — along with modern
                mobile development using Flutter.
              </p>
              <p>
                I've worked with clients across various industries, delivering scalable backends, polished frontends,
                and seamless mobile experiences. I believe great software is where technical precision meets
                thoughtful design.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'}) }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white text-black rounded-full font-body text-sm font-medium"
              >
                Let's Talk
              </motion.a>
              <a
                href="/resume.pdf"
                className="section-tag hover:text-white transition-colors border-b border-white/20 pb-0.5"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass rounded-2xl p-6 border border-white/8 glass-hover glow-border-hover text-center"
              >
                <div className="font-display text-4xl font-bold text-white mb-1">{value}</div>
                <div className="section-tag">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 border border-white/8 glass-hover group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center mb-4 group-hover:border-white/30 transition-colors">
                <Icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-body font-medium text-white/90 mb-2 text-sm">{title}</h3>
              <p className="text-white/40 text-xs leading-relaxed font-body">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
