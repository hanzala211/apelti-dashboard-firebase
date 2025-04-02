import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@firebaseApp': path.resolve(__dirname, './src/firebase.ts'),
      '@components': path.resolve(__dirname, './src/components/components.ts'),
      '@constants': path.resolve(__dirname, './src/constants/constants.ts'),
      '@pages': path.resolve(__dirname, './src/pages/pages.ts'),
      '@types': path.resolve(__dirname, 'src/types/types.ts'),
      '@context': path.resolve(__dirname, 'src/context/context.ts'),
      '@layouts': path.resolve(__dirname, 'src/layouts/layouts.ts'),
      '@services': path.resolve(__dirname, 'src/services/services.ts'),
      '@helpers': path.resolve(__dirname, 'src/helpers/helpers.ts'),
      '@hooks': path.resolve(__dirname, 'src/hooks/hooks.ts'),
    }
  }
})
