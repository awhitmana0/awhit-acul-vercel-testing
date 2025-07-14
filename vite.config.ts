import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

// Dynamically discover screen directories (keep this as is)
const screensDir = resolve(__dirname, "src/screens");
const screenEntries: Record<string, string> = {};

if (fs.existsSync(screensDir)) {
  const screenDirs = fs
    .readdirSync(screensDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  screenDirs.forEach((screen) => {
    const entryFile = resolve(screensDir, screen, "index.tsx");
    if (fs.existsSync(entryFile)) {
      screenEntries[screen] = entryFile;
    }
  });
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
  clearScreen: false,
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      input: {
        // We'll target a single main entry point for simplicity as per docs "index.js"
        // This might need adjustment based on your 'screens' dynamic setup.
        // For now, let's assume 'main' is your primary entry, and other screens are imported by it.
        main: resolve(__dirname, "src/main.tsx"), // Point directly to main.tsx
      },
      output: {
        // Set the format to UMD or IIFE
        // UMD is generally more flexible, IIFE is simpler if no external global dependencies.
        // Let's try 'umd' first as it's common for bundles loaded directly.
        format: 'umd',
        name: 'Auth0CustomLoginBundle', // A global variable name your bundle will expose (can be anything)
        
        // Ensure filenames are static (no hashes) as you requested and docs imply
        entryFileNames: 'index.js', // Output main.js as index.js
        chunkFileNames: 'chunks/[name].js', // Put other chunks in a 'chunks' subfolder
        assetFileNames: 'assets/[name].[ext]', // For CSS and other assets
        
        // If your code relies on global variables (like React being available as 'window.React'),
        // you might need a 'globals' map here, but often 'umd' handles common cases.
      },
    },
    minify: true,
    emptyOutDir: true,
    // cssCodeSplit: false, // Keep CSS in a single file - already configured
    // sourcemap: true, // Keep sourcemaps if desired for debugging, but remove for production
    cssCodeSplit: false, // Ensure all CSS is bundled into one file as style.css
  },
  logLevel: "info",
});