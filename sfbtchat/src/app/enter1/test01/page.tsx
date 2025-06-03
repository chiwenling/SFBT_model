"use client"
import Image from 'next/image';
import React from 'react';
import Button from '../../Components/Button';

export default function Booking() {
  
  return (
    <div className="h-full flex justify-center mt-10">
      <div className="flex justify-center items-center">
        <div className="sm:max-w-lg bg-gradient-to-b from-orange-200 via-white to-white border border-sisal-200 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-400 ease-in-out transform hover:scale-105">
          <div className="w-[150px] h-[150px] mx-auto mt-5 overflow-hidden rounded-full shadow-lg">
            <Image src="/a01.gif" width={150} height={150} className="bg-sisal-100 w-full h-full object-cover animate-pulse" alt="AI聊天圖片" unoptimized />
          </div>
          <div className="p-8 text-center">
            <h2 className="mb-3 text-2xl font-medium tracking-wider text-black">
              職涯輔導員
            </h2>
            <div className="mt-10 text-justify text-xl text-gray-700 transition-all duration-300 hover:text-gray-900">
            求職者您好，我是職涯輔導員!
            </div>
            <div className='mt-4 text-justify text-xl text-gray-700 transition-all duration-300 hover:text-gray-900'>接下來我們會一起討論和探索，針對你的求職目標，找到您自身的優勢和資源，並進一步朝著您想要的方向前進。</div>
            <Button href="/enter1/test01/chat" text="開始對話" bg="bg-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
}