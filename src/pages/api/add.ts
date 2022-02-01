import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const client = await clientPromise;
  const db = client.db('recipe-db');

  let recipe = await db.collection('recipes').insertOne(req.body);

  recipe = JSON.parse(JSON.stringify(recipe));

  res.json({ recipe: recipe });
}
