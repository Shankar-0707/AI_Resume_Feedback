import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Viewresume = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const userId = localStorage.getItem("userId");
      const res = await axios.get(
        `http://localhost:5000/api/resumecreate/${userId}`
      );
      setResumes(res.data);
    };
    fetchResumes();
  }, []);

  if (!resumes || resumes.length === 0)
    return (
      <>
         <Navbar /> {/* Navbar is important for consistent layout */}
       {" "}
        <div className="p-6 mx-auto bg-gray-900 text-white  shadow-lg min-h-screen flex flex-col items-center justify-center">
         {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 mb-4 text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {" "}
          <p className="text-xl font-semibold text-gray-400">
             No resume Found {" "}
          </p>
          {" "}
          <p className="text-md text-gray-500 mt-2">
            Please Create Your resume First{" "}
          </p>
         {" "}
        </div>
        {" "}
      </>
    );

  return (
    <>
      <Navbar />
      <div className="p-6 mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">
          My Generated Resumes ({resumes.length})
        </h2>

        {/* ✅ Map over the array to display each resume */}
        {resumes.map((resume, index) => (
          <div
            key={resume._id}
            className="mb-8 p-4 bg-gray-800 rounded-lg border-2 border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-2">
              {resume.name}'s Resume (Resume #{index + 1})
            </h3>

            {/* Display the resume text */}
            <pre className="text-sm whitespace-pre-wrap p-3 bg-gray-900 rounded">
              {resume.generatedResume}
            </pre>

            <button
              onClick={() =>
                // Use the individual resume's ID for the download link
                window.open(
                  `http://localhost:5000/api/resumecreate/download/${resume._id}`
                )
              }
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Viewresume;
