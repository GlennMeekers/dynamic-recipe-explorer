import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function Login() {
  const { handleAuth, formData, handleAuthDataChange, currentUser } =
    UserAuth();
  const navigate = useNavigate();

  //   console.log(currentUser);

  if (currentUser) {
    navigate("/");
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await handleAuth(formData.email, formData.password, "login", () =>
      navigate("/")
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-transparent border border-white rounded-lg shadow-lg p-8">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <p>
        Don't have an account yet?{" "}
        <button
          className="text-violet-500 hover:text-violet-800 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Register
        </button>
      </p>
      <form onSubmit={handleOnSubmit} className="p-4 space-y-6 text-left">
        <div>
          <label className="block text-white font-bold mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleAuthDataChange}
            required
            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-violet-500 bg-transparent text-stone-300 placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-white font-bold mb-1" htmlFor="pwd">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleAuthDataChange}
            required
            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-violet-500 bg-transparent text-stone-300 placeholder-gray-400"
          />
        </div>

        <div className="flex justify-end items-center pt-4">
          <button
            type="submit"
            className="bg-violet-500 text-white px-6 py-2 rounded hover:bg-violet-800 transition-colors font-semibold shadow cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
