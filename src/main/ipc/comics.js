const { ipcMain, dialog, app } = require('electron');
const path = require('path');
const fsExtra = require('fs-extra');

const comicsDir = path.join(app.getPath('userData'), 'comics');

// 📂 取得漫畫資料夾清單
ipcMain.handle('get-comics-list', async () => {
  if (!fsExtra.existsSync(comicsDir)) fsExtra.mkdirSync(comicsDir, { recursive: true });
  return fsExtra.readdirSync(comicsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
});

// 📥 匯入漫畫資料夾
ipcMain.handle('import-comic', async () => {
  const result = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (result.canceled || result.filePaths.length === 0) {
    return { success: false, message: '取消匯入' };
  }

  const sourceDir = result.filePaths[0];
  const comicName = path.basename(sourceDir);
  const destination = path.join(comicsDir, comicName);

  await fsExtra.copy(sourceDir, destination);
  return { success: true, comicName };
});

// 🗑️ 移除指定漫畫資料夾
ipcMain.handle('remove-comic', async (_, comicName) => {
  const targetDir = path.join(comicsDir, comicName);

  if (!fsExtra.existsSync(targetDir)) {
    return { success: false, message: '漫畫不存在' };
  }

  try {
    await fsExtra.remove(targetDir);
    return { success: true, comicName };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

