import React, { createContext, useEffect, useReducer } from "react";
import { State } from "./types";
import Reducer from "./Reducer";

const initialState: State = {};

const Context = createContext(initialState);

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export default ContextProvider;
