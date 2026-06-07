'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { SiUpwork } from 'react-icons/si'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero({ photoSrc = '/developer.png' }) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center py-20">
        {/* Text content */}
        <div className="order-2 lg:order-1">
          <motion.div {...fadeUp(0)} className="mb-4">
            <span className="section-tag">Available for Work</span>
            <span className="ml-3 inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-6xl md:text-7xl xl:text-8xl font-bold leading-[0.95] mb-6"
          >
            <span className="block text-white/90">Muzammal</span>
            <span className="block gradient-text">Hussain</span>
          </motion.h1>

          <motion.div {...fadeUp(0.2)} className="mb-6">
            <p className="font-mono text-sm text-white/40 mb-2 tracking-widest">
              {'// EXPERTISE'}
            </p>
            <div className="flex flex-wrap gap-2">
              {['MERN Stack Developer', 'Mobile App Developer'].map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 glass rounded-full text-sm text-white/70 border border-white/10"
                >
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.p
            {...fadeUp(0.3)}
            className="text-white/50 font-body leading-relaxed max-w-md mb-10 text-[0.95rem]"
          >
            Crafting premium digital experiences through clean architecture and
            elegant code. Specialized in building high-performance web and mobile
            applications that scale.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4 mb-12">
            <motion.button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-body font-medium text-sm hover:bg-white/90 transition-all duration-300 group"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 glass border border-white/15 rounded-full text-white font-body text-sm hover:border-white/40 transition-all duration-300"
            >
              Hire Me
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.5)} className="flex items-center gap-4">
            {[
              { Icon: Github, href: 'https://github.com/MuzammalHussain007', label: 'GitHub' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/muzammal88809/', label: 'LinkedIn' },
              { Icon: SiUpwork, href: 'https://www.upwork.com/freelancers/~01d2113b98b8f002a7?mp_source=share', label: 'Upwork' },
            ].map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300"
                title={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}

            <div className="h-px w-16 bg-white/10" />
            <span className="section-tag">Follow me</span>
          </motion.div>
        </div>

        {/* Developer Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Soft orbital rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-6 rounded-full border border-white/[0.06] border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-12 rounded-full border border-white/[0.03] border-dashed"
            />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[115%] h-[115%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_40%,transparent_72%)] blur-2xl pointer-events-none" />

            {/* Portrait */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-[280px] h-[340px] sm:w-[300px] sm:h-[360px] lg:w-[320px] lg:h-[380px] hero-portrait-wrap"
            >
              <Image
                src={photoSrc}
                alt="Muzammal Hussain"
                fill
                unoptimized
                className="hero-portrait-img object-contain object-bottom px-2 pb-1"
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 300px, 320px"
              />
              <div className="absolute inset-0 hero-portrait-vignette pointer-events-none" aria-hidden="true" />
            </motion.div>

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-14 sm:-left-16 top-[30%] glass rounded-xl p-3 border border-white/10"
            >
              <div className="text-2xl font-display font-bold text-white">3+</div>
              <div className="section-tag text-[0.6rem]">Years Exp.</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -right-10 sm:-right-12 bottom-[24%] glass rounded-xl p-3 border border-white/10"
            >
              <div className="text-2xl font-display font-bold text-white">50+</div>
              <div className="section-tag text-[0.6rem]">Projects</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
        <span className="section-tag text-[0.6rem]">Scroll</span>
      </motion.div>
    </section>
  )
}
