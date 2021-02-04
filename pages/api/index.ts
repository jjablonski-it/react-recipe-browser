import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import data from "./data.json";

const { APP_KEY, APP_ID, API_URL } = process.env;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TESTING
  return res.json(data);

  const {
    query: { q },
  } = req;

  const recipeData = await axios.get(API_URL, {
    params: {
      app_key: APP_KEY,
      app_id: APP_ID,
      q,
    },
  });

  res.status(200).json(recipeData.data);
};
