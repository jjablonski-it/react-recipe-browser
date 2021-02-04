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

  const getItems = async (...keywords: string[]) => {
    dispatch({ type: "ITEMS_LOADING" });
    const q = keywords.join(" ");
    const { data } = await axios.get<ApiResponse>("/api", {
      params: {
        q,
      } as ApiRequest,
    });

    data.hits = data.hits.map((hit) => (hit as any).recipe);
    dispatch({ type: "ITEMS_LOADED", payload: data.hits });
  };

  return (
    <Context.Provider value={{ ...state, getItems }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
