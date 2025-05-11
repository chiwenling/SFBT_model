'use client'; 
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

interface availableTime {
  id:string,
  email:string,
  openTime:{
    date: Date;
    periods: {
      period:string;
      isAvailable:boolean;
    }[];
  }[];
};

const SetTime = () => {
  const user = useSelector(selectCurrentUser);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(true); 
  const [openTime, setOpenTime]= useState<availableTime["openTime"]>([]);
  
  const handleDateToString = (date:any) => {
    if (date) {
      const saveDate = date.toLocaleDateString('zh-CN'); 
      setSelectedDate(saveDate); 
    }
  };

  const handleAddPeriod = () => {
    if (startTime && endTime && selectedDate) {
      const periods:{
        period: string; 
        isAvailable: boolean 
      }[]= [];

      const start = parseInt(startTime);
      const end = parseInt(endTime);
      if (end - start !== 1) {
        alert("請您一次選擇1個小時");
        return;
      }
      periods.push({
        period: `${start}:00 - ${end}:00`,
        isAvailable: true,
      });
      
    
    // 檢查有沒有已登記開放的時段
    let foundDate = false;
    const newOpenTime = openTime.map(function(preOpenTime){
      if  (preOpenTime.date.toString() === selectedDate.toString()) {
          foundDate = true; 
          const updatedPeriods = [...preOpenTime.periods];
          periods.forEach(function(newPeriod){
            let foundPeriod = false;
            for (let i = 0; i < preOpenTime.periods.length; i++) {
              if (preOpenTime.periods[i].period === newPeriod.period) {
                foundPeriod = true;
                alert("你重複增加囉");
              }
            }
            if (!foundPeriod) {
              updatedPeriods.push(newPeriod);
            }
          });
             preOpenTime.periods = updatedPeriods;
            }
            return preOpenTime;
          });

      if (!foundDate) {
        newOpenTime.push({
          date: selectedDate,
          periods: periods,
        });
      };
      setOpenTime(newOpenTime);
      setStartTime('');
      setEndTime('');
      }
    };
  
const handleRemovePeriod = (dateIndex: number, periodIndex: number) => {
  const selectedPeriod = openTime[dateIndex].periods[periodIndex];

  if (!selectedPeriod.isAvailable) {
    alert("該時間已被預約，無法刪除。");
    return; 
  }

  setOpenTime((prevOpenTime) => {
    const newOpenTime = [...prevOpenTime];
    const periods = newOpenTime[dateIndex].periods;

    periods.splice(periodIndex, 1); 
    if (periods.length === 0) {
      newOpenTime.splice(dateIndex, 1); 
    }
    return newOpenTime;
  });
};

  // 存目前有的資料
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(doc(db, "availableTime", user.uid), {
          openTime:openTime,
          id:user.uid,
          email:user.email,
        });
        alert("已更新資料");
      } catch (error) {
        console.error('有錯', error);
        alert("請重新儲存");
      }
    }
  };

  // 取得目前有空的時間
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, "availableTime", user.uid);
          const docSnap = await getDoc(docRef);

          if(docSnap.exists()) {
            const isAdmin = docSnap.data().isAdmin;
            const date = docSnap.data().openTime;
            setLoading(false);
            setOpenTime(docSnap.data().openTime);
          } else {
            console.log("還沒有編輯時間");
          }
        } catch (error) {
          console.error("fetch有問題:", error);
          setLoading(false);
        }
      }
    };
  
    fetchProfile();
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="tracking-wider mt-10 container mx-auto p-4 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">設定開放預約時段</h2>
        <div className="mb-4">
          <span className="text-lg font-normal text-base block m-2">Step 1 : 選擇日期</span>
          <DatePicker selected={selectedDate} onChange={handleDateToString} dateFormat="yyyy年MM月dd日"
            className="w-full border p-2 rounded-lg" required/>
        </div>

        <div className="mb-4 ">
          <span className="text-lg font-normal text-base block m-2">Step 2 : 選擇時間</span>
          <span className="pl-2 text-red-500">注意：請一次選擇1個小時</span>
        </div>

        <div className="flex items-center justify-start ml-2 mb-4 flex ">
            <label className="text-gray-700">開始時間</label>
            <input type="number" value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder="9" className="w-1/8 border p-2 ml-4 rounded-lg" min="9" max="20"/>
            <label className="text-gray-700 ml-4 ">結束時間</label>
            <input type="number" value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="17" className="w-1/8 border p-2 ml-4 rounded-lg" min="10" max="21"/>
        </div>

        <button type="button" onClick={handleAddPeriod} className="w-1/3 sm:w-1/4 bg-sisal-800 text-white px-4 py-2 rounded-lg hover:bg-sisal-600">
          增加預約時段
        </button>

        <div className="mt-6">
          <span className="text-lg font-normal block m-2">Step 3 : 檢視輔導時間</span>
              {!openTime || openTime.length === 0 ? (
                <p className="text-gray-500 mt-2">還未設定可預約時段</p>
              ) : (
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full table-auto">
                    <thead className="bg-sisal-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">日期</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">輔導時間</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-semibold">狀態檢視</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {openTime.map((slot, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border">
                            {new Date(slot.date).toLocaleDateString('zh-CN')}
                          </td>
                          <td className="px-4 py-2 border">
                            {slot.periods.map((periodpreOpenTime, periodIndex) => (
                              <div key={periodIndex} className="mb-2">
                                {periodpreOpenTime.period}
                              </div>
                            ))}
                          </td>

                          <td className="px-4 py-2 border">
                            {slot.periods.map((periodpreOpenTime, periodIndex)=>(
                              <div key={periodIndex} className="mb-2">
                                {periodpreOpenTime.isAvailable ? (
                                  <button type="button" onClick={() => handleRemovePeriod(index, periodIndex)} className="text-sm bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                                    刪除
                                  </button>
                                ) : (
                                  <button type="button" disabled className="text-start bg-gray-300 text-gray-500 px-3 py-2 mt-1 rounded-lg cursor-not-allowed text-sm">
                                    已被預約，無法刪除
                                  </button>
                                )}
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
        
        <div className="mb-4 ">
          <span className="text-lg font-normal text-base block m-2">Step 4 : 按下儲存更新本次更改紀錄</span>   
          <button type="submit" id="save" className="rounded-lg w-1/4 px-4 py-2 m-1 rounded bg-orange-500 text-white hover:bg-sisal-400 focus:outline-none transition-colors">
            儲存
          </button>
        </div>
      </div>
    </form>
  );
};

export default SetTime;
