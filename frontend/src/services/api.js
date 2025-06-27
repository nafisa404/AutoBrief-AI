export async function summarizeText(text) {
  const res = await fetch("/api/summarize/text/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error("API error");
  return res.json();
}
