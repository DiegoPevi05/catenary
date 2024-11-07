// app/utils/db.server.ts

import { PrismaClient } from "@prisma/client";

// Declare a global type for Prisma to avoid multiple client instances in development
declare global {
  var __db: PrismaClient | undefined;
}

// Initialize Prisma Client
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  prisma = global.__db;
}

export { prisma };
