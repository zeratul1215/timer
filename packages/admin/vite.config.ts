import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: true,
      port: 3600
    },
    resolve: {
      alias: {
        '@link/admin': resolve(__dirname, 'src')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { version: '2023-05' }]
          ]
        }
      }),
      svgr()
    ],
    build: {
      sourcemap: mode === 'production' ? 'hidden' : true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router'],
            'vendor-i18n': ['i18next', 'react-i18next']
          }
        }
      }
    }
  };
});
