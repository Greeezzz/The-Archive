import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignore the characters folder so copying PNGs doesn't crash the server
      ignored: ['**/public/characters/**'],
    },
  },
})
