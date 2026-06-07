'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, Smartphone, LayoutDashboard, Plug, Flame, Palette, Layers, ArrowRight } from 'lucide-react'

const services = [
  {
    Icon: Globe,
    title: 'MERN Stack Development',
    desc: 'Full-cycle web applications using MongoDB, Express.js, React, and Node.js with optimized performance.',
    tags: ['React', 'Node.js', 'MongoDB'],
    featured: true,
  },
  {
    Icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Cross-platform iOS & Android apps built with Flutter with beautiful native-like experiences.',
    tags: ['Flutter', 'Dart', 'Firebase'],
  },
  {
    Icon: LayoutDashboard,
    title: 'Admin Panel Development',
    desc: 'Powerful, secure admin dashboards with analytics, CRUD operations, and role-based access control.',
    tags: ['Next.js', 'Prisma', 'JWT'],
  },
  {
    Icon: Plug,
    title: 'API Integration',
    desc: 'RESTful API design, third-party integrations, and real-time features with Socket.IO.',
    tags: ['REST', 'Socket.IO', 'GraphQL'],
  },
  {
    Icon: Flame,
    title: 'Firebase Integration',
    desc: 'Real-time databases, authentication, cloud functions, and push notifications with Firebase.',
    tags: ['Firestore', 'Auth', 'FCM'],
  },
  {
    Icon: Palette,
    title: 'UI/UX Implementation',
    desc: 'Converting Figma designs into pixel-perfect, animated, and fully responsive interfaces.',
    tags: ['Figma', 'Framer Motion', 'CSS'],
  },
  {
    Icon: Layers,
    title: 'Full Stack Web Apps',
    desc: 'End-to-end application development from database design to deployment on Vercel/Railway.',
    tags: ['Full Stack', 'DevOps', 'Deploy'],
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="relative py-32 px-6 grid-bg" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-tag mb-4">What I Offer</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
            Services I{' '}
            <span className="gradient-text">Provide</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto font-body text-sm leading-relaxed">
            From concept to deployment — comprehensive development services tailored to your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(({ Icon, title, desc, tags, featured }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative glass rounded-2xl p-6 border glass-hover group cursor-default transition-all duration-300 ${
                featured
                  ? 'border-white/20 md:col-span-2 lg:col-span-1'
                  : 'border-white/8'
              }`}
            >
              {featured && (
                <div className="absolute top-4 right-4">
                  <span className="section-tag text-[0.6rem] px-2 py-0.5 glass rounded-full border border-white/20">
                    Popular
                  </span>
                </div>
              )}

              <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center mb-5 group-hover:border-white/30 transition-all duration-300">
                <Icon size={20} className="text-white/60 group-hover:text-white transition-colors" />
              </div>

              <h3 className="font-body font-semibold text-white/90 mb-2 text-[0.95rem] group-hover:text-white transition-colors">
                {title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed font-body mb-4">{desc}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {tags.map((tag) => (
                  <span key={tag} className="section-tag text-[0.6rem] px-2 py-0.5 bg-white/4 rounded-md border border-white/8">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 text-white/25 group-hover:text-white/60 transition-colors text-xs font-body">
                Learn more <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
