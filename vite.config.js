// vite.config.js
import path from "path"
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
 
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@api": path.resolve(__dirname, "src/api"),
      "@common": path.resolve(__dirname, "src/common"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@routers": path.resolve(__dirname, "src/routers"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  plugins: [vue()],
});