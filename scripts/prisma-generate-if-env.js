#!/usr/bin/env node
const { spawnSync } = require("child_process");

if (!process.env.DATABASE_URL) {
  console.log("Skipping Prisma generate because DATABASE_URL is not set.");
  process.exit(0);
}

console.log("DATABASE_URL detected. Running prisma generate...");
const command = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(command, ["prisma", "generate"], {
  stdio: "inherit",
});

process.exit(result.status || 1);
