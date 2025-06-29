# 🧠 AutoBrief AI — Your Intelligent Document Summarizer

AutoBrief AI is a powerful GenAI web application that provides **instant summaries and risk analysis** of large text inputs or uploaded documents. It leverages **IBM Watsonx's Granite LLM** to extract meaningful insights and returns concise summaries — ideal for legal docs, reports, notes, and more.

---

## 🚀 Features

- 📝 Text & File Summarization (PDF, TXT)
- ⚠️ Risk Identification Engine
- 🧠 Granite LLM Integration via IBM Watsonx
- 🌍 Multilingual Translation (i18next)
- 🌓 Theme Toggle (Dark/Light)
- 📥 Download summaries as PDF
- 🎤 Voice Input (Speech to Text)
- 💬 Chat History (localStorage)
- 💻 Responsive UI + Smooth Animations

---

## 🏗️ Tech Stack

| Frontend        | Backend        | AI/ML & Infra      |
|-----------------|----------------|--------------------|
| React.js (Tailwind CSS) | FastAPI (Python) | IBM Watsonx + Granite LLM |
| i18next for i18n | Uvicorn server | Render for backend |
| Framer Motion + Icons | RESTful API | Vercel for frontend |

---

## 📁 Project Structure

```
AutoBrief-AI/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   └── summarize.py
│   │   ├── services/
│   │   │   └── granite_client.py
│   │   └── utils/
│   │       └── risk_engine.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── index.css
│   └── package.json
├── README.md
└── .env (Not committed)
```

---

## ⚙️ Setup Instructions

### 1. 🐍 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### 🔐 .env Configuration (Backend)

Create a `.env` file in the backend folder with:

```
GRANITE_API_KEY=your_ibm_api_key
GRANITE_PROJECT_ID=your_project_id
```

Then run:

```bash
uvicorn app.main:app --reload
```

---

### 2. ⚛️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Add this to `package.json`:

```json
"proxy": "http://localhost:8000"
```

Update `api.js`:

```js
const BASE_URL = "/api";

export const summarizeText = async (text) => {
  const res = await fetch(`${BASE_URL}/summarize/text/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  return await res.json();
};

export const summarizeFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/summarize/file/`, {
    method: "POST",
    body: formData
  });
  return await res.json();
};
```

---

## ☁️ Deployment Instructions

### 🔁 GitHub Push

```bash
git add .
git commit -m "🚀 Final deploy-ready AutoBrief AI version"
git push origin main
```

### 📦 Backend on Render

- Go to https://render.com
- Create a new **Web Service**
- Link GitHub backend folder
- Add these environment variables in dashboard:
  - `GRANITE_API_KEY`
  - `GRANITE_PROJECT_ID`

### 🌐 Frontend on Vercel

- Go to https://vercel.com
- Create a project from GitHub
- Set environment:
  - `VITE_API_BASE_URL=https://your-render-backend-url`

---

## 🧪 Example Usage

**Input**:  
> "OpenAI develops advanced AI tools like ChatGPT and Codex that understand and generate text."

**Output**:  
```
Summary: OpenAI builds cutting-edge AI tools for natural language processing and generation.
Risks: AI misuse, misinformation, hallucination
```

---

## 🔍 How It Works

1. User submits text or uploads file
2. Backend sends it to IBM Watsonx's Granite model
3. Result is parsed, summarized, and risks extracted
4. Response is rendered and downloadable in PDF
5. Multilingual support, history, and animations enhance UX

---

## 🔮 Future Roadmap

- Support for DOCX and scanned image OCR
- User login + saved summaries
- Context-aware retrieval (RAG) with vector DB
- Watson Translate or Google Cloud Translate expansion

---

## 🙌 Contributing

Pull requests welcome. Please open an issue first for major changes.

---

## 👩‍💻 Built By

**[@nafisa404](https://github.com/nafisa404)** with 💙 using Open Source & AI
