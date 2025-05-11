'use client'; 
import React from "react";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Welcome() {
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  const handleClick = (e: any, href: string) => {
    
    if (!user && ((href === "/booking")||(href === "/test"))) {
      e.preventDefault();
      router.push("/login");
    }
  }

  return (
    <div className="pt-20 mt-18 min-w-[360px] bg-sisal-200">
      <div className="mx-auto max-w-6xl px-8">
        <div className="relative isolate overflow-hidden bg-sisal-100 shadow-2xl rounded-3xl flex lg:px-24 py-5 justify-between items-center">
          <div className="pr-10 pl-8 tracking-wider max-w-md text-center lg:text-left lg:flex-auto">
            <h2 className="text-[25px] text-sisal-800 text-[30px] text-start lg:text-4xl font-extrabold">
              也許你可以找人聊聊
            </h2>
            <div className="text-base text-start lg:mt-4 text-lg text-sisal-800 leading-relaxed">
               職涯、關係、心情，疑難雜症慢慢聊！
            </div>
            <div className="mt-10 flex items-center lg:justify-start lg: gap-x-6">
              <Link href="/test" onClick={(e) => handleClick(e,"/test")}>
                <div className="cursor-pointer rounded-md bg-white px-3 py-2 text-m font-normal text-gray-900 shadow-lg hover:bg-sisal-900 hover:text-sisal-200">
                  心情小測
                </div>
                </Link>
                <Link href="/booking" onClick={(e) => handleClick(e,"/booking")}>
                <div className="cursor-pointer rounded-md bg-white px-3 py-2 text-m font-normal text-gray-900 shadow-lg hover:bg-sisal-900 hover:text-sisal-200">
                  立即預約
                </div>
                </Link>
            </div>
          </div>
          <div className="hidden lg:block rounded-xl">
            <Image alt="歡迎頁面的小插圖" src="/paper.gif" width={400} height={400} className=""/>
          </div>
        </div>
      </div>
    </div>
  );
}

  