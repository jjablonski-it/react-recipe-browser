import { cleanup } from "@testing-library/react";
import axios from "axios";
import React, { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";
interface Recipe {
  [x: string]: any;
}
export interface State {
  items: Recipe[];
  loading: boolean;
  keywords: string[];
}

export type Action =
  | { type: "TEST" }
  | { type: "ITEMS_LOADING" }
  | { type: "ITEMS_LOADED" };

const initialState: State = {
  items: [],
  keywords: ["test"],
  loading: false,
};

export const Context = createContext<State>(initialState);

export const Provider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  const getItems = async () => {
    dispatch({ type: "ITEMS_LOADING" });
    await axios.get("", { params: {} });
  };
  return <Context.Provider value={{ ...state }}>{children}</Context.Provider>;
};
