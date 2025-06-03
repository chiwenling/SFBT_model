// 這是首頁
import Link from "next/link";
import React from "react";
export default function Home() {
  return (
    <div className="h-screen mt-10 bg-gray-100 text-lg">
     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <p className="text-gray-700 mb-10">
          歡迎您參與本次實驗，在實驗過程中，請您依照任務指示，寫下您目前在尋求工作時所遇到的困難與自身的求職目標。請您回顧過往經驗，思考如何針對您的求職目標，找到最小可執行的下一步，完整實驗預計需要30分鐘。
        </p>
      </div>
    </div>
    </div>
  );
}







