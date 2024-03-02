'use client'
import React from 'react';
import { Provider } from 'react-redux';
import store from '../lib/store';


const DasboardLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DasboardLayout;