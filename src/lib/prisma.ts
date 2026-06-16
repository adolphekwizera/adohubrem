import { PrismaClient } from "@/generated/prisma/client";
import { createMariaDbAdapterFromUrl } from "@/lib/create-mariadb-adapter";

function createAdapter() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is required");
  }

  return createMariaDbAdapterFromUrl(url);
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter: createAdapter() });

globalForPrisma.prisma = prisma;
