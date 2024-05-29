/*
 * @Author: panrunjun
 * @Date: 2024-05-23 09:53:05
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-05-29 15:37:21
 * @Description: 配置发布vite包
 * @FilePath: \reactProjects\react-waterfall\vite.config.ts
 */
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'  //ts声明插件
export default defineConfig({
  build: {
    lib: {
      // 
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'react-waterfall-plugin',
      // 添加拓展名
      fileName: 'react-waterfall-plugin'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          WaterFall: 'WaterFall',
        },
      },
    },
  },
  plugins: [dts()],
})

