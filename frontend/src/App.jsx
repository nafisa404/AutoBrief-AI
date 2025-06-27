import { motion } from "framer-motion";
import { useState } from "react";
import { FaFire, FaExclamationTriangle } from "react-icons/fa";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState(null);
  const [risks, setRisks] = useState([]);

  const handleSummarize = async () => {
    const res = await fetch("/api/summarize/text/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setRisks(data.risks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-900 text-white p-10">
      <motion.h1 className="text-5xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AutoBrief.AI 🔍
      </motion.h1>

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <textarea
          className="w-full p-4 rounded bg-white/10 text-white placeholder:text-gray-300"
          rows="8"
          placeholder="Paste your news, report, or transcript here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition"
          onClick={handleSummarize}
        >
          Summarize 🚀
        </button>
      </div>

      {summary && (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-black/20 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">📝 Summary</h2>
          <p className="text-lg">{summary}</p>

          <h3 className="text-xl mt-6 mb-2">⚠️ Risks Identified</h3>
          <div className="flex flex-wrap gap-2">
            {risks.map((risk, idx) => (
              <span
                key={idx}
                className="bg-red-500 px-3 py-1 rounded-full text-sm text-white flex items-center gap-1"
              >
                <FaExclamationTriangle /> {risk}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

