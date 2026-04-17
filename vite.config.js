import { defineConfig } from "vite";
import { resolve } from "path";
import { readdirSync } from "fs";

// Auto-detect all HTML files at the root for multi-page build
const htmlFiles = readdirSync(__dirname).filter((f) => f.endsWith(".html"));
const input = Object.fromEntries(
  htmlFiles.map((f) => [f.replace(/\.html$/, ""), resolve(__dirname, f)])
);

export default defineConfig({
  server: { host: "::", port: 8080 },
  build: { rollupOptions: { input } },
});
