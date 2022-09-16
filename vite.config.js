import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    reporters: 'vitest-sonar-reporter',
    outputFile: 'test-report.xml',
    coverage: {
      reporter: ['json', 'lcov', 'text', 'text-summary'],
      include: ['src/domain/**/*']
    }
  },
  resolve: {
    alias: {
      '@/tests': path.resolve(__dirname, 'tests'),
      '@': path.resolve(__dirname, 'src')
    }
  }
})
