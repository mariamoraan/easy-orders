import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  workbox: {
    maximumFileSizeToCacheInBytes: 3 * 1024 ** 2,
  },
  manifest: {
    name: 'Easy Orders',
    short_name: 'Easy Orders',
    description: 'An easy app to manage your orders',

    icons: [
      {
        src: '/delivery-truck.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/delivery-truck.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/delivery-truck.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/delivery-truck.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
