import React, { useState } from "react";
import SummaryBox from "./components/SummaryBox";
import RiskList from "./components/RiskList";
import { summarizeText } from "./services/api";

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await summarizeText(text);
      setData(res);
    } catch (e) {
      setError("Error: text must be ≥50 characters");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6">AutoBrief AI</h1>
      <textarea
        className="w-full max-w-xl h-40 p-4 border rounded-lg focus:outline-indigo-600"
        placeholder="Paste your business report..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Summarize"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {data && (
        <div className="w-full max-w-xl mt-6 space-y-6">
          <SummaryBox summary={data.summary} />
          <RiskList risks={data.risks} />
        </div>
      )}
    </div>
  );
}
