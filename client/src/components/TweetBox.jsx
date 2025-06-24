import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function TweetBox({ onSuccess }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [overflowStart, setOverflowStart] = useState(-1);
  const textareaRef = useRef(null);
  const overlayRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height to scrollHeight to expand the textarea
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    
    // Also update the overlay height
    if (overlayRef.current && textareaRef.current) {
      overlayRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Count characters considering full-width characters as 2
  useEffect(() => {
    let count = 0;
    let overflow = -1;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charSize = char.match(/[^\x01-\x7E\xA1-\xDF]/) ? 2 : 1;
      count += charSize;
      
      if (count > 280 && overflow === -1) {
        overflow = i;
      }
    }
    
    setCharCount(count);
    setOverflowStart(overflow);
  }, [text]);

  const remaining = 280 - charCount;

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

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  const renderOverflowText = () => {
    if (overflowStart === -1) return null;

    const normalText = text.slice(0, overflowStart);
    const overflowText = text.slice(overflowStart);

    return (
      <div className="text-overlay" ref={overlayRef}>
        {normalText}
        <span className="overflow">{overflowText}</span>
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm max-w-2xl mb-4">
      <div className="flex gap-3">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
          ico
        </div>

        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            placeholder="いまどうしてる？"
            value={text}
            onChange={handleTextChange}
            className="w-full min-h-[80px] text-lg border-none resize-none p-0 focus:outline-none bg-transparent"
          />
          
          {renderOverflowText()}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <div className="flex space-x-2">
          <button 
            disabled 
            title="画像アップロードは未実装"
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🖼️
          </button>
          <button 
            disabled 
            title="GIFは未実装"
            className="px-3 py-1 text-sm text-blue-500 hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            GIF
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {remaining <= 20 && (
            <span 
              className={`text-xs font-medium px-2 py-1 rounded-full
                ${remaining <= 0 ? 'bg-red-500 text-white' : 
                  remaining <= 10 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {remaining}
            </span>
          )}
          <button
            disabled={!text.trim() || loading || remaining < 0}
            onClick={postTweet}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Sending…' : 'Tweet'}
          </button>
        </div>
      </div>
    </div>
  );
} 