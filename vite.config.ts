import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // base: '/RepoName',
  server: {
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    port: 3000,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/conferencesimgs":{
        target: "http://localhost:9000/conferencesimgs",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/conferencesimgs/, ""),
      }
    }
  },
  plugins: [react(), mkcert()]
})