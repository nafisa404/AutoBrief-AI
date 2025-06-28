// frontend/src/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "https://autobrief-backend.onrender.com";

export async function summarizeText(text) {
  const res = await fetch(`${BASE_URL}/api/summarize/text/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Summarization failed.");
  return await res.json();
}

export async function summarizeFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/api/summarize/file/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("File summarization failed.");
  return await res.json();
}
