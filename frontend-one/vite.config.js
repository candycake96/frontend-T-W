import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.16.111:3333',  // URL ของ backend
        changeOrigin: true, // เพื่อให้แทนที่ Host header เป็นที่ของ backend
       
      },
    },
  },
});
