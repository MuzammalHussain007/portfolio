import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@/generated/prisma'

// HTTP fetch mode — works on Vercel without the `ws` native module
neonConfig.poolQueryViaFetch = true

const globalForPrisma = globalThis

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool)

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error'] : [],
  })
}

function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient()
  }
  return globalForPrisma.prisma
}

// Lazy init — avoids connecting during Next.js build when routes are analyzed
export const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      if (prop === 'then') return undefined
      const client = getPrismaClient()
      const value = client[prop]
      return typeof value === 'function' ? value.bind(client) : value
    },
  }
)
