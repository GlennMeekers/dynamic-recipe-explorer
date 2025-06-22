import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState(null);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setCurrentUser(user);
  }
  useEffect(() => {
    checkUser();
  }, []);

  const handleAuthDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleAuth(email, password, authType, onSuccess) {
    // e.preventDefault();

    if (authType === "register") {
      // Registration logic
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      try {
        console.log("Registration successful!");
        checkUser();
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      } catch (error) {
        console.error("Error registering:", error.message);
        alert("Registration failed. Please try again.");
      }
    } else {
      // Login logic
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      try {
        console.log("Login successful!", data);
        checkUser();
        if (typeof onSuccess === "function") {
          onSuccess();
        }
      } catch (error) {
        console.error("Error logging in:", error.message);
        alert("Login failed. Please check your credentials.");
      }
    }

    setFormData({
      email: "",
      password: "",
    });
  }

  // Log out logic
  async function handleSignOut(onSuccess) {
    const { error } = await supabase.auth.signOut();

    try {
      console.log("Signed out successfully!");
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } catch (error) {
      console.error("Error signing out:", error.message);
      alert("Sign out failed. Please try again.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        handleAuth,
        handleSignOut,
        formData,
        handleAuthDataChange,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
