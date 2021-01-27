import axios from "axios";
import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";
interface Recipe {
  [x: string]: any;
}
export interface State {
  items: Recipe[];
  loading: boolean;
  keywords: string[];
  getItems?: any;
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

const { API_URL, API_KEY, APP_ID } = process.env;

export const Provider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getItems = async () => {
    dispatch({ type: "ITEMS_LOADING" });
    const res = await axios.get(API_URL, {
      params: { api_key: API_KEY, app_id: APP_ID },
    });
    console.log(res);

    dispatch({ type: "ITEMS_LOADED" });
  };
  return (
    <Context.Provider value={{ ...state, getItems }}>
      {children}
    </Context.Provider>
  );
};
