#!/usr/bin/env node
// Push selected environment variables from local .env to Vercel using Vercel CLI.
// Usage:
// 1. Install Vercel CLI: `npm i -g vercel` or use `npx vercel` when prompted.
// 2. Log in: `npx vercel login`
// 3. Link the project to Vercel: `npx vercel link` (choose the right project)
// 4. Run this script: `node scripts/push-env-to-vercel.js`

const { spawnSync } = require('child_process');
require('dotenv').config();

const vars = [
  'DATABASE_URL',
  'AUTH_SECRET',
  'AUTH_URL',
  'NEXTAUTH_URL',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SITE_NAME',
  'NEXT_PUBLIC_EMAIL',
  'NEXT_PUBLIC_PHONE',
  'NEXT_PUBLIC_WHATSAPP',
  'NEXT_PUBLIC_API_URL',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
  'ADMIN_NAME',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

function addVar(name, value, target) {
  // Use npx vercel env add <name> <value> <environment>
  console.log(`Setting ${name} => ${target}`);
  const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const args = ['vercel', 'env', 'add', name, value, target];
  const res = spawnSync(cmd, args, { stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(`Failed to set ${name} for ${target}`);
  }
}

for (const name of vars) {
  const value = process.env[name];
  if (!value) {
    console.log(`Skipping ${name}: not found in local .env`);
    continue;
  }

  // Add to production and preview
  addVar(name, value, 'production');
  addVar(name, value, 'preview');
}

console.log('Done. Verify in Vercel dashboard.');
