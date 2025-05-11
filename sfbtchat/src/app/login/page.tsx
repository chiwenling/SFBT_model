// 登入頁
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleAuth from "../Components/GoogleAuth"
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../../lib/features/auth/authSlice';

export default function Login() {
  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loginMessage, setLoginMessage]=useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const auth = getAuth();
      const credential = await signInWithEmailAndPassword(auth, email, password);
      console.log(credential);
      const user={
        uid: credential.user.uid,
        email:credential.user.email,
        isAdmin:false
      }
      dispatch(userLoggedIn(user));
      setLoginMessage("登入成功，歡迎回來！")
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error:any) {
      if(error.code === "auth/invalid-credential"){
        setError("輸入錯誤，請重新輸入");
      }else if(error.code==="auth/too-many-requests"){
        console.log(error.code);
        setError("多次失敗，請稍後再登入");
      };
    };
  };

  return(
    <div className="mt-20">
    <div className="min-h-screen bg-no-repeat bg-cover bg-center relative">
      <div className="absolute bg-gradient-to-t from-gray-500 to-yellow-400 opacity-80 inset-0 z-0"></div>
      <div className="flex mx-auto p-10 justify-center"> 
        <div className="p-14 z-10 hidden lg:flex lg:flex-col text-white">
          <Image src="/sofa.jpg" alt="會員登入頁面" width={500} height={1000} className="mb-3 mr-20 rounded-2xl"/>
          <p className="italic pr-3">「 There‘s a lid for every pot. 」— Joy </p>
        </div>
        

        <form onSubmit={handleSubmit} className="mt-12 z-1">
          <div className="flex justify-center self-center " >
            <div className="relative h-[520px] lg:w-[400px] p-10 bg-white mx-4 rounded-2xl ">
              <h3 className="font-semibold text-2xl text-gray-600 mb-2">會員登入</h3>
              <GoogleAuth />
              <div className="relative space-y-4">
                <div className="space-y-2 ">
                  <label htmlFor="email" className="text-base font-medium text-gray-700 tracking-wide">
                    帳號
                  </label>
                  <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    id="email" className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sisal-300"
                    placeholder="請輸入您的信箱" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="mb-5  text-base font-medium text-gray-700 tracking-wide">
                    密碼
                  </label>
                  <input type="password" name="password" value={password}
                    onChange={(e)=>setPassword(e.target.value)} id="password" className="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-sisal-300"
                    placeholder="請輸入您的密碼" required />
                </div>

                {error && (
                <div className="flex justify-center bg-red-100 border border-red-400 text-red-700 rounded relative break-words p-1">
                  <span className="block inline text-center">{(error)}</span>
                </div>
                )}
                {/* 登入成功提醒 */}
                <div className="flex items-center justify-center text-sisal-600 font-bold">
                  {loginMessage}          
                </div>
                <div className="text-base">
                    <div className=" text-base font-normal text-gray-600 dark:text-gray-400">
                      還沒有帳號？
                      <Link href="/signup" className="font-medium text-sisal-500 hover:text-sisal-800 dark:text-gray-500"> 註冊會員 </Link>
                    </div>
                  </div>
                <div>
                  <button type="submit" className="w-full flex justify-center bg-sisal-300 hover:bg-sisal-900 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300">
                    登入
                  </button>
                </div>           
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}
