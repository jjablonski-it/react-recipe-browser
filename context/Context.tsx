import axios from "axios";
import React, { createContext, useReducer } from "react";
import { reducer } from "./Reducer";
import {
  ApiRequest,
  ApiResponse,
  FilterState,
  Recipe,
  SortKey,
  State,
} from "./types";
import qs from "qs";

const isClient = typeof window !== "undefined";

const initialState: State = {
  items: [],
  prevItemsCount: 0,
  keywords: [],
  loading: false,
  more: true,
  saved: JSON.parse((isClient && localStorage.getItem("saved")) || "[]"),
  sortBy: (isClient && (localStorage.getItem("sortBy") as SortKey)) || "",
  sortAsc: isClient && "true" == localStorage.getItem("sortAsc"),
  filters: { health: [], diet: [] },
  excluded: [],
};

export const Context = createContext(initialState);
let lastQ = "";

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { items, saved, sortBy, sortAsc, filters, excluded } = state;

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
        ...filters,
        excluded,
      } as ApiRequest,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
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
    dispatch({ type: "SET_MORE", payload: false });
  };

  const setKeywords = (keywords: string[]) => {
    dispatch({ type: "SET_KEYWORDS", payload: keywords });
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

  const sortItems = (key: SortKey) => {
    let asc = true;
    if (key === sortBy) {
      if (!sortAsc) key = "";
      else asc = false;
    }
    dispatch({ type: "SORT_ITEMS", payload: { key, asc } });
  };

  const setFilters = (filters: FilterState) => {
    dispatch({ type: "SET_FILTERS", payload: filters });
  };

  const addExclude = (value: string) => {
    dispatch({ type: "ADD_EXCLUDE", payload: value });
  };

  const removeExclude = (value: string) => {
    dispatch({ type: "REMOVE_EXCLUDE", payload: value });
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
        sortItems,
        setFilters,
        addExclude,
        removeExclude,
        setKeywords,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
