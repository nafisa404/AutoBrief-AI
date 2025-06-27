import { motion } from "framer-motion";
import { FaCopy, FaFilePdf } from "react-icons/fa";
import html2pdf from "html2pdf.js";

export default function SummaryBox({ summary, risks }) {
  const downloadPDF = () => {
    const element = document.getElementById("report");
    html2pdf().from(element).save("autobrief-report.pdf");
  };

  const copyText = () => {
    navigator.clipboard.writeText(summary);
    alert("Copied summary to clipboard!");
  };

  return (
    <motion.div
      id="report"
      className="bg-white/10 backdrop-blur-md p-6 rounded-lg mt-10 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold">📝 Summary</h2>
      <p>{summary}</p>
      <h3 className="mt-4 font-semibold">⚠️ Risks</h3>
      <ul className="list-disc ml-6">
        {risks.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      <div className="flex gap-4 mt-4">
        <button onClick={copyText} className="bg-indigo-500 px-4 py-2 rounded flex items-center gap-2">
          <FaCopy /> Copy
        </button>
        <button onClick={downloadPDF} className="bg-red-500 px-4 py-2 rounded flex items-center gap-2">
          <FaFilePdf /> Download PDF
        </button>
      </div>
    </motion.div>
  );
}
