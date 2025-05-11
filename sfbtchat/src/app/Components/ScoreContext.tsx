"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSelector} from "react-redux";
import { selectCurrentUser} from "../../../lib/features/auth/authSlice";
import { doc, setDoc, getDoc} from 'firebase/firestore';
import { db } from '../../../firebase';

interface ScoreContextType {
  score: number;
  setScore: (score: number) => void;
}


const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScoreState] = useState<number>(0);
  const user = useSelector(selectCurrentUser);
  
  useEffect(() => {
    const fetchScore = async () => {
      if (user) {
        try {
          const docRef = doc(db, "scores", user.uid);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()) {
            setScoreState(docSnap.data().score)
          } else {
            console.log("還沒分數");
          }
        } catch (error) {
          console.error("fetch有問題:", error);
        }
      }
    };
  
    fetchScore();
  }, [user]);
  

  const setScore = (newScore: number) => {
    setScoreState(newScore);
    updateScore(newScore);
    async function updateScore(newScore:number) {
        if(user){
        try {
          await setDoc(doc(db, "scores",user.uid), {
            email: user.email,
            score: newScore,
          });
          console.log("存了分數");
        } catch (error) {
          console.error('Error saving data to Firestore:', error);
        }  
      }
    };
  };

  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  );
};


export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("目前錯誤使用");
  }
  return context;
};
