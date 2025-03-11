const { app, protocol } = require('electron');
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

const createWindow = require('./window');
const startImageServer = require('./imageServer');
require('./ipc'); // 載入所有 handler，乾淨 ✨

const comicsDir = path.join(app.getPath('userData'), 'comics');

app.whenReady().then(() => {
  if (!fsExtra.existsSync(comicsDir)) {
    fsExtra.mkdirSync(comicsDir, { recursive: true });
  }

  startImageServer(comicsDir);
  createWindow();

  protocol.handle('comic', (request) => {
    const url = request.url.replace('comic://', '');
    const filePath = path.join(app.getAppPath(), decodeURIComponent(url));
    return fs.createReadStream(filePath);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
