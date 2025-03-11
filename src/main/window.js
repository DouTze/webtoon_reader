const { BrowserWindow, app } = require('electron');
const path = require('path');

function createWindow() {
  const isProd = app.isPackaged;

  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: isProd
        ? path.join(process.resourcesPath, 'app.asar', 'src/main/preload.js')
        : path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      icon: isProd
        ? path.join(process.resourcesPath, 'app.asar', 'resources/kakao.icns')
        : path.join(__dirname, 'resources/kakao.icns'),
    },
  });

  if (isProd) {
    win.loadFile(path.join(process.resourcesPath, 'app.asar', 'dist/index.html'));
  } else {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  }
}

module.exports = createWindow;
