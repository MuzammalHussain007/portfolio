import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAdminFromToken } from '@/lib/auth'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({ where: { id } })
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ project })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = await getAdminFromToken()
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await request.json()
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription || '',
        technologies: body.technologies || [],
        image: body.image || null,
        githubUrl: body.githubUrl || null,
        liveUrl: body.liveUrl || null,
        category: body.category || 'web',
        featured: body.featured || false,
      },
    })
    revalidatePath('/')
    return NextResponse.json({ project })
  } catch (error) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = await getAdminFromToken()
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    await prisma.project.delete({ where: { id } })
    revalidatePath('/')
    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
