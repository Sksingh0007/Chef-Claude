import React from "react";
import "../App.css";
import IngredientList from "./IngredientList.jsx";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import { getRecipeFromIngredients } from "../ai.js";

export default function Main() {

  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prev) => [...prev, newIngredient]);
  }

  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState();
  const recipeSection = React.useRef(null);

  //scroll to recipe section when it is generated
  React.useEffect(() => {
    if (recipe !== null && recipeSection.current !== null){
      recipeSection.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
}, [recipe])

  async function getRecipe() {
    const recipeMarkdowm = await getRecipeFromIngredients(ingredients);
    setRecipe(recipeMarkdowm);
  }

  function handleDelete(ing) {
    setIngredients((prev) => prev.filter((i) => i !== ing));
  }

  return (
 
    <main>
      
      <form className="main" action={handleSubmit}>
        <input type="text" placeholder="e.g. oregeno" name="ingredient" />
        <button>+ Add ingredient</button>
      </form>
      

      {ingredients.length > 0 && (
        <IngredientList ingredients={ingredients} getRecipe={getRecipe} handleDelete={handleDelete} reference={ recipeSection} />
      )}

      {recipe && <ClaudeRecipe recipe={recipe} />}
    </main>
  );
}
