import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Ensure @types/node is installed for this
import { fileURLToPath } from 'url'; // Import fileURLToPath from 'url' module

// Get the directory name of the current module file (vite.config.ts)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Specify the output directory for the build
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Customize the asset filenames for consistent URLs
        assetFileNames: 'assets/[name].[ext]',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-chunk.js',
      },
    },
  },
});