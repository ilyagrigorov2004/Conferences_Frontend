import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {api_proxy_addr, img_proxy_addr} from './target-config'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: api_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/conferencesimgs":{
        target: img_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/conferencesimgs/, ""),
      }
    }
  },
  plugins: [react()],
})