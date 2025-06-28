const BASE_URL = "https://autobrief-ai-backend.onrender.com/";

export const summarizeText = async (text) => {
  try {
    const res = await fetch("/api/summarize/text/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!res.ok) {
      throw new Error("Failed to summarize text");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error summarizing text:", error);
    return { summary: "❌ Error summarizing", risks: [] };
  }
};

export const summarizeFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/summarize/file/", {
      method: "POST",
      body: formData
    });

    if (!res.ok) {
      throw new Error("Failed to summarize file");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error summarizing file:", error);
    return { summary: "❌ Error summarizing", risks: [] };
  }
};
