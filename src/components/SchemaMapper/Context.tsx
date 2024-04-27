import React, { createContext, useContext, FC, ReactNode } from "react";

// Define the shape of your context value
interface MapperContextValue {
  file: File;
}

type File = {
  fileName: string;
  columns: number;
  sheets: Sheet[] | Sheet; // Accept either 1 sheet or the sheet array, we should handle this logic separately on upload
};

type Sheet = {
  _name: string;
  _sheetIndex: number;
  _sheetColumns: number;
};

// Create the context
const Mapper = createContext<MapperContextValue | undefined>(undefined);

// Create a custom hook to access the context
export const useMapper = () => {
  const context = useContext(Mapper);
  if (!context) {
    throw new Error("useMapper must be used within a Mapper Context Provider");
  }
  return context;
};

// Create a provider component
export const MapperContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Add your context state and methods here

  return <Mapper.Provider value={undefined}>{children}</Mapper.Provider>;
};
