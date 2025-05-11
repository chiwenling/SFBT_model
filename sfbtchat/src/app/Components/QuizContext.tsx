"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Questions from './questions';

interface QuizType {
  questionIndex: number;
  setQuestionIndex: (index: number) => void;
  userResponses: (number | null)[];
  setUserResponses: (responses: (number | null)[]) => void;
  score: number;
  calculateScore: () => void;
  restartQuiz: () => void;
}

const QuizContext = createContext<QuizType | undefined>(undefined);
interface QuizProviderProps {
  children: ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [userResponses, setUserResponses] = useState<(number | null)[]>(
    Array(Questions.length).fill(null)
  );
  const [score, setScore] = useState<number>(0);

  const calculateScore = () => {
    let newScore = 0;
    userResponses.forEach((response, index) => {
      if (response !== null && Questions[index].responses[response].value) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const restartQuiz = () => {
    setQuestionIndex(0);
    setUserResponses(Array(Questions.length).fill(null));
    setScore(0);
  };

  return (
    <QuizContext.Provider
      value={{
        questionIndex,
        setQuestionIndex,
        userResponses,
        setUserResponses,
        score,
        calculateScore,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizType {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
