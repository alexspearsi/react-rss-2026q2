'use client';

import { createContext, useContext, useTransition } from 'react';

interface NavContextValue {
  isPending: boolean;
  startNav: (fn: () => void) => void;
}

const NavContext = createContext<NavContextValue>({
  isPending: false,
  startNav: (fn) => fn(),
});

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isPending, startTransition] = useTransition();
  return (
    <NavContext.Provider value={{ isPending, startNav: startTransition }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
