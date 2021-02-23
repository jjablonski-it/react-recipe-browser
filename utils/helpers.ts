import { Recipe, RecipeWhole } from "../context/types";
const isClient = typeof window !== "undefined";

export const recipeToBasic = (recipe: Recipe): Recipe => {
  return recipe;
};

export const pushToLocalStorageList = (key: string, item: any) => {
  if (!isClient) return;
  const state = JSON.parse(localStorage.getItem(key) || "[]") as any[];
  state.push(item);
  localStorage.setItem(key, JSON.stringify(state));
};

export const removeFromLocalStorageList = (key: string, item: any) => {
  if (!isClient) return;
  const state = JSON.parse(localStorage.getItem(key) || "[]") as any[];
  const newState = state.filter((i) => i !== item);
  localStorage.setItem(key, JSON.stringify(newState));
};

export const saveObjectToLocalStorage = (key: string, data: any) => {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const getValueFromLocalStorage = (
  key: string,
  defaultValue: any = null
) => {
  if (!isClient) return defaultValue;
  const data = localStorage.getItem(key);

  if (!data) return defaultValue;
  return data;
};

export const getObjectFromLocalStorage = (
  key: string,
  defaultValue: any = null
) => {
  if (!isClient) return defaultValue;
  const data = localStorage.getItem(key);
  let result = defaultValue;
  try {
    console.log(data, typeof data);

    if (data) result = JSON.parse(data);
  } catch (e) {
    console.log(e);
  }
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
