import React, { createContext, useEffect, useReducer } from "react";
import { State } from "./types";
import { reducer } from "./Reducer";

const initialState: State = {};

const Context = createContext(initialState);

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "TEST" });
  }, []);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export default ContextProvider;
