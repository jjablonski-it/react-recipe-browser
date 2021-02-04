import { State, Action, ActionType } from "./types";

export const reducer = (state: State, { type, payload }: ActionType) => {
  switch (type) {
    default:
      throw `No handler for ${type}!`;
  }
};
