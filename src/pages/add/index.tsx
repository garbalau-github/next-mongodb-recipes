import Nav from '../../components/Nav';
import { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';

// MUI
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import Button from '@mui/material/Button';

// Form Reducer
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Add = () => {
  // States
  const [inputList, setInputList] = useState([
    { ingredientName: '', ingredientMeasure: '' },
  ]);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [recipe, setRecipe] = useState({});
  const router = useRouter();

  // Add recipe
  useEffect(() => {
    if (submitting && recipe.hasOwnProperty('name')) {
      addRecipeToDatabase(recipe);
    }
  }, [recipe]);

  // Fetch
  const addRecipeToDatabase = async (recipe) => {
    const response = await fetch(`/api/add-recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipe }),
    });
    const data = await response.json();
    if (data.recipe.acknowledged) {
      setSubmitting(false);
      router.push('/recipes');
    }
  };

  // Form Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setRecipe({ ...formData, ingredients: inputList });
  };

  const handleChange = (event) => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  // Ingredients Handlers
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleRemoveIngredientClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddIngredientClick = () => {
    setInputList([...inputList, { ingredientName: '', ingredientMeasure: '' }]);
  };

  return (
    <>
      <Nav />
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Add New Recipe</h1>
          <FormControl className='form-element'>
            <InputLabel htmlFor='recipe-name'>Name</InputLabel>
            <Input
              required
              autoComplete='off'
              name='name'
              value={formData.name || ''}
              onChange={handleChange}
              id='recipe-name'
              aria-describedby='my-helper-text'
            />
            <FormHelperText id='my-helper-text'>
              Something delicious?
            </FormHelperText>
          </FormControl>
          <FormControl className='form-element'>
            <InputLabel htmlFor='recipe-image'>Image</InputLabel>
            <Input
              required
              name='image'
              autoComplete='off'
              onChange={handleChange}
              id='recipe-image'
              aria-describedby='my-helper-text'
            />
            <FormHelperText id='my-helper-text'>
              Provide us with the image
            </FormHelperText>
          </FormControl>
          {inputList.map((inputEl, idx) => {
            return (
              <div className='form-ingredients' key={idx}>
                <FormControl className='form-element'>
                  <InputLabel htmlFor='ingredient-name'>Ingredient</InputLabel>
                  <Input
                    required
                    autoComplete='off'
                    name='ingredientName'
                    value={inputEl.ingredientName}
                    onChange={(e) => handleInputChange(e, idx)}
                    id='ingredient-name'
                    aria-describedby='my-helper-text'
                  />
                  <FormHelperText id='my-helper-text'>
                    What goes inside?
                  </FormHelperText>
                </FormControl>
                <FormControl className='form-element'>
                  <InputLabel htmlFor='ingredient-measure'>Measure</InputLabel>
                  <Input
                    required
                    autoComplete='off'
                    name='ingredientMeasure'
                    value={inputEl.ingredientMeasure}
                    onChange={(e) => handleInputChange(e, idx)}
                    id='ingredient-measure'
                    aria-describedby='my-helper-text'
                  />
                  <FormHelperText id='my-helper-text'>
                    How much of that?
                  </FormHelperText>
                </FormControl>
                <FormControl className='form-element form-ingredients__buttons'>
                  <Button
                    color='error'
                    className='form-ingredients__button'
                    variant='contained'
                    onClick={() => handleRemoveIngredientClick(idx)}
                  >
                    Remove
                  </Button>
                  <Button
                    color='success'
                    className='form-ingredients__button'
                    variant='contained'
                    onClick={handleAddIngredientClick}
                  >
                    Add
                  </Button>
                </FormControl>
              </div>
            );
          })}
          <FormControl className='form-element'>
            <InputLabel htmlFor='recipe-description'>Description</InputLabel>
            <Input
              required
              autoComplete='off'
              name='description'
              value={formData.description || ''}
              onChange={handleChange}
              id='recipe-description'
              aria-describedby='my-helper-text'
            />
            <FormHelperText id='my-helper-text'>
              Describe how to cook it
            </FormHelperText>
          </FormControl>
          <Button
            color='primary'
            variant='contained'
            disabled={submitting}
            type='submit'
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Add;
