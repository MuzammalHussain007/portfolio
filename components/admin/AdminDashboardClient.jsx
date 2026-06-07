'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, FolderOpen, MessageSquare, LogOut,
  Plus, Edit2, Trash2, Star, Eye, Github, ExternalLink,
  Upload, X, Check, BarChart3, AlertCircle
} from 'lucide-react'

const NAV = [
  { id: 'overview', Icon: LayoutDashboard, label: 'Overview' },
  { id: 'projects', Icon: FolderOpen, label: 'Projects' },
  { id: 'messages', Icon: MessageSquare, label: 'Messages' },
]

function StatCard({ label, value, sub, Icon, color = 'white' }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/8">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 glass rounded-xl border border-white/10 flex items-center justify-center">
          <Icon size={18} className="text-white/60" />
        </div>
      </div>
      <div className="font-display text-4xl font-bold text-white mb-1">{value}</div>
      <div className="font-body text-white/60 text-sm">{label}</div>
      {sub && <div className="font-mono text-white/30 text-xs mt-1">{sub}</div>}
    </div>
  )
}

function ProjectModal({ project, onClose, onSave }) {
  const isEdit = !!project?.id
  const [form, setForm] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    shortDescription: project?.shortDescription || '',
    fullDescription: project?.fullDescription || '',
    technologies: project?.technologies?.join(', ') || '',
    image: project?.image || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    category: project?.category || 'web',
    featured: project?.featured || false,
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    setForm({ ...form, title, slug: generateSlug(title) })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) setForm({ ...form, image: data.url })
    } catch {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const payload = {
        ...form,
        technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      }

      const url = isEdit ? `/api/projects/${project.id}` : '/api/projects'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (res.ok) {
        onSave(data.project, isEdit)
        onClose()
      } else {
        setError(data.error || 'Save failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/10 p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-white">
            {isEdit ? 'Edit Project' : 'New Project'}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body flex items-center gap-2">
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="section-tag block mb-2">Title *</label>
              <input value={form.title} onChange={handleTitleChange} placeholder="My Project" className="form-input" />
            </div>
            <div>
              <label className="section-tag block mb-2">Slug *</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="my-project" className="form-input font-mono text-sm" />
            </div>
          </div>

          <div>
            <label className="section-tag block mb-2">Short Description *</label>
            <input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} placeholder="Brief description..." className="form-input" />
          </div>

          <div>
            <label className="section-tag block mb-2">Full Description</label>
            <textarea value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} rows={3} placeholder="Detailed description..." className="form-input resize-none" />
          </div>

          <div>
            <label className="section-tag block mb-2">Technologies (comma-separated)</label>
            <input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node.js, MongoDB" className="form-input" />
          </div>

          {/* Image upload */}
          <div>
            <label className="section-tag block mb-2">Project Image</label>
            <div className="flex gap-3">
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Paste image URL or upload below" className="form-input flex-1" />
              <label className={`flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/15 text-white/60 hover:text-white text-sm cursor-pointer transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                {uploading ? (
                  <div className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Upload size={14} />
                )}
                Upload
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            {form.image && (
              <img src={form.image} alt="Preview" className="mt-2 h-24 w-full object-cover rounded-xl opacity-70" />
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="section-tag block mb-2">GitHub URL</label>
              <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." className="form-input" />
            </div>
            <div>
              <label className="section-tag block mb-2">Live URL</label>
              <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://..." className="form-input" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="section-tag block mb-2">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="form-input">
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="backend">Backend</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm({ ...form, featured: !form.featured })}
                  className={`w-10 h-5 rounded-full transition-all duration-300 flex items-center px-0.5 ${form.featured ? 'bg-white' : 'bg-white/20'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-300 ${form.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
                <span className="section-tag">Featured Project</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 py-3 glass rounded-xl border border-white/10 text-white/60 hover:text-white font-body text-sm transition-all">
            Cancel
          </button>
          <motion.button
            onClick={handleSave}
            disabled={saving}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="flex-1 py-3 bg-white text-black rounded-xl font-body font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <Check size={15} />
                {isEdit ? 'Save Changes' : 'Create Project'}
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default function AdminDashboardClient({ stats, initialProjects }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [projects, setProjects] = useState(initialProjects)
  const [modalProject, setModalProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const openCreateModal = () => {
    setModalProject(null)
    setShowModal(true)
  }

  const openEditModal = (project) => {
    setModalProject(project)
    setShowModal(true)
  }

  const handleSaveProject = (saved, isEdit) => {
    if (isEdit) {
      setProjects(projects.map((p) => (p.id === saved.id ? saved : p)))
    } else {
      setProjects([saved, ...projects])
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      setProjects(projects.filter((p) => p.id !== id))
      setDeleteConfirm(null)
    } catch {
      console.error('Delete failed')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex" style={{ cursor: 'auto' }}>
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/8 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/8">
          <div className="font-display text-xl font-bold text-white">
            MH<span className="text-white/20">.</span>
          </div>
          <p className="section-tag mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ id, Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all duration-200 ${
                activeTab === id
                  ? 'bg-white/10 text-white border border-white/15'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Overview */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-white mb-1">Overview</h1>
                <p className="section-tag">Welcome back, Muzammal</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Projects" value={stats.totalProjects} Icon={FolderOpen} />
                <StatCard label="Featured" value={stats.featuredProjects} Icon={Star} />
                <StatCard label="Messages" value={stats.totalMessages} Icon={MessageSquare} />
                <StatCard label="Unread" value={stats.unreadMessages} sub="New messages" Icon={AlertCircle} />
              </div>

              {/* Recent projects */}
              <div className="glass rounded-2xl border border-white/8 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-body font-semibold text-white/90">Recent Projects</h3>
                  <button onClick={() => setActiveTab('projects')} className="section-tag hover:text-white transition-colors">
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {projects.slice(0, 4).map((p) => (
                    <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-3">
                        {p.featured && <Star size={12} className="text-white/40" />}
                        <span className="font-body text-sm text-white/80">{p.title}</span>
                        <span className="section-tag text-[0.6rem] px-2 py-0.5 bg-white/5 rounded-md">{p.category}</span>
                      </div>
                      <span className="font-mono text-white/25 text-xs">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="text-white/30 font-body text-sm text-center py-4">No projects yet</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="font-display text-3xl font-bold text-white mb-1">Projects</h1>
                  <p className="section-tag">{projects.length} total projects</p>
                </div>
                <button
                  onClick={openCreateModal}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl font-body font-medium text-sm hover:bg-white/90 transition-all"
                >
                  <Plus size={16} />
                  Add Project
                </button>
              </div>

              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="glass rounded-2xl border border-white/8 p-5 flex items-center gap-4 hover:border-white/15 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-12 rounded-lg glass border border-white/10 overflow-hidden flex-shrink-0">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display text-white/20 text-lg">
                          {project.title.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-body font-medium text-white/90 truncate">{project.title}</h3>
                        {project.featured && (
                          <Star size={12} className="text-white/50 flex-shrink-0" />
                        )}
                        <span className="section-tag text-[0.6rem] px-2 py-0.5 bg-white/5 rounded-md flex-shrink-0">{project.category}</span>
                      </div>
                      <p className="text-white/40 text-xs font-body truncate">{project.shortDescription}</p>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {project.technologies?.slice(0, 3).map((t) => (
                          <span key={t} className="section-tag text-[0.55rem] px-1.5 py-0.5 bg-white/5 rounded">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg border border-white/8 text-white/30 hover:text-white transition-all">
                          <ExternalLink size={14} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg border border-white/8 text-white/30 hover:text-white transition-all">
                          <Github size={14} />
                        </a>
                      )}
                      <button onClick={() => openEditModal(project)} className="p-2 glass rounded-lg border border-white/8 text-white/30 hover:text-blue-400 transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(project.id)}
                        className="p-2 glass rounded-lg border border-white/8 text-white/30 hover:text-red-400 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {projects.length === 0 && (
                  <div className="text-center py-20 text-white/30 font-body">
                    <FolderOpen size={32} className="mx-auto mb-4 opacity-30" />
                    <p>No projects yet. Add your first project!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Messages tab placeholder */}
          {activeTab === 'messages' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-3xl font-bold text-white mb-8">Messages</h1>
              <div className="glass rounded-2xl border border-white/8 p-8 text-center text-white/30 font-body">
                <MessageSquare size={32} className="mx-auto mb-4 opacity-30" />
                <p>Messages from contact form will appear here.</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {showModal && (
          <ProjectModal
            project={modalProject}
            onClose={() => setShowModal(false)}
            onSave={handleSaveProject}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass rounded-2xl border border-white/10 p-8 max-w-sm w-full text-center"
            >
              <Trash2 size={32} className="mx-auto mb-4 text-red-400 opacity-80" />
              <h3 className="font-display text-xl font-bold text-white mb-2">Delete Project?</h3>
              <p className="text-white/40 font-body text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 glass rounded-xl border border-white/10 text-white/60 font-body text-sm hover:text-white transition-all">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500/80 hover:bg-red-500 rounded-xl text-white font-body text-sm transition-all">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
