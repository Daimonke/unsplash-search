// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const page = req.query.page ? req.query.page : "1";
    const searchQuery = req.query.searchQuery;
    const { data } = await axios.get(
      `https://api.unsplash.com/search/photos?page=${page}&query=${searchQuery}&client_id=${process.env.client_id}&w=400&fit=max&h=400&per_page=20`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
}
