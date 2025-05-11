// 註冊頁
"use client";
import Image from 'next/image';
import Link from "next/link";
import React,{ FormEvent, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebase";
import { useRouter } from "next/navigation";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const errorMessages: { [key: string]: string } = {
    "auth/weak-password": "請輸入至少6位英文及數字",
    "auth/email-already-in-use": "此帳號已被註冊",
  };
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (password !== confirmation) {
      setError("密碼輸入錯誤");
      return;
    }

    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
      router.push("/profile");
    } catch (e) {
      const firebaseErrorCode = (e as { code: string }).code;
      const friendlyMessage =
        firebaseErrorCode && errorMessages[firebaseErrorCode]
          ? errorMessages[firebaseErrorCode]
          : "發生了一個錯誤";
      setError(friendlyMessage);
    }
  }

  return(
    <div className="mt-20">
    <div className="min-h-screen bg-no-repeat bg-cover bg-center relative">
      <div className="absolute bg-gradient-to-t from-gray-500 to-yellow-400 opacity-80 inset-0 z-0"></div>
      <div className="flex mx-auto p-10 justify-center"> 
          <div className="hidden lg:flex flex-col z-10 mt-10">
            <p className="text-center italic tracking-widest">“Maybe this is what happens when you grow up.</p>
            <p className="text-center italic tracking-widest"> You feel less joy.” — Joy</p>
            <Image src="/signup_bg.png" alt="會員註冊頁面" width={600} height={600}/>
          </div>
        <form onSubmit={handleSubmit} className="mt-12 z-1">
          <div className="flex justify-center self-center">
            <div className="relative h-[580px] lg:w-[400px] p-10 bg-white mx-3 rounded-2xl">
              <div className="mb-6">
                <h3 className="font-semibold text-2xl text-gray-600">註冊新會員</h3>
              </div>
  
              <div className="relative space-y-5">
                <div className="space-y-2 ">
                  <label htmlFor="email" className=" text-base font-medium text-gray-700 tracking-wide">帳號</label>
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" 
                         className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sisal-300" placeholder="請輸入您的信箱" required/>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="mb-5  text-base font-medium text-gray-700 tracking-wide">密碼</label>
                  <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password"
                         className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sisal-300"
                         placeholder="請輸入至少6位數字" required/>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2  text-base font-medium text-gray-900 focus:outline-none focus:border-sisal-300">再次輸入密碼</label>
                  <input
                    type="password" name="confirm-password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)}
                    id="confirm-password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm: text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                {/* 錯誤時 */}
                {error && (
                <div className=" text-base bg-red-100 border border-red-400 text-red-700 rounded relative break-words p-1" role="alert">
                  <span className="block inline">{error}</span>
                </div>)}
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>
                    <label htmlFor="remember_me"className="ml-2 block text-base text-gray-800">同意使用者條款</label>
                  </div>             
                </div>
                <button type="submit" className="w-full text-white bg-sisal-400 hover:bg-sisal-700 focus:ring-4 font-medium rounded-lg text-base px-5 py-3 text-center">註冊帳號
                </button>
                <p className=" text-base font-normal text-black-500 ">
                  已經有會員嗎？{" "}
                  <Link href="/login" className="font-medium text-sisal-600 hover:text-sisal-900">
                    立即登入
                  </Link>
                </p>        
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}