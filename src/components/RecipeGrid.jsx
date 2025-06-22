import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import Error from "./Error";

export default function RecipeGrid() {
  const [recipes, setRecipes] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      setIsFetching(true);
      const { data, error } = await supabase.from("recipes").select("*");
      console.log(data);

      try {
        setRecipes(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user recipes." });
      }

      setIsFetching(false);
    }

    fetchRecipes();
  }, []);

  if (error) {
    return <Error title="An error occured" message={error.message} />;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-stone-300">Recipe Grid</h1>
      {isFetching && <p className="fallback-text">Fetching recipes...</p>}
      {!isFetching && recipes.length === 0 && (
        <p className="text-center">
          You have no recipes yet. Click the button below to create your first
          recipe.
        </p>
      )}
      {!isFetching && recipes.length > 0 && (
        <div className="grid grid-cols-4 gap-6 my-8">
          {recipes.map((recipe) => {
            return (
              <div
                key={recipe.title}
                className="flex flex-col gap-3 p-3 bg-stone-700 rounded-sm"
              >
                <h3>{recipe.title}</h3>
                <p>Duration: {recipe.duration}</p>
              </div>
            );
          })}
        </div>
      )}
      <Link
        className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-800 transition-colors font-semibold shadow cursor-pointer"
        to="/create-recipe"
      >
        New Recipe
      </Link>
    </div>
  );
}
