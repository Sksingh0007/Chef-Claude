import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your real key
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;

export const getRecipeFromIngredients = async (ingredients) => {
  const ingredientsString = ingredients.join(", ");

  const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

  const USER_CONTENT = `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!;`

  try {
    const response = await axios.post(
      `${ GEMINI_API_URL }?key=${ GEMINI_API_KEY }`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\n${USER_CONTENT}` }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const recipe = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return recipe || "No recipe found.";
  } 
  catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to fetch recipe.";
  }
};

