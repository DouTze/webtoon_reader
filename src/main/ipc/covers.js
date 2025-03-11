const { ipcMain, app } = require('electron');
const path = require('path');
const fsExtra = require('fs-extra');

const comicsDir = path.join(app.getPath('userData'), 'comics');

ipcMain.handle('get-comics-covers', async () => {
  const comics = [];

  const comicDirs = fsExtra.readdirSync(comicsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  for (const comic of comicDirs) {
    const comicName = comic.name;
    const comicPath = path.join(comicsDir, comicName);

    const chaptersDirs = fsExtra.readdirSync(comicPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());

    const coverImages = fsExtra.readdirSync(comicPath)
      .filter(file => /cover\.(jpg|jpeg|png|webp)$/i.test(file));
    const bgImages = fsExtra.readdirSync(comicPath)
      .filter(file => /bg\.(jpg|jpeg|png|webp)$/i.test(file));

    const comicCover = coverImages[0] ? `${comicName}/${coverImages[0]}` : '';
    const comicBg = bgImages[0] ? `${comicName}/${bgImages[0]}` : '';

    const chapters = chaptersDirs.map(chapter => {
      const chapterName = chapter.name;
      const images = fsExtra.readdirSync(path.join(comicPath, chapterName))
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
      return {
        name: chapterName,
        cover: images[0] ? `${comicName}/${chapterName}/${images[0]}` : '',
      };
    });

    comics.push({ comic: comicName, cover: comicCover, bg: comicBg, chapters });
  }

  return comics;
});
