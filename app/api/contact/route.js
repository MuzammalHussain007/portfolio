import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const contact = await prisma.contact.create({
      data: { name, email, subject, message },
    })

    return NextResponse.json({ success: true, contact }, { status: 201 })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

export async function GET(request) {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ contacts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}
