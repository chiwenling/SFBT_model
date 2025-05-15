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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">參與資格條件</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>年滿 18 歲</li>
          <li>以中文為母語</li>
          <li>目前有求職意願，且正在尋找相關工作機會</li>
        </ul>
        <p className="text-gray-700 mb-10">
          請確認您符合上述條件，並且願意參與本次實驗，請填寫知情同意書。此次研究所蒐集的所有資料將進行匿名化處理，僅用於學術研究目的，請您安心執行實驗。
        </p>
        <p className="text-gray-700 mb-2 font-bold">
          最後提醒：
        </p>
        <p className="text-gray-700 mb-4">
          本實驗並非以治療為目的，但是在過程中仍有可能觸及您過往的經驗或引發情緒反應。若在實驗進行中出現嚴重負向情緒，您可隨時選擇終止實驗，並請告知實驗人員。感謝。
        </p>
        <Link href="/enter1/test01">
        <button className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          開始實驗
        </button>
        </Link>
      </div>
    </div>
    </div>
  );
}







