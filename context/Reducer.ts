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
  }
};
