// 這是首頁
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-12 text-left">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">歡迎您參與本次實驗</h1>

        <p className="text-gray-700 mb-8 text-xl leading-relaxed">
          在實驗過程中，請您依照畫面中指示回答問題。接下來會請您回顧過往經驗，思考如何針對您的求職目標做準備。
        </p>
        <p className="text-gray-700 mb-8 text-xl leading-relaxed">
          完整實驗預計需要 30 分鐘。
        </p>
        <p className="text-gray-700 mb-8 text-xl leading-relaxed">
          本實驗的過程中可能觸及您過往的經驗或引發情緒反應。若在實驗進行中出現負向情緒造成您的不舒服，您可隨時終止實驗，並請告知實驗人員。感謝。
        </p>

        <Link href="/enter1/test01">
          <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-medium">
            開始實驗
          </button>
        </Link>
      </div>
    </div>
  );
}



{/* <p className="text-gray-700 mb-4 text-lg">
            本實驗的過程中可能觸及您過往的經驗或引發情緒反應。若在實驗進行中出現負向情緒造成您的不舒服，您可隨時終止實驗，並請告知實驗人員。感謝。
          </p> */}



