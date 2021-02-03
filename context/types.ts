interface Recipe {}

export interface State {
  items: Recipe[];
  loading: boolean;
  keywords: string[];
  getItems?: any;
}

export type ActionType = { type: string; payload?: any };

export type Action =
  | { type: "TEST" }
  | { type: "ITEMS_LOADING" }
  | { type: "ITEMS_LOADED" };
