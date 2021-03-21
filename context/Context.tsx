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
import {
  countIngredients,
  getObjectFromLocalStorage,
  getValueFromLocalStorage,
} from "../utils/helpers";

const initialState: State = {
  items: [],
  results: 0,
  prevItemsCount: 0,
  keywords: [],
  loading: false,
  more: true,
  saved: getObjectFromLocalStorage("saved", []),
  sortBy: getValueFromLocalStorage("sortBy", ""),
  sortAsc: "true" == getValueFromLocalStorage("sortAsc", "true"),
  filters: getObjectFromLocalStorage("filters", { health: [], diet: [] }),
  excluded: [],
  error: "",
};

export const Context = createContext(initialState);
let lastQ = "";

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { results, saved, sortBy, sortAsc, filters, excluded } = state;

  const getItems = async (keywords: string[]) => {
    const q = getKeywords(keywords);
    console.log(q);

    dispatch({ type: "ITEMS_LOADING" });
    lastQ = q;

    const data = await loadData("/api", { q, excluded, ...filters });
    if (!data) return;
    const { hits, more } = data;

    dispatch({ type: "ITEMS_LOADED", payload: hits });
    dispatch({ type: "SET_MORE", payload: more });
  };

  const appendItems = async () => {
    dispatch({ type: "ITEMS_LOADING" });

    const data = await loadData("/api", {
      from: results,
      q: lastQ,
      excluded,
      ...filters,
    });
    if (!data) return;
    const { hits, more } = data;

    dispatch({ type: "ITEMS_APPEND", payload: hits });
    dispatch({ type: "SET_MORE", payload: more });
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

  const addKeywords = (keywords: string[]) => {
    keywords = keywords
      .map((kw) => kw.trim().toLowerCase().replace(",", ""))
      .filter((kw) => !!kw);
    dispatch({ type: "ADD_KEYWORDS", payload: keywords });
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

  const setError = (error: string) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const resetError = () => {
    dispatch({ type: "RESET_ERROR" });
  };

  const loadData = async (
    uri: string,
    { excluded, q, from = 0, health, diet }: ApiRequest
  ) => {
    try {
      const { data } = await axios.get<ApiResponse<Recipe>>(uri, {
        params: {
          q,
          from,
          health,
          diet,
          excluded,
        } as ApiRequest,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });
      return { ...data, hits: countIngredients(data) };
    } catch (e) {
      setError("Too many requests! Try again in a minute.");
      return null;
    }
  };

  return (
    <Context.Provider
      value={{
        ...state,
        getItems,
        addKeywords,
        removeKeyword,
        clearItems,
        toggleSaveItem,
        getSaved,
        sortItems,
        setFilters,
        addExclude,
        removeExclude,
        setKeywords,
        appendItems,
        setError,
        resetError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

const getKeywords = (keywords: string[]): string => {
  keywords = keywords.filter((kw) => !!kw);
  return keywords.join(" ");
};
