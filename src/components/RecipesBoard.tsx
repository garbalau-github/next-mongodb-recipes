import Link from 'next/link';
import Image from 'next/image';
import { isValidHttpUrl } from '../utils/isValidHttpUrl';

const RecipesBoard = ({ recipes }) => {
  return (
    <div className='recipes'>
      {recipes.map(({ _id, recipe }) => {
        let imageUrl;

        if (!isValidHttpUrl(recipe.image)) {
          imageUrl = '/nophoto.jpeg';
        } else {
          imageUrl = recipe.image;
        }

        return (
          <div key={_id} className='recipes-item'>
            <Link href={`/recipes/${_id}`}>
              <div>
                <h4>{recipe.name}</h4>
                <img src={imageUrl} alt={recipe.name} />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RecipesBoard;
