import React, {useState} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


const Createresume = () => {
    const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState("");

  const handleChange = (e) => {
    setForm({
        ...form, [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
        setLoading(false);
        alert("You must be logged in to create a resume.");
        // Optional: Redirect to login page here
        return; 
    }


    try {
        const res = await axios.post("http://localhost:5000/api/resumecreate/create",{
            ...form,
            skills: form.skills.split(","),
            userId,
        }, {withCredentials: true});

        setGenerated(res.data.resume.generatedResume);
    } catch (error) {
        // Handle axios errors (like the 500 error from the backend if it still happens)
        console.error("Resume creation failed:", error);
        alert("Failed to create resume. Please try again.");
    } finally {
        setLoading(false);
    }
  }


   return (
    <>
    <Navbar/>
    <div className="p-6 mt-16 mx-auto h-screen bg-gray-900 text-white  shadow-lg">
        <div className="p-6 max-w-3xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">🧠 Create Your Resume</h2>

        {["name", "email", "phone", "skills", "experience", "education"].map((field) => (
            <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="w-full p-2 mb-3 bg-gray-800 rounded border border-gray-700"
            />
        ))}

        <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
        >
            {loading ? "Generating..." : "Generate Resume"}
        </button>

        {/* {generated && (
            <div className="mt-6 bg-gray-800 p-4 rounded">
            <h3 className="font-semibold mb-2">AI Generated Resume:</h3>
            <pre className="text-sm whitespace-pre-wrap">{generated}</pre>
            <button
                onClick={() =>
                window.open(`http://localhost:5000/api/resumecreate/download/${localStorage.getItem("userId")}`)
                }
                className="mt-3 bg-green-500 text-black font-bold py-2 px-4 rounded"
            >
                Download Resume
            </button>
            </div>
        )} */}
        </div>
    </div>
    </>
  );
}

export default Createresume;