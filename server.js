const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000; // ポート番号

// publicフォルダに入っているファイルをそのまま公開する設定
app.use(express.static(path.join(__dirname, 'public')));

// サーバーを起動する
app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});