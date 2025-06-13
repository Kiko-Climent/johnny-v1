// NavigationContext.jsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const NavigationContext = createContext();
export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    // Si no estamos en home, mostramos el navbar por defecto
    if (router.pathname !== "/") {
      setShowNav(true);
    }
  }, [router.pathname]);

  return (
    <NavigationContext.Provider value={{ showNav, setShowNav }}>
      {children}
    </NavigationContext.Provider>
  );
};
