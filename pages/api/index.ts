import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
// import data from "./data.json";

const LIMIT = 24;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TESTING
  // return res.json(data);

  const q = req.query.q;
  const baseFrom = +req.query.from;
  const from = baseFrom + Math.floor(baseFrom / LIMIT);
  const to = from + LIMIT;

  console.log("from:", from, "to:", to);
  if (!q || !to) return res.status(400).json({});

  const recipeData = await axios.get(process.env.API_URL, {
    params: {
      app_key: process.env.APP_KEY,
      app_id: process.env.APP_ID,
      q,
      from,
      to,
    },
  });

  res.status(200).json(recipeData.data);
};
