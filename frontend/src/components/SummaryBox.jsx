export default function SummaryBox({ summary }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Summary</h2>
      <p className="whitespace-pre-wrap">{summary}</p>
    </div>
  );
}
