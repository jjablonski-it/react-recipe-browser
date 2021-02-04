import { State, Action } from "./types";

export const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "ITEMS_LOADED":
      return {
        ...state,
        loading: false,
        items: payload!,
      };

    case "ITEMS_LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      throw `No handler for ${type}!`;
  }
};
