import { Recipe } from '../interfaces/interfaces';
import Link from 'next/link';

const RecipesBoard = ({ recipes }) => {
  return (
    <div className='recipes'>
      {recipes.map(({ _id, name, image }: Recipe) => (
        <div key={_id} className='recipes-item'>
          <Link href={`/recipes/${_id}`}>
            <div>
              <h4>{name}</h4>
              <img src={image} alt={name} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipesBoard;
