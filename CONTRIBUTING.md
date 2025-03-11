# Contributing to Kakao Webtoon Legacy Reader

首先，感謝你對這個專案的關注與支持！❤️  
這是一個致敬 Kakao Webtoon 的開源專案，旨在讓條漫迷們能持續享受垂直閱讀的樂趣。  
無論你是想修 bug、優化 UI、建議功能或單純提供使用回饋，我們都非常歡迎！

---

## 🛠 我可以如何參與？

### ✅ 回報 Bug
如果你發現應用程式有錯誤或異常行為，請到 [Issues 頁面](https://github.com/DouTze/webtoon_reader/issues) 提出。

請盡可能提供以下資訊：

- 作業系統（macOS/Windows 版本）
- 重現步驟
- 錯誤訊息（若可以提供的話）
- 截圖（如果方便提供的話）

---

### 💡 提出建議 / 新功能
如果你有想法可以讓這個閱讀器變得更好，請開一個 `Feature Request` 類型的 issue，並說明：

- 你希望增加什麼功能？
- 它解決了什麼問題？
- 有無 UI/UX 建議或參考？

---

### 🧑‍💻 提交程式碼貢獻（Pull Request）

1. **Fork** 此專案並建立你的分支：
    ```bash
    git checkout -b feature/你的功能名稱
    ```

2. **開發與測試：** 確保所有修改不會破壞既有功能。

3. **遵守程式風格：**
    - 使用 **ESLint**（可安裝 VS Code 插件）
    - React 元件命名請使用大駝峰（`PascalCase`）
    - 儘可能撰寫乾淨、可讀的程式碼

4. **提交 PR 前：**
    - 附上簡單的描述與對應的 issue（若有）
    - 如果牽涉 UI 請附上截圖或影片

5. **建立 Pull Request：**
    - 提交至 `main` 分支
    - 我們會盡快審核並回覆！

---

## 📁 專案架構簡介
```
webtoon_reader
├── src/
│   ├── main/        # Electron 主進程
│   ├── renderer/    # React 前端頁面
│   └── assets/      # 圖片與 UI 素材
├── public/          # 靜態檔案
├── preload.js       # Electron preload
├── package.json     # 專案設定
└── README.md        # 專案說明
```
---

## 🧪 開發前準備

```bash
npm install
npm run start
```

這會同時啟動 React 開發伺服器與 Electron 應用程式。

---

🧼 Coding Style
	•	使用 React + Material UI 組件
	•	使用 Vite 開發工具
	•	所有圖片路徑應經由本地伺服器 (http://localhost:3030/xxx)
	•	所有 Electron IPC 請使用 window.electron.invoke

---

🙏 感謝你！

每一份貢獻，不論大小，都是這個專案延續 Kakao Webtoon 體驗的重要力量。
如果你也是條漫愛好者，我們一起讓它變得更棒吧！

---

📫 如有任何問題或想進一步參與，也歡迎在 GitHub Issues 中與我們聯絡。

---

## ✅ 使用建議

- 將這份內容儲存為 `CONTRIBUTING.md` 放在你的專案根目錄。
- GitHub 會自動在使用者建立 Pull Request 或 Issue 時連結這份文件 ✨

---
