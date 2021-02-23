import { Recipe, RecipeWhole } from "../context/types";

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

export const saveObjectToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getObjectFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  let result = null;
  try {
    if (data) result = JSON.parse(data);
  } catch (e) {}
  return result;
};

export const cleanRecipe = ({
  digest,
  totalDaily,
  totalNutrients,
  totalWeight,
  ingredients,
  shareAs,
  ...props
}: RecipeWhole): Recipe => {
  let uri = props.uri.replace(process.env.URI_PREFIX, "");
  return { ...props, uri };
};
