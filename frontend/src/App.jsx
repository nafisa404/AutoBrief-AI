import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaDownload, FaSun, FaMoon, FaGlobe } from "react-icons/fa";
import html2pdf from "html2pdf.js";
import { summarizeText, summarizeFile } from "./services/api";
import { useTranslation } from "react-i18next";

export default function App() {
  const [started, setStarted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { t, i18n } = useTranslation();
  const listenRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const startSpeech = () => {
    const rec = new window.webkitSpeechRecognition();
    rec.lang = i18n.language;
    rec.onresult = e => setText(text + " " + e.results[0][0].transcript);
    rec.start();
  };

  const handleSummarize = async () => {
    if (!text && !file) return;
    setLoading(true);
    const res = file ? await summarizeFile(file) : await summarizeText(text);
    setMessages(prev => [...prev, {
      summary: res.summary,
      risks: res.risks,
      date: new Date().toLocaleString()
    }]);
    localStorage.setItem("history", JSON.stringify(messages));
    setLoading(false);
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  return (
    <>
      {!started ? (
        <div className="h-screen bg-gradient-to-bl from-indigo-900 to-indigo-600 flex flex-col justify-center items-center">
          <motion.h1 initial={{ y:-50, opacity:0 }} animate={{ y:0, opacity:1 }} className="text-6xl text-white font-extrabold">AutoBrief AI</motion.h1>
          <motion.button initial={{ scale:0 }} animate={{ scale:1 }} onClick={() => setStarted(true)}
            className="mt-8 bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition">
            {t("Get Started")}
          </motion.button>
        </div>
      ) : (
        <div className="min-h-screen p-6 bg-gradient-to-tr from-gray-800 to-gray-600 text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <FaSun size={24}/> : <FaMoon size={24}/>}
              </button>
              <button onClick={() => i18n.changeLanguage(i18n.language === "en" ? "es" : "en")}>
                <FaGlobe size={24}/>
              </button>
            </div>
            <h2 className="text-xl font-bold">{t("AutoBrief Chat")}</h2>
          </div>

          <div ref={containerRef} className="max-h-96 overflow-y-auto mb-4 space-y-4">
            {messages.map((msg, idx) => (
              <motion.div key={idx} initial={{ opacity:0 }} animate={{ opacity:1 }}
                className="bg-gray-700 p-4 rounded-lg">
                <p><strong>{t("Summary")}:</strong> {msg.summary}</p>
                <p><strong>{t("Risks")}:</strong> {msg.risks.join(", ")}</p>
                <p className="text-sm text-gray-400">{msg.date}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <textarea value={text} onChange={e => setText(e.target.value)}
              placeholder={t("Paste text...")} className="flex-1 p-3 rounded-lg bg-gray-700 resize-none" rows={4}/>
            <input type="file" accept=".txt,.pdf" onChange={e => setFile(e.target.files[0])}
              className="file:bg-gray-700 file:text-white file:px-4 file:py-2 file:rounded"/>
          </div>

          <div className="flex gap-4">
            <button onClick={handleSummarize} disabled={loading}
              className="px-6 py-2 bg-indigo-500 rounded hover:bg-indigo-600 transition disabled:opacity-50">
              {loading ? t("Summarizing...") : t("Summarize")}
            </button>
            <button onClick={() => html2pdf().from(containerRef.current).save()}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition">
              <FaDownload/> {t("Download PDF")}
            </button>
            <button onClick={startSpeech}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
              <FaMicrophone/> {t("Speak")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
