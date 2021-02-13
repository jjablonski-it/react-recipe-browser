type Range = `${number}-${number}`;
export interface ApiRequest {
  q?: string; //	Query text. For example q=chicken. *This or the r parameter are required
  r?: string; //	Returns information about a specific recipe based on its ID ie. r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408 *This or the q parameter are required
  // app_id: string; //	Your 3scale application ID
  // app_key: string; //	Your 3scale application key (please note app_id/app_key are an ordered pair)
  from?: number; //	First result index (default 0). Example: from=20. The maximum value of the “from” parameter is limitted by the number of results a plan is entitled to.
  to?: number; //	Last result index (exclusive, default from + 10). Example: to=30
  ingr?: number; //	Maximum number of ingredients. Example: ingr=5
  diet?:
    | "low-sodium"
    | "low-fat"
    | "low-carb"
    | "high-protein"
    | "high-fiber"
    | "balanced"; //	Diet label: one of “balanced”, “high-protein”, “high-fiber”, “low-fat”, “low-carb”, “low-sodium”
  health?:
    | "alcohol-free" //	No alcohol used or contained
    | "immuno-supportive" //	Recipes which fit a science-based approach to eating to strengthen the immune system
    | "celery-free" //	Does not contain celery or derivatives
    | "crustacean-free" //	Does not contain crustaceans (shrimp, lobster etc.) or derivatives
    | "dairy-free" //	No dairy; no lactose
    | "egg-free" //	No eggs or products containing eggs
    | "fish-free" //	No fish or fish derivatives
    | "fodmap-free" //	Does not contain FODMAP foods
    | "gluten-free" //	No ingredients containing gluten
    | "keto-friendly" //	Maximum 7 grams of net carbs per serving
    | "friendly" //	kidney-friendly	Per serving – phosphorus less than 250 mg AND potassium less than 500 mg AND sodium less than 500 mg
    | "kosher" //	Contains only ingredients allowed by the kosher diet. However it does not guarantee kosher preparation of the ingredients themselves
    | "low-potassium" //	Less than 150mg per serving
    | "lupine-free" //	Does not contain lupine or derivatives
    | "mustard-free" //	Does not contain mustard or derivatives
    | "low-fat-abs" //	Less than 3g of fat per serving
    | "o-oil-added" //	No oil added except to what is contained in the basic ingredients
    | "low-sugar" // No simple sugars – glucose, dextrose, galactose, fructose, sucrose, lactose, maltose
    | "paleo" //	Excludes what are perceived to be agricultural products; grains, legumes, dairy products, potatoes, refined salt, refined sugar, and processed oils
    | "peanut-free" //	No peanuts or products containing peanuts
    | "pecatarian" //	Does not contain meat or meat based products, can contain dairy and fish
    | "pork-free" //	Does not contain pork or derivatives
    | "red-meat-free" //	Does not contain beef, lamb, pork, duck, goose, game, horse, and other types of red meat or products containing red meat.
    | "sesame-free" //	Does not contain sesame seed or derivatives
    | "shellfish-free" //	No shellfish or shellfish derivatives
    | "soy-free" //	No soy or products containing soy
    | "sugar-conscious" //	Less than 4g of sugar per serving
    | "tree-nut-free" //	No tree nuts or products containing tree nuts
    | "vegan" //	No meat, poultry, fish, dairy, eggs or honey
    | "vegetarian" //	No meat, poultry, or fish
    | "wheat-free"; //	No wheat, can have gluten though; //	Health label: One of the Health api parameters listed in Diet and Health Labels table at the end of this documentation. Miltiple labels cab be submitted simultatniousely this way “health=peanut-free&health=tree-nut-free”
  cuisineType?:
    | "American"
    | "Asian"
    | "British"
    | "Caribbean"
    | "Central Europe"
    | "Chinese"
    | "Eastern Europe"
    | "French"
    | "Indian"
    | "Italian"
    | "Japanese"
    | "Kosher"
    | "Mediterranean"
    | "Mexican"
    | "Middle Eastern"
    | "Nordic"
    | "South American"
    | "South East Asian"; //	The type of cuisine of the recipe. You can simultatniousely use saveral cuisines this way “cuisineType=chinese&cuisineType=indian”
  mealType?: "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Teatime"; //	The type of meal a recipe belongs to – lunch, dinner, breakfast, snack
  dishType?:
    | "Alcohol-cocktail"
    | "Biscuits and cookies"
    | "Bread"
    | "Cereals"
    | "Condiments and sauces"
    | "Drinks"
    | "Desserts"
    | "Egg"
    | "Main course"
    | "Omelet"
    | "Pancake"
    | "Preps"
    | "Preserve"
    | "Salad"
    | "Sandwiches"
    | "Soup"
    | "Starter"; //	The dish type a recipe belongs to – soup, salad, sandwich etc. You can simultatniousely use saveral dish types this way “dishType=soup&dishType=dessert”
  calories?: Range; //	The format is calories=RANGE where RANGE is replaced by the value in kcal. RANGE is in one of MIN+, MIN-MAX or MAX, where MIN and MAX are non-negative number numbers. The + symbol needs to be properly encoded. Examples: “calories=100-300” will return all recipes with which have between 100 and 300 kcal per serving.
  time?: Range; //	Time range for the total cooking and prep time for a recipe . The format is time=RANGE where RANGE is replaced by the value in minutes. RANGE is in one of MIN+, MIN-MAX or MAX, where MIN and MAX are non-negative number numbers. The + symbol needs to be properly encoded. Examples: “time=1%2B” will return all recipes with available total time greater then 1 minute
  excluded?: string; //	Excluding recipes with certain ingredients. The format is excluded=FOOD where FOOD is replaced by the name of the specific food you don’t want to be present in the recipe results. More than one food can be excluded at the same time. Example: excluded=vinegar&excluded=pretzel will exclude any recipes which contain vinegar or pretzels in their ingredient list
  callback?: string; //	Callback parameter for JSONP. This will “envelop” the result in a JavaScript function call to the specified callback. Optional
}
export interface ApiResponse {
  count: number;
  from: number;
  to: number;
  hits: Recipe[];
  more: boolean;
  q: string;
}
interface Ingredient {
  foodId: string; //	Food identifier
  quantity: number; //	Quantity of specified measure
  measure: {
    uri: string; //	Ontology identifier
    label: string; //	Common name
  }; //	Measure
  weight: number; //	Total weight, (g)
  food: {
    foodId: string; //	Food identifier
    label: string; //	Common name
  }; //	Food
  foodCategory: string; //	Shopping aisle category
}
export interface Recipe {
  uri: string; //	Ontology identifier
  label: string; //	Recipe title
  image: string; //	Image URL
  source: string; //	Source site identifier
  url: string; //	Original recipe URL
  yield: number; //	Number of servings
  calories: number; //	Total energy, kcal
  totalWeight: number; //	Total weight, (g)
  ingredientLines: Ingredient[]; //	Ingredients list
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
  totalTime: number;
}
export interface State {
  items: Recipe[];
  loading: boolean;
  keywords: string[];
  getItems?: any;
}

export type Action =
  | { type: "ITEMS_LOADED"; payload: Recipe[] }
  | { type: "ITEMS_LOADING" };
