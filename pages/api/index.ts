import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
// import data from "./data.json";

const LIMIT = 48;
const { APP_KEY, APP_ID, API_URL } = process.env;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TESTING
  // return res.json(data);

  const q = req.query.q;
  const from = +req.query.from;
  const to = from + LIMIT;

  console.log("from:", from, "to:", to);
  if (!q || !to) return res.status(400).json({});

  const recipeData = await axios.get(API_URL, {
    params: {
      app_key: APP_KEY,
      app_id: APP_ID,
      q,
      from,
      to,
    },
  });

  res.status(200).json(recipeData.data);
};
