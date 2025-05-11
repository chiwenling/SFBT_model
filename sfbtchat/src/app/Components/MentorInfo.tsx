'use client'; 
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { db } from '../../../firebase';


export default function MentorInfo(){
    const user = useSelector(selectCurrentUser);
    const [loading, setLoading] = useState(true); 
    const [message, setMessage] = useState("");
    const [mentorProfile, setmentorProfile] = useState({
        id:"",
        name: "",
        field:"",
        skill: "",
        education:"",
        introduction: "",
        availableTime: "",
        googleMeetLink:"",
      });


    // 專業部分
    const [skills, setSkills] = useState(['']);
    const getSkill = (index: number, value: string) => {
      const newSkills = [...skills];
      newSkills[index] = value; 
      setSkills(newSkills); 
    };

    // 增加專業
    const addSkill = () => {
        setSkills([...skills, '']); 
    };
    
    // 移除專業
    const removeSkill = (index: number) => {
        const newSkills = skills.filter((_, i) => i !== index); 
        setSkills(newSkills); 
    };

    // 新的資料
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement| HTMLTextAreaElement>) => {
        const {name,value}=e.target;
        if(value.length <= 50){
          setmentorProfile({
            ...mentorProfile,
            [e.target.name]: e.target.value,});
        }
      };      

    //  儲存更新資料
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user) {
          try {
            await setDoc(doc(db, "mentors", user.uid), {
              ...mentorProfile,
              id:user.uid,
              email: user.email,
              skill:skills,
              googleMeetLink: mentorProfile.googleMeetLink,
            });
            alert("已更新資料");
          } catch (error) {
            console.error('Error saving data to Firestore:', error);
            alert("請重新儲存");
          }
        }
      };

    // 讀取輔導員資料
    useEffect(() => {
    const fetchmentorProfile = async () => {
        if (user) {
        try {
            const docRef = doc(db, "mentors", user.uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
            console.log("目前讀到的全部資訊:",docSnap.data());
            console.log("目前讀到的資訊:",docSnap.data().skill);
            setmentorProfile(docSnap.data() as {
                id:string,
                name: string,
                field: string,
                skill: string,
                education:string,
                introduction: string,
                availableTime: string,
                googleMeetLink: string,
            });
            setLoading(false);
            setSkills(docSnap.data().skill);
            
            } else {
            console.log("還沒有編輯基本資料");
            }
        } catch (error) {
            console.error("fetch有問題:", error);
            setLoading(false);
        }
        }
    };fetchmentorProfile();
      }, [user]);
  

    return(
        <div className="transition-colors duration-300 mt-20">
          <div className="container mx-auto p-4 bg-white shadow rounded-lg p-6 mt-20">
            <div className="tracking-wider">
              <div className="text-xl font-semibold mb-4 text-gray-900">輔導員建檔資料</div>
              <p className="text-gray-600 mb-6">將公開顯示於介紹頁</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center space-x-4">
                  <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">姓名</div>
                  <input type="text" name="name" value={mentorProfile.name} onChange={handleChange} placeholder="名稱" className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" />
                </div> 

                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-sisal-100  border text-gray rounded-lg px-8 py-2 whitespace-nowrap">領域分類</div>
                  <select name="gender" value={mentorProfile.field} onChange={handleChange} className="border p-2 pl-1 w-full rounded-lg focus:outline-none focus:border-sisal-300" required>
                      <option value="" disabled>請選擇輔導領域</option>
                      <option value="relationship">兩性感情</option>
                      <option value="friendship">人際關係</option>
                      <option value="family">家庭教養</option>
                      <option value="businese">工作職涯</option>
                      <option value="explore">自我探索</option>
                      <option value="learning">成長學習</option>
                      <option value="pressure">情緒壓力</option>
                  </select>
                </div>

                <div className="mt-6">
                    {skills.map((skill , index) => (
                        <div key={mentorProfile.id} className="mb-4 flex items-center space-x-4">
                            <div className="bg-sisal-100  border text-gray rounded-lg px-6 py-2 whitespace-nowrap">{`輔導專業 ${index + 1}`}</div>
                            <input type="text" name="skill" value={skill}  onChange={(e) => getSkill(index, e.target.value)} placeholder={`輔導專業 ${index + 1}`}
                                    className="border p-2 w-full rounded-lg focus:outline-none focus:border-blue-300" required/>
                            <button type="submit" onClick={() => removeSkill(index)} className="ml-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-200 focus:outline-none">
                                x
                            </button>
                        </div>
                    ))}
                    <div className='flex justify-center mb-4'>
                        <button type="button" onClick={addSkill} className="justify-end bg-sisal-500 text-white px-4 py-2 rounded-lg hover:bg-sisal-600 focus:outline-none">
                         新增專業
                        </button>
                    </div>
                </div>
                
  
                
                <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-2 whitespace-nowrap">學歷</div>
                    <input type="text" name="education" value={mentorProfile.education} onChange={handleChange} placeholder="請填寫最高學歷" className="border p-2 w-full rounded-lg focus:outline-none focus:border-sisal-300" />
                </div>

                <div className="flex items-cneter space-x-4 ">
                  <div className="bg-sisal-100  border text-gray rounded-lg px-12 py-10 whitespace-nowrap">簡歷</div>
                  <textarea name="introduction" value={mentorProfile.introduction} onChange={handleChange}  placeholder="簡介與特殊經驗，限50字" className="p-2 border w-full h-[100px] rounded-lg focus:outline-none focus:border-sisal-300" />
                </div>
                <div className="text-end mb-4 text-green-400">
                    {mentorProfile.introduction.length} 
                    <span className="text-black">/50字</span>
                </div>

                  {message && <p className="text-green-500">{message}</p>}
                  
                    <div className="mb-4 flex items-center space-x-4">
                      <div className="bg-sisal-100  border text-gray rounded-lg px-6 py-2 whitespace-nowrap">聊天室連結</div>
                      <input type="text" name="googleMeetLink" value={mentorProfile.googleMeetLink}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-lg w-3/5 focus:outline-none focus:border-sisal-300"
                        placeholder="輸入您專屬的 Google Meet 連結" required />
                      <div className="text-base font-normal text-yellow-900">＊小提醒：連結不公開，僅提供給預約者</div>
                    </div>
                    
            
                <div className="flex justify-center">
                    <Link href="/profile">
                        <button type="button" id="return" className="px-4 py-2 m-1 rounded bg-sisal-500 text-white hover:bg-sisal-400 focus:outline-none transition-colors">
                        返回編輯基本資料
                        </button>
                    </Link>
                    <button type="submit" id="save" className="px-4 py-2 m-1 rounded bg-sisal-900 text-white hover:bg-sisal-400 focus:outline-none transition-colors">
                    儲存
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
}

