/// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Reactコンポーネントのテストに必要
    globals: true, // `describe` や `test` を使うためにグローバル設定
  },
});
