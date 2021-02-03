import { State, Action, ActionType } from "./types";

export default (state: State, { type, payload }: ActionType) => {
  switch (type) {
    case "TEST":
      return state;

    default:
      throw `No handler for ${type}!`;
  }
};
