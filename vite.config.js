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
            '/api': {
                target: 'http://localhost:5555',
                changeOrigin: true,
                secure: false,
            },
            '/assets': {
                target: 'http://localhost:5555',
                changeOrigin: true,
                secure: false,
            },
        },
        port: 3434,
        open: true,
        host: "localhost",
    },
    preview: {
        port: 3401,
        open: true,
        host: "localhost"
    }
})