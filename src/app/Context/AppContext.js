"use client";

import { createContext, useState } from "react";
export const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <AppContext.Provider value={[currentStep, setCurrentStep]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
