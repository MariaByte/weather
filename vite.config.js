import { fileURLToPath, URL } from 'node:url'
import envCompatible from 'vite-plugin-env-compatible'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/weather",
  envPrefix: "VUE_APP_",
  plugins: [
    vue(),
    envCompatible(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
