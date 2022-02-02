import Nav from '../../components/Nav';
import Link from 'next/link';
import { isValidHttpUrl } from '../../utils/isValidHttpUrl';
import { useRouter } from 'next/router';

// MUI
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Recipes = ({ recipes }) => {
  const router = useRouter();

  // Refresh getServerSideProps
  const refreshData = () => {
    const router = useRouter();
    router.replace(router.asPath);
  };

  // Fetch
  const removeRecipeFromDataBase = async (_id) => {
    const response = await fetch(`/api/delete-recipe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });
    const data = await response.json();
    if (data.recipe.acknowledged) {
      refreshData();
    }
  };

  return (
    <>
      <Nav />
      <div className='container'>
        <div className='recipes'>
          {recipes.map(({ _id, recipe }) => {
            // Validate image
            let imageUrl: string;
            !isValidHttpUrl(recipe.image)
              ? (imageUrl = '/nophoto.jpeg')
              : (imageUrl = recipe.image);

            return (
              <div className='recipes-card'>
                <Card>
                  <CardContent>
                    <Link href={`/recipes/${_id}`}>
                      <Typography color='text.secondary' gutterBottom>
                        <span className='recipes-title'>{recipe.name}</span>
                      </Typography>
                    </Link>
                    <img
                      className='recipes-image'
                      width={200}
                      height={100}
                      src={imageUrl}
                      alt={recipe.name}
                    />
                    <CardActions>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => removeRecipeFromDataBase(_id)}
                        size='small'
                      >
                        Delete Recipe
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </>
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
