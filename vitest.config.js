/// <reference types="vitest/globals" />
 
import { defineConfig } from 'vitest/config';
 
export default defineConfig({
  test: {
    environment: 'jsdom', // テスト環境をjsdomに設定
    globals: true, // Jestのように`test`や`expect`がグローバルに使えるようにする
  },
});