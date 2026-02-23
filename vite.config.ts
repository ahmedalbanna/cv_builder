import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['3000-01kg5scn46xk1e7bgynxz1vghf.cloudspaces.litng.ai']
  }
})
