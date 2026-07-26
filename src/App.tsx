import React, { useState } from 'react';
import { Bot, Sparkles, AlertCircle, Loader2, BookOpen, Calculator, Award, GraduationCap, CheckCircle, RefreshCw } from 'lucide-react';

// --- NTU BS AI SCHEME DATA ---
const NTU_SCHEME: Record<number, { name: string; cr: number }[]> = {
  1: [
    { name: 'Physics for Computing', cr: 2 },
    { name: 'Physics for Computing LAB', cr: 1 },
    { name: 'Programming Fundamentals (PF)', cr: 3 },
    { name: 'Programming Fundamentals LAB', cr: 1 },
    { name: 'Functional English (FE)', cr: 3 },
    { name: 'Introduction to ICT', cr: 2 },
    { name: 'Introduction to ICT LAB', cr: 1 },
    { name: 'Discrete Structures', cr: 3 },
    { name: 'Translation of Al-Quran-I', cr: 0 },
  ],
  2: [
    { name: 'Probability and Statistics', cr: 3 },
    { name: 'Fundamentals of Management', cr: 2 },
    { name: 'Database Systems', cr: 3 },
    { name: 'Database Systems LAB', cr: 1 },
    { name: 'Digital Logic Design (DLD)', cr: 2 },
    { name: 'Digital Logic Design LAB', cr: 1 },
    { name: 'Object Oriented Programming (OOP)', cr: 3 },
    { name: 'Object Oriented Programming LAB', cr: 1 },
    { name: 'Islamic Studies', cr: 2 },
    { name: 'Translation of Al-Quran-II', cr: 0 },
  ],
  3: [
    { name: 'Calculus and Analytic Geometry (CAG)', cr: 3 },
    { name: 'Data Structures (DS)', cr: 3 },
    { name: 'Data Structures LAB', cr: 1 },
    { name: 'Data Communication and Networks', cr: 2 },
    { name: 'Data Communication and Networks LAB', cr: 1 },
    { name: 'Introduction to Artificial Intelligence', cr: 2 },
    { name: 'Introduction to Artificial Intelligence LAB', cr: 1 },
    { name: 'Software Engineering Fundamentals', cr: 3 },
    { name: 'Translation of Al-Quran-III', cr: 0 },
  ],
  4: [
    { name: 'Linear Algebra', cr: 3 },
    { name: 'Programming for Artificial Intelligence', cr: 2 },
    { name: 'Programming for Artificial Intelligence LAB', cr: 1 },
    { name: 'Information Security', cr: 2 },
    { name: 'Information Security LAB', cr: 1 },
    { name: 'Computer Organization & Assembly Language', cr: 2 },
    { name: 'Computer Organization & Assembly Language LAB', cr: 1 },
    { name: 'Knowledge Representation and Reasoning', cr: 2 },
    { name: 'Knowledge Representation and Reasoning LAB', cr: 1 },
    { name: 'Expository Writing (EW)', cr: 3 },
    { name: 'Translation of Al-Quran-IV', cr: 0 },
  ],
  5: [
    { name: 'Multivariable Calculus', cr: 3 },
    { name: 'Machine Learning', cr: 2 },
    { name: 'Machine Learning LAB', cr: 1 },
    { name: 'Operating Systems (OS)', cr: 2 },
    { name: 'Operating Systems LAB', cr: 1 },
    { name: 'Design and Analysis of Algorithms', cr: 3 },
    { name: 'AI Elective I', cr: 3 },
    { name: 'AI Elective II', cr: 3 },
    { name: 'Translation of Al-Quran-V', cr: 0 },
  ],
  6: [
    { name: 'Artificial Neural Networks & Deep Learning', cr: 2 },
    { name: 'Artificial Neural Networks LAB', cr: 1 },
    { name: 'Parallel and Distributed Computing', cr: 2 },
    { name: 'Parallel and Distributed Computing LAB', cr: 1 },
    { name: 'AI Elective III', cr: 3 },
    { name: 'AI Elective IV', cr: 3 },
    { name: 'Financial Accounting', cr: 3 },
    { name: 'Introduction to Textiles', cr: 2 },
    { name: 'Translation of Al-Quran-VI', cr: 0 },
  ],
  7: [
    { name: 'BS Final Project-I (FYP-1)', cr: 2 },
    { name: 'Computer Vision', cr: 2 },
    { name: 'Computer Vision LAB', cr: 1 },
    { name: 'AI Elective V', cr: 3 },
    { name: 'AI Elective VI', cr: 3 },
    { name: 'Technical and Business Writing', cr: 3 },
    { name: 'Entrepreneurship', cr: 2 },
    { name: 'Ideology and Constitution of Pakistan', cr: 2 },
    { name: 'Translation of Al-Quran-VII', cr: 0 },
  ],
  8: [
    { name: 'BS Final Project-II', cr: 4 },
    { name: 'AI Elective VII', cr: 3 },
    { name: 'Civics & Community Engagement', cr: 2 },
    { name: 'Professional Practices', cr: 2 },
    { name: 'Translation of Al-Quran-VIII', cr: 0 },
  ]
};

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.66,
  'B+': 3.33, 'B': 3.0, 'B-': 2.66,
  'C+': 2.33, 'C': 2.0, 'C-': 1.66,
  'D+': 1.33, 'D': 1.0, 'F': 0.0,
  'I': -1, 'W': -1
};

interface Course {
  id: string;
  name: string;
  cr: number;
  grade: string;
}

