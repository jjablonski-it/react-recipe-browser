import { Action, State } from "./types";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ITEMS_LOADED":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case "ITEMS_LOADING":
      return {
        ...state,
        loading: true,
      };

    case "ADD_KEYWORD":
      return { ...state, keywords: [...state.keywords, action.payload] };

    case "REMOVE_KEYWORD": {
      return {
        ...state,
        keywords: [
          ...state.keywords.filter((keyword) => keyword !== action.payload),
        ],
      };
    }
  }
};
