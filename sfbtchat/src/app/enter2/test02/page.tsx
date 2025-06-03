'use client';

import { q } from 'framer-motion/client';
import React from 'react';
import { useRef, useState } from 'react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: '',
  });

  const [questions, setQuestions] = useState<{ [key: string]: string }>({
  q1: '你想要找什麼樣的工作或實習機會呢？',
  q2: '在找工作的過程中你有遇到什麼樣的挑戰嗎？',
  q3: '如果你能明天就進到想要的公司，你覺得生活上會有什麼不一樣呢？',
  q4: '在找工作的過程中有沒有什麼地方，是你覺得已經做得不錯的呢？',
  q5: '過去的經驗中，有沒有是你比較有自信的事情呢？那時候你是怎麼做到的呢？',
  q6: '你覺得要找到你理想的工作機會，會需要做哪些事情呢？',
  q7: '根據你剛剛想的事情，請你依照想要的先後順序排序出來',
  q8: '承上題，如果請你先做剛剛排的第一步驟，你會想要嘗試嗎？',
  q9: '如果你嘗試做了這個第一步驟，你周圍的人誰會最新發現你的改變？',
  q10: '如果1到10分，10分代表你完全準備好要做第一步驟，你現在大概在哪個分數？你為什麼會給自己這個分數呢？',
  q11: '承上題，如果我們可以增加1分，這週你覺得你可以先做哪一件事情呢？你有什麼想法呢？',
});


  // 用來管理每題問題的參考
  const questionRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    Array.from({ length: 10 }, () => React.createRef<HTMLDivElement>())
  ).current;

  // 處理下一題的滾動邏輯
  const handleNext = (questionKey: string, value: string, nextStep: number, nextRef: React.RefObject<HTMLDivElement>) => {
    setAnswers((prev) => ({ ...prev, [questionKey]: value }));
    setStep(nextStep);

    // 控制精確滾動到下一題
    nextRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // 滾動到下一題區塊並保持在視窗中央
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-12 mt-20">
      {/* 開頭描述 */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm space-y-10">
        <p className="text-xl font-base leading-relaxed">
          
找工作和實習的這段過程，真的很不容易！你願意花時間來思考和努力，這件事值得你肯定自己。在尋求工作的過程裡，也許你已經嘗試了一些方法，可能也遇到過不少挑戰，但是你還是繼續前進，這份堅持和勇氣，值得欣賞。

你可以嘗試回答這些問題，來幫助自己前進：

        </p>
      </div>

      <div className="p-1 rounded-lg space-y-10">
        <p className="text-lg font-md leading-relaxed text-red-400">
          接下來您將有30分鐘，請詳細閱讀下方的問題，並盡可能的思考與回答，所有的回答內容將予以保密，且僅作為本實驗之用途使用，請放心填答。
        </p>
      </div>
      
     
     <div>
  {/* 只渲染目前 step 對應的題目 */}
  {['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11']
    .map((questionKey, idx) => {
      if (step !== idx + 1) return null; // 僅顯示目前 step 對應的題目

      return (
        <div ref={questionRefs[idx]} key={questionKey} className="space-y-4 mt-20">
          <label className="block text-lg font-medium">
            {idx + 1}. {questions[questionKey]}
          </label>
          <textarea
            value={answers[questionKey]}
            onChange={(e) => setAnswers({ ...answers, [questionKey]: e.target.value })}
            className="w-full border rounded p-3 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={`請詳細描述您的第 ${idx + 1} 題回答...`}
          />
          <div className="flex justify-end">
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
    onClick={() =>
      handleNext(
        questionKey,
        answers[questionKey],
        idx + 2,
        questionRefs[idx + 1] || questionRefs[9]
      )
    }
    disabled={!((answers[questionKey] || '').trim())}
  >
    下一題
  </button>
</div>
        </div>
      );
    })}

  {/* 完成所有題目後顯示結尾訊息 */}
  {step > 11 && (
    <div className="text-center mt-8">
      <h2 className="text-xl font-semibold text-green-700">感謝您的填寫！</h2>
      <p className="text-gray-600 mt-2">您的回答已記錄。</p>
    </div>
  )}
</div>
    </div>
  );
}
