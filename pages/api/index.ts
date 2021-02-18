import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ApiResponse,
  Recipe,
  RecipeUseless,
  RecipeWhole,
} from "../../context/types";
// import data from "./data.json";

const LIMIT = 24;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TESTING
  // return res.json(data);

  const { q, r, from: baseFrom } = req.query;
  const from = +baseFrom + Math.floor(+baseFrom / LIMIT);
  const to = from + LIMIT;

  console.log(r);

  console.log("from:", from, "to:", to);
  if (!r && (!q || !to)) return res.status(400).json({});

  const { data } = await axios.get<ApiResponse<RecipeWhole>>(
    process.env.API_URL,
    {
      params: {
        app_key: process.env.APP_KEY,
        app_id: process.env.APP_ID,
        q,
        from,
        to,
      },
    }
  );
  const hits: Recipe[] = data.hits
    .map((hit) => (hit as any).recipe)
    .map(cleanRecipe);

  res.status(200).json({ ...data, hits });
};

const cleanRecipe = ({
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
