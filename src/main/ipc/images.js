const { ipcMain, app } = require('electron');
const path = require('path');
const fsExtra = require('fs-extra');

const comicsDir = path.join(app.getPath('userData'), 'comics');

ipcMain.handle('get-images-list', async (_, comicName, chapterName) => {
  const imagesPath = path.join(comicsDir, comicName, chapterName);
  return fsExtra.readdirSync(imagesPath)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .map(file => `${comicName}/${chapterName}/${file}`);
});
