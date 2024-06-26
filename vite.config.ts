/// <reference types="vitest" />
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bitmap_editor/',
  plugins: [react()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, './node_modules/bootstrap'),
      '~bootstrap-icons': path.resolve(__dirname, './node_modules/bootstrap-icons'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    watch: false,
  }
});
