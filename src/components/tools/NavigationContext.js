"use client";

import { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <NavigationContext.Provider value={{ showNav, setShowNav }}>
      {children}
    </NavigationContext.Provider>
  );
};
