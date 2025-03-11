# Kakao Webtoon Reader

**一款由粉絲自製的垂直漫畫閱讀器，致敬 Kakao Webtoon 關閉後的閱讀體驗。**

## Project Overview

這個專案誕生於需求。隨著 Kakao Webtoon 的關閉，許多讀者失去了觀看喜愛條漫的平台。
本閱讀器旨在填補這個空缺，提供一個還原 Kakao Webtoon 應用程式風格的使用介面與閱讀體驗。

**Key Features (Aspirations):**

*   **垂直捲動閱讀:** 以熟悉的直式捲動方式，無縫閱讀你的 Webtoon。
*   **Kakao 風格 UI:**  還原 Kakao Webtoon 的介面設計與排版，喚起熟悉感。
*   **本地檔案支援:** 直接載入本機硬碟上的漫畫檔案進行閱讀。

## Motivation

本專案的主要動機是延續 Kakao Webtoon 平台上曾帶給讀者的條漫閱讀體驗。
這是一份對原平台與其創作者的致敬，也讓粉絲們能夠持續接觸那些他們深愛的作品。

## Disclaimer

這是一個由讀者自製的專案，與 Kakao Corp 無任何關聯，也未經官方授權。
本專案僅供個人使用與教學研究用途。我們尊重所有著作權與智慧財產權。
若您是權利擁有者，並認為此專案侵犯您的權益，請立即聯繫，我將迅速處理。

## Contributing

如果你想參與此專案，無論是撰寫程式碼、設計 UI、回報錯誤或提出建議，我們都熱烈歡迎！
請參考 CONTRIBUTING.md 以瞭解如何開始。

## Getting Started

以下是幫助你在本地端機器上建立開發環境的步驟。

### Prerequisites

*   **Node.js:** 本專案需要安裝 Node.js。請前往 https://nodejs.org/ 下載 LTS 版本。
*   **npm:** 通常會隨 Node.js 一併安裝。可透過 npm -v 確認是否已安裝。

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/DouTze/webtoon_reader.git
    cd webtoon_reader
    ```

2.  **Install npm packages:**
    ```bash
    npm install
    ```
    這個指令會安裝在 `package.json` 中列出的所有套件。

3.  **Run the project:**
    ```bash
    npm start
    ```
    預設會在 http://localhost:3030 啟動（實際 port 可能略有不同）。
    
4.  **Read Local Webtoon Files**
    *   你可以將漫畫圖檔（支援 .jpg、.jpeg、.png、.webp 格式）儲存在電腦的 **任意資料夾下**.
    *   **Folder Structure:** 使用以下結構儲存你的漫畫：
        *   **Main Comic Folder:** 每個漫畫會有一個資料夾 (例如： "火影忍者").
        *   **Chapter Folders:** 在漫畫主資料夾下，會有每一話的資料夾 (例如： "第1話", "第2話").
        *   **Chapter Images:** 在每一話的資料夾下，會存放多個漫畫圖檔，請依照可排序的命名方式儲存 (例如： `0001.png`, `0002.png`, `0003.png`).
        * **cover and background**: 為了保留 Kakao Webtoon 的視覺效果，需要將 `cover.jpg|jpeg|png|webp` 和 `bg.jpg|jpeg|png|webp` 放在 **Main Comic Folder**.
        *   **Example:**
            ```
            火影忍者
            ├── 第1話
            │   ├── 0001.png
            │   ├── 0002.png
            │   └── 0003.png
            ├── 第2話
            │   ├── 0001.png
            │   ├── 0002.png
            │   ├── 0003.png
            │   └── 0004.png
            ├── cover.png
            └── bg.png
            ```
    *   漫畫匯入後，應用程式將自動讀取並顯示這些內容。
    *   你可以在應用介面中點擊 「選擇資料夾」，選取漫畫所在的主資料夾，即可開始閱讀！

### Available Scripts

*   `npm start`: Runs the app in the development mode.
*   `npm run build`: Builds the app for production to the `build` folder.
*   `npm test`: Launches the test runner in the interactive watch mode.

## Contact

若有任何問題、建議或回報錯誤，請在 GitHub 開 issue：

👉 [Issue Tracker](https://github.com/DouTze/webtoon_reader/issues)

你的問題非常重要，我會盡快回覆與處理。感謝你對這個專案的支持！
