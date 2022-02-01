import { useState, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import Nav from '../../components/Nav';

const Add = () => {
  const router = useRouter();

  // Form Reducer
  const formReducer = (state, event) => {
    if (event === 'reset') {
      return {
        name: '',
        description: '',
        imageUrl: '',
      };
    }
    return {
      ...state,
      [event.name]: event.value,
    };
  };

  // States
  const [inputList, setInputList] = useState([
    { ingredientName: '', ingredientMeasure: '' },
  ]);
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [recipe, setRecipe] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setRecipe({ ...formData, ingredients: inputList });
  };

  useEffect(() => {
    if (
      submitting &&
      recipe.hasOwnProperty('name') &&
      recipe.hasOwnProperty('description')
    ) {
      sendDataToBackend(recipe);
    }
  }, [recipe]);

  const sendDataToBackend = async (recipe) => {
    // ${process.env.API_HOST}
    const response = await fetch(`/api/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipe }),
    });
    const data = await response.json();
    if (data.recipe.acknowledged) {
      setSubmitting(false);
      alert('Recipe has been added!');
      router.reload();
    }
  };

  // Default Handler
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
    <div className='container'>
      <Nav />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <input
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
            placeholder='Enter name'
            autoComplete='off'
            required
          />
        </fieldset>

        <fieldset>
          <input
            name='description'
            value={formData.description || ''}
            onChange={handleChange}
            placeholder='Enter description'
            autoComplete='off'
            required
          />
        </fieldset>

        <fieldset>
          <input
            name='image'
            // value={formData.imageUrl || ''}
            onChange={handleChange}
            placeholder='Enter image URL'
            autoComplete='off'
            required
            type='text'
          />
        </fieldset>

        {inputList.map((inputEl, idx) => {
          return (
            <div style={{ display: 'flex' }} key={idx}>
              <fieldset>
                <input
                  name='ingredientName'
                  placeholder='Ingredient Name'
                  value={inputEl.ingredientName}
                  onChange={(e) => handleInputChange(e, idx)}
                  autoComplete='off'
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  name='ingredientMeasure'
                  placeholder='Ingredient Measure'
                  value={inputEl.ingredientMeasure}
                  onChange={(e) => handleInputChange(e, idx)}
                  autoComplete='off'
                  required
                />
              </fieldset>
              <div>
                <button onClick={() => handleRemoveIngredientClick(idx)}>
                  Remove Row
                </button>
                <button onClick={handleAddIngredientClick}>Add Row</button>
              </div>
            </div>
          );
        })}

        <button disabled={submitting} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
