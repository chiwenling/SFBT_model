"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, userLoggedOut, selectAuthLoading } from "../../../lib/features/auth/authSlice";

const navigation = [
  { name: "操作流程", href: "/about", current: false },
  { name: "A組", href: "/collaboration", current: false },
  { name: "B組", href: "/guidance", current: false },
  { name: "C組", href: "/independent", current: false }
];

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MyHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(userLoggedOut());
      localStorage.removeItem("score");
    } catch (error) {
      console.error("登出有問題", error);
    }
  };

  const handleClick = (e: any, href: string) => {
    if ((!user && (href === "/booking" || href === "/profile" || href === "/test"))) {
      e.preventDefault();
      router.push("/login");
    }
  };

  const OpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clickMenu = () => {
    setIsMenuOpen(false);
  };



  return (
    <div className="fixed top-0 min-w-[400px] w-full bg-sisal-300 min-h-[80px] flex items-center justify-between px-10 lg:px-20 z-50">
      <Link href="/">
        <div className="flex items-center w-14 h-14 ">
          <Image src="/heart.png" alt="logo" width={60} height={48} className="rounded-full" />
        </div>
      </Link>

      <div className="hidden lg:flex items-center justify-start ml-10 space-x-3 grow">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <div onClick={(e) => handleClick(e, item.href)} className={classNames(
              item.current ? "bg-sisal-600 text-black" : "text-sisal-900 hover:bg-sisal-400 hover:text-white",
              "rounded-lg px-4 py-2 text-lg font-normal cursor-pointer")}>{item.name}
            </div>
          </Link>
        ))}
      </div>

      <div className="hidden lg:flex items-center space-x-1 pr-20 md:p-0">

        {user || loading ? (
          <button onClick={handleSignOut} className="text-lg text-sisal-900 px-4 py-2 rounded-lg hover:bg-sisal-500 hover:text-white"> 會員登出</button>
        ) : (
          <Link href="/login">
            <button className="text-lg text-sisal-900 px-4 py-2 rounded-lg hover:bg-sisal-500 hover:text-white">會員登入</button>
          </Link>
        )}
      </div>

      <div className="lg:hidden flex items-center">
        <button onClick={OpenMenu} className="text-sisal-900">
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-full bg-sisal-100 flex flex-col items-center justify-center space-y-4 z-50">
          <button onClick={OpenMenu} className="absolute top-4 right-4 text-sisal-900">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div onClick={(e) => { handleClick(e, item.href); clickMenu(); }}
                className={classNames(item.current ? "bg-sisal-600 text-black" : "text-sisal-900 hover:bg-sisal-400 hover:text-white",
                  "rounded-lg px-6 py-4 text-lg font-normal cursor-pointer")}>{item.name}
              </div>
            </Link>
          ))}

          <Link href="/profile">
            <div onClick={(e) => { handleClick(e, "/profile"); clickMenu(); }}
              className="text-sisal-900 hover:bg-sisal-400 hover:text-white rounded-lg px-6 py-4 text-lg font-normal cursor-pointer">會員中心
            </div>
          </Link>

          {user || loading ? (
            <button onClick={() => { handleSignOut(); clickMenu(); }} className=" text-lg text-sisal-900 px-6 py-4 rounded-lg hover:bg-sisal-500 hover:text-white"
            >會員登出</button>) : (
            <Link href="/login">
              <button onClick={clickMenu} className=" text-lg text-sisal-900 px-6 py-4 rounded-lg hover:bg-sisal-500 hover:text-white">會員登入</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
