// app/components/AuthListener.tsx
'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut, setLoading } from '../../../lib/features/auth/authSlice';
import { auth } from "../../../firebase";
import { AppDispatch } from '../../../lib/store';

function AuthListener() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(userLoggedIn({ uid: user.uid, email: user.email, isAdmin: false  }));
      } else {
        dispatch(userLoggedOut());
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;
