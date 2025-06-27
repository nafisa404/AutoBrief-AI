const BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:8000";

/**
 * Summarize input text using the backend API
 * @param {string} text - The text to summarize
 * @returns {Promise<Object>} summary + risks JSON
 */
export async function summarizeText(text) {
  const response = await fetch(`${BASE_URL}/api/summarize/text/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("❌ API Error:", err);
    throw new Error("Summarization failed");
  }

  return response.json();
}
