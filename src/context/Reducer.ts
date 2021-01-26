import { Action, State } from "./Context";

export default (state: State, action: Action) => {
  const { type } = action as any;
  switch (type) {
    case "TEST":
      console.log("TEST");

      return state;
    default:
      throw `Handler for action ${type} does not exist.`;
  }
};
