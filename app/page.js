import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import ParticleBackground from '@/components/ui/ParticleBackground'
import { prisma } from '@/lib/prisma'
import { getDeveloperPhotoSrc } from '@/lib/developer-photo'

export const dynamic = 'force-dynamic'

async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })
  } catch {
    return []
  }
}

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function Home() {
  const [projects, testimonials, developerPhotoSrc] = await Promise.all([
    getProjects(),
    getTestimonials(),
    Promise.resolve(getDeveloperPhotoSrc()),
  ])

  return (
    <main className="relative bg-[#050505] min-h-screen overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero photoSrc={developerPhotoSrc} />
        <About />
        <Skills />
        <Services />
        <Projects initialProjects={projects} />
        <Testimonials initialTestimonials={testimonials} />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
