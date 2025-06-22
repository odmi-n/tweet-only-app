tweet-only-app/
├── server/          # Node.js（Express）バックエンド
│   ├── index.js
│   ├── package.json
│   └── .env         # ← 自分で作成・絶対に commitしない
└── client/          # React（Vite）フロントエンド
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── components/
        │   └── TweetBox.jsx
        └── styles.css
