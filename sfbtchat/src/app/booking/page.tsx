"use client"
import Image from 'next/image';
import React, { useEffect } from 'react';
import { RootState } from "../../../lib/store"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuthLoading } from '../../../lib/features/auth/authSlice';
import Scorecard from '../Components/ScoreCard';
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
    <div className="min-h-screen tracking-wide p-6 mt-20">
      <div className=" min-w-[320px] w-full space-y-10 flex flex-col lg:flex-row justify-center items-center lg:text-base text-white lg:space-y-0 lg:space-x-10">
        {/* AI區 */}
        <div className="sm:max-w-sm bg-gradient-to-b from-orange-200 via-white to-white border border-sisal-200 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-400 ease-in-out transform hover:scale-105">
          <div className="w-[150px] h-[150px] mx-auto mt-5 overflow-hidden rounded-full shadow-lg">
            <Image src="/a01.gif" width={150} height={150} className="bg-sisal-100 w-full h-full object-cover animate-pulse" alt="AI聊天圖片" unoptimized />
          </div>
          <div className="p-8 text-center">
            <h2 className="mb-3 text-2xl font-medium tracking-wider text-black">
              職涯輔導員諮詢
            </h2>
            <Button href="/AIchat" text="開始聊天" bg="bg-orange-400" />
            <p className="mt-4 text-justify text-base text-gray-700 transition-all duration-300 hover:text-gray-900">
              透過聊天也許你能獲得一些解答，無論你現在正在面對什麼問題，輔導員將提供你最立即的陪伴。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
