import React from "react";
import "../App.css";
import IngredientList from "./IngredientList.jsx";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import  { getRecipeFromMistral } from "../ai.js";

export default function Main() {
  function handleSubmit(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prev) => [...prev, newIngredient]);
  }

  const [ingredients, setIngredients] = React.useState([
  ]);

  const [recipeShown, setRecipeShown] = React.useState(false);
  async function getRecipe() {
    const recipeMarkdowm = await getRecipeFromMistral(ingredients);
      console.log(recipeMarkdowm);
      setRecipeShown(true);
  }

  return (
    <main>
      <form className="main" action={handleSubmit}>
        <input type="text" placeholder="e.g. oregeno" name="ingredient" />
        <button>+ Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipeShown && <ClaudeRecipe />}
    </main>
  );
}
