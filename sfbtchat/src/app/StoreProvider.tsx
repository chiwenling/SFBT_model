'use client';

import React, { useMemo } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../../lib/store';

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const store = useMemo(() => makeStore(), []); 

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
