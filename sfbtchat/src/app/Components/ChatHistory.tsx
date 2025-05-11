// 要讀取目前有的歷史紀錄

"use client";
import {collection, query, where, doc, orderBy, onSnapshot,deleteDoc} from "firebase/firestore";
import { useSelector } from "react-redux";
import {db} from "../../../firebase";
import { useEffect, useState } from "react";
import { selectCurrentUser } from "../../../lib/features/auth/authSlice";
import Image from "next/image";

export default function ChatHistory(){
    //讀取目前登入狀態
    const user = useSelector(selectCurrentUser);
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory]= useState<{
        id:string;
        message:string;
        time:string;
        keypoint:string;
    }[]>([]);

    
    useEffect(() => {
        if (user && user.email) {
            getHistory(user.email);
        }
    }, [user]);

    // 刪除重點紀錄
    async function deleteRecord(id:string){
        try {
          await deleteDoc(doc(db, "chatHistory", id));
          setMessage("刪除囉");
          setTimeout(() => {
            setMessage("");
          }, 1000);
        } catch (error) {
          console.error("刪除錯誤", error);
        }
      };

    // 讀取重點紀錄
    async function getHistory(email:string){
        const q = query(collection(db, "chatHistory"), where("email", "==", email), orderBy("time", "desc"));
        onSnapshot(q, (querySnapshot) => {
        const history = querySnapshot.docs.map(doc => {
            const data = doc.data();
            console.log("目前讀到的資料",data);
            
            return {
                id: doc.id,
                message: data.message[1].content,
                keypoint:data.message[data.message.length-1].content,
                time: data.time
            };
        });
        console.log("目前讀到的history",history);
        setChatHistory(history);
    });
    }


    return(
        <div className="min-w-[300px] lg:block m-5 tracking-wider lg:w-1/2 bg-white rounded-lg border-2 border-sisal-500">
            <div className="mb-10 p-5 border-b border-gray-300 flex justify-center items-center bg-sisal-600 text-white rounded">
                <div className="text-base lg:text-lg font-normal pl-4 text-center">重點紀錄收集卡</div>
            </div>
            <div className="p-2 text-base font-light text-center text-sisal-500 rounded-lg " role="alert">
                <span className="font-medium">{message}</span>
            </div>
        
            <div>
                {chatHistory.length >0 ?(
                    chatHistory.map((history) => (
                        <div key={history.id} >
                            <div className="m-4 group h-44 bg-transparent rounded-md perspective-1000">
                                <div className="relative w-full h-full text-center transition-transform duration-400 transform-style-3d group-hover:rotate-y-180">
                                    <div className="absolute w-full h-full bg-sisal-200 text-black rounded-lg">
                                        <div className="pt-10 text-lg font-semibold">{history.time}</div> 
                                        <div className="pt-4 text-gray-600">請翻面看本次談話重點</div> 
                                    </div>
                                    <div className="absolute w-full h-full bg-sisal-500 text-white rotate-y-180 backface-hidden p-6 text-justify rounded-lg">
                                        {history.keypoint}
                                        <div className="flex justify-center items-center m-3">
                                            <Image src="/trashcan.png" alt="logo" width={40} height={40} className="p-1 bg-white rounded-lg cursor-pointer" onClick={()=>deleteRecord(history.id)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                ))):( <div className="text-center p-10">目前沒有談話記錄</div>)}  
            </div>  
        </div>
    );
}