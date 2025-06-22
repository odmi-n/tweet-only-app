import { useState } from 'react';
import TweetBox from './components/TweetBox';

export default function App() {
  const [notifications] = useState(0);   // 通知取得APIを後でつなぐならここ

  return (
    <div className="app">
      <header>
        <p>
          あなたは以下のアカウントでログインしています。
          {notifications > 0 && (
            <span className="notify">
              新しい通知があります（{notifications}）
            </span>
          )}
        </p>
        <span className="username">@my_username</span>
      </header>

      <TweetBox onSuccess={() => alert('✅ ツイート完了！')} />
    </div>
  );
} 