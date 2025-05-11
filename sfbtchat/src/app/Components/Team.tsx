// 輔導員介紹頁
'use client'; 
import React, { useEffect, useState } from 'react';
import { getDocs, collection} from 'firebase/firestore';
import { db } from '../../../firebase';
import Button from './Button';

interface MentorCard{
    name:string,
    skill:[],
    introduction:string,
    education:string
}

export default function Team() {
    const [mentorInfo, setMentorInfo]= useState<MentorCard[]>([]);
    
    useEffect(() => {
        const fetchMentors = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "mentors"));
            const mentorCard = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
            })) as MentorCard[];
            setMentorInfo(mentorCard); 
          } catch (error) {
            console.error("錯誤:", error);
          }
        };
        fetchMentors();
      }, []);

    return (
        <div className="min-w-[360px] tracking-wider bg-sisal-200">
          <div className="py-12 px-6 mx-auto max-w-screen-xl lg:py-16 lg:px-8">
            <div className="mx-auto max-w-screen-sm text-center mb-12 lg:mb-20">
              <div className="mb-6 text-2xl font-bold text-sisal-900">輔導員介紹</div>
              <p className="font-light text-gray-600 sm:text-xl">我們擁有專業輔導員，</p>
              <p className="font-light text-gray-600 sm:text-xl">讓我們一起解決困難。</p>
              <Button href="/signup" text="加入我們成為輔導員？" bg="bg-orange-300" />
            </div>
    
            <div className="grid gap-10 mb-10 lg:mb-20 md:grid-cols-2 sm:grid-cols-1">
              {mentorInfo.length > 0 ? (
                mentorInfo.map((mentor, index) => (
                  <div key={index} className="flex items-center bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
                    <div className="p-6 space-y-4">
                      <div className="pl-1 text-2xl font-normal text-gray-900">{mentor.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {mentor.skill.map((skill, skillIndex) => (
                          <div key={skillIndex} className="rounded-full bg-sisal-300 text-sisal-800 px-4 py-2"> {skill}</div>
                        ))}
                      </div>
                      <p className="font-normal text-base text-sisal-500">最高學歷：{mentor.education}</p>
                      <p className="font-normal text-gray-600">簡歷：{mentor.introduction}</p>
                    </div>
                  </div>
                ))
              ) : (<p className="text-gray-500 text-center">本平台暫時無輔導員資料</p>)}
            </div>
          </div>
        </div>
      );
    }
