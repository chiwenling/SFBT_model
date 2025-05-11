"use client";
import React, { useRef, useEffect, useState } from "react";
import { useScore } from "./ScoreContext"; 
import { useSelector } from 'react-redux';
import Questions from "./questions";
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import Link from "next/link";

const QuizComponent = () => {
  const { setScore } = useScore(); 
  const user = useSelector(selectCurrentUser);
  const [questionIndex, setQuestionIndex] = useState(0); 
  const [userResponses, setUserResponses] = useState<number[]>([]); 
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isLast = questionIndex >= Questions.length - 1;
  const unanswered = userResponses[questionIndex] == null;
  const buttonLabel = isLast ? "結算分數" : "下一題";

  const handleOptionSelect = (questionIndex: number, responseValue: number) => {
    const newResponses = [...userResponses];
    newResponses[questionIndex] = responseValue; 
    setUserResponses(newResponses);
    const totalScore = newResponses.reduce(function(total, value){
      return total+value
    })
    setScore(totalScore);
    console.log(totalScore);
  };

  const prev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const next = () => {
    if (!isLast) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleClick = () => {
    if (isLast) {
      console.log("結算分數");
    } else {
      next(); 
    }
  };

  

  return (
    <section className="container mx-auto my-20 p-20 pt-10 mt-22 bg-gradient-to-b from-sisal-100 to-orange-200 rounded-2xl shadow-2xl max-w-2xl">
      <div className="space-y-1">
        {Questions.map((question, index) => (
          <div key={index} id={`question-${index}`}
            ref={(element) => {
              questionRefs.current[index] = element;
            }}
            
            className={`transition-opacity duration-700 ease-in-out ${
              index === questionIndex
                ? "opacity-100 max-h-screen"
                : "opacity-0 max-h-0 overflow-hidden"
            }`}>
            <div className="mb-10">
              <h1 className="tracking-wider text-2xl font-normal text-sisal-900 text-center pb-4">
                自我狀態檢測
              </h1>
              <div className="pb-5 text-center text-light">請選出最符合現況的選項</div>
            
              <div className="flex justify-center m-3">
                <div className="w-1/3 text-center text-base text-sisal-800 bg-sisal-300 py-3 rounded-lg shadow-md">
                  {`完成 ${index + 1} / ${Questions.length}題`}
                </div>
              </div>
              
              <div className="flex justify-center items-center my-10">
                <div className="flex items-center w-1/3 mx-4 bg-gray-400 rounded-full overflow-hidden h-2">
                  <div style={{ width: `${((index + 1) / Questions.length) * 100}%` }} className="bg-yellow-500 h-full rounded-full transition-width duration-500 ease-in-out" />
                </div>
              </div>
            </div>

            <div className="bg-orange-100 p-5 rounded-lg shadow-lg">
              <h2 className="text-lg text-center font-normal mb-6 text-gray-900">
                Q : {question.text}
              </h2>

              <div className="space-y-5 w-1/2 mx-auto">
                {question.responses.map((response, responseIndex) => (
                  <div key={responseIndex} onClick={() => handleOptionSelect(index, response.value)}
                    className={`p-2 border-2 text-center rounded-xl cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 
                      ${ userResponses[index] === response.value
                          ? "bg-sisal-600 text-white border-sisal-300"
                          : "bg-white text-sisal-700 border-sisal-300 hover:bg-sisal-300"
                    }`}
                  >
                    {response.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex justify-between">
              <button onClick={prev} disabled={index < 1} className="bg-gray-200 text-gray py-3 px-8 rounded-lg shadow-md disabled:opacity-50 hover:bg-sisal-500 transition-colors duration-300 ease-in-out transform hover:scale-105 hover:text-white">
                回到上一題
              </button>
              {isLast ? (
                <Link href="/booking" className={`bg-gray-100 text-white py-3 px-8 rounded-lg shadow-md transition-colors duration-300 ease-in-out 
                  ${unanswered
                      ? "bg-gray-400 text-gray-400 cursor-not-allowed"
                      : "bg-gray-400 text-gray hover:bg-sisal-500"
                  }`}
                >{buttonLabel}
                </Link>
              ) : (
                <button onClick={handleClick} disabled={unanswered}
                  className={`bg-gray-100 text-white py-3 px-8 rounded-lg shadow-md transition-colors duration-300 ease-in-out 
                  ${unanswered
                      ? "bg-gray-400 text-gray-400 cursor-not-allowed"
                      : "bg-gray-400 text-gray hover:bg-sisal-500"
                  }`}
                >
                  {buttonLabel}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuizComponent;
