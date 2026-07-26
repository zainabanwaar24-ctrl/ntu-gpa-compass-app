# 🎓 NTU DCS Academic Compass (Batch 2025–29)

---

## a. App Name, Purpose & Problem Solved

* **App Name:** NTU DCS Academic Compass
* **Target Audience:** Students of National Textile University (NTU), Faisalabad — Department of Computer Science (**BS AI**, **BS CS**, and **BS SE** - Batch 2025–29).
* **What it Does:** An all-in-one academic planner, CGPA predictor, visual progress analyzer, and AI-powered study advisor tailored specifically for NTU DCS degree programs.
* **The Real Problem it Solves:** 
  Students often struggle to calculate required future grades needed to reach a specific target CGPA across complex 8-semester course schemes. Manual calculation of quality points, credit weightages, and retake impacts leads to confusion. Furthermore, students lack instant personalized academic guidance tailored to their current academic standing. This app completely automates transcript calculations and provides instant AI advisement.

---

## b. LIVE Deployed URL

🚀 **Live Production Link:** [https://ntu-gpa-compass-app.vercel.app](https://ntu-gpa-compass-app.vercel.app)

---

## c. Features List

- 🎓 **Multi-Degree Course Schemes:** Built-in official 8-semester course data for **BS AI**, **BS CS**, and **BS SE** (Batch 2025–29).
- ⚖️ **Dual Entry Modes:** Toggle between direct **Letter Grade Mode** and **Marks Percentage (%) Input Mode** with instant automated grade conversion.
- 🎯 **Target CGPA Predictor:** Calculates the exact average GPA required in remaining credit hours to achieve a target graduation CGPA (with feasibility badges: *Achievable*, *Challenging*, or *Mathematically Impossible*).
- 📊 **Visual Analytics Curve:** Interactive bar graph tracking GPA progression from Semester 1 through Semester 8.
- 📄 **Export PDF Summary:** One-click print/export function that generates a clean academic transcript summary hiding clutter and highlighting active results.
- 📜 **Official NTU Grading Scale Modal:** Instant popup reference displaying letter grades, GPA points, and official performance remarks.

---

## d. The AI Feature & System Prompt

* **AI Functionality:** The **Compass AI Advisor** acts as a virtual academic counselor. It reads the student's degree program, current CGPA, target CGPA, remaining credit hours, and required future GPA, then delivers 3 concise, actionable, and encouraging study recommendations.
* **System Prompt Used:**
```text
You are 'Compass AI', an expert Academic Advisor for National Textile University (NTU) Department of Computer Science (${selectedProgram} students, Batch 2025-29). Provide 3 specific, encouraging, and actionable study tips under 150 words based on the student's current transcript standing.

---

## e. Tools, Services, and AI Models Used

* **Frontend Framework:** React 18, TypeScript, Vite

* **Styling & Theme:** Tailwind CSS (Cold Slate & Cyberpunk Glassmorphic Blue Aesthetic)

* **Icons:** Lucide React

* **AI Engine & API:** Groq Cloud API (Llama-3.3-70B-Versatile Model)

* **Deployment Platform:** Vercel Production Infrastructure

* **Version Control:** Git & GitHub


f. Screenshots of the App in Action

Below are live snapshots of the application functionality.

Multi-Degree Dashboard & Scheme Selection:
<img width="1873" height="879" alt="Screenshot 2026-07-27 012451" src="https://github.com/user-attachments/assets/ae24df4b-bc60-42f2-b391-38ee436461a1" />

Target CGPA Predictor & Visual Analytics Curve:
<img width="1887" height="856" alt="Screenshot (118)" src="https://github.com/user-attachments/assets/e2fefdaa-e3f7-4c9d-bb4d-f902a1ce692d" />
<img width="1852" height="875" alt="Screenshot (119)" src="https://github.com/user-attachments/assets/d8f252d1-eb62-42db-b419-9284f8c06525" />


Compass AI Advisor Recommendations:
<img width="1850" height="847" alt="Screenshot (120)" src="https://github.com/user-attachments/assets/beb7585e-02a9-4bb9-abb9-409c876849f4" />

g. How to Run the Project Locally
Follow these steps to run the app on your local machine:

Clone the Repository:

Bash
git clone [https://github.com/zainabanwaar24-ctrl/ntu-gpa-compass-app.git](https://github.com/zainabanwaar24-ctrl/ntu-gpa-compass-app.git)
cd ntu-gpa-compass-app
Install Dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env file in the root directory and add your Groq API key:

Code snippet
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
Start the Development Server:

Bash
npm run dev
Open http://localhost:5173 in your browser.
