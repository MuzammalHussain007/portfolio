import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'

async function getStats() {
  try {
    const [totalProjects, featuredProjects, totalMessages, unreadMessages] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { read: false } }),
    ])
    return { totalProjects, featuredProjects, totalMessages, unreadMessages }
  } catch {
    return { totalProjects: 0, featuredProjects: 0, totalMessages: 0, unreadMessages: 0 }
  }
}

async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    return []
  }
}

export default async function Dashboard() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login')
  }

  const [stats, projects] = await Promise.all([getStats(), getProjects()])

  return <AdminDashboardClient stats={stats} initialProjects={projects} />
}
