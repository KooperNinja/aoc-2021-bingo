import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/dist/',
  build: {
    rollupOptions: {
      output: {
          manualChunks: () => "everything.js",
          entryFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
      }
    },
    minify: false
  }
})
