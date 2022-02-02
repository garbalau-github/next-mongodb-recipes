import Nav from '../../components/Nav';
import { isValidHttpUrl } from '../../utils/isValidHttpUrl';

const Recipe = ({ recipe }) => {
  const recipeItem = recipe.recipe;

  // Validate image
  let imageUrl: string;
  !isValidHttpUrl(recipe.image)
    ? (imageUrl = '/nophoto.jpeg')
    : (imageUrl = recipe.image);

  return (
    <>
      <Nav />
      <div className='container'>
        <div className='recipe'>
          <h2 className='recipe-title'>{recipeItem.name}</h2>
          <img className='recipe-image' src={imageUrl} alt={recipeItem.name} />
          <div className='recipe-ingredients'>
            <h3>Ingredients?</h3>
            {recipeItem.ingredients.map(
              ({ ingredientName, ingredientMeasure }, index) => (
                <p key={index}>
                  [{index + 1}] {ingredientName} - {ingredientMeasure}
                </p>
              )
            )}
          </div>
          <div className='recipe-details'>
            <h3>How to cook it?</h3>
            <p>{recipeItem.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(
    `${process.env.API_HOST}/api/recipe?_id=${context.query.id}`
  );
  const recipe = await response.json();
  return {
    props: { recipe },
  };
}

export default Recipe;
