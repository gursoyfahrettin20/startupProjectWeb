import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    return {
      plugins: [react()],
      server: {
        port: 3434,
        open:true,
        host: "localhost",
      },
      define:{
        "process.env.VITE_REACT_APP_REST_SERVICE_URL":JSON.stringify(mode)
      }
    }
})