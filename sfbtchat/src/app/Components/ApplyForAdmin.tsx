"use client"; 
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../lib/features/auth/authSlice";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Link from "next/link";

export default function ApplyForAdmin() {
  const user = useSelector(selectCurrentUser); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPendingAdmin, setIsPendingAdmin] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        return;
      }

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setIsAdmin(userData.isAdmin || false); 
          setIsPendingAdmin(userData.isPendingAdmin || false); 
        } else {
          console.log("還沒有編輯基本資料");
        }
      } catch (error) {
        console.error("問題:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const applyAdmin = async () => {
    if (!user) {
      alert("請先登入");
      return;
    };

    if (isAdmin) {
      alert("您已經是輔導員");
      return;
    };

    if (isPendingAdmin) {
      alert("已收到您的申請");
      return;
    };setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        isPendingAdmin: true,
      });
      setMessage("申請已提交，請等待審核");
      setIsPendingAdmin(true);
    } catch (error) {
      console.error("申請失敗：", error);
      setMessage("請先填寫基本資料");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="tracking-wide">
      <div className="bg-gray-100 transition-colors duration-300">
        <div className="container mx-auto p-4">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center text-lg font-bold mb-4 text-gray-900">成為輔導員</div>
            <div className="text-center">成為輔導員，發揮專長，一起幫助人</div>
            <div className="flex flex-col justify-center items-center bg-white rounded-lg p-2 mt-6">
                
              {message && ( <div className="text-center w-1/3 bg-sisal-100 border border-sisal-400 text-red-700 p-1 rounded relative mb-4">
                  {message}
                </div>)}

              {!isAdmin && !isPendingAdmin ? (
                <button onClick={applyAdmin} className={`w-1/3 bg-sisal-500 hover:bg-sisal-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-300`}
                  disabled={loading}>
                  {loading ? "提交中..." : "申請成為輔導員"}
                </button>
              ) : (
                <div className="text-center lg:w-1/3 bg-gray-100 border border-gray-300 text-gray-700 px-4 py-3 rounded relative">
                  {isAdmin ? "您已經是輔導員，請編輯輔導員簡介。" : "申請已提交，請等待審核。"}
                </div>
              )}    
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
