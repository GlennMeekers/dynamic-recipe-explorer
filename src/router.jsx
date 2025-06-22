import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./components/NotFound";
import CreateRecipe from "./components/CreateRecipe";
import MyAccount from "./components/MyAccount";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/account",
    element: <MyAccount />,
  },
  {
    path: "/create-recipe",
    element: <CreateRecipe />,
  },
]);
