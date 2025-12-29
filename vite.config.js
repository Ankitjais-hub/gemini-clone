import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // ensure built assets use relative paths so the site works on GitHub Pages
  plugins: [react()],
})
