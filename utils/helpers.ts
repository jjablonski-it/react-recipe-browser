import { Recipe } from "../context/types";

export const recipeToBasic = (recipe: Recipe): Recipe => {
  return recipe;
};

export const pushToLocalStorageList = (key: string, item: any) => {
  const state = JSON.parse(localStorage.getItem(key) || "[]") as any[];
  state.push(item);
  localStorage.setItem(key, JSON.stringify(state));
};

export const removeFromLocalStorageList = (key: string, item: any) => {
  const state = JSON.parse(localStorage.getItem(key) || "[]") as any[];
  const newState = state.filter((i) => i !== item);
  localStorage.setItem(key, JSON.stringify(newState));
};
