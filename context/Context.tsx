import React, { createContext, useEffect, useReducer } from "react";
import { ApiRequest, ApiResponse, State } from "./types";
import { reducer } from "./Reducer";
import axios from "axios";

const initialState: State = {
  items: [],
  keywords: [],
  loading: false,
};

export const Context = createContext(initialState);

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { keywords, items } = state;

  const getItems = async () => {
    dispatch({ type: "ITEMS_LOADING" });
    const q = keywords.join(" ");
    console.log(q);

    const { data } = await axios.get<ApiResponse>("/api", {
      params: {
        q,
        from: items.length,
      } as ApiRequest,
    });

    data.hits = data.hits.map((hit) => (hit as any).recipe);
    dispatch({ type: "ITEMS_LOADED", payload: data.hits });
  };

  const addKeyword = (keyword: string) => {
    dispatch({ type: "ADD_KEYWORD", payload: keyword });
  };

  const removeKeyword = (keyword: string) => {
    dispatch({ type: "REMOVE_KEYWORD", payload: keyword });
  };

  return (
    <Context.Provider value={{ ...state, getItems, addKeyword, removeKeyword }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
