import { useState } from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaMicrophone } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { summarizeText } from "./services/api";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState(null);
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const data = await summarizeText(text);
      setSummary(data.summary);
      setRisks(data.risks);
      saveToHistory(data.summary, data.risks);
    } catch (err) {
      alert("Error fetching summary.");
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      setText((prev) => prev + event.results[0][0].transcript);
    };
    recognition.start();
  };

  const saveToHistory = (summary, risks) => {
    const old = JSON.parse(localStorage.getItem("autobrief_history") || "[]");
    const updated = [{ summary, risks, date: new Date() }, ...old];
    localStorage.setItem("autobrief_history", JSON.stringify(updated));
  };

  const exportPDF = () => {
    const element = document.getElementById("summary-section");
    html2pdf().from(element).save("AutoBrief_Summary.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AutoBrief.AI 🔍
      </motion.h1>

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <textarea
          className="w-full p-4 bg-transparent border border-gray-400 rounded text-white"
          rows="8"
          placeholder="Paste news, transcripts, or reports..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSummarize}
            className="bg-indigo-500 hover:bg-indigo-600 w-full text-white font-bold py-2 rounded"
          >
            {loading ? "Summarizing..." : "Summarize 🚀"}
          </button>
          <button
            onClick={handleVoiceInput}
            className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-white"
            title="Dictate using voice"
          >
            <FaMicrophone />
          </button>
        </div>
      </div>

      {summary && (
        <div id="summary-section" className="max-w-3xl mx-auto mt-8 p-6 bg-black/30 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">📝 Summary</h2>
          <p className="text-lg">{summary}</p>

          <h3 className="text-xl mt-6 mb-2">⚠️ Risks</h3>
          <div className="flex flex-wrap gap-2">
            {risks.map((r, idx) => (
              <span
                key={idx}
                className="bg-red-500 px-3 py-1 rounded-full text-sm text-white flex items-center gap-1"
              >
                <FaExclamationTriangle /> {r}
              </span>
            ))}
          </div>

          <button
            onClick={exportPDF}
            className="mt-6 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            📄 Export as PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
