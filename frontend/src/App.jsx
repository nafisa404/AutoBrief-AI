import { motion } from "framer-motion";
import { useState } from "react";
import { FaExclamationTriangle, FaMicrophone, FaDownload, FaHistory, FaRedo } from "react-icons/fa";
import html2pdf from "html2pdf.js";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState(null);
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveToHistory = (s, r) => {
    const old = JSON.parse(localStorage.getItem("autobrief_history") || "[]");
    localStorage.setItem("autobrief_history", JSON.stringify([{ summary: s, risks: r, date: new Date() }, ...old]));
  };

  const handleSummarize = async () => {
    if (!text.trim()) return alert("Please enter some text.");
    setLoading(true);
    setSummary(null);
    try {
      const res = await fetch("/api/summarize/text/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setSummary(data.summary);
      setRisks(data.risks || []);
      saveToHistory(data.summary, data.risks || []);
    } catch {
      alert("❌ Error summarizing. Check your backend.");
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = () => {
    const h = JSON.parse(localStorage.getItem("autobrief_history") || "[]");
    if (!h.length) return alert("No previous summary.");
    setSummary(h[0].summary);
    setRisks(h[0].risks);
  };

  const handleSpeech = () => {
    const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    rec.lang = "en-US";
    rec.onresult = e => setText(e.results[0][0].transcript);
    rec.start();
  };

  const exportPDF = () => {
    html2pdf().from(document.getElementById("summary-output")).save("summary.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-900 text-white p-6">
      <motion.h1 className="text-5xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
        AutoBrief.AI 🔍
      </motion.h1>

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
        <textarea
          className="w-full p-4 rounded bg-white/20 text-white placeholder:text-gray-300 resize-none"
          rows="8"
          placeholder="Paste text or speak…"
          value={text} onChange={e => setText(e.target.value)}
        />
        <div className="flex gap-3 mt-4">
          <button onClick={handleSummarize}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md font-medium flex justify-center items-center gap-2">
            {loading ? <FaRedo className="animate-spin" /> : <FaRedo />} {loading ? "Summarizing…" : "Get Output"}
          </button>
          <button onClick={handleSpeech}
            className="bg-pink-600 hover:bg-pink-700 p-2 rounded-md flex items-center justify-center">
            <FaMicrophone />
          </button>
          <button onClick={loadFromHistory}
            className="bg-gray-600 hover:bg-gray-700 p-2 rounded-md flex items-center justify-center">
            <FaHistory />
          </button>
        </div>
      </div>

      {summary && (
        <div id="summary-output" className="max-w-3xl mx-auto mt-10 bg-black/30 backdrop-blur-lg p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">📝 Summary</h2>
          <p className="text-lg">{summary}</p>
          {risks.length > 0 && <>
            <h3 className="mt-6 text-xl font-semibold">⚠️ Risks Identified</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {risks.map((r,i)=>(
                <span key={i}
                  className="bg-red-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <FaExclamationTriangle /> {r}
                </span>
              ))}
            </div>
          </>}
          <button onClick={exportPDF}
            className="mt-6 bg-green-600 hover:bg-green-700 py-2 px-4 rounded-md flex items-center gap-2">
            <FaDownload /> Download PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
