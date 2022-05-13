import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // 引入@ant-design/pro-layout报错解决方式
    // 一、向 Less Preprocessor 添加额外的配置：
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    // 二、设置模块别名修复Less@import问题
    alias: [
      { find: /^~/, replacement: "" },
    ],
  },
  //打包配置
  build: {
    //浏览器兼容性  "esnext"|"modules"
    // target: "modules",
    // //指定输出路径
    // outDir: "dist",
    // //生成静态资源的存放路径
    // assetsDir: "assets",
    // //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    // assetsInlineLimit: 4096,
    // //启用/禁用 CSS 代码拆分
    // cssCodeSplit: true,
    //构建后是否生成 source map 文件
    sourcemap: true,
  }
})
