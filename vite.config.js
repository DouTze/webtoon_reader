import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',  // 重要！Electron環境下必須加上這一行n
  server: {
    fs: {
      allow: ['.']  // 允許訪問整個專案目錄，以讀取comics內的圖片
    }
  }
});