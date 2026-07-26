# 🎓 NTU DCS Academic Compass

### *Your AI-Powered Academic Planner & CGPA Predictor for NTU DCS Students*

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_App-00C2CB?style=for-the-badge)](https://ntu-gpa-compass-app.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/AI-Groq_Llama_3.3-orange?style=for-the-badge)](https://groq.com/)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [The AI Feature — Compass AI Advisor](#-the-ai-feature--compass-ai-advisor)
- [Tools, Services & AI Models Used](#-tools-services--ai-models-used)
- [Screenshots](#-screenshots)
- [How to Run Locally](#-how-to-run-locally)
- [Project Structure](#-project-structure)

---

## 📖 Overview

**NTU DCS Academic Compass** is an all-in-one academic planner, CGPA predictor, visual progress analyzer, and AI-powered study advisor, built specifically for students of **National Textile University (NTU), Faisalabad — Department of Computer Science**, covering **BS AI**, **BS CS**, and **BS SE** (Batch 2025–29).

### The Problem It Solves

Students often struggle to calculate the exact grades they need in upcoming semesters to reach a target CGPA — especially across complex 8-semester course schemes with varying credit weightages. Manual calculation of quality points, credit hours, and retake impacts is confusing and error-prone. On top of that, students rarely have access to instant, personalized academic guidance based on their actual academic standing.

**Academic Compass** solves this by:
- Fully automating transcript and CGPA calculations
- Instantly showing whether a target CGPA is realistically achievable
- Providing AI-generated, personalized study advice in seconds

**Built for:** NTU DCS students (BS AI, BS CS, BS SE — Batch 2025–29) who want clarity and control over their academic journey.

---

## 🚀 Live Demo

🔗 **[https://ntu-gpa-compass-app.vercel.app](https://ntu-gpa-compass-app.vercel.app)**

Click the link above to try the app live — no installation required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎓 **Multi-Degree Course Schemes** | Built-in official 8-semester course data for **BS AI**, **BS CS**, and **BS SE** (Batch 2025–29) |
| ⚖️ **Dual Entry Modes** | Toggle between **Letter Grade Mode** and **Marks Percentage (%) Mode**, with instant automated grade conversion |
| 🎯 **Target CGPA Predictor** | Calculates the exact average GPA required in remaining credit hours to hit your target CGPA, with feasibility badges: *Achievable*, *Challenging*, or *Mathematically Impossible* |
| 📊 **Visual Analytics Curve** | Interactive bar graph tracking GPA progression from Semester 1 through Semester 8 |
| 📄 **Export PDF Summary** | One-click print/export of a clean academic transcript summary, hiding clutter and highlighting active results |
| 📜 **Official NTU Grading Scale Modal** | Instant reference popup showing letter grades, GPA points, and official performance remarks |
| 🤖 **Compass AI Advisor** | Personalized, AI-generated academic guidance based on real-time transcript data |

---

## 🤖 The AI Feature — Compass AI Advisor

The **Compass AI Advisor** acts as a virtual academic counselor built into the app. It analyzes the student's:

- Degree program (BS AI / BS CS / BS SE)
- Current CGPA
- Target CGPA
- Remaining credit hours
- Required future GPA

...and generates **3 concise, actionable, and encouraging study recommendations** tailored to that student's exact academic standing.

### System Prompt Used

```text
You are 'Compass AI', an expert Academic Advisor for National Textile
University (NTU) Department of Computer Science (${selectedProgram}
students, Batch 2025-29). Provide 3 specific, encouraging, and
actionable study tips under 150 words based on the student's current
transcript standing.
```

---

## 🛠 Tools, Services & AI Models Used

| Category | Technology |
|---|---|
| **Frontend Framework** | React 18, TypeScript, Vite |
| **Styling & Theme** | Tailwind CSS (Cold Slate & Cyberpunk Glassmorphic Blue Aesthetic) |
| **Icons** | Lucide React |
| **AI Engine & Model** | Groq Cloud API — Llama-3.3-70B-Versatile |
| **Deployment** | Vercel Production Infrastructure |
| **Version Control** | Git & GitHub |

---

## 📸 Screenshots

### 1. Multi-Degree Dashboard & Scheme Selection
<img width="1873" height="879" alt="Multi-Degree Dashboard" src="https://github.com/user-attachments/assets/ae24df4b-bc60-42f2-b391-38ee436461a1" />
<img width="1791" height="851" alt="Screenshot (123)" src="https://github.com/user-attachments/assets/95ceab94-a11e-45fb-924a-a718ab949c72" />


### 2. Target CGPA Predictor & Visual Analytics Curve
<img width="1887" height="856" alt="Target CGPA Predictor" src="https://github.com/user-attachments/assets/e2fefdaa-e3f7-4c9d-bb4d-f902a1ce692d" />

<img width="1852" height="875" alt="Visual Analytics Curve" src="https://github.com/user-attachments/assets/d8f252d1-eb62-42db-b419-9284f8c06525" />

### 3. Summary PDF Print
<img width="1765" height="864" alt="Screenshot (124)" src="https://github.com/user-attachments/assets/7e578450-ec86-49cc-abeb-64ed2778569a" />

### 4. Compass AI Advisor Recommendations

<img width="1850" height="847" alt="Compass AI Advisor" src="https://github.com/user-attachments/assets/beb7585e-02a9-4bb9-abb9-409c876849f4" />

---

## 💻 How to Run Locally

Follow these steps to run the app on your machine:

**1. Clone the repository**
```bash
git clone https://github.com/zainabanwaar24-ctrl/ntu-gpa-compass-app.git
cd ntu-gpa-compass-app
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**

Create a `.env` file in the root directory and add your Groq API key:
```env
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
```

**4. Start the development server**
```bash
npm run dev
```

**5. Open the app**

Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
ntu-gpa-compass-app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── data/             # Course scheme data (BS AI / CS / SE)
│   ├── utils/            # CGPA calculation logic
│   ├── App.tsx
│   └── main.tsx
├── public/
├── .env                  # Groq API key (not committed)
├── package.json
└── README.md
```

---
