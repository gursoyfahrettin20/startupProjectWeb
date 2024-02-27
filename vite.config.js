import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import {fileURLToPath, URL} from "node:url"
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    plugins: [
      react(),
      VitePWA({
        injectRegister: false,
        filename: 'index.tsx',
        srcDir: 'src',
        devOptions: {
          enabled: true,
          type: 'module'
        }
      })
    ],
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./dist"),
        "@":fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      port: 3434,
      open: false,
      host: "localhost",
    },
    review: {
      port: 3401,
      open: true,
      host: "localhost"
    },
    define: {
      "process.env.VITE_REACT_APP_REST_SERVICE_URL": JSON.stringify(mode)
    }
  }
})