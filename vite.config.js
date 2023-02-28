import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3000;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], //react()
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: `http://localhost:${PORT}`,
  //       changeOrigin: true,
  //     },
  //   },
  //   // open: './server/server.js'
  // },
  build: {
    // outDir: path.join(__dirname, '../dist'),
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/src/main.jsx',
    },
  }
})
