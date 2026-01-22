import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pqc-ai-survey/',
  build: {
    outDir: 'docs',
  },
})
