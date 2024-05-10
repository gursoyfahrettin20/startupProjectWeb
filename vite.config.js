import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath, URL} from "node:url"

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist',
        sourcemap: true
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/api/.*': 'http://localhost:5555',
            '^/assets/.*': 'http://localhost:5555/'
        },
        port: 3434,
        open: true,
        host: "localhost",
    },
    review: {
        port: 3401,
        open: true,
        host: "localhost"
    }
})