"use client"

import Admin from "../Components/Admin";
import Record from "../Components/Record";
import ApplyForAdmin from "../Components/ApplyForAdmin";
import React, { useEffect } from 'react';
import { selectCurrentUser } from '../../../lib/features/auth/authSlice';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Profile() {
  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  console.log("看一下有沒有user", user)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        router.push("/login");
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [user, router]);

  return (
    <div className="mt-20">
      {/* <ApplyForAdmin />  */}
      <Admin />
      {/* <Record /> */}
    </div>
  );
}
