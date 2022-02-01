import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db('recipe-db');

  console.log(req.body);

  let recipe = await db
    .collection('recipes')
    .deleteOne({ _id: new ObjectId(req.body._id) });

  recipe = JSON.parse(JSON.stringify(recipe));

  res.json({ recipe: recipe });
}
