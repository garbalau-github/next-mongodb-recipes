import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const query = req.query._id;

  const client = await clientPromise;
  const db = client.db('recipe-db');

  let recipe = await db
    .collection('recipes')
    .findOne({ _id: new ObjectId(query) });

  recipe = JSON.parse(JSON.stringify(recipe));

  res.json(recipe);
}
