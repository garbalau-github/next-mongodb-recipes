import Nav from '../../components/Nav';

const Recipe = ({ recipe }) => {
  const { image, name, description, ingredients } = recipe;

  return (
    <div className='container'>
      <Nav />
      <div className='recipe-card'>
        <h2>{name}</h2>
        <img src={image} alt={name} />
        <div>
          <h3>Ingredients:</h3>
          {ingredients.map(({ name, measure }, index) => (
            <p key={index}>
              {name.toUpperCase()} - {measure.toUpperCase()}
            </p>
          ))}
        </div>
        <div>
          <h3>How to cook it?</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/details?_id=${ctx.query.id}`
    );
    const recipe = await response.json();
    return {
      props: { recipe },
    };
  } catch (err) {
    console.log(err);
  }
}

export default Recipe;
