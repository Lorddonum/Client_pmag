import { build } from "esbuild";

console.log("🔨 Building server...");

await build({
    entryPoints: ["server/index.ts"],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
    outfile: "dist/server.js",
    sourcemap: true,
    external: [
        // Core framework
        "express",
        "compression",
        // Database
        "pg",
        "drizzle-orm",
        // Auth
        "passport",
        "passport-local",
        "express-session",
        "memorystore",
        // WebSockets
        "ws",
        // Native addons / build tools (must always be external)
        "sharp",
        "bufferutil",
        "lightningcss",
        "@tailwindcss/oxide",
        "@babel/core",
    ],
});

console.log("✅ Server built successfully!");
