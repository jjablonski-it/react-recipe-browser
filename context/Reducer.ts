import {
  pushToLocalStorageList,
  removeFromLocalStorageList,
  saveObjectToLocalStorage,
} from "../utils/helpers";
import { Action, State } from "./types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ITEMS_LOADED":
      return {
        ...state,
        loading: false,
        items: action.payload,
        prevItemsCount: 0,
      };

    case "ITEMS_APPEND": {
      const prevItemsCount = state.items.length;

      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload],
        prevItemsCount,
      };
    }

    case "ITEMS_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "CLEAR_ITEMS":
      return { ...state, items: [] };

    case "ADD_KEYWORDS": {
      const { payload } = action;
      const newKeywords = payload.filter(
        (keyword) => !state.keywords.includes(keyword)
      );
      return { ...state, keywords: [...state.keywords, ...newKeywords] };
    }

    case "REMOVE_KEYWORD": {
      return {
        ...state,
        keywords: [
          ...state.keywords.filter((keyword) => keyword !== action.payload),
        ],
      };
    }

    case "SAVE_ITEM":
      pushToLocalStorageList("saved", action.payload);
      return { ...state, saved: [...state.saved, action.payload] };

    case "REMOVE_ITEM": {
      removeFromLocalStorageList("saved", action.payload);
      return {
        ...state,
        saved: [...state.saved.filter((item) => item !== action.payload)],
      };
    }

    case "SORT_ITEMS": {
      const { asc, key } = action.payload;
      localStorage.setItem("sortBy", key);
      localStorage.setItem("sortAsc", String(asc));
      return { ...state, sortBy: key, sortAsc: asc };
    }

    case "SET_FILTERS":
      saveObjectToLocalStorage("filters", action.payload);
      return { ...state, filters: action.payload };

    case "SET_KEYWORDS":
      return { ...state, keywords: action.payload };

    case "ADD_EXCLUDE": {
      const { payload } = action;
      if (state.excluded.includes(payload)) return state;
      return { ...state, excluded: [...state.excluded, payload] };
    }

    case "REMOVE_EXCLUDE": {
      return {
        ...state,
        excluded: [
          ...state.excluded.filter((filter) => filter !== action.payload),
        ],
      };
    }

    case "SET_MORE":
      return { ...state, more: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "RESET_ERROR":
      return { ...state, error: "" };
  }
};
