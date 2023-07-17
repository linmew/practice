import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

export default defineConfig({
  base: './',
  plugins: [
    createVuePlugin(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    port: 8090,
    proxy: {
      '/tools': {
        target: 'https://paimons.cn',
        ws: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tools/, '')
      }
    }
  },
  // 解决@符号指定src文件
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // build构建去除注释、debugger、console
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console
        drop_debugger: true, // 移除 debugger
        pure_funcs: ['console.log'] // 移除 console.log
      },
      output: {
        comments: false // 移除注释
      }
    }
  }
})