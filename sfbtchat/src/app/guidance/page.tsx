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
  const [questions, setQuestios] = useState<{ [key: string]: string }>({
    q1: '你想要找什麼樣的工作或實習機會呢？',
    q2: '在找的過程中你有遇到什麼樣的困難嗎？',
    q3: '我知道找尋機會真的很辛苦，如果你獲得理想中的工作或實習，你覺得你的生活會有什麼不一樣？',
    q4: '現在這個階段有沒有什麼你覺得已經做得不錯的地方呢？',
    q5: '過去你在尋求機會的時候有沒有什麼時候是比較有信心的？那時候是怎麼做到的呢？',
    q6: '過去你有沒有試過一些對你有效的方法來幫助你自己找到工做呢？',
    q7: '如果1到10分，10分代表你完全準備好並相信自己找得到理想的工作，你現在大概在哪個分數？你為什麼會給自己這個分數？',
    q8: '如果我們可以多一分，你覺得你會想要做哪一件事情呢？',
    q9: '如果太難的話，我們可以先從小步驟的開始做起，你覺得最小的行動會是什麼？',
    q10:'你會想要嘗試嗎？你會想從哪一部分開始呢？',
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
    <div className="max-w-xl mx-auto p-6 space-y-12 mt-20">
      {/* 開頭描述 */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-sm space-y-10">
        <p className="text-xl font-bold leading-relaxed">
          在找工作/實習機會這件事情上，我知道你已經做了不少努力。光是你願意花時間來思考努力，你真的很好且有責任感，這真的很值得肯定你自己。
        </p>
        <p className="text-xl font-semibold leading-relaxed">
          也許在尋求工作的過程裡，你已經嘗試了一些方法，中間可能遇到過不少挑戰，但你還是選擇繼續前進，這份堅持和勇氣，很值得被讚賞。
        </p>
      </div>

      <div className="p-1 rounded-lg space-y-10">
        <p className="text-lg font-md leading-relaxed text-red-400">
          接下來您將有30分鐘，請詳細閱讀下方的問題，並盡可能的思考與回答，所有的回答內容將予以保密，且僅作為本實驗之用途使用，請放心填答。
        </p>
      </div>
      
      <div>
      {/* 每題問題，使用 map() 渲染問題 */}
      {['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'].map((questionKey, idx) => (
        <div ref={questionRefs[idx]} key={questionKey} className="space-y-4 mt-20">
          <label className="block text-lg font-medium">
            {idx + 1}. {questions[questionKey]}
          </label>
          <textarea
            value={answers[questionKey]}
            onChange={(e) => setAnswers({ ...answers, [questionKey]: e.target.value })}
            disabled={step > idx + 1}
            className="w-full border rounded p-3 h-40 resize-none disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={`請詳細描述您的第 ${idx + 1} 題回答...`}
          />
          {step === idx + 1 && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
              onClick={() => handleNext(questionKey, answers[questionKey], idx + 2, questionRefs[idx + 1] || questionRefs[9])}
              disabled={!answers[questionKey].trim()}
            >
              下一題
            </button>
          )}
        </div>
      ))}

      {step > 10 && (
        <div className="text-center mt-8">
          <h2 className="text-xl font-semibold text-green-700">感謝您的填寫！</h2>
          <p className="text-gray-600 mt-2">您的回答已記錄。</p>
        </div>
      )}
    </div>
    </div>
  );
}
