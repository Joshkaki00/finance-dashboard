import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/finance-dashboard/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // Performance optimizations
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Optimize for GitHub Pages with better caching
    rollupOptions: {
      output: {
        // Improved manual chunking for better caching and loading
        manualChunks: {
          // Core React libraries
          vendor: ['react', 'react-dom'],
          // Redux state management
          redux: ['@reduxjs/toolkit', 'react-redux'],
          // Charts library - keep as separate chunk but don't lazy load
          charts: ['recharts']
        },
        // Better file naming for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux', 'recharts'],
    // Don't exclude recharts to avoid import issues
  },
  // GitHub Pages compatibility
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
})