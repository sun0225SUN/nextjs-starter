import { PrismaClient } from '@prisma/client'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { headers } from 'next/headers'

const prisma = new PrismaClient()

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    verifyEmail: false,
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
})

export async function getServerSession() {
  return await auth.api.getSession({
    headers: await headers(),
  })
}
