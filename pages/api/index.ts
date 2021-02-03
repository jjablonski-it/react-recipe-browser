import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const { APP_KEY, APP_ID, API_URL } = process.env;

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const recipeData = await axios.get(API_URL, {
    params: { app_key: APP_KEY, app_id: APP_ID, q: "chicken" },
  });

  res.status(200).json(recipeData.data);
};
