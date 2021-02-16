import React, { createContext, useEffect, useReducer } from "react";
import { ApiRequest, ApiResponse, State } from "./types";
import { reducer } from "./Reducer";
import axios from "axios";

const initialState: State = {
  items: [],
  keywords: [],
  loading: false,
  more: false,
};

export const Context = createContext(initialState);
let lastQ = "";

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { keywords, items } = state;

  const getItems = async (keywords: string[]) => {
    if (keywords.length === 0) return;
    dispatch({ type: "ITEMS_LOADING" });

    const q = keywords.join(" ");
    const isSame = q === lastQ;
    lastQ = q;

    const { data } = await axios.get<ApiResponse>("/api", {
      params: {
        q,
        from: isSame ? items.length : 0,
      } as ApiRequest,
    });

    data.hits = data.hits.map((hit) => (hit as any).recipe);
    if (isSame) {
      dispatch({ type: "ITEMS_APPEND", payload: data.hits });
    } else {
      dispatch({ type: "ITEMS_LOADED", payload: data.hits });
    }

    dispatch({ type: "SET_MORE", payload: data.more });
  };

  const addKeyword = (keyword: string) => {
    dispatch({ type: "ADD_KEYWORD", payload: keyword });
  };

  const removeKeyword = (keyword: string) => {
    dispatch({ type: "REMOVE_KEYWORD", payload: keyword });
  };

  const clearItems = () => {
    dispatch({ type: "CLEAR_ITEMS" });
  };

  return (
    <Context.Provider
      value={{ ...state, getItems, addKeyword, removeKeyword, clearItems }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
