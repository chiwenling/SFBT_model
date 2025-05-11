"use client"
import Image from 'next/image';
import React, { useEffect } from 'react';
import { RootState } from "../../../lib/store"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuthLoading } from '../../../lib/features/auth/authSlice';
import Button from '../Components/Button';

export default function Booking() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("看一下有沒有user", user);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        router.push("/login");
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [user, router]);

  if (loading) {
    return null;
  }

  return (
    <div className="h-full flex justify-center mt-10">
      <div className="flex justify-center items-center">
        <div className="sm:max-w-sm bg-gradient-to-b from-orange-200 via-white to-white border border-sisal-200 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-400 ease-in-out transform hover:scale-105">
          <div className="w-[150px] h-[150px] mx-auto mt-5 overflow-hidden rounded-full shadow-lg">
            <Image src="/a01.gif" width={150} height={150} className="bg-sisal-100 w-full h-full object-cover animate-pulse" alt="AI聊天圖片" unoptimized />
          </div>
          <div className="p-8 text-center">
            <h2 className="mb-3 text-2xl font-medium tracking-wider text-black">
              職涯輔導員
            </h2>
            <div className="text-lg text-blue-400">【 職涯輔導員介紹 】</div>
            <div className="mt-4 text-justify text-lg text-gray-700 transition-all duration-300 hover:text-gray-900">
            我曾有陪伴與支持個人探索職涯方向的經驗。透過這次的對話，我們可以一起思考探索，包含興趣、價值觀與能力等，找到關於你的職涯想法與目標，過程中我們將共同討論，找到屬於你的內外在資源與可能性，並找到更適合你的方向前進。
            </div>
            <Button href="/AIchat" text="開始對話" bg="bg-orange-400" />
            <div>本次對話內容將予以保密，<br />且僅作為本實驗之用途使用。</div>
          </div>
        </div>
      </div>
    </div>
  );
}