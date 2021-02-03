import React, { createContext, useEffect, useReducer } from "react";
import { State } from "./types";
import { reducer } from "./Reducer";

const initialState: State = {
  items: [],
  keywords: [],
  loading: false,
};

export const Context = createContext(initialState);

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "TEST" });
  }, []);

  const getItems = async (keywords: string[]) => {
    const result = await fetch("/api/getRecipes");
    const data = await result.json();
    console.log(data);
  };

  return (
    <Context.Provider value={{ ...state, getItems }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
