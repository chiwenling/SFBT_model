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
    q3: '我知道找工作真的很辛苦，如果你能馬上得到想要的工作或實習機會，你覺得生活上會有什麼不一樣呢？',
    q4: '現在這個階段有沒有什麼地方，是你覺得已經做得不錯的呢？',
    q5: '過去你在尋求相關機會的時候，有沒有是你比較有自信的事情呢？那時候你是怎麼做到的呢？',
    q6: '你覺得要找到工作機會，會需要完成哪些事情呢？請你依照你的想法排序出來',
    q7: '承上題，如果請你先做剛剛排的第一步驟，你會想要嘗試嗎？會太難嗎？',
    q8: '如果1到10分，10分代表你完全準備好要做第一步驟，你現在大概在哪個分數？你為什麼會給自己這個分數？',
    q9: '承上題，如果我們可以增加1分，你覺得你可以先做哪一件事情呢？',
    q10:'你會想要嘗試嗎？你會想要從什麼時候開始呢？',
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
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm space-y-10">
        <p className="text-xl font-base leading-relaxed">
          在找工作和實習的這段過程中，我知道你已經做了不少努力。光是你願意花時間來思考和努力，這真的很值得肯定你自己。也許在尋求工作的過程裡，你已經嘗試了一些方法，中間可能遇到過不少挑戰，但你還是選擇繼續前進，這份堅持和勇氣，也很令人欣賞。
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
