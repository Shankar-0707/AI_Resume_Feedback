import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useUser } from "../context/UserContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Navbar from "../components/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const History = () => {
  const { user } = useUser();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    if(!user) return;

    const fetchHistory = async () => {
      try {
        const res = await API.get(`/feedback/user/${user.id}`);
        setFeedbacks(res.data);
        console.log(feedbacks);
      } catch (err) {
        console.error("Error fetching feedback history:", err);
      }
    };
    fetchHistory();
  }, [user]);

  // Prepare chart data
  const data = {
    labels: feedbacks.map((f, i) => `Resume ${i + 1}`),
    datasets: [
      {
        label: "Resume Score",
        data: feedbacks.map((f) => f.score),
        borderColor: "#FACC15", // yellow
        backgroundColor: "rgba(250, 204, 21, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
      <>
      <Navbar />
      <div className="mt-16 min-h-screen bg-black text-yellow-300 px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">📊 Resume Feedback History</h1>

      {feedbacks.length === 0 ? (
        <p>No feedback history yet.</p>
      ) : (
        <>
          <div className="max-w-3xl mb-10">
            <Line data={data} />
          </div>

          <div className="flex flex-col gap-6">
            {feedbacks.map((f, idx) => (
              <div key={f._id} className="bg-gray-900 p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-bold mb-2 text-yellow-400">
                  Resume {idx + 1} – Score: {f.score}/100
                </h2>

                <div className="mb-2">
                  <h3 className="text-green-400 font-semibold">✅ Strengths</h3>
                  <ul className="ml-5 list-disc text-gray-300">
                    {f.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-2">
                  <h3 className="text-red-400 font-semibold">⚠️ Improvements</h3>
                  <ul className="ml-5 list-disc text-gray-300">
                    {f.improvements.map((i, idx2) => (
                      <li key={idx2}>{i}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {f.keywords.map((k, i) => (
                    <span key={i} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
      </>
  );
};

export default History;