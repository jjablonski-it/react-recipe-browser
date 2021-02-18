import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import { RecipeWhole } from "../../context/types";
import { cleanRecipe } from "../../utils/helpers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { r } = req.query;

  if (typeof r === "string") r = process.env.URI_PREFIX + r;
  else if (typeof r === "object")
    r = r.map((rId) => process.env.URI_PREFIX + rId);

  if (!r) return res.json([]);

  const { data } = await axios.get<RecipeWhole[]>(process.env.API_URL, {
    params: {
      app_key: process.env.APP_KEY,
      app_id: process.env.APP_ID,
      r,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  const cleanData = data.map((recipe) => recipe).map(cleanRecipe);

  res.status(200).json(cleanData);
};
