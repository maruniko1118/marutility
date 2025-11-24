const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// publicフォルダを静的ファイルとして公開
app.use(express.static(path.join(__dirname, 'public')));

// ツール一覧を取得するAPI
app.get('/api/tools', (req, res) => {
    const toolsDir = path.join(__dirname, 'public', 'tools');

    // toolsフォルダが存在しない場合は作成
    if (!fs.existsSync(toolsDir)){
        fs.mkdirSync(toolsDir);
        return res.json([]);
    }

    fs.readdir(toolsDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to scan tools directory' });
        }

        const tools = [];
        files.forEach(file => {
            if (path.extname(file) === '.html') {
                const filePath = path.join(toolsDir, file);
                // ファイルの中身を読み込む
                const content = fs.readFileSync(filePath, 'utf-8');
                
                // <h2>タグの中身を正規表現で抽出
                // <h2 ... > ... </h2> の中身を取得 (改行や属性があっても対応)
                const h2Match = content.match(/<h2[^>]*>\s*(.*?)\s*<\/h2>/i);
                
                let title = file.replace('.html', ''); // デフォルトはファイル名
                
                // h2タグが見つかれば、その中身をタイトルにする
                if (h2Match && h2Match[1]) {
                    title = h2Match[1].trim();
                }
                
                tools.push({
                    id: file.replace('.html', ''),
                    name: title,
                    file: file
                });
            }
        });
        res.json(tools);
    });
});

app.listen(PORT, () => {
    console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});