import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: 'build',
      sourcemap: true
    },
    plugins: [
      react(),
    VitePWA({
      inje
    })
    ],
    server: {
      port: 3434,
      open: true,
      host: "localhost",
    },
    define: {
      "process.env.VITE_REACT_APP_REST_SERVICE_URL": JSON.stringify(mode)
    }
  }
})