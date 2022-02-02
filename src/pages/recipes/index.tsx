import Nav from '../../components/Nav';
import Link from 'next/link';
import { isValidHttpUrl } from '../../utils/isValidHttpUrl';
import { useRouter } from 'next/router';
import { useState } from 'react';

// MUI
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Recipes = ({ recipes }) => {
  const [open, setOpen] = useState(false);
  const [candidateForDeletionID, setCandidateForDeletionID] = useState('');

  const router = useRouter();

  // Refresh props
  const refreshData = () => {
    router.replace(router.asPath);
  };

  // Fetch
  const removeRecipeFromDataBase = async (_id) => {
    console.log(`Going to delete: ${_id}`);
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

  // Dialog
  const handleClickOpen = (_id) => {
    setOpen(true);
    setCandidateForDeletionID(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteRecipe = () => {
    setOpen(false);
    removeRecipeFromDataBase(candidateForDeletionID);
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
              ? (imageUrl = '/no-photo.png')
              : (imageUrl = recipe.image);

            return (
              <div key={_id} className='recipes-card'>
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
                        onClick={() => handleClickOpen(_id)}
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
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Are you sure you want to delete?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                If you delete this recipe it will be forever removed from the
                database. There is no way to revert it back.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant='contained' color='info' onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={handleDeleteRecipe}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const response = await fetch(`${process.env.API_HOST}/api/recipes`);
  const recipes = await response.json();
  return {
    props: { recipes },
    revalidate: 20,
  };
}

export default Recipes;
