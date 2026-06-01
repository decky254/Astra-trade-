import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standard config for React + Tailwind v3 layouts
export default defineConfig({
  plugins: [react()],
})
