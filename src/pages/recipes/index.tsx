import clientPromise from '../../../lib/mongodb';
import Nav from '../../components/Nav';
import RecipesBoard from '../../components/RecipesBoard';

const Recipes = ({ recipes }) => {
  return (
    <div className='container'>
      <Nav currentPage={'All Recipes'} />
      <RecipesBoard recipes={recipes} />
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db('recipe-db');

    // Get all the recipes
    let recipes = await db.collection('recipes').find({}).toArray();
    recipes = JSON.parse(JSON.stringify(recipes));

    return {
      props: { recipes },
    };
  } catch (err) {
    console.log(err);
  }
}

export default Recipes;
