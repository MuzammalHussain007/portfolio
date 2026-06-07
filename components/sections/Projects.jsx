'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'

const categories = ['All', 'Web', 'Mobile']

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className={`relative glass rounded-2xl overflow-hidden border glass-hover group cursor-default transition-all duration-300 ${
        project.featured ? 'border-white/20' : 'border-white/8'
      }`}
    >
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 glass rounded-full border border-white/20">
          <Star size={10} className="text-white/70" />
          <span className="section-tag text-[0.6rem] text-white/70">Featured</span>
        </div>
      )}

      {/* Project image */}
      <div className="relative h-48 bg-gradient-to-br from-white/8 to-white/3 overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-5xl text-white/10 font-bold">
                {project.title.charAt(0)}
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-body font-semibold text-white/90 mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-white/40 text-xs leading-relaxed font-body mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="section-tag text-[0.6rem] px-2 py-0.5 bg-white/5 rounded-md border border-white/8"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="section-tag text-[0.6rem] px-2 py-0.5 text-white/20">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/30 hover:text-white transition-colors text-xs font-body"
            >
              <Github size={14} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/30 hover:text-white transition-colors text-xs font-body"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ initialProjects = [] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const projects = initialProjects

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase())

  return (
    <section id="projects" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="section-tag mb-4">Portfolio</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p className="text-white/40 font-body text-sm max-w-md mx-auto leading-relaxed">
            A curated collection of projects that showcase my expertise in building scalable digital products.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`section-tag px-4 py-1.5 rounded-full border transition-all duration-200 text-[0.7rem] ${
                activeCategory === cat
                  ? 'border-white/40 text-white bg-white/10'
                  : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30 font-body">
            {projects.length === 0
              ? 'No projects yet. Add them from the admin panel.'
              : 'No projects in this category yet.'}
          </div>
        )}
      </div>
    </section>
  )
}
