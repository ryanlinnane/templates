import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: '../server/public',
  build: {
    outDir: '../server/public/dist',
  },
})
