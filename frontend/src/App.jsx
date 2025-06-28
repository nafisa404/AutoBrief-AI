import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaFilePdf, FaExclamationTriangle } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { summarizeText } from "./services/api";


function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState(null);
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleSummarize = async () => {
    setLoading(true);
    const res = await fetch("/api/summarize/text/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setSummary(data.summary);
    setRisks(data.risks);
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/summarize/file/", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setSummary(data.summary);
    setRisks(data.risks);
    setLoading(false);
  };

  const downloadPDF = () => {
    html2pdf().from(resultRef.current).save("AutoBrief-Summary.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-900 text-white p-10">
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AutoBrief.AI 📄
      </motion.h1>

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <textarea
          className="w-full p-4 rounded bg-white/10 text-white placeholder:text-gray-300"
          rows="6"
          placeholder="Paste your text or report here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="file"
          accept=".txt"
          className="my-3 text-sm"
          onChange={handleFileUpload}
        />
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="mt-2 w-full bg-indigo-500 hover:bg-indigo-600 py-2 px-4 rounded text-white font-bold"
        >
          {loading ? "Summarizing..." : "Summarize Text 🚀"}
        </button>
      </div>

      {summary && (
        <div ref={resultRef} className="max-w-3xl mx-auto mt-10 p-6 bg-black/20 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">📝 Summary</h2>
            <button
              onClick={downloadPDF}
              className="bg-red-600 hover:bg-red-700 p-2 rounded text-white flex items-center gap-2"
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
          <p className="text-lg">{summary}</p>

          <h3 className="text-xl mt-6 mb-2">⚠️ Risks Identified</h3>
          <div className="flex flex-wrap gap-2">
            {risks.map((risk, idx) => (
              <span key={idx} className="bg-red-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
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
