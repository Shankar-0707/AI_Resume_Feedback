import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/upload");
  }
}, []);

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      // Backend returns user info + token
      const { user, token } = res.data;

      // save token in localStorage or cookies
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Set logged-in user in context
      setUser(user);

      navigate("/home"); // redirect after login
    } catch (err) {
      console.error(err);
     alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-300">
      <h1 className="text-4xl font-bold mb-6">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-2 rounded border-2 border-white text-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 rounded border-2 border-white text-white"
      />
      <button
        onClick={handleLogin}
        className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300"
      >
        Login
      </button>

      {/* ✅ Register Link */}
      <p className="mt-4 text-sm text-gray-300">
        New here?{" "}
        <Link to="/register" className="text-yellow-400 underline hover:text-yellow-300 font-semibold">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
