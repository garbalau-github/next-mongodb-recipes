import clientPromise from '../../../lib/mongodb';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db('recipe-db');

  let recipes = await db.collection('recipes').find({}).toArray();

  recipes = JSON.parse(JSON.stringify(recipes));

  res.json(recipes);
}
