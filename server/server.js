// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();

// CORS設定
const corsOptions = {
  origin: 'http://localhost:5173',  // フロントエンドのURL（開発中のローカルサーバー）
  methods: 'GET, POST',             // 許可するHTTPメソッド
  allowedHeaders: 'Content-Type',   // 許可するヘッダー
};

// CORSミドルウェアを使用
app.use(cors(corsOptions));
app.use(express.json());  // リクエストボディをJSONとして解析

// ログインエンドポイント（仮の実装）
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@example.com' && password === 'validpassword123') {
    res.json({ message: 'ログイン成功' });
  } else {
    res.status(400).json({ message: '無効なメールアドレスまたはパスワード' });
  }
});

// サーバーをポート3000で起動
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
