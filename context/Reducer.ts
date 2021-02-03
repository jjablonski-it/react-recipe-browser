import { State, Action, ActionType } from "./types";

export const reducer = (state: State, { type, payload }: ActionType) => {
  switch (type) {
    case "TEST":
      console.log("test");

      return state;

    default:
      throw `No handler for ${type}!`;
  }
};
