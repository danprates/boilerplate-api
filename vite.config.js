import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true
  },
  resolve: {
    alias: {
      '@/tests': path.resolve(__dirname, 'tests'),
      '@': path.resolve(__dirname, 'src')
    }
  }
})
