import { useState } from 'react';
import axios from 'axios';

export default function TweetBox({ onSuccess }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const remaining = 280 - text.length;

  const postTweet = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await axios.post('/api/tweet', { text });
      setText('');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert('❌ 投稿に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tweet-box">
      <div className="avatar">ico</div>

      <textarea
        placeholder="いまどうしてる？"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={280}
      />

      <div className="controls">
        <div className="icons">
          <button disabled title="画像アップロードは未実装">🖼️</button>
          <button disabled title="GIFは未実装">GIF</button>
        </div>

        <div className="right">
          <span className={`count ${remaining < 0 ? 'over' : ''}`}>{remaining}</span>
          <button
            className="tweet-btn"
            disabled={!text.trim() || loading || remaining < 0}
            onClick={postTweet}
          >
            {loading ? 'Sending…' : 'Tweet'}
          </button>
        </div>
      </div>
    </div>
  );
} 