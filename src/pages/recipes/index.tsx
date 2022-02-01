import Nav from '../../components/Nav';
import Link from 'next/link';
import { isValidHttpUrl } from '../../utils/isValidHttpUrl';

const Recipes = ({ recipes }) => {
  // let imageUrl;

  // if (!isValidHttpUrl(recipe.image)) {
  //   imageUrl = '/nophoto.jpeg';
  // } else {
  //   imageUrl = recipe.image;
  // }

  console.log(recipes);

  const deletePost = async (_id) => {
    console.log(_id);
    // ${process.env.API_HOST}
    const response = await fetch(`/api/delete-recipe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });
    const data = await response.json();
    if (data.recipe.acknowledged) {
      console.log('Element deleted!');
    }
  };

  return (
    <div className='container'>
      <Nav />
      <div className='recipes'>
        {recipes.map(({ _id, recipe }) => {
          return (
            <div key={_id} className='recipes-item'>
              <Link href={`/recipes/${_id}`}>
                <div>
                  <h4>{recipe.name}</h4>
                  <img src={recipe.image} alt={recipe.name} />
                </div>
              </Link>
              <button onClick={() => deletePost(_id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_HOST}/api/recipes`);
  const recipes = await response.json();
  return {
    props: { recipes },
  };
}

export default Recipes;
