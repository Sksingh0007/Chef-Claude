export default function IngredientList(props) {

    const display = props.ingredients.map((i) => <li key={i}>{i}</li>);

  return (
    <section className="section">
      <h2>Ingredient on hands:</h2>
      <ul>{display}</ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipie">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipie form a list of ingredients.</p>
          </div>
          <button onClick={props.getRecipe}>Get a recipie</button>
        </div>
      )}
    </section>
  );
}
