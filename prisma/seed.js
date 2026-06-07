const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create admin
  const email = process.env.ADMIN_EMAIL || 'admin@muzammal.dev'
  const password = process.env.ADMIN_PASSWORD || 'Admin@123456'
  const hashedPassword = await bcrypt.hash(password, 12)

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, password: hashedPassword },
  })
  console.log('✅ Admin created:', admin.email)

  // Create sample projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      shortDescription: 'Full-featured e-commerce with MERN stack, real-time inventory, and payment integration.',
      fullDescription: 'A comprehensive e-commerce solution built with the MERN stack featuring product management, shopping cart, Stripe payment integration, order tracking, and a powerful admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Tailwind CSS'],
      githubUrl: 'https://github.com/muzammalhussain/ecommerce',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      category: 'web',
      featured: true,
    },
    {
      title: 'Task Management App',
      slug: 'task-management-app',
      shortDescription: 'Real-time collaborative task management with Socket.IO and drag-and-drop boards.',
      fullDescription: 'A collaborative project management tool featuring real-time updates, Kanban boards, team workspaces, and comprehensive analytics.',
      technologies: ['Next.js', 'Socket.IO', 'PostgreSQL', 'Prisma', 'Framer Motion'],
      githubUrl: 'https://github.com/muzammalhussain/taskmanager',
      liveUrl: 'https://taskmanager-demo.vercel.app',
      category: 'web',
      featured: true,
    },
    {
      title: 'Flutter Food Delivery',
      slug: 'flutter-food-delivery',
      shortDescription: 'Cross-platform food delivery app with real-time tracking and push notifications.',
      fullDescription: 'A fully-featured food delivery mobile application with real-time GPS tracking, Firebase push notifications, and Stripe payment integration.',
      technologies: ['Flutter', 'Firebase', 'Node.js', 'Google Maps API'],
      githubUrl: 'https://github.com/muzammalhussain/food-delivery',
      category: 'mobile',
      featured: false,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    })
    console.log('✅ Project created:', project.title)
  }

  // Sample testimonials
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder',
      company: 'TechLaunch Inc.',
      message: 'Muzammal delivered an exceptional MERN stack application that exceeded expectations. His code quality and communication were outstanding throughout.',
      rating: 5,
    },
    {
      name: 'Ahmed Al-Hassan',
      role: 'CTO',
      company: 'DigitalWave',
      message: 'Working with Muzammal was excellent. He built our Flutter app from scratch handling complex integrations and delivered on time.',
      rating: 5,
    },
    {
      name: 'Emma Thompson',
      role: 'Product Manager',
      company: 'StartupBase',
      message: 'The admin dashboard Muzammal built is clean, fast, and exactly what we needed. He understood requirements perfectly.',
      rating: 5,
    },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
    console.log('✅ Testimonial created:', t.name)
  }

  console.log('\n🎉 Database seeded successfully!')
  console.log(`Admin login: ${email} / ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
