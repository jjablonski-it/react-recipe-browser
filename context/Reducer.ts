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

    case "ADD_KEYWORD":
      if (state.keywords.includes(action.payload)) return state;
      return { ...state, keywords: [...state.keywords, action.payload] };

    case "REMOVE_KEYWORD": {
      return {
        ...state,
        keywords: [
          ...state.keywords.filter((keyword) => keyword !== action.payload),
        ],
      };
    }

    case "SET_MORE":
      console.log("more", action.payload);

      return { ...state, more: action.payload };
  }
};
