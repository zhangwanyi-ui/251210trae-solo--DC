import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          antd: ['antd'],
          'react-router': ['react-router-dom'],
          redux: ['redux', '@reduxjs/toolkit'],
          axios: ['axios'],
          echarts: ['echarts'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '~antd': 'antd',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': '#1890ff',
          '@layout-header-background': '#001529',
          '@menu-dark-bg': '#001529',
          '@border-radius-base': '4px',
        },
      },
    },
  },
});