import Nav from '../../components/Nav';
import { isValidHttpUrl } from '../../utils/isValidHttpUrl';

const Recipe = ({ recipe }) => {
  const recipeItem = recipe.recipe;

  let imageUrl;

  if (!isValidHttpUrl(recipeItem.image)) {
    imageUrl = '/nophoto.jpeg';
  } else {
    imageUrl = recipeItem.image;
  }

  return (
    <div className='container'>
      <Nav />
      <div className='recipe-card'>
        <h2>{recipeItem.name}</h2>
        <img src={imageUrl} alt={recipeItem.name} />
        <div>
          <h3>Ingredients:</h3>
          {recipeItem.ingredients.map(
            ({ ingredientName, ingredientMeasure }, index) => (
              <p key={index}>
                {ingredientName.toUpperCase()} -{' '}
                {ingredientMeasure.toUpperCase()}
              </p>
            )
          )}
        </div>
        <div>
          <h3>How to cook it?</h3>
          <p>{recipeItem.description}</p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const response = await fetch(
    `${process.env.API_HOST}/api/details?_id=${ctx.query.id}`
  );
  const recipe = await response.json();
  return {
    props: { recipe },
  };
}

export default Recipe;
