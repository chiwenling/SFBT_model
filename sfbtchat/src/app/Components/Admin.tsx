'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Link from "next/link";


export default function Admin() {
  const user = useSelector(selectCurrentUser);
  const [isAdmin, setisAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<number | ''>('');
  const [profile, setProfile] = useState({
    realName: "",
    nickName: "",
    birthDate: "",
    gender: "",
    phone: "",
  });


  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const isAdmin = docSnap.data().isAdmin;

            console.log("是不是輔導員", isAdmin);
            setisAdmin(isAdmin);
            setProfile(docSnap.data() as {
              realName: string;
              nickName: string;
              birthDate: string;
              gender: string;
              phone: string;
            });
            setLoading(false);
          } else {
            console.log("還沒有編輯基本資料");
          }
        } catch (error) {
          console.error("fetch有問題:", error);
        }
      }
    };
    setLoading(false);
    fetchProfile();
  }, [user]);

  useEffect(() => {
    const fetchScore = async () => {
      if (user) {
        try {
          const docRef = doc(db, "scores", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setScore(docSnap.data().score)
          } else {
            console.log("還沒分數");
          }
        } catch (error) {
          console.error("fetch有問題:", error);
        }
      }
    };

    fetchScore();
  }, [user]);

  // 新的資料
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // 儲存更新資料
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          ...profile,
        });
        alert("已更新資料");
      } catch (error) {
        console.error('Error saving data to Firestore:', error);
        alert("請重新儲存");
      }
    }
  };

  if (loading) {
    null;
  }

  return (
    <div className="tracking-wide">
      <div className="bg-gray-100 transition-colors duration-300">
        {isAdmin ?
          <div className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="text-center text-lg font-semibold mb-4 text-gray-900">輔導員基本資料</div>
              <Link href="/mentorProfile">
                <div className="flex justify-center ml-1">
                  <button type="submit" id="save" className="lg:w-1/3 px-4 py-2 rounded bg-sisal-500 text-white hover:bg-sisal-900 focus:outline-none transition-colors">
                    編輯公開簡介
                  </button>
                </div>
              </Link>
            </div>
          </div> : null}
      </div>

      <div className="bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="text-xl font-semibold mb-4 text-gray-900">基本資料</div>
            </div>
            <p className="text-gray-600 mb-6">以下資料不會公開顯示</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex items-center space-x-4 ">
                <div className="bg-sisal-100  border text-gray rounded-lg px-12  py-2 whitespace-nowrap ">身份</div>
                <input type="email" value={isAdmin ? "輔導員" : "會員"} readOnly className="border p-2 pl-4 w-full rounded-lg bg-gray-100 text-gray-900  focus:outline-none focus:border-sisal-300"
                />
              </div>
              <div className="mb-4 flex items-center space-x-4 ">
                <div className="bg-sisal-100  border text-gray rounded-lg px-12  py-2 whitespace-nowrap ">帳號</div>
                <input type="email" value={user?.email || ''} readOnly className="border p-2 pl-4 w-full rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:border-sisal-300"
                />
              </div>

              <div className="mb-4 flex items-center space-x-4">
                <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">姓名</div>
                <input type="text" name="realName" value={profile.realName} onChange={handleChange} placeholder="真實姓名" className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" />
              </div>

              <div className="mb-4 flex items-center space-x-4">
                <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">暱稱</div>
                <input type="text" name="nickName" value={profile.nickName} onChange={handleChange} placeholder="暱稱-如何稱呼您" className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" />
              </div>


              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">生日</div>
                <input type="date" name="birthDate" value={profile.birthDate} onChange={handleChange} placeholder="出生年月日" className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" />
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">性別</div>
                <select name="gender" value={profile.gender} onChange={handleChange} className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" required>
                  <option value="" disabled>請選擇性別</option>
                  <option value="male">生理男</option>
                  <option value="female">生理女</option>
                  <option value="none">暫不提性別資訊</option>
                </select>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">電話</div>
                <input type="number" name="phone" value={profile.phone} onChange={handleChange} placeholder="聯絡電話" className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" />
              </div>

              <div className="flex justify-end">
                <button type="submit" id="save" className="px-4 py-2 rounded bg-sisal-900 text-white hover:bg-sisal-400 focus:outline-none transition-colors">
                  儲存
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
