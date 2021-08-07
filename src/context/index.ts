import { PrismaClient } from '@prisma/client';
import { User } from '../graphql'

export interface Context {
  db:PrismaClient
  user: User
}
