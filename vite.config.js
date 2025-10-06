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
        manualChunks: (id) => {
          // Vendor chunk for core React libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            // Redux chunk
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'redux';
            }
            // Charts chunk (lazy loaded)
            if (id.includes('recharts')) {
              return 'charts';
            }
            // Other vendor libraries
            return 'libs';
          }
          // App chunks
          if (id.includes('/components/')) {
            // Separate chunk for dashboard components (heavy)
            if (id.includes('Dashboard') || id.includes('Chart')) {
              return 'dashboard';
            }
            // Mobile/tablet specific components
            if (id.includes('Mobile') || id.includes('Tablet')) {
              return 'responsive';
            }
            // Form components
            if (id.includes('Form')) {
              return 'forms';
            }
          }
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
    include: ['react', 'react-dom', '@reduxjs/toolkit', 'react-redux'],
    exclude: ['recharts'] // Lazy load charts
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