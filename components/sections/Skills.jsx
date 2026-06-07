'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiPrisma, SiTailwindcss, SiJavascript, SiFlutter, SiFirebase,
  SiSocketdotio, SiAndroid, SiDocker, SiGit
} from 'react-icons/si'
import { Database } from 'lucide-react'

const skillGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React.js', Icon: SiReact, level: 95 },
      { name: 'Next.js', Icon: SiNextdotjs, level: 92 },
      { name: 'JavaScript', Icon: SiJavascript, level: 95 },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, level: 90 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, level: 90 },
      { name: 'Express.js', Icon: SiExpress, level: 88 },
      { name: 'REST APIs', Icon: Database, level: 92 },
      { name: 'Socket.IO', Icon: SiSocketdotio, level: 80 },
    ],
  },
  {
    category: 'Database',
    skills: [
      { name: 'MongoDB', Icon: SiMongodb, level: 90 },
      { name: 'PostgreSQL', Icon: SiPostgresql, level: 85 },
      { name: 'Neon DB', Icon: Database, level: 82 },
      { name: 'Prisma ORM', Icon: SiPrisma, level: 85 },
    ],
  },
  {
    category: 'Mobile',
    skills: [
      { name: 'Flutter', Icon: SiFlutter, level: 82 },
      { name: 'Android Dev', Icon: SiAndroid, level: 75 },
      { name: 'Firebase', Icon: SiFirebase, level: 85 },
      { name: 'Git', Icon: SiGit, level: 90 },
    ],
  },
]

function SkillCard({ name, Icon, level, delay }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass rounded-xl p-4 border border-white/8 glass-hover group cursor-default"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
          <Icon size={16} className="text-white/60 group-hover:text-white transition-colors" />
        </div>
        <span className="font-body text-sm text-white/80 group-hover:text-white transition-colors">{name}</span>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-white/60 to-white/20 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-white/20 font-mono text-[0.6rem]">Proficiency</span>
        <span className="text-white/30 font-mono text-[0.6rem]">{level}%</span>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-32 px-6" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/[0.015] blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-tag mb-4">Technical Arsenal</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {skillGroups.map(({ category, skills }, gi) => (
            <div key={category}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: gi * 0.1 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-[1px] w-6 bg-white/20" />
                <span className="section-tag text-white/50">{category}</span>
              </motion.div>
              <div className="grid sm:grid-cols-2 gap-3">
                {skills.map((skill, si) => (
                  <SkillCard key={skill.name} {...skill} delay={gi * 0.15 + si * 0.08} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
