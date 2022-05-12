import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [vue()],
  esbuild: {
    // loader: "'.js': 'jsx'",
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h } from 'vue';",
  },
  resolve: {
    alias: [
      {
        find: /\@\//,
        replacement: pathResolve('src') + '/',
      },
      {
        find: /\_v\//,
        replacement: pathResolve('src/views') + '/',
      },
      {
        find: /\_c\//,
        replacement: pathResolve('src/components') + '/',
      },
      {
        find: /\_u\//,
        replacement: pathResolve('src/utils') + '/',
      },
    ],
  },
  build: {
    sourcemap: true,
  },
})
