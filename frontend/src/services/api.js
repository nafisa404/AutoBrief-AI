const BASE_URL = "https://autobrief-ai-backend.onrender.com/";

export async function summarizeText(text) {
  try {
    const response = await fetch(`${BASE_URL}/text/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) throw new Error("Failed to summarize text");
    return await response.json();
  } catch (error) {
    console.error("Error summarizing text:", error);
    return { summary: "❌ Error summarizing", risks: [] };
  }
}

export async function summarizeFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${BASE_URL}/file/`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error("Failed to summarize file");
    return await response.json();
  } catch (error) {
    console.error("Error summarizing file:", error);
    return { summary: "❌ Error summarizing", risks: [] };
  }
}
