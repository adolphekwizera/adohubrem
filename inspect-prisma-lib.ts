import "dotenv/config";
import { prisma } from "./src/lib/prisma";

async function main() {
  try {
    console.log("DATABASE_URL=", process.env.DATABASE_URL);
    await prisma.$connect();
    console.log("connected");
    const projectCount = await prisma.project.count();
    console.log("projectCount=", projectCount);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
