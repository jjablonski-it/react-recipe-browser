import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  items: [],
  itemsLoading: false
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
        "https://api.edamam.com/search?app_key=998d1837e99b9133559bd3adafb1c0af&app_id=8b586bbd&to=100&q=" +
          q
      )
      .then(res => dispatch({ type: "ITEMS_LOADED", payload: res.data }));
  };

  return (
    <GlobalContext.Provider
      value={{ items: state.items, itemsLoading: state.itemsLoading, getItems }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
