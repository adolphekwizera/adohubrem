# Adolphe Kwizera — Portfolio, Blog & Services

A production-ready personal website for **Adolphe Kwizera (Ado)** — combining a developer portfolio, blogging platform, freelance services page, and admin CMS.

Built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and **MySQL**.

## Features

- **Home** — Hero, featured projects, latest blog posts, services preview, contact CTA
- **About** — Personal story, skills, goals, download CV
- **Projects** — Filterable portfolio (Web Apps, APIs, Design, Other)
- **Blog** — Markdown posts, categories, tags, search, view counter, related posts
- **Services** — Real-world freelance services with WhatsApp CTAs
- **Contact** — Form with validation, WhatsApp, email, social links
- **Admin Dashboard** — Protected CMS for posts, projects, and messages
- **Dark/Light mode** — Theme toggle with Framer Motion animations
- **SEO optimized** — Metadata, Open Graph, dynamic routes

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | MySQL + Prisma ORM |
| Auth | NextAuth.js v5 (Credentials) |
| Animations | Framer Motion |
| Images | Cloudinary (optional) |
| Deployment | Vercel |

## Quick Start

### 1. Clone & Install

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Required:**
- `DATABASE_URL` — MySQL connection string
- `AUTH_SECRET` — Random 32+ char secret (`openssl rand -base64 32`)
- `AUTH_URL` — `http://localhost:3000` (or your production URL)

### 3. Database Setup

Create a MySQL database (recommended: [Railway](https://railway.app)) and run:

```bash
npm run db:push
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Admin panel:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default credentials (from seed):
- Email: `admin@adokwizera.com`
- Password: `admin123` (change via `ADMIN_PASSWORD` in `.env`)

## Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables from `.env.example`
4. Set `AUTH_URL` to your production domain (e.g. `https://yourdomain.vercel.app`)
5. Deploy — Vercel runs `prisma generate` automatically via `postinstall`

### MySQL on Railway

1. Create a new project on Railway
2. Add a **MySQL** service
3. Copy the `DATABASE_URL` from Railway variables
4. Paste it into Vercel environment variables

## Project Structure

```
src/
├── app/
│   ├── (site)/          # Public pages
│   │   ├── page.tsx     # Home
│   │   ├── about/
│   │   ├── projects/
│   │   ├── blog/
│   │   ├── services/
│   │   └── contact/
│   ├── admin/           # Admin panel
│   │   ├── login/
│   │   └── (dashboard)/
│   └── api/             # API routes
├── components/
├── lib/
└── auth.ts
prisma/
├── schema.prisma
└── seed.ts
```

## Contact

**Adolphe Kwizera**
- Phone: 0782866526
- WhatsApp: [Message Ado](https://wa.me/250782866526)

---

Built by Ado · Computer Science Student · Full-Stack Developer · IT Specialist · Designer
