import React from "react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center mt-8 text-yellow-400">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-yellow-400 border-solid mb-4"></div>
    <p>Analyzing your resume... Hold tight 💪</p>
  </div>
);

export default Loader;
