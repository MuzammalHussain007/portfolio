import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAdminFromToken } from '@/lib/auth'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    const where = {}
    if (category && category !== 'all') where.category = category
    if (featured === 'true') where.featured = true

    const projects = await prisma.project.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('GET /api/projects error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const admin = await getAdminFromToken()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, shortDescription, fullDescription, technologies, image, githubUrl, liveUrl, category, featured } = body

    if (!title || !slug || !shortDescription) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        shortDescription,
        fullDescription: fullDescription || '',
        technologies: technologies || [],
        image: image || null,
        githubUrl: githubUrl || null,
        liveUrl: liveUrl || null,
        category: category || 'web',
        featured: featured || false,
      },
    })

    revalidatePath('/')

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
    console.error('POST /api/projects error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
