import React, { useState } from "react";
import API from "../api/api";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please upload a resume first!");

    setLoading(true);

    try {
      // Upload resume
      const formData = new FormData();
      formData.append("resume", file);

      const uploadRes = await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const resumeId = uploadRes.data.resume._id;

      // ✅ DAY 4 FEATURE: Analyze Resume & get structured JSON feedback
      const analyzeRes = await API.post(`/resume/analyze/${resumeId}`);
      setFeedback(analyzeRes.data.feedback); // feedback = { strengths, improvements, keywords, score }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-300 px-4">
      <h1 className="text-4xl font-bold mb-8">🧠 AI Resume Feedback System</h1>

      {/* Upload Box */}
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-4 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-yellow-400 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
      </div>

      {/* Loader */}
      {loading && (
        <>
          <Loader />
          <div className="mt-8 text-yellow-400 animate-pulse">
            Analyzing your resume... ⏳
          </div>
        </>
      )}

      {/* ✅ DAY 4 FEATURE: Structured Feedback Section */}
      {feedback && (
        <div className="mt-10 bg-gray-800 p-6 rounded-2xl shadow-lg max-w-2xl text-left">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">
            AI Feedback
          </h2>

          {/* ✅ DAY 4: Score */}
          {feedback.score && (
            <div className="mb-4 flex justify-between items-center">
              <span className="text-gray-400 font-semibold">Resume Score:</span>
              <span className="text-yellow-300 font-bold text-2xl">
                {feedback.score}/100
              </span>
            </div>
          )}

          {/* ✅ DAY 4: Strengths */}
          {feedback.strengths && (
            <div className="mb-4">
              <h3 className="text-xl text-green-400 font-semibold mb-2">
                ✅ Strengths
              </h3>
              <ul className="list-disc ml-5 text-gray-300">
                {feedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ DAY 4: Improvements */}
          {feedback.improvements && (
            <div className="mb-4">
              <h3 className="text-xl text-red-400 font-semibold mb-2">
                ⚠️ Improvements
              </h3>
              <ul className="list-disc ml-5 text-gray-300">
                {feedback.improvements.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ DAY 4: Suggested Keywords */}
          {feedback.keywords && (
            <div>
              <h3 className="text-xl text-yellow-400 font-semibold mb-2">
                🏷️ Suggested Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {feedback.keywords.map((k, i) => (
                  <span
                    key={i}
                    className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      
    </div>
    </>
  );
};

export default Upload;
