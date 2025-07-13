import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Explicitly set the root to the current directory and publicDir to 'public'
  root: './',
  publicDir: 'public',
  // Configure the base path for deployment if needed, e.g., if hosted under a sub-path
  // For Vercel, the default '/' is usually fine.
  // base: '/your-sub-path/',
  build: {
    // Output directory for the build artifacts
    outDir: 'dist',
    // Ensure that the output files are named consistently for Auth0 to consume
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});
