import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/curriculumwebsite/' : '/',
    build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Use esbuild instead of terser (faster and no extra dependency needed)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['react-slick', '@heroicons/react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-slick']
  }
})