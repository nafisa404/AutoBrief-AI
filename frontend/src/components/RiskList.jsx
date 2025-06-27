export default function RiskList({ risks }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2">Detected Risks</h2>
      <ul className="list-disc pl-6">
        {risks.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  );
}
