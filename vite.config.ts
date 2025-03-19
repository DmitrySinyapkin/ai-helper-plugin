import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500,
    outDir: 'dist',
    assetsDir: '.',
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        background: resolve(__dirname, 'src', 'background.ts'),
        content: resolve(__dirname, 'src', 'content.ts'),
      },
      output: {
        inlineDynamicImports: false,
        format: 'es',
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      }
    },
  },
  publicDir: 'public',
})
