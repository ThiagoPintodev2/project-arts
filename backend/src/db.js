import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../generated/prisma/client.js'

const databaseUrl = (process.env.DATABASE_URL ?? "").replace(
  /@localhost(?=[:/])/g,
  "@127.0.0.1"
);

const adapter = new PrismaMariaDb(databaseUrl);

export const prisma = new PrismaClient({
  adapter
});
