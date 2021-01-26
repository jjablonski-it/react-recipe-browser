import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

interface Recipe {
  [x: string]: any;
}

export interface State {
  items: Recipe[];
  loading: boolean;
  keywords: string[];
}

export type Action = { type: "TEST" };

const initialState: State = {
  items: [],
  keywords: [],
  loading: false,
};

export const Context = createContext<State>(initialState);

export const Provider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return null;
};
