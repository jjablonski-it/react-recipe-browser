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

  useEffect(() => {
    dispatch({ type: "TEST" });
  }, []);

  const getItems = async (...keywords: string[]) => {
    const q = keywords.join(" ");
    const { data } = await axios.get<ApiResponse>("/api", {
      params: {
        q,
      } as ApiRequest,
    });
    console.log(data);
  };

  return (
    <Context.Provider value={{ ...state, getItems }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
