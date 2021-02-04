interface Ingredient {
  foodId: string; //	Food identifier
  quantity: number; //	Quantity of specified measure
  measure: {
    uri: string; //	Ontology identifier
    label: string; //	Common name
  }; //	Measure
  weight: number; //	Total weight, g
  food: {
    foodId: string; //	Food identifier
    label: string; //	Common name
  }; //	Food
  foodCategory: string; //	Shopping aisle category
}

interface Recipe {
  uri: string; //	Ontology identifier
  label: string; //	Recipe title
  image: string; //	Image URL
  source: string; //	Source site identifier
  url: string; //	Original recipe URL
  yield: number; //	Number of servings
  calories: number; //	Total energy, kcal
  totalWeight: number; //	Total weight, (g)
  ingredients: Ingredient[]; //	Ingredients list
  totalNutrients: string; //	Total nutrients for the entire recipe. TotalNutrients/yield equals nutrients per serving
  totalDaily: string; // daily value for the entire recipe. Total/Daily/yield equals nutrients per serving
  dietLabels: // (labels are per serving)
  | "balanced"
    | "high-protein"
    | "high-fiber"
    | "low-fat"
    | "low-carb"
    | "low-sodium";
  healthLabels: // (labels are per serving)
  | "vegan"
    | "vegetarian"
    | "paleo"
    | "dairy-free"
    | "gluten-free"
    | "wheat-free"
    | "fat-free"
    | "low-sugar"
    | "egg-free"
    | "peanut-free"
    | "tree-nut-free"
    | "soy-free"
    | "fish-free"
    | "shellfish-free";
}

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
