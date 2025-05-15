'use client';

import React, { useState } from 'react';
import Button from '../../Components/Button';

export default function Home() {
   const [response, setResponse] = useState('');
  return (
    <div className="h-full max-w-3xl mx-auto px-6 py-12 space-y-12">
      {/* 活動引導說明 */}
      <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">實驗說明</h1>
        <p className="text-lg leading-relaxed text-gray-700 text-justify">
          尋求工作或實習的過程中常常充滿挑戰與壓力。也許可以從你過去的經驗，或是目前能夠著手進行的事情開始努力。在本次活動中，我們希望您回顧自身的經歷，思考如何找到工作。
        </p>
        <p className="text-lg leading-relaxed text-gray-700 text-justify">
          假設現在的您正在尋找一份工作，請試著延伸思考：<br />
          <span className="font-medium text-gray-800">您會採取哪些具體的行動，愈詳細愈好。</span>
        </p>
        <p className="text-lg leading-relaxed text-gray-700 text-justify">
          您將有 <span className="font-semibold text-black">30 分鐘</span> 的時間進行思考與作答於下方空白輸入框。
          所有回答內容將 <span className="font-semibold text-black">完全保密</span>，僅用於本次實驗研究的分析，請您放心填答。
        </p>
      </section>
      <section className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <label htmlFor="user-response" className="block text-lg font-medium text-gray-800">
          請輸入您的想法：
        </label>
        <textarea
          id="user-response"
          rows={10}
          className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="請輸入您的回答..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
        <div className='mb-10 mt-10'>
        <Button href="" text="送出" bg="bg-orange-400" />
      </div>
      </section>
      
    </div>
  );
}
