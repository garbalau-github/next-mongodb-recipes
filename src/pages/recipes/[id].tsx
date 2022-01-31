import Nav from '../../components/Nav';

// MongoDB
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

const Recipe = ({ recipe }) => {
  const { image, name, description, ingredients } = recipe;

  return (
    <div className='container'>
      <Nav currentPage={name} />
      <div className='recipe-card'>
        <h2>{name}</h2>
        <img src={image} alt={name} />
        <div>
          <h3>Ingredients:</h3>
          {ingredients.map(({ name, measure }, index) => (
            <p key={index}>
              {name.toUpperCase()} - {measure.toUpperCase()}
            </p>
          ))}
        </div>
        <div>
          <h3>How to cook it?</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  // MongoDB
  const client = await clientPromise;
  const db = client.db('recipe-db');
  let recipe = await db
    .collection('recipes')
    .findOne({ _id: new ObjectId(ctx.query.id) });
  recipe = JSON.parse(JSON.stringify(recipe));

  return {
    props: { recipe },
  };

  // Local API
  // try {
  //   const response = await fetch(
  //     `${process.env.API_HOST}/details?_id=${ctx.query.id}`
  //   );
  //   const recipe = await response.json();
  //   return {
  //     props: { recipe },
  //   };
  // } catch (err) {
  //   console.log(err);
  // }
}
export default Recipe;
