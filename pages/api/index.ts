import axios from "axios";
import qs from "qs";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ApiResponse,
  Recipe,
  RecipeUseless,
  RecipeWhole,
} from "../../context/types";
import { cleanRecipe } from "../../utils/helpers";
import testData from "./data.json";

const LIMIT = 24;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TESTING
  // return res.json(testData);

  const { q, from: baseFrom, health, diet, excluded } = req.query;
  const from = +baseFrom + Math.floor(+baseFrom / LIMIT);
  const to = from + LIMIT;
  console.log(health, diet, excluded);

  console.log("from:", from, "to:", to);
  if (!q || !to) return res.status(400).json({});

  const { data } = await axios.get<ApiResponse<RecipeWhole>>(
    process.env.API_URL,
    {
      params: {
        app_key: process.env.APP_KEY,
        app_id: process.env.APP_ID,
        q,
        from,
        to,
        health,
        diet,
        excluded,
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    }
  );
  const hits = data.hits.map((hit) => (hit as any).recipe).map(cleanRecipe);

  res.status(200).json({ ...data, hits });
};
