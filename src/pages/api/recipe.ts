import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';

export default async function handler(req, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('recipe-db');

  let recipe = await db
    .collection('recipes')
    .findOne({ _id: new ObjectId(req.query._id) });

  recipe = JSON.parse(JSON.stringify(recipe));

  res.json(recipe);
}
