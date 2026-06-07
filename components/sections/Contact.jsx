'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, MapPin, Send, MessageCircle, Linkedin } from 'lucide-react'
import { SiGithub, SiWhatsapp } from 'react-icons/si'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="section-tag mb-4">Get In Touch</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-white/40 mt-4 font-body text-sm max-w-md mx-auto leading-relaxed">
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-5 border border-white/8 flex items-start gap-4">
              <div className="w-10 h-10 glass rounded-xl border border-white/15 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-white/60" />
              </div>
              <div>
                <p className="section-tag mb-1">Email</p>
                <a href="mailto:muzammalhussain501@gmail.com" className="text-white/80 font-body text-sm hover:text-white transition-colors">
                  muzammalhussain501@gmail.com
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 border border-white/8 flex items-start gap-4">
              <div className="w-10 h-10 glass rounded-xl border border-white/15 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-white/60" />
              </div>
              <div>
                <p className="section-tag mb-1">Location</p>
                <p className="text-white/80 font-body text-sm">Pakistan — Remote Worldwide</p>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 border border-white/8">
              <p className="section-tag mb-4">Social Links</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { Icon: SiGithub, label: 'GitHub', href: 'https://github.com/MuzammalHussain007' },
                  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/muzammal88809/' },
                  {
                    Icon: SiWhatsapp,
                    label: 'WhatsApp',
                    href: 'https://wa.me/923114143606',
                    highlight: true,
                  },
                  { Icon: MessageCircle, label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01d2113b98b8f002a7?mp_source=share' },
                ].map(({ Icon, label, href, highlight }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-2 glass rounded-xl border transition-all duration-300 text-xs font-body ${
                      highlight
                        ? 'border-white/20 text-white/70 hover:text-white hover:border-white/40'
                        : 'border-white/8 text-white/50 hover:text-white/80 hover:border-white/20'
                    }`}
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-white/10 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="section-tag block mb-2">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="section-tag block mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="section-tag block mb-2">Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project inquiry"
                  className="form-input"
                />
              </div>

              <div>
                <label className="section-tag block mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="form-input resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full py-3.5 rounded-xl font-body font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === 'success'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : status === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                {status === 'sending' && (
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                )}
                {status === 'success' && '✓ Message Sent!'}
                {status === 'error' && '✗ Something went wrong'}
                {status === 'idle' && (
                  <>
                    Send Message
                    <Send size={15} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
