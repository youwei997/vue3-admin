import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const path = require('path')
import path from "path"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    // alias: [
    //     { find: '@', replacement: resolve(__dirname, 'src') }
    // ],
    alias:{
      "@/": path.resolve(__dirname, "src"),
    }
  },
   server: {
     open: false,
     host:'localhost',
     port:8080,
     proxy:{
       "/api":{
         target:"http://localhost:3000"
       }
     }
   }
})
