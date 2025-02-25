// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the output directory is set correctly
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