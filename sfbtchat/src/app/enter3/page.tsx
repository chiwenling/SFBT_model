// 這是首頁
import Link from "next/link";
import React from "react";
export default function Home() {
  return (
    <div className="h-screen mt-10 bg-gray-100 text-lg">
     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
         <p className="text-gray-700 mb-10">
          歡迎您參與本次實驗。
        </p>
        <p className="text-gray-700 mb-10">
          在實驗過程中，請您依照任務指示回答問題，請您回顧過往經驗，思考如何針對您的求職目標做準備，完整實驗預計需要30分鐘。
        </p>
        
      
        <p className="text-gray-700 mb-4">
          本實驗的過程中可能觸及您過往的經驗或引發情緒反應。若在實驗進行中出現負向情緒造成您的不舒服，您可隨時終止實驗，並請告知實驗人員。感謝。
        </p>
        <Link href="/enter3/test03">
        <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          開始實驗
        </button>
        </Link>
      </div>
    </div>
    </div>
  );
}







