import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Api info
const api_key = "998d1837e99b9133559bd3adafb1c0af";
const app_id = "8b586bbd";

// Settings
const limit = 100;

// Initial state
const initialState = {
  items: [],
  itemsLoading: false,
  keywords: [],
};

initialState.items = {
  // hits: [
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_b79327d05b8e5b838ad6cfd9576b30b6",
  //       label: "Chicken Vesuvio",
  //       image:
  //         "https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg",
  //       source: "Serious Eats",
  //       url:
  //         "http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html",
  //       shareAs:
  //         "http://www.edamam.com/recipe/chicken-vesuvio-b79327d05b8e5b838ad6cfd9576b30b6/chicken",
  //       yield: 4,
  //       dietLabels: ["Low-Carb"],
  //       healthLabels: ["Sugar-Conscious", "Peanut-Free", "Tree-Nut-Free"],
  //       ingredientLines: [
  //         "1/2 cup olive oil",
  //         "5 cloves garlic, peeled",
  //         "2 large russet potatoes, peeled and cut into chunks",
  //         "1 3-4 pound chicken, cut into 8 pieces (or 3 pound chicken legs)",
  //         "3/4 cup white wine",
  //         "3/4 cup chicken stock",
  //         "3 tablespoons chopped parsley",
  //         "1 tablespoon dried oregano",
  //         "Salt and pepper",
  //         "1 cup frozen peas, thawed",
  //       ],
  //       calories: 4055.7632762010808,
  //       totalWeight: 2765.5901364771207,
  //       totalTime: 60,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_8275bb28647abcedef0baaf2dcf34f8b",
  //       label: "Chicken Paprikash",
  //       image:
  //         "https://www.edamam.com/web-img/e12/e12b8c5581226d7639168f41d126f2ff.jpg",
  //       source: "No Recipes",
  //       url: "http://norecipes.com/recipe/chicken-paprikash/",
  //       shareAs:
  //         "http://www.edamam.com/recipe/chicken-paprikash-8275bb28647abcedef0baaf2dcf34f8b/chicken",
  //       yield: 4,
  //       dietLabels: ["Low-Carb"],
  //       healthLabels: ["P,eanut-Free", "Tree-Nut-Free", "Alcohol-Free"],
  //       ingredientLines: [
  //         "640 grams chicken - drumsticks and thighs ( 3 whole chicken legs cut apart)",
  //         "1/2 teaspoon salt",
  //         "1/4 teaspoon black pepper",
  //         "1 tablespoon butter – cultured unsalted (or olive oil)",
  //         "240 grams onion sliced thin (1 large onion)",
  //         "70 grams Anaheim pepper chopped (1 large pepper)",
  //         "25 grams paprika (about 1/4 cup)",
  //         "1 cup chicken stock",
  //         "1/2 teaspoon salt",
  //         "1/2 cup sour cream",
  //         "1 tablespoon flour – all-purpose",
  //       ],
  //       calories: 3033.2012500008163,
  //       totalWeight: 1824.6125000003276,
  //       totalTime: 0,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_584ac5e486c088b3c8409c252d7f290c",
  //       label: "Chicken Gravy",
  //       image:
  //         "https://www.edamam.com/web-img/fd1/fd1afed1849c44f5185720394e363b4e.jpg",
  //       source: "Martha Stewart",
  //       url: "http://www.marthastewart.com/332664/chicken-gravy",
  //       shareAs:
  //         "http://www.edamam.com/recipe/chicken-gravy-584ac5e486c088b3c8409c252d7f290c/chicken",
  //       yield: 6,
  //       dietLabels: ["Low-Carb"],
  //       healthLabels: [
  //         "Sugar-Conscious",
  //         "Peanut-Free",
  //         "Tree-Nut-Free",
  //         "Alcohol-Free",
  //       ],
  //       ingredientLines: [
  //         "4 cups chicken bones and wings",
  //         "2 tablespoons unsalted butter, softened",
  //         "2 tablespoons all-purpose flour",
  //         "4 cups homemade bruce and eric bromberg's chicken stock, or store-bought low-sodium chicken stock",
  //         "1 tablespoon fresh thyme leaves",
  //         "Coarse salt and freshly ground black pepper",
  //       ],
  //       calories: 1092.360634999871,
  //       totalWeight: 1590.8628259376915,
  //       totalTime: 270,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_2463f2482609d7a471dbbf3b268bd956",
  //       label: "Catalan Chicken",
  //       image:
  //         "https://www.edamam.com/web-img/4d9/4d9084cbc170789caa9e997108b595de.jpg",
  //       source: "Bon Appetit",
  //       url:
  //         "http://www.bonappetit.com/columns/breadwinner/article/how-to-get-your-kids-to-eat-sauce-let-them-cook-it-themselves",
  //       shareAs:
  //         "http://www.edamam.com/recipe/catalan-chicken-2463f2482609d7a471dbbf3b268bd956/chicken",
  //       yield: 12,
  //       dietLabels: ["Low-Carb"],
  //       healthLabels: ["Sugar-Conscious", "Peanut-Free", "Tree-Nut-Free"],
  //       ingredientLines: [
  //         "1 whole 4-pound chicken, quartered",
  //         "8 slices bacon",
  //         "30 cloves garlic",
  //         "3 lemons, peeled, rinds thinly sliced and reserved",
  //         "½ cup Banyuls or another fortified dessert wine",
  //         "1 cup veal or chicken stock",
  //       ],
  //       calories: 3298.8,
  //       totalWeight: 1707.5,
  //       totalTime: 0,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_4caf01683bf99ddc7c08c35774aae54c",
  //       label: "Persian Chicken",
  //       image:
  //         "https://www.edamam.com/web-img/8f8/8f810dfe198fa3e520d291f3fcf62bbf.jpg",
  //       source: "BBC Good Food",
  //       url: "http://www.bbcgoodfood.com/recipes/7343/",
  //       shareAs:
  //         "http://www.edamam.com/recipe/persian-chicken-4caf01683bf99ddc7c08c35774aae54c/chicken",
  //       yield: 5,
  //       dietLabels: ["Low-Carb"],
  //       healthLabels: ["Peanut-Free", "Tree-Nut-Free"],
  //       ingredientLines: [
  //         "2 large onions",
  //         "750 g chicken",
  //         "500 g mushrooms",
  //         "1 cup water",
  //         "1 cup red wine",
  //         "2 teaspoons chicken stock",
  //         "200 ml mayonnaise",
  //         "200 ml cream",
  //         "small bunch of parsley",
  //         "1 teaspoon curry powder",
  //       ],
  //       calories: 4107.49372402923,
  //       totalWeight: 2466.807556406635,
  //       totalTime: 0,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_1817e7fccea9ae39d09c0e2c7fb86cb2",
  //       label: "Kr,eplach (Chicken Dumplings)",
  //       image:
  //         "https://www.edamam.com/web-img/4dd/4dd1c7a0d8b00e8929bd6babf0968ba2.jpg",
  //       source: "Tasting Table",
  //       url:
  //         "https://www.tastingtable.com/entry_detail/chefs_recipes/10154/Matzo_balls_watch_your_back.htm",
  //       shareAs:
  //         "http://www.edamam.com/recipe/kreplach-chicken-dumplings-1817e7fccea9ae39d09c0e2c7fb86cb2/chicken",
  //       yield: 8,
  //       dietLabels: ["Low-Fat"],
  //       healthLabels: [
  //         "Sugar-Conscious",
  //         "Peanut-Free",
  //         "Tree-Nut-Free",
  //         "Alcohol-Free",
  //       ],
  //       ingredientLines: [
  //         "1½ teaspoons canola oil",
  //         "½ small shallot, finely chopped",
  //         "1 cup (about ½ pound) raw, boneless chicken meat (… from 3 boneless chicken thighs), roughly chopped",
  //         "⅔ cup (about ¼ pound) chicken skin and fat (reserved from the 3 chicken thighs)",
  //         "2 chicken livers (optional)",
  //         "2 garlic cloves, finely chopped",
  //         "¼ cup finely chopped chives, plus extra for serving",
  //         "1¼ teaspoons kosher salt",
  //         "¾ teaspoon freshly ground black pepper",
  //         "30 to 34 square wonton wrappers",
  //         "8 cups store-bought or homemade chicken broth",
  //       ],
  //       calories: 4278.876994575,
  //       totalWeight: 3318.6692775,
  //       totalTime: 10,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_0ccc7e81c8377e661266b3ac48c30486",
  //       label: "Dijon Chicken",
  //       image:
  //         "https://www.edamam.com/web-img/448/448099f608ac1c4975d20867334da8ec.jpg",
  //       source: "Simply Recipes",
  //       url: "http://www.simplyrecipes.com/recipes/dijon_chicken/",
  //       shareAs:
  //         "http://www.edamam.com/recipe/dijon-chicken-0ccc7e81c8377e661266b3ac48c30486/chicken",
  //       yield: 3,
  //       dietLabels: ["Low-Carb"],
  //       healthLabels: ["Peanut-Free", "Tree-Nut-Free"],
  //       ingredientLines: [
  //         "1 to 1 1/4 pound boneless, skinless chicken breasts",
  //         "Salt",
  //         "2 Tbsp olive oil + more for lightly coating chicken",
  //         "1 Tbsp butter",
  //         "1 cup sliced shallots",
  //         "1/2 cup dry white wine (can sub chicken stock)",
  //         "1/2 cup water",
  //         "4 Tbsp Dijon mustard, smooth or whole grain or a mixture of both",
  //         "1 teaspoon dried thyme",
  //         "1/4 cup heavy cream",
  //       ],
  //       calories: 1404.7386995019478,
  //       totalWeight: 1067.4292997383197,
  //       totalTime: 0,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_690c3797b4f56fc1e119c14096d651c5",
  //       label: "Roast Chicken",
  //       image:
  //         "https://www.edamam.com/web-img/25f/25feccd2eed4722604be4a9ffa1ac768.jpg",
  //       source: "San Francisco Gate",
  //       url:
  //         "http://www.sfgate.com/food/recipes/detail.html?rid=18229&sorig=qs",
  //       shareAs:
  //         "http://www.edamam.com/recipe/roast-chicken-690c3797b4f56fc1e119c14096d651c5/chicken",
  //       yield: 10,
  //       dietLabels: ["Low-Carb"],
  //       healthLabels: [
  //         "Sugar-Conscious",
  //         "Peanut-Free",
  //         "Tree-Nut-Free",
  //         "Alcohol-Fre,e",
  //       ],
  //       ingredientLines: [
  //         "1 whole chicken, about 3-4 pounds",
  //         "-- Salt and fresh-ground pepper, to taste",
  //         "3 to 4 sprigs thyme, or other herbs",
  //         "-- Olive oil, to taste",
  //         "-- Chicken stock (optional)",
  //       ],
  //       calories: 2523.7639211080805,
  //       totalWeight: 1627.5726226224413,
  //       totalTime: 0,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_b550f7f1182bc4d97f5473bcf15cf006",
  //       label: "Chicken cacciatore",
  //       image:
  //         "https://www.edamam.com/web-img/2ca/2ca946a40338e9b93c1d14dec518e1,b8.jpg",
  //       source: "BBC",
  //       url: "http://www.bbc.co.uk/food/recipes/chickenalocacciatore_70349",
  //       shareAs:
  //         "http://www.edamam.com/recipe/chicken-cacciatore-b550f7f1182bc4d97f5473bcf15cf006/chicken",
  //       yield: 6,
  //       dietLabels: [],
  //       healthLabels: ["Peanut-Free", "Tree-Nut-Free"],
  //       ingredientLines: [
  //         "8 tbsp olive oil",
  //         "1 onion, sliced",
  //         "2 celery stalks, roughly chopped",
  //         "2 medium carrots, roughly chopped",
  //         "6 chicken breasts, or chicken thighs, bones removed",
  //         "175ml/6fl oz white wine",
  //         "3 tbsp tomato purée",
  //         "500ml/17 fl oz chicken stock",
  //         "2 bay leaves",
  //         "2-3 sage leaves",
  //         "1 rosemary sprig",
  //         "250g/9oz easy-cook polenta",
  //         "Knob of butter",
  //         "25g/1oz parmesan",
  //       ],
  //       calories: 4446.914702966757,
  //       totalWeight: 2514.8834873286273,
  //       totalTime: 60,
  //     },
  //   },
  //   {
  //     recipe: {
  //       uri:
  //         "http://www.edamam.com/ontologies/edamam.owl#recipe_71ab1bfee5b89e904185ef03c337d52b",
  //       label: ",Tarragon Chicken",
  //       image:
  //         "https://www.edamam.com/web-img/b28/b28acc0eed7e65de535d36954006f358.jpg",
  //       source: "French Revolution Food",
  //       url:
  //         "http://www.frenchrevolutionfood.com/2009/09/french-in-a-flash-tarragon-chicken-and-carrot-mu,ffins-with-sweet-chevre-icing/",
  //       shareAs:
  //         "http://www.edamam.com/recipe/tarragon-chicken-71ab1bfee5b89e904185ef03c337d52b/chicken",
  //       yield: 4,
  //       dietLabels: ["Low-Carb"],
  //       healthLabels: ["Peanut-Free", "Tree-Nut-Free"],
  //       ingredientLines: [
  //         "8 vine ripened tomatoes, peeled, seeded, and finely diced",
  //         "8 chicken legs",
  //         "8 chicken thighs",
  //         "2 tablespoons olive oil, plus 1 tablespoon",
  //         "4 shallots, roughly chopped",
  //         "2 cloves garlic, smashed",
  //         "1/3 cup dry vermouth",
  //         "1/3 cup dry white wine",
  //         "1 cup low-sodium chicken stock",
  //         "6 stems tarragon",
  //       ],
  //       calories: 9435.246666666666,
  //       totalWeight: 5615.7444444444445,
  //       totalTime: 211,
  //     },
  //   },
  // ],
};

// Create context
export const GlobalContext = createContext({ initialState });

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getItems = (q) => {
    dispatch({ type: "ITEMS_LOADING" });
    axios
      .get(
        `https://api.edamam.com/search?app_key=${api_key}&app_id=${app_id}&to=${limit}&q=${q.join(
          " "
        )}`
      )
      .then((res) => dispatch({ type: "ITEMS_LOADED", payload: res.data }))
      .catch((err) => console.log(err));
  };

  const addKeyword = (kw) => {
    if (kw.length > 0) {
      kw = kw.toLowerCase();
      if (kw.length > 0) dispatch({ type: "ADD_KEYWORD", payload: kw });
    }
  };

  const removeKeyword = (kw) => {
    const id = state.keywords.indexOf(kw);
    dispatch({ type: "REMOVE_KEYWORD", payload: id });
  };

  const { items, itemsLoading, keywords } = state;
  return (
    <GlobalContext.Provider
      value={{
        items,
        itemsLoading,
        keywords,
        getItems,
        addKeyword,
        removeKeyword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
