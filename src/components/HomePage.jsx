import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import RecipeGrid from "./RecipeGrid";
import { useEffect } from "react";

export default function HomePage() {
  const { handleSignOut, currentUser } = UserAuth();
  const navigate = useNavigate();

  console.log(currentUser);

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <header>
        <h1 className="text-4xl text-left mb-8 font-bold">
          Welcome, {currentUser ? currentUser.email : "visitor"}!
        </h1>
      </header>
      <main>
        <button
          className="text-violet-500 hover:text-violet-800 transition-colors font-semibold cursor-pointer"
          onClick={() => handleSignOut(navigate("/login"))}
        >
          Sign out
        </button>
        <RecipeGrid />
      </main>
    </>
  );
}
