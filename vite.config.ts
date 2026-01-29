import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
    allowedHosts: [
      'portfolio-joaq.onrender.com',
      '.onrender.com',
      'localhost',
    ],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
