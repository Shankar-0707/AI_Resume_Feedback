import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();


    return (
        <div className="h-screen flex flex-col items-center justify-center bg-black text-yellow-300">
            <h1 className="text-5xl font-bold mb-4">🚀 AI Resume Feedback</h1>
            <p className="text-gray-400 mb-8">Upload your resume and get instant AI insights!</p>
            <button
                onClick={() => navigate("/upload")}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
            >
                Start Now
            </button>
        </div>
  );
}

export default Home;