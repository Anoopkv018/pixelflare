// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // 👇 add this block
  server: {
    host: true,         // allow LAN / mobile testing (optional)
    port: 5173,         // your Vite port
    proxy: {
      // forward any /api/* to the Vercel dev server
      '/api': {
        target: 'http://localhost:3000', // vercel dev
        changeOrigin: true,
        secure: false,
      },
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
