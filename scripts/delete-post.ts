import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

function createPrisma() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");

  const parsed = new URL(url);
  const adapter = new PrismaMariaDb({
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ""),
    connectionLimit: 5,
  });

  return new PrismaClient({ adapter });
}

const prisma = createPrisma();

async function main() {
  const slug = "getting-started-nextjs-app-router";
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) {
    console.log(`Post with slug '${slug}' not found.`);
    return;
  }

  await prisma.blogPost.delete({ where: { id: post.id } });
  console.log(`Deleted post '${slug}' (id: ${post.id}).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
