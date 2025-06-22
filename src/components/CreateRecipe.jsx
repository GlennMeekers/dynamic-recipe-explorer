import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    ingredients: "",
    duration: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("recipes").insert([
        {
          title: formData.title,
          instructions: formData.instructions,
          ingredients: formData.ingredients,
          duration: formData.duration,
          category: formData.category,
        },
      ]);

      if (error) throw error;

      alert("Recipe created successfully!");
      setFormData({
        title: "",
        instructions: "",
        ingredients: "",
        duration: "",
        category: "",
      });
    } catch (error) {
      console.error("Error creating recipe:", error.message);
      alert("Failed to create recipe. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-transparent border border-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Add New Recipe
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div>
          <label className="block text-white font-bold mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-violet-500 bg-transparent text-stone-300 placeholder-gray-400"
          />
        </div>
        <div>
          <label
            className="block text-white font-bold mb-1"
            htmlFor="instructions"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-violet-500 bg-transparent text-stone-300 placeholder-gray-400 resize-none"
          />
        </div>
        <div>
          <label
            className="block text-white font-bold mb-1"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:border-violet-500 bg-transparent text-stone-300 placeholder-gray-400 resize-none"
          />
        </div>
        <div>
          <label className="block text-white font-bold mb-1" htmlFor="duration">
            Duration (in minutes)
          </label>
          <input
            id="duration"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-violet-500 bg-transparent text-stone-300 placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-white font-bold mb-1" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-violet-500 bg-transparent text-stone-300 placeholder-gray-400"
          />
        </div>
        <div className="flex justify-between items-center pt-4">
          <Link
            to="/"
            className="bg-transparent border border-red-500 text-white px-6 py-2 rounded hover:bg-red-500 transition-colors font-semibold shadow cursor-pointer"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-violet-500 text-white px-6 py-2 rounded hover:bg-violet-800 transition-colors font-semibold shadow cursor-pointer"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
