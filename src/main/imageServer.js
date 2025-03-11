const express = require('express');

function startImageServer(comicsDir) {
  const server = express();
  server.use('/', express.static(comicsDir));

  server.listen(3030, () => {
    console.log('漫畫圖片伺服器運行於 http://localhost:3030');
  });
}

module.exports = startImageServer;
