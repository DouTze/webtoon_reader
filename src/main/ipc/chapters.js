const { ipcMain, app } = require('electron');
const path = require('path');
const fsExtra = require('fs-extra');

const comicsDir = path.join(app.getPath('userData'), 'comics');

ipcMain.handle('get-chapters-list', async (_, comicName) => {
  const comicPath = path.join(comicsDir, comicName);
  return fsExtra.readdirSync(comicPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
});
