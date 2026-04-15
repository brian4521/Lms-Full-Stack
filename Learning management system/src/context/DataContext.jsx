import { createContext } from "react";

export const DataContext = createContext();

const value = {};

export const DataContextProvider = (props) => {
  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
