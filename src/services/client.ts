import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient() // Only one instance of PrismaClient is allowed
