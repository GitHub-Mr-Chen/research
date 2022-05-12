import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import visualizer from 'rollup-plugin-visualizer'

const plugins = []

// 打包生产环境才引入的插件
if (process.env.NODE_ENV === 'production') {
  // 打包依赖展示
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  )
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ...plugins],
  server: {
    port: 7000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
