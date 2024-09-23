"use client"

import React from "react";
import { store } from "../store";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from 'next-auth/react'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </SessionProvider>
  );
};

export default Provider