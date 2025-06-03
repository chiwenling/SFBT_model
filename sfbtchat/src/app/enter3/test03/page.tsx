'use client';

import React, { useState } from 'react';
import Button from '../../Components/Button';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [response1, setResponse1] = useState('');
  const [response2, setResponse2] = useState('');
  const [items, setItems] = useState([
  { id: uuidv4(), content: '' },
]);


  const handleDragEnd = (result: any) => {
  if (!result.destination) return;
  const newItems = Array.from(items);
  const [movedItem] = newItems.splice(result.source.index, 1);
  newItems.splice(result.destination.index, 0, movedItem);
  setItems(newItems);
};

const handleChange = (id: string, value: string) => {
  const newItems = items.map((item) =>
    item.id === id ? { ...item, content: value } : item
  );
  setItems(newItems);
};

const handleAddItem = () => {
  setItems([...items, { id: uuidv4(), content: '' }]);
};

  return (
    <div className="h-full max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* 活動說明 */}
      <section className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">活動說明</h1>
        <p className="text-lg leading-relaxed text-gray-700 text-justify">
          尋求工作或實習的過程中常常充滿挑戰與壓力。也許我們可以從你過去的經驗，或是從你目前能夠著手的事情上面開始努力。在本次活動中，我們希望您回顧自己過去的經歷，思考可以透過哪些行動找到你理想中的工作。
        </p>
        <div className="text-lg leading-relaxed text-gray-700 text-justify mt-15">
          現在的您正在尋找一份工作，請試著延伸思考，並在下方填寫您的想法：
          <br />
          <span className="font-medium text-gray-800">一、您想要找的工作是什麼？請盡量描述這份工作的內容和性質，以及您目前遇到的挑戰。</span>
          <br />
          <span className="font-medium text-gray-800">二、為了找到你想要的工作，您會採取哪些具體的行動，並說明理由，愈詳細愈好。</span>
          <br /> 
          <span className="font-medium text-gray-800">三、請將您打算採取的行動，依照您能實際執行的可能性與先後順序，完成排列</span>  
        </div>

        <p className="text-lg leading-relaxed text-gray-700 text-justify">
          您將有 <span className="font-semibold text-black">30 分鐘</span> 的時間進行思考與作答於下方空白輸入框。<br />
          所有問題皆沒有標準答案，您的回答內容將 <span className="font-semibold text-black">完全保密</span>，相關資訊僅用於本次實驗研究的分析，請您放心填答。
        </p>
      </section>

      <section className="bg-white rounded-xl shadow-md p-6 space-y-8">
        {/* 問題一 */}
        <div>
          <label htmlFor="response1" className="block text-lg font-medium text-gray-800 mb-2">
            一、您想要找的工作/實習是什麼？請盡量描述這份工作的內容與性質，以及您目前遇到的挑戰。
          </label>
          <textarea
            id="response1"
            rows={6}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="請描述您理想的工作內容、性質、環境與技能需求..."
            value={response1}
            onChange={(e) => setResponse1(e.target.value)}
          />
        </div>

        {/* 問題二 */}
        <div>
          <label htmlFor="response2" className="block text-lg font-medium text-gray-800 mb-2">
            二、為了獲得這份理想工作，您會採取哪些具體行動？請詳細說明您的行動計畫與原因。
          </label>
          <textarea
            id="response2"
            rows={6}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="請說明您預計採取的行動，例如進修、面試準備、人脈建立等..."
            value={response2}
            onChange={(e) => setResponse2(e.target.value)}
          />
        </div>

        {/* 問題三 */}

        <div>
          <label htmlFor="response2" className="block text-lg font-medium text-gray-800 mb-2">
           三、請將您預計採取的行動，依照你能實際執行的可能性與執行先後順序，在下方排列。
          </label>
          <textarea
            id="response2"
            rows={6}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="請排序1.2.3.4....."
            value={response2}
            onChange={(e) => setResponse2(e.target.value)}
          />
        </div>

        {/* 送出按鈕 */}
        <div className="mb-10 mt-6">
          <Button href="" text="送出" bg="bg-orange-400" />
        </div>
      </section>
    </div>
  );
}
