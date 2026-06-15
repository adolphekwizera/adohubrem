export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Adolphe Kwizera",
  shortName: "Ado",
  title: "Full-Stack Developer | IT Specialist | Designer",
  description:
    "I'm Ado, a Computer Science student and freelancer building websites, designing graphics, and providing IT solutions for real-world problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_EMAIL || "adolphekwizera@gmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE || "0782866526",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "250782866526",
  tagline:
    "Building websites, designing graphics, and solving IT problems for real clients.",
} as const;

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/adolphekwizera",
    icon: "github",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ado_.e",
    icon: "instagram",
  },
] as const;

export const IMAGES = {
  hero: "/images/hero.webp",
  about: "/images/IMG_0334.JPEG",
  featuredBg: "/images/featured-bg.webp",
  blogFallback: "/images/blog-fallback.webp",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const PROJECT_CATEGORIES = [
  { value: "web", label: "Web Apps" },
  { value: "api", label: "APIs" },
  { value: "design", label: "Design Projects" },
  { value: "other", label: "Other Tools" },
] as const;

export const BLOG_CATEGORIES = [
  "Programming",
  "Tech Learning",
  "Freelancing",
  "IT Solutions",
  "Design",
] as const;

export function getWhatsAppLink(message?: string) {
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent(
        `Hi Ado! I found your website and I'd like to discuss a project.`
      );
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseTags(tags: string): string[] {
  try {
    const parsed = JSON.parse(tags);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return tags ? tags.split(",").map((t) => t.trim()) : [];
  }
}

export function stringifyTags(tags: string[]): string {
  return JSON.stringify(tags);
}

export function parseTechStack(stack: string): string[] {
  return parseTags(stack);
}
