import axios from "axios";
import React, { createContext, useReducer } from "react";
import { reducer } from "./Reducer";
import { ApiRequest, ApiResponse, Recipe, State } from "./types";
import qs from "qs";

const initialState: State = {
  items: [],
  saved: JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("saved")) || "[]"
  ),
  prevItemsCount: 0,
  keywords: [],
  loading: false,
  more: true,
};

export const Context = createContext(initialState);
let lastQ = "";

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, saved } = state;

  const getItems = async (keywords: string[]) => {
    keywords = keywords.filter((kw) => !!kw);
    if (keywords.length === 0) return;
    dispatch({ type: "ITEMS_LOADING" });

    const q = keywords.join(" ");
    const isSame = q === lastQ;
    lastQ = q;

    const { data } = await axios.get<ApiResponse<Recipe>>("/api", {
      params: {
        q,
        from: isSame ? items.length : 0,
      } as ApiRequest,
    });

    if (isSame) {
      dispatch({ type: "ITEMS_APPEND", payload: data.hits });
    } else {
      dispatch({ type: "ITEMS_LOADED", payload: data.hits });
    }

    dispatch({ type: "SET_MORE", payload: data.more });
  };

  const getSaved = async () => {
    dispatch({ type: "ITEMS_LOADING" });

    const { data } = await axios.get<Recipe[]>("/api/saved", {
      params: {
        r: saved,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
    dispatch({ type: "ITEMS_LOADED", payload: data });
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

  const toggleSaveItem = (uri: string) => {
    if (!state.saved.includes(uri)) {
      dispatch({ type: "SAVE_ITEM", payload: uri });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: uri });
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        getItems,
        addKeyword,
        removeKeyword,
        clearItems,
        toggleSaveItem,
        getSaved,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
