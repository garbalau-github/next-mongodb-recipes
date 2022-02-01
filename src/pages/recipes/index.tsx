import Nav from '../../components/Nav';
import RecipesBoard from '../../components/RecipesBoard';

const Recipes = ({ recipes }) => {
  return (
    <div className='container'>
      <Nav />
      <RecipesBoard recipes={recipes} />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const response = await fetch(`${process.env.API_HOST}/api/recipes`);
    const recipes = await response.json();
    return {
      props: { recipes },
    };
  } catch (err) {
    console.log(err);
  }
}

export default Recipes;
