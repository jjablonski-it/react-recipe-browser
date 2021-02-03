// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const quoteRes = await fetch("https://api.kanye.rest");
  const resJson = await quoteRes.json();

  res.status(200).json(resJson);
};
