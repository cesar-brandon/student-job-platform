"use client";

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProviderProps } from "next-themes/dist/types";

import { TooltipProvider } from '@/components/ui/tooltip'

const queryClient = new QueryClient();

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
        </SessionProvider>
      </QueryClientProvider>
    </NextThemesProvider>
  );
};

export default Providers;
