// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  publicDir: 'public',
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html',
    },
  },
  css: {
    postcss: './postcss.config.cjs',
  },
  server: {
    proxy: {
      '/ask': {
        target: 'https://cplusplus-chatbot-backend.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});