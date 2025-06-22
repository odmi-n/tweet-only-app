import express from 'express';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .envファイルの代わりにenvファイルから環境変数を読み込む関数
function loadEnv() {
  const envPath = path.join(__dirname, 'env');
  try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const envVars = envContent.split('\n');
    
    envVars.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
    
    console.log('環境変数を読み込みました');
  } catch (err) {
    console.error('環境変数ファイル(env)の読み込みに失敗しました:', err.message);
  }
}

// 環境変数を読み込む
loadEnv();

const app = express();
app.use(cors());
app.use(express.json());

// ---------------  ツイート投稿エンドポイント ---------------
app.post('/api/tweet', async (req, res) => {
  const { text } = req.body;

  // 文字数チェック（0文字 or 280文字超は弾く）
  if (!text?.trim() || text.length > 280) {
    return res.status(400).json({ error: 'ツイートは1〜280文字で入力してください。' });
  }

  try {
    const twitterRes = await axios.post(
      'https://api.twitter.com/2/tweets',
      { text },
      {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return res.status(201).json(twitterRes.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res
      .status(err.response?.status || 500)
      .json({ error: '投稿に失敗しました', details: err.response?.data });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀  API サーバー起動 : http://localhost:${PORT}`)); 