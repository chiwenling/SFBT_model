import { db }  from "../../../firebase";
import React, { useState,useEffect} from 'react';
import { collection, query, where, doc, deleteDoc, orderBy, onSnapshot, getDocs,updateDoc} from "firebase/firestore";
import { useSelector } from 'react-redux';
import { RootState } from "../../../lib/store"

export default function Record(){
    const user = useSelector((state: RootState) => state.auth.user); 
    const [recordData, setRecordData] = useState<{ 
        id:string;
        date: string; 
        time: string; 
        teacher: string; 
        teacherEmail:string;
        roomLink:string;
        topic: string }[]>([]);

    useEffect(() => {
        if (user && user.email) {
            load(user.email);
        }
    }, [user]);

    async function deleteRecord(id: string, mentorEmail: string, selectedDate: string, selectedPeriod: string) {
        try {
          await deleteDoc(doc(db, "reservation", id));
          const q = query(collection(db, "availableTime"),where("email", "==", mentorEmail));
          const querySnapshot = await getDocs(q);
      
          querySnapshot.forEach(async (document:any) => {
            const availableTimeData = document.data();
            const updatedOpenTime = availableTimeData.openTime.map((openTime: any) => {
              if (openTime.date === selectedDate) {
                return {
                  ...openTime,
                  periods: openTime.periods.map((period: any) =>
                    period.period === selectedPeriod ? { ...period, isAvailable: true } : period
                  ),
                };
              }
              return openTime;
            });
            const availableTimeDocRef = doc(db, "availableTime", document.id);
            await updateDoc(availableTimeDocRef, { openTime: updatedOpenTime });
          });
      
          alert("預約已取消囉");
        } catch (error) {
          console.error("刪除錯誤", error);
        }
      }
      
    
    // 抓預約資料
    async function load(email: string) {
        try {
            const q = query((collection(db, "reservation")), where("email", "==",email),orderBy("date","desc"));
            const unsubscribe = onSnapshot(q,(querySnapshot)=>{
                const reservation =[];
                const records = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        date: data.date,
                        time: data.time,
                        teacher: data.teacher,
                        teacherEmail:data.teacherEmail,
                        topic: data.topic,
                        roomLink:data.roomLink
                    };
                });
                setRecordData(records);
            });
            
            
        } catch (error) {
            console.error("有點問題", error);
        }
    }
    
    return(
        <div className="tracking-wide container mx-auto p-4 mb-10">
            <div className="relative overflow-x-auto shadow-md ">
                <table className="w-full text-base text-left rtl:text-right text-gray-500 ">
                    <thead className="text-sm sm:text-base text-center text-gray-700 uppercase bg-sisal-200 ">
                        <tr>
                            <th scope="col" className="px-3 py-3"> 預約日期</th>
                            <th scope="col" className="px-3 py-3"> 預約時間</th>
                            <th scope="col" className="px-3 py-3"> 輔導老師</th>
                            <th scope="col" className="px-3 py-3"> 諮詢主題</th>
                            <th scope="col" className="px-3 py-3"> 諮詢連結</th>
                            <th scope="col" className="px-3 py-3"> 取消預約</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordData.length > 0 ? (
                            recordData.map((record) => (
                                <tr key={record.id} className="text-sm sm:text-base text-center font-normal text-gray-900 bg-white border-b hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap">{record.date}</td>
                                    <td className="px-3 py-4">{record.time}</td>
                                    <td className="px-2 py-4">{record.teacher}</td>
                                    <td className="px-3 py-4">{record.topic}</td>
                                    <a href={record.roomLink}>
                                        <td className="px-2 py-4 text-orange-600 ">連結</td>
                                    </a>
                                    <td className="px-6 py-4 text-right">
                                        <div className="text-center font-medium text-sisal-600 hover:underline" onClick={() => deleteRecord(record.id, record.teacherEmail, record.date, record.time)}>取消預約</div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    沒有預約記錄
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}