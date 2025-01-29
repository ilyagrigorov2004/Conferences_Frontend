import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: '/RepoName',
  server: {
    port: 3000,
    host: '0.0.0.0',
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
  plugins: [react()],
})