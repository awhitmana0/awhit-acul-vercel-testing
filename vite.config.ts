import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

// Dynamically discover screen directories (kept as is)
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
        // Point to the main entry file that renders your App component.
        // This will be the primary bundle output as 'index.js'.
        main: resolve(__dirname, "src/main.tsx"),
      },
      output: {
        // Set the format to UMD for compatibility with direct script tag loading
        format: 'umd',
        // A global variable name your bundle will expose (can be anything, e.g., 'Auth0CustomLoginBundle')
        name: 'Auth0CustomLoginBundle',
        
        // Ensure the main JavaScript bundle is named 'index.js'
        entryFileNames: 'index.js',
        // Place other code-split chunks in a 'chunks' subfolder without hashes
        chunkFileNames: 'chunks/[name].js',
        // Place assets (like CSS) in an 'assets' subfolder without hashes
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    minify: true,
    emptyOutDir: true,
    cssCodeSplit: false, // Keep CSS in a single file
    sourcemap: true, // Keep sourcemaps for debugging if needed, remove for smaller production size
  },
  logLevel: "info",
});
