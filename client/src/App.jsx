import { useState } from 'react';
import TweetBox from './components/TweetBox';

export default function App() {
  const [notifications] = useState(0);   // 通知取得APIを後でつなぐならここ

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-6 py-3 px-4 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium mr-3">
            U
          </div>
          <p className="text-sm text-gray-600">あなたは以下のアカウントでログインしています</p>
        </div>
        
        <div className="flex items-center">
          <div className="relative mr-4">
            <span className="text-lg">🔔</span>
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                {notifications}
              </span>
            )}
          </div>
          <span className="font-medium text-gray-900">@my_username</span>
        </div>
      </header>

      <main>
        <TweetBox onSuccess={() => alert('✅ ツイート完了！')} />
      </main>
    </div>
  );
} 