export function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [targetCGPA, setTargetCGPA] = useState<number>(3.5);
  const [selectedSem, setSelectedSem] = useState<number>(1);
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load NTU Scheme
  const loadSemester = (semNum: number) => {
    const semCourses = NTU_SCHEME[semNum] || [];
    const newCourses = semCourses.map((c, i) => ({
      id: `${semNum}-${i}-${Date.now()}`,
      name: c.name,
      cr: c.cr,
      grade: 'A'
    }));
    setCourses(newCourses);
  };

  const updateGrade = (id: string, newGrade: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, grade: newGrade } : c));
  };

  const addCustomCourse = () => {
    setCourses([...courses, { id: `${Date.now()}`, name: 'New Course', cr: 3, grade: 'A' }]);
  };

  // Calculations
  const validCourses = courses.filter(c => c.cr > 0 && c.grade !== 'I' && c.grade !== 'W');
  const totalEarnedCredits = validCourses.reduce((sum, c) => sum + c.cr, 0);
  const totalQualityPoints = validCourses.reduce((sum, c) => sum + (c.cr * (GRADE_POINTS[c.grade] || 0)), 0);
  const currentCGPA = totalEarnedCredits > 0 ? totalQualityPoints / totalEarnedCredits : 0;

  const totalGraduationCredits = 133;
  const remainingCredits = Math.max(0, totalGraduationCredits - totalEarnedCredits);
  const neededPoints = (targetCGPA * totalGraduationCredits) - totalQualityPoints;
  const requiredGPA = remainingCredits > 0 ? Math.max(0, neededPoints / remainingCredits) : 0;

  // Groq API Call
  const getAIAdvice = async () => {
    setLoading(true);
    setError(null);

    // Supports both VITE_GROQ_API_KEY and VITE_GEMINI_API_KEY
    const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setError("Groq API key is missing. Set VITE_GROQ_API_KEY or VITE_GEMINI_API_KEY in Vercel settings.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are 'Compass AI', an academic advisor for National Textile University (NTU) BS AI students. Give 3 short, encouraging study tips under 150 words based on transcript standing.`
            },
            {
              role: 'user',
              content: `My Current CGPA is ${currentCGPA.toFixed(2)}, Target is ${targetCGPA.toFixed(2)}, Remaining Credits: ${remainingCredits}, Required Future GPA: ${requiredGPA.toFixed(2)}.`
            }
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || `Error ${response.status}`);
      }

      const data = await response.json();
      setAdvice(data.choices[0]?.message?.content || 'No advice received.');
    } catch (err: any) {
      setError(err.message || 'Failed to connect to AI Advisor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
              🎓 NTU GPA Compass
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              National Textile University — BS AI (Batch 2023–27) Official Grading & Predictor
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Current CGPA</span>
              <span className="text-2xl font-bold text-emerald-400">{currentCGPA.toFixed(2)}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Credits Earned</span>
              <span className="text-2xl font-bold text-indigo-400">{totalEarnedCredits} CR</span>
            </div>
          </div>
        </header>

        {/* Course Scheme Loader */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-semibold">Load NTU BS AI Semester Courses</h2>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
              <button
                onClick={() => loadSemester(selectedSem)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
              >
                <RefreshCw className="w-4 h-4" /> Load Courses
              </button>
            </div>
          </div>

          {/* Courses List */}
          {courses.length > 0 && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {courses.map((course) => (
                <div key={course.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-medium text-slate-200">{course.name}</p>
                    <span className="text-[10px] text-slate-400">{course.cr} Credit Hours</span>
                  </div>
                  <select
                    value={course.grade}
                    onChange={(e) => updateGrade(course.id, e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-amber-400 font-bold"
                  >
                    {Object.keys(GRADE_POINTS).map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={addCustomCourse}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline block pt-2"
          >
            + Add Custom Subject Manually
          </button>
        </div>

        {/* Predictor & AI Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Target Predictor Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-400" /> Target CGPA Predictor
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Target Graduation CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  value={targetCGPA}
                  onChange={(e) => setTargetCGPA(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white text-sm mt-1"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 pt-1">
                <span>Remaining Credits: <strong className="text-slate-200">{remainingCredits} CR</strong></span>
                <span>Graduation Total: <strong className="text-slate-200">133 CR</strong></span>
              </div>
            </div>

            <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl space-y-1">
              <span className="text-xs text-slate-400">Required Future Average GPA:</span>
              <div className="text-2xl font-black text-indigo-400">
                {requiredGPA > 4.0 ? (
                  <span className="text-rose-400 text-lg">🚨 Mathematically Impossible (&gt;4.0)</span>
                ) : (
                  <span>{requiredGPA.toFixed(2)} / 4.00</span>
                )}
              </div>
            </div>
          </div>

          {/* AI Advisor Panel */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white flex items-center gap-2">
                  Compass AI Advisor <Sparkles className="w-4 h-4 text-amber-400" />
                </h3>
                <p className="text-xs text-slate-400">Powered by Groq Llama-3 AI</p>
              </div>
            </div>

            <button
              onClick={getAIAdvice}
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Transcript...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Ask Compass AI Advisor
                </>
              )}
            </button>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <p>{error}</p>
              </div>
            )}

            {advice && (
              <div className="p-4 bg-slate-800/60 border border-indigo-500/30 rounded-xl text-slate-200 text-xs leading-relaxed space-y-2">
                <div className="font-semibold text-indigo-400 text-[10px] uppercase tracking-wider">Advisor Notes:</div>
                <div className="whitespace-pre-line">{advice}</div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
