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
  const replacement = "/images/IMG_0334.JPEG";

  const posts = await prisma.blogPost.findMany();
  for (const p of posts) {
    if (p.image && p.image.includes("images.unsplash.com")) {
      console.log(`Updating post ${p.slug} -> ${replacement}`);
      await prisma.blogPost.update({ where: { id: p.id }, data: { image: replacement } });
    }
  }

  console.log("Done updating blog post images.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
