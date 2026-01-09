import React, { useState, useEffect } from "react";
import API from "../api/api";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/");
  }
}, []);

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", { name, email, password });
      const { user, token } = res.data;

      // Save token + user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", res.data.user.id);


      setUser(user); // ✅ update UserContext

      navigate("/"); // redirect to upload page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-300">
      <h1 className="text-4xl font-bold mb-6">Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 p-2 rounded border-2 border-white text-white"
      />
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
        className="mb-4 p-2 rounded border-2 border-white  text-white"
      />
      <button
        onClick={handleRegister}
        className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-300"
      >
        Register
      </button>

      <p className="mt-4 text-sm text-gray-300">
        Already have a account ? {" "}
        <Link to="/login" className="text-yellow-400 underline hover:text-yellow-300 font-semibold">
          Login 
        </Link>
      </p>
    </div>
  );
};

export default Register;
