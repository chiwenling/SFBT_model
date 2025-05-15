"use client";
import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc } from "firebase/firestore"
import { db } from "./../../../firebase"
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../lib/features/auth/authSlice";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


export default function ChatComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState([
    { type: "received", content: "嗨，上週過得好嗎～很高興有機會和你聊聊！"},
    { type: "received", content: "我們可以一起討論看看，你想要找什麼樣的工作或實習呢？"},
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTime, selectCurrentTime] = useState("");
  const user = useSelector(selectCurrentUser);
  const [chatEnd, setChatEnd] = useState(false);

  // 處理使用者送出訊息
  const handleSend = async (prompt: string, isHidden = false) => {
    setInputValue("");
    if (prompt.trim() === "") {
      return
    };
    inputRef.current?.focus();

    if (!isHidden) {
      setMessages(prevMessages => [...prevMessages, { type: "sent", content: prompt }]);;
      setLoading(true);
    };

    try {
      // 串接AI 向後端發送請求
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("收到的data", data);
      setMessages(function (prevMessages) {
        return [
          ...prevMessages,
          { type: "received", content: data.response }
        ]
      });

    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", content: "不好意思，忙線中，請稍後再試。" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 停止對話
  async function stopTalk() {
    await handleSend("我想結束談話");
    setChatEnd(true);
  }

  // 儲存對話
  async function saveHistory() {
    try {
      if (user && user.email) {
        await addDoc(collection(db, "chatHistory"), {
          time: currentTime,
          email: user.email,
          message: messages,
          id: user.uid
        });
        alert("本次對話已儲存");
      } else {
        console.log("儲存失敗");
      }
    } catch (error) {
      console.log("有錯", error)
    }
  }

  useEffect(() => {
    if (inputValue === "我想結束談話") {
      alert("本次對話已儲存")
    }
  }, [inputValue]);

  // 取得目前的時間，useEffect空陣列只會讀取一次 
  useEffect(() => {
    const now = new Date().toLocaleString();
    selectCurrentTime(now);
  }, []);


  return (
    <div>
      <div className="lg:ml-10 sm:ml-3 lg:w-[1000px] md:w-[800px] sm:min-w-[300px] tracking-wide p-4">
        <div className="bg-white rounded-lg shadow-xl p-4">
          <div className="m-3 flex flex-col items-center">
            <div className="flex mb-3 text-sisal-900">開啟對話時間：{currentTime}</div>
            <div className="flex mb-5 text-red-900 items-start">小提醒：每次對話結束後，將無法重啟對談。</div>
          </div>
          <div className="mt-5 mb-5 ml-3">
            <div className="text-xl font-medium">職涯輔導員</div>
          </div>

          <div className="space-y-4">
            {messages.map((message, index) =>
              message.type === "received" ? (
                <div key={index} className="flex items-start">
                  <div className="ml-1 mb-5 bg-gray-100 shadow p-3 tracking-wider rounded-lg max-w-xl">
                    <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}
                      components={{
                        h3: ({ node, ...props }) => (
                          <>
                            <hr className="border-gray-300 my-4" />
                            <div className="flex items-center mb-2">
                              <span className="mr-2 text-xl">✓</span>
                              <h3 className="text-xl font-extrabold text-sisal-700 my-2" {...props} />
                            </div>
                          </>
                        ),
                        h2: ({ node, ...props }) => (
                          <>
                            <hr className="border-gray-400 my-6" />
                            <h2 className="text-xl font-bold text-sisal-700 mt-6 mb-3" {...props} />
                          </>
                        ),
                        // 自定義段落樣式
                        p: ({ node, ...props }) => <p className="text-base text-gray-800" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div key={index} className="flex items-end justify-end">
                  {/* 使用深色背景訊息框來顯示發送的訊息 */}
                  <div className="bg-sisal-400 p-3 rounded-lg max-w-xl">
                    <p className="text-md text-white">{message.content}</p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-4 flex pl-10">
            <input 
              type="text" 
              placeholder="請放心輸入內容～輸入完畢，請用滑鼠點選右方「送出」"
              className="flex-1 py-3 px-3 pl-10 rounded-full bg-gray-100 focus:outline-none text-md"
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}  
              onClick={() => handleSend(inputValue)} 
              disabled={loading}    
            />
            <button
              className="px-4 py-2 ml-3 text-white rounded-full bg-blue-500 hover:bg-blue-400 disabled:bg-gray-400 disabled:hover:bg-gray-400"
              onClick={() => handleSend(inputValue)}
              disabled={loading || chatEnd}
            >
              {loading ? "請稍等..." : "送  出"}
            </button>
          </div>
        </div>
      </div>
      <div className="flex mt-5 ml-10 items-left mb-5 flex-col">
        <div className="ml-10 text-base tracking-wider">1.  如果您想要結束對話，請點選結束對話。</div>
        <div className="ml-10 text-base tracking-wider">2. 結束後，請您再次點擊儲存對話，並且舉手告知實驗人員。</div>
      </div>
      <div className="ml-20">
         <button className={chatEnd ? "bg-red-700 text-white px-4 py-2 rounded-full ml-3 hover:bg-red-500" : "bg-sisal-700 text-white px-4 py-2 rounded-full ml-3 hover:bg-sisal-500"}
              onClick={chatEnd ? saveHistory : stopTalk}
            >{chatEnd ? "儲存對話" : "結束對話"}</button>
      </div>     
    </div>
  );
};







