import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const require = createRequire(import.meta.url)
globalThis.require = require

const vitePrerender = require('vite-plugin-prerender')
const PuppeteerRenderer = vitePrerender.PuppeteerRenderer

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isVercel = !!process.env.VERCEL

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    !isVercel && vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
      renderer: new PuppeteerRenderer({
        ...(fs.existsSync('/usr/bin/google-chrome') ? { executablePath: '/usr/bin/google-chrome' } : {}),
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })
    })
  ].filter(Boolean),
})
