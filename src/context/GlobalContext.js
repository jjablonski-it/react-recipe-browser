import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Api info
const api_key = "998d1837e99b9133559bd3adafb1c0af";
const app_id = "8b586bbd";

// Settings
const limit = 100;

// Initial state
const initialState = {
  items: [],
  itemsLoading: false,
  keywords: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getItems = q => {
    dispatch({ type: "ITEMS_LOADING" });
    axios
      .get(
        `https://api.edamam.com/search?app_key=${api_key}&app_id=${app_id}&to=${limit}&q=` +
          q
      )
      .then(res => dispatch({ type: "ITEMS_LOADED", payload: res.data }));
  };

  const addKeyword = kw => {
    dispatch({ type: "ADD_KEYWORD", payload: kw });
  };

  const removeKeyword = kw => {
    const id = state.keywords.indexOf(kw);
    dispatch({ type: "REMOVE_KEYWORD", payload: id });
  };

  const { items, itemsLoading, keywords } = state;
  return (
    <GlobalContext.Provider
      value={{
        items,
        itemsLoading,
        keywords,
        getItems,
        addKeyword,
        removeKeyword
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
