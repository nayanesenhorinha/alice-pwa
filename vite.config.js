import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Meu PWA',
        short_name: 'PWA',
        description: 'Meu Progressive Web App com React e Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true, // Ativa o PWA no ambiente de desenvolvimento
        type: 'module',
        navigateFallback: 'index.html',
      },
    }),
  ],
  server: {
    host: 'localhost',
    port: 5173, // Defina a porta correta do seu projeto
  },
});
