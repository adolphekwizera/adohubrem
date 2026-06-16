import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { createMariaDbAdapterFromUrl } from "../src/lib/create-mariadb-adapter";

function createPrisma() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required for seeding");

  return new PrismaClient({ adapter: createMariaDbAdapterFromUrl(url) });
}

const prisma = createPrisma();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@adokwizera.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const name = process.env.ADMIN_NAME || "Adolphe Kwizera";

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, password: hashedPassword, name, role: "admin" },
  });

  // Delete specific post if it exists
  await prisma.blogPost.deleteMany({
    where: {
      slug: "building-restful-apis-nodejs",
    },
  });

  const projects = [
    {
      title: "Business Portfolio Website",
      slug: "business-portfolio-website",
      description:
        "A modern portfolio website for a local business with contact forms, service pages, and mobile-responsive design.",
      techStack: JSON.stringify(["Next.js", "Tailwind CSS", "TypeScript"]),
      category: "web",
      githubUrl: "https://github.com/adokwizera",
      liveUrl: "https://example.com",
      featured: true,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    },
    {
      title: "Inventory Management API",
      slug: "inventory-management-api",
      description:
        "REST API for a small shop to track products, stock levels, and sales with authentication and reporting.",
      techStack: JSON.stringify(["Node.js", "Express", "MySQL", "Prisma"]),
      category: "api",
      githubUrl: "https://github.com/adokwizera",
      featured: true,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    },
    {
      title: "Wedding Invitation Design",
      slug: "wedding-invitation-design",
      description:
        "Elegant wedding invitation card design with custom typography, floral elements, and print-ready files.",
      techStack: JSON.stringify(["Photoshop", "Canva"]),
      category: "design",
      featured: false,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    },
    {
      title: "CV Builder Tool",
      slug: "cv-builder-tool",
      description:
        "Simple web tool that helps job seekers create professional CVs with multiple templates and PDF export.",
      techStack: JSON.stringify(["React", "JavaScript", "CSS"]),
      category: "other",
      githubUrl: "https://github.com/adokwizera",
      featured: false,
      image: "https://images.unsplash.com/photo-1586281081801-3e0abb9d9c12?w=1200&q=80",
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  const posts = [
    {
      title: "Getting Started with Next.js App Router",
      slug: "getting-started-nextjs-app-router",
      excerpt:
        "A beginner-friendly guide to building modern web apps with Next.js App Router, covering routing, layouts, and server components.",
      category: "Programming",
      tags: JSON.stringify(["Next.js", "React", "Tutorial"]),
      views: 42,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
      content: `## Why Next.js?

Next.js is one of the most popular frameworks for building React applications. With the App Router, you get powerful features like server components, layouts, and built-in API routes.

## Setting Up Your Project

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --app
\`\`\`

## Key Concepts

- **App Router**: File-based routing in the \`app/\` directory
- **Server Components**: Components that render on the server by default
- **Layouts**: Shared UI that wraps multiple pages

## Conclusion

Start small, build one feature at a time, and you'll be shipping production apps in no time.`,
    },
    {
      title: "My Freelancing Journey as a Student",
      slug: "freelancing-journey-student",
      excerpt:
        "How I started freelancing while studying Computer Science — from fixing laptops to building websites for real clients.",
      category: "Freelancing",
      tags: JSON.stringify(["Freelancing", "Career", "Student Life"]),
      views: 87,
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
      content: `## How It Started

It began with friends asking me to fix their computers and design posters for events. Word spread, and soon I was getting paid for work.

## Lessons Learned

1. **Start with what you know** — IT support and design were my entry points
2. **Deliver on time** — reliability builds trust faster than skill alone
3. **Keep learning** — every project pushes you to learn something new

## Advice for Student Freelancers

Don't wait until you feel "ready." Take small projects, do them well, and grow from there.`,
    },
    {
      title: "Fixing Slow Windows PCs: A Practical Guide",
      slug: "fixing-slow-windows-pcs",
      excerpt:
        "Common causes of slow Windows computers and step-by-step solutions I use when helping clients.",
      category: "IT Solutions",
      tags: JSON.stringify(["Windows", "IT Support", "Troubleshooting"]),
      views: 156,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
      content: `## Common Causes

- Too many startup programs
- Low disk space
- Outdated drivers
- Malware or bloatware

## Quick Fixes

### 1. Disable Startup Programs
Open Task Manager → Startup tab → Disable unnecessary apps.

### 2. Free Up Disk Space
Use Disk Cleanup and remove temporary files.

### 3. Update Windows
Always install the latest Windows updates.

## When to Reinstall

If the PC is still slow after cleanup, a fresh Windows installation often solves deep-rooted issues.`,
    },
    {
      title: "Designing Accessible UI",
      slug: "designing-accessible-ui",
      excerpt:
        "Practical tips for building accessible user interfaces that work for everyone.",
      category: "Design",
      tags: JSON.stringify(["Accessibility", "Design", "UX"]),
      views: 64,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
      content: `## Accessibility Matters

Making your UI accessible ensures more people can use your product. Start with semantic HTML, sufficient color contrast, and keyboard navigation.
`,
    },
    {
      title: "Deploying Next.js to Vercel",
      slug: "deploying-nextjs-vercel",
      excerpt: "A quick guide to deploy your Next.js app to Vercel with CI and environment variables.",
      category: "DevOps",
      tags: JSON.stringify(["Next.js", "Vercel", "Deployment"]),
      views: 39,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
      content: `## Deploying to Vercel

Push your repo to GitHub and connect the repo in Vercel. Set environment variables in the Vercel dashboard and trigger a deployment.
`,
    },
    {
      title: "Effective Git Workflows",
      slug: "effective-git-workflows",
      excerpt: "Branching strategies and best practices to keep your team productive with Git.",
      category: "Programming",
      tags: JSON.stringify(["Git", "Workflow", "Collaboration"]),
      views: 28,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      content: `## Git Best Practices

Use feature branches, write clear commit messages, and open pull requests for code review. Keep the main branch deployable.
`,
    },
    {
      title: "10 Web Development Tools That Boost Productivity",
      slug: "web-dev-tools-productivity",
      excerpt:
        "Essential tools and software that every web developer should know about to increase efficiency and code quality.",
      category: "Programming",
      tags: JSON.stringify(["Tools", "Productivity", "Development"]),
      views: 91,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
      content: `## Must-Have Development Tools

### Code Editors
- **VS Code** — Lightweight, powerful, and highly customizable
- **WebStorm** — Full-featured IDE with excellent debugging

### Version Control
- **Git** — Essential for any project
- **GitHub/GitLab** — Collaboration and repository hosting

### API Testing
- **Postman** — Test and document APIs easily
- **Insomnia** — Lightweight alternative to Postman

### Performance Monitoring
- **Chrome DevTools** — Browser's built-in development tools
- **Lighthouse** — Audit tool for performance and accessibility

### Database Management
- **DBeaver** — Universal database tool
- **MongoDB Compass** — GUI for MongoDB

### Browser Extensions
- **React Developer Tools** — Debug React applications
- **JSON Formatter** — Pretty print JSON responses

## Why These Tools Matter

Using the right tools saves hours of debugging and manual work. Invest time in learning them well.

## Final Thoughts

Start with the tools that match your current workflow, then gradually expand as your needs grow.`,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log("Seed completed successfully!");
  console.log(`Admin login: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
