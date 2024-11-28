import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: '../server/public',
  // build: {
  //   rollupOptions: {
  //     input: '../index.html', // Explicitly point to your entry HTML file
  //   },
  // },
  // optimizeDeps: {
  //   include: ['react', 'react-dom'], // Example: add dependencies explicitly
  // },
})
