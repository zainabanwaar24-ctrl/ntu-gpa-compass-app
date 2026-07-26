import React, { useState } from 'react';
import { Bot, Sparkles, AlertCircle, Loader2, BookOpen, Calculator, Award, GraduationCap, RefreshCw, Eye, X, Layers, Printer, TrendingUp } from 'lucide-react';

// --- OFFICIAL NTU GRADING POLICY DATA ---
const NTU_GRADES: Record<string, { points: number; remarks: string; emoji: string }> = {
  'A+': { points: 4.00, remarks: 'Exceptional', emoji: '🏆' },
  'A':  { points: 4.00, remarks: 'Outstanding', emoji: '⭐' },
  'A-': { points: 3.66, remarks: 'Excellent', emoji: '🌟' },
  'B+': { points: 3.33, remarks: 'Very Good', emoji: '👍' },
  'B':  { points: 3.00, remarks: 'Good', emoji: '✅' },
  'B-': { points: 2.66, remarks: 'Good Above', emoji: '👌' },
  'C+': { points: 2.33, remarks: 'Average', emoji: '⚖️' },
  'C':  { points: 2.00, remarks: 'Satisfactory', emoji: '🙂' },
  'C-': { points: 1.66, remarks: 'Pass', emoji: '📈' },
  'D+': { points: 1.33, remarks: 'Low Pass', emoji: '⚠️' },
  'D':  { points: 1.00, remarks: 'Marginal Pass', emoji: '🛑' },
  'F':  { points: 0.00, remarks: 'Fail', emoji: '❌' },
  'I':  { points: -1,   remarks: 'Incomplete', emoji: '⏳' },
  'W':  { points: -1,   remarks: 'Withdrawn', emoji: '🚫' },
};

// --- NTU DEPARTMENT OF COMPUTER SCIENCE SCHEMES (BATCH 2025-29) ---
const NTU_PROGRAMS: Record<string, Record<number, { name: string; cr: number }[]>> = {
  'BS AI': {
    1: [
      { name: 'Physics for Computing', cr: 2 }, { name: 'Physics for Computing LAB', cr: 1 },
      { name: 'Programming Fundamentals (PF)', cr: 3 }, { name: 'Programming Fundamentals LAB', cr: 1 },
      { name: 'Functional English (FE)', cr: 3 }, { name: 'Introduction to ICT', cr: 2 },
      { name: 'Introduction to ICT LAB', cr: 1 }, { name: 'Discrete Structures', cr: 3 }, { name: 'Translation of Al-Quran-I', cr: 0 }
    ],
    2: [
      { name: 'Probability and Statistics', cr: 3 }, { name: 'Fundamentals of Management', cr: 2 },
      { name: 'Database Systems', cr: 3 }, { name: 'Database Systems LAB', cr: 1 },
      { name: 'Digital Logic Design (DLD)', cr: 2 }, { name: 'Digital Logic Design LAB', cr: 1 },
      { name: 'Object Oriented Programming (OOP)', cr: 3 }, { name: 'Object Oriented Programming LAB', cr: 1 },
      { name: 'Islamic Studies', cr: 2 }, { name: 'Translation of Al-Quran-II', cr: 0 }
    ],
    3: [
      { name: 'Calculus and Analytic Geometry (CAG)', cr: 3 }, { name: 'Data Structures (DS)', cr: 3 },
      { name: 'Data Structures LAB', cr: 1 }, { name: 'Data Communication and Networks', cr: 2 },
      { name: 'Data Communication and Networks LAB', cr: 1 }, { name: 'Introduction to AI', cr: 2 },
      { name: 'Introduction to AI LAB', cr: 1 }, { name: 'Software Engineering Fundamentals', cr: 3 }, { name: 'Translation of Al-Quran-III', cr: 0 }
    ],
    4: [
      { name: 'Linear Algebra', cr: 3 }, { name: 'Programming for AI', cr: 2 }, { name: 'Programming for AI LAB', cr: 1 },
      { name: 'Information Security', cr: 2 }, { name: 'Information Security LAB', cr: 1 },
      { name: 'Computer Organization & Assembly Language', cr: 2 }, { name: 'Computer Organization & Assembly LAB', cr: 1 },
      { name: 'Knowledge Representation and Reasoning', cr: 2 }, { name: 'Knowledge Representation LAB', cr: 1 },
      { name: 'Expository Writing', cr: 3 }, { name: 'Translation of Al-Quran-IV', cr: 0 }
    ],
    5: [
      { name: 'Multivariable Calculus', cr: 3 }, { name: 'Machine Learning', cr: 2 }, { name: 'Machine Learning LAB', cr: 1 },
      { name: 'Operating Systems (OS)', cr: 2 }, { name: 'Operating Systems LAB', cr: 1 },
      { name: 'Design and Analysis of Algorithms', cr: 3 }, { name: 'AI Elective I', cr: 3 }, { name: 'AI Elective II', cr: 3 }, { name: 'Translation of Al-Quran-V', cr: 0 }
    ],
    6: [
      { name: 'Artificial Neural Networks & Deep Learning', cr: 2 }, { name: 'ANN & Deep Learning LAB', cr: 1 },
      { name: 'Parallel and Distributed Computing', cr: 2 }, { name: 'Parallel Computing LAB', cr: 1 },
      { name: 'AI Elective III', cr: 3 }, { name: 'AI Elective IV', cr: 3 }, { name: 'Financial Accounting', cr: 3 }, { name: 'Introduction to Textiles', cr: 2 }, { name: 'Translation of Al-Quran-VI', cr: 0 }
    ],
    7: [
      { name: 'BS Final Project-I (FYP-1)', cr: 2 }, { name: 'Computer Vision', cr: 2 }, { name: 'Computer Vision LAB', cr: 1 },
      { name: 'AI Elective V', cr: 3 }, { name: 'AI Elective VI', cr: 3 }, { name: 'Technical and Business Writing', cr: 3 }, { name: 'Entrepreneurship', cr: 2 }, { name: 'Ideology and Constitution of Pakistan', cr: 2 }, { name: 'Translation of Al-Quran-VII', cr: 0 }
    ],
    8: [
      { name: 'BS Final Project-II', cr: 4 }, { name: 'AI Elective VII', cr: 3 }, { name: 'Civics & Community Engagement', cr: 2 }, { name: 'Professional Practices', cr: 2 }, { name: 'Translation of Al-Quran-VIII', cr: 0 }
    ]
  },
  'BS CS': {
    1: [
      { name: 'Physics for Computing', cr: 2 }, { name: 'Physics for Computing LAB', cr: 1 },
      { name: 'Programming Fundamentals (PF)', cr: 3 }, { name: 'Programming Fundamentals LAB', cr: 1 },
      { name: 'Functional English (FE)', cr: 3 }, { name: 'Introduction to ICT', cr: 2 },
      { name: 'Introduction to ICT LAB', cr: 1 }, { name: 'Discrete Structures', cr: 3 }, { name: 'Translation of Al-Quran-I', cr: 0 }
    ],
    2: [
      { name: 'Probability and Statistics', cr: 3 }, { name: 'Fundamentals of Management', cr: 2 },
      { name: 'Database Systems', cr: 3 }, { name: 'Database Systems LAB', cr: 1 },
      { name: 'Digital Logic Design (DLD)', cr: 2 }, { name: 'Digital Logic Design LAB', cr: 1 },
      { name: 'Object Oriented Programming (OOP)', cr: 3 }, { name: 'Object Oriented Programming LAB', cr: 1 },
      { name: 'Islamic Studies', cr: 2 }, { name: 'Translation of Al-Quran-II', cr: 0 }
    ],
    3: [
      { name: 'Calculus and Analytic Geometry (CAG)', cr: 3 }, { name: 'Data Structures (DS)', cr: 3 },
      { name: 'Data Structures LAB', cr: 1 }, { name: 'Data Communication and Networks', cr: 2 },
      { name: 'Data Communication and Networks LAB', cr: 1 }, { name: 'Computer Organization & Assembly Language', cr: 2 },
      { name: 'Computer Organization & Assembly LAB', cr: 1 }, { name: 'Software Engineering Fundamentals', cr: 3 }, { name: 'Translation of Al-Quran-III', cr: 0 }
    ],
    4: [
      { name: 'Linear Algebra', cr: 3 }, { name: 'Theory of Automata and Formal Languages (TA)', cr: 3 },
      { name: 'Introduction to Artificial Intelligence', cr: 2 }, { name: 'Introduction to AI LAB', cr: 1 },
      { name: 'Information Security', cr: 2 }, { name: 'Information Security LAB', cr: 1 },
      { name: 'HCI & Computer Graphics', cr: 2 }, { name: 'HCI & Computer Graphics LAB', cr: 1 },
      { name: 'Expository Writing (EW)', cr: 3 }, { name: 'Translation of Al-Quran-IV', cr: 0 }
    ],
    5: [
      { name: 'Multivariable Calculus', cr: 3 }, { name: 'Computer Architecture', cr: 2 }, { name: 'Computer Architecture LAB', cr: 1 },
      { name: 'Operating Systems (OS)', cr: 2 }, { name: 'Operating Systems LAB', cr: 1 },
      { name: 'Design and Analysis of Algorithms', cr: 3 }, { name: 'CS Elective I', cr: 3 }, { name: 'CS Elective II', cr: 3 }, { name: 'Translation of Al-Quran-V', cr: 0 }
    ],
    6: [
      { name: 'Compiler Construction', cr: 2 }, { name: 'Compiler Construction LAB', cr: 1 },
      { name: 'Parallel and Distributed Computing', cr: 2 }, { name: 'Parallel Computing LAB', cr: 1 },
      { name: 'CS Elective III', cr: 3 }, { name: 'CS Elective IV', cr: 3 }, { name: 'Financial Accounting', cr: 3 }, { name: 'Introduction to Textiles', cr: 2 }, { name: 'Translation of Al-Quran-VI', cr: 0 }
    ],
    7: [
      { name: 'BS Final Project-I (FYP-1)', cr: 2 }, { name: 'Advanced Database Systems', cr: 2 }, { name: 'Advanced Database Systems LAB', cr: 1 },
      { name: 'CS Elective V', cr: 3 }, { name: 'CS Elective VI', cr: 3 }, { name: 'Technical and Business Writing', cr: 3 }, { name: 'Entrepreneurship', cr: 2 }, { name: 'Ideology and Constitution of Pakistan', cr: 2 }, { name: 'Translation of Al-Quran-VII', cr: 0 }
    ],
    8: [
      { name: 'BS Final Project-II', cr: 4 }, { name: 'CS Elective VII', cr: 3 }, { name: 'Civics & Community Engagement', cr: 2 }, { name: 'Professional Practices', cr: 2 }, { name: 'Translation of Al-Quran-VIII', cr: 0 }
    ]
  },
  'BS SE': {
    1: [
      { name: 'Physics for Computing', cr: 2 }, { name: 'Physics for Computing LAB', cr: 1 },
      { name: 'Programming Fundamentals (PF)', cr: 3 }, { name: 'Programming Fundamentals LAB', cr: 1 },
      { name: 'Functional English (FE)', cr: 3 }, { name: 'Introduction to ICT', cr: 2 },
      { name: 'Introduction to ICT LAB', cr: 1 }, { name: 'Discrete Structures', cr: 3 }, { name: 'Translation of Al-Quran-I', cr: 0 }
    ],
    2: [
      { name: 'Probability and Statistics', cr: 3 }, { name: 'Fundamentals of Management', cr: 2 },
      { name: 'Database Systems', cr: 3 }, { name: 'Database Systems LAB', cr: 1 },
      { name: 'Digital Logic Design (DLD)', cr: 2 }, { name: 'Digital Logic Design LAB', cr: 1 },
      { name: 'Object Oriented Programming (OOP)', cr: 3 }, { name: 'Object Oriented Programming LAB', cr: 1 },
      { name: 'Islamic Studies', cr: 2 }, { name: 'Translation of Al-Quran-II', cr: 0 }
    ],
    3: [
      { name: 'Calculus and Analytic Geometry (CAG)', cr: 3 }, { name: 'Data Structures (DS)', cr: 3 },
      { name: 'Data Structures LAB', cr: 1 }, { name: 'Data Communication and Networks', cr: 2 },
      { name: 'Data Communication and Networks LAB', cr: 1 }, { name: 'Computer Organization & Assembly Language', cr: 2 },
      { name: 'Computer Organization & Assembly LAB', cr: 1 }, { name: 'Software Engineering Fundamentals', cr: 3 }, { name: 'Translation of Al-Quran-III', cr: 0 }
    ],
    4: [
      { name: 'Linear Algebra', cr: 3 }, { name: 'Software Requirement Engineering', cr: 3 }, { name: 'Software Requirement Engineering LAB', cr: 1 },
      { name: 'Introduction to Artificial Intelligence', cr: 2 }, { name: 'Introduction to AI LAB', cr: 1 },
      { name: 'Information Security', cr: 2 }, { name: 'Information Security LAB', cr: 1 },
      { name: 'Software Construction and Development', cr: 2 }, { name: 'Software Construction LAB', cr: 1 },
      { name: 'Expository Writing (EW)', cr: 3 }, { name: 'Translation of Al-Quran-IV', cr: 0 }
    ],
    5: [
      { name: 'Multivariable Calculus', cr: 3 }, { name: 'Software Project Management', cr: 3 }, { name: 'Software Project Management LAB', cr: 1 },
      { name: 'Operating Systems (OS)', cr: 2 }, { name: 'Operating Systems LAB', cr: 1 },
      { name: 'Design and Analysis of Algorithms', cr: 3 }, { name: 'SE Elective I', cr: 3 }, { name: 'SE Elective II', cr: 3 }, { name: 'Translation of Al-Quran-V', cr: 0 }
    ],
    6: [
      { name: 'Software Design & Architecture', cr: 3 }, { name: 'Parallel and Distributed Computing', cr: 2 }, { name: 'Parallel Computing LAB', cr: 1 },
      { name: 'SE Elective III', cr: 3 }, { name: 'SE Elective IV', cr: 3 }, { name: 'Financial Accounting', cr: 3 }, { name: 'Introduction to Textiles', cr: 2 }, { name: 'Translation of Al-Quran-VI', cr: 0 }
    ],
    7: [
      { name: 'BS Final Project-I (FYP-1)', cr: 2 }, { name: 'Software Quality Engineering', cr: 3 }, { name: 'Software Quality Engineering LAB', cr: 1 },
      { name: 'SE Elective V', cr: 3 }, { name: 'SE Elective VI', cr: 3 }, { name: 'Technical and Business Writing', cr: 3 }, { name: 'Entrepreneurship', cr: 2 }, { name: 'Ideology and Constitution of Pakistan', cr: 2 }, { name: 'Translation of Al-Quran-VII', cr: 0 }
    ],
    8: [
      { name: 'BS Final Project-II', cr: 4 }, { name: 'SE Elective VII', cr: 3 }, { name: 'Civics & Community Engagement', cr: 2 }, { name: 'Professional Practices', cr: 2 }, { name: 'Translation of Al-Quran-VIII', cr: 0 }
    ]
  }
};

interface Course {
  id: string;
  name: string;
  cr: number;
  grade: string;
  marks?: number;
}

export function App() {
  const [selectedProgram, setSelectedProgram] = useState<string>('BS AI');
  const [selectedSem, setSelectedSem] = useState<number>(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [targetCGPA, setTargetCGPA] = useState<number>(3.5);
  const [showGradingModal, setShowGradingModal] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<'grade' | 'marks'>('grade');

  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getGradeFromMarks = (marks: number): string => {
    if (marks >= 90) return 'A+';
    if (marks >= 85) return 'A';
    if (marks >= 80) return 'A-';
    if (marks >= 75) return 'B+';
    if (marks >= 71) return 'B';
    if (marks >= 68) return 'B-';
    if (marks >= 64) return 'C+';
    if (marks >= 61) return 'C';
    if (marks >= 58) return 'C-';
    if (marks >= 54) return 'D+';
    if (marks >= 50) return 'D';
    return 'F';
  };

  const loadSemester = (program: string, semNum: number) => {
    const semCourses = NTU_PROGRAMS[program]?.[semNum] || [];
    const newCourses = semCourses.map((c, i) => ({
      id: `${program}-${semNum}-${i}-${Date.now()}`,
      name: c.name,
      cr: c.cr,
      grade: 'A',
      marks: 88
    }));
    setCourses(newCourses);
  };

  const handleProgramChange = (prog: string) => {
    setSelectedProgram(prog);
    loadSemester(prog, selectedSem);
  };

  const updateGrade = (id: string, newGrade: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, grade: newGrade } : c));
  };

  const updateMarks = (id: string, marksVal: number) => {
    const mappedGrade = getGradeFromMarks(marksVal);
    setCourses(courses.map(c => c.id === id ? { ...c, marks: marksVal, grade: mappedGrade } : c));
  };

  const addCustomCourse = () => {
    setCourses([...courses, { id: `${Date.now()}`, name: 'Custom Subject', cr: 3, grade: 'A', marks: 85 }]);
  };

  // Calculations
  const validCourses = courses.filter(c => c.cr > 0 && c.grade !== 'I' && c.grade !== 'W');
  const totalEarnedCredits = validCourses.reduce((sum, c) => sum + c.cr, 0);
  const totalQualityPoints = validCourses.reduce((sum, c) => sum + (c.cr * (NTU_GRADES[c.grade]?.points || 0)), 0);
  const currentCGPA = totalEarnedCredits > 0 ? totalQualityPoints / totalEarnedCredits : 0;

  const totalGraduationCredits = 133;
  const remainingCredits = Math.max(0, totalGraduationCredits - totalEarnedCredits);
  const neededPoints = (targetCGPA * totalGraduationCredits) - totalQualityPoints;
  const requiredGPA = remainingCredits > 0 ? Math.max(0, neededPoints / remainingCredits) : 0;

  // Print Clean PDF Summary
  const handlePrintPDF = () => {
    window.print();
  };

  // AI Advisor Call
  const getAIAdvice = async () => {
    setLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setError("API Key missing. Please set VITE_GROQ_API_KEY in Vercel.");
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
              content: `You are 'Compass AI', academic advisor for NTU Department of Computer Science (${selectedProgram} students, Batch 2025-29). Give 3 short, actionable study tips under 150 words based on transcript standing.`
            },
            {
              role: 'user',
              content: `Program: ${selectedProgram}, Current CGPA: ${currentCGPA.toFixed(2)}, Target CGPA: ${targetCGPA.toFixed(2)}, Remaining Credits: ${remainingCredits}, Required Future GPA: ${requiredGPA.toFixed(2)}.`
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
      setError(err.message || 'Failed to generate advice.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans print:bg-white print:text-black print:p-0">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl print:bg-white print:border-b-2 print:border-slate-300 print:rounded-none print:shadow-none print:p-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2 print:text-indigo-900 print:bg-none print:text-2xl">
              🎓 NTU DCS Official Transcript Summary
            </h1>
            <p className="text-slate-400 text-xs mt-1 print:text-slate-700">
              National Textile University — Dept of Computer Science ({selectedProgram} - Batch 2025–29)
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <button
              onClick={handlePrintPDF}
              className="bg-indigo-600/20 hover:bg-indigo-600/30 text-xs text-indigo-300 border border-indigo-500/40 px-3 py-2 rounded-xl flex items-center gap-1.5 transition font-medium print:hidden"
            >
              <Printer className="w-4 h-4" /> Export PDF Summary
            </button>
            <button
              onClick={() => setShowGradingModal(true)}
              className="bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 border border-indigo-500/30 px-3 py-2 rounded-xl flex items-center gap-1.5 transition print:hidden"
            >
              <Eye className="w-4 h-4" /> View Scale
            </button>
            <div className="text-right">
              <span className="text-xs text-slate-400 block print:text-slate-600">Current CGPA</span>
              <span className="text-2xl font-bold text-emerald-400 print:text-emerald-700">{currentCGPA.toFixed(2)} / 4.00</span>
            </div>
          </div>
        </header>

        {/* Degree & Scheme Selection Bar */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 print:bg-white print:border-none print:p-2">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 print:hidden">
            
            {/* Degree Selector */}
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-300">Degree Program:</span>
              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
                {['BS AI', 'BS CS', 'BS SE'].map(prog => (
                  <button
                    key={prog}
                    onClick={() => handleProgramChange(prog)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition ${selectedProgram === prog ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                  >
                    {prog}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Mode & Semester Loader */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-800 p-1 rounded-xl flex gap-1 text-xs border border-slate-700">
                <button
                  onClick={() => setInputMode('grade')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${inputMode === 'grade' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Grade Mode
                </button>
                <button
                  onClick={() => setInputMode('marks')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${inputMode === 'marks' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                >
                  Marks % Mode
                </button>
              </div>

              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>

              <button
                onClick={() => loadSemester(selectedProgram, selectedSem)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-indigo-500/20"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Load Scheme
              </button>
            </div>
          </div>

          {/* Courses Grid - ONLY LOADED/ENTERED COURSES SHOW IN PRINT */}
          {courses.length > 0 ? (
            <div className="space-y-2">
              <h3 className="hidden print:block text-sm font-bold text-slate-800 border-b pb-1 mb-2">
                Loaded Semester {selectedSem} Course Results ({selectedProgram})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:grid-cols-1 print:gap-1.5">
                {courses.map((course) => {
                  const info = NTU_GRADES[course.grade] || NTU_GRADES['A'];
                  return (
                    <div key={course.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 flex justify-between items-center print:bg-white print:border-b print:border-slate-200 print:rounded-none print:p-1.5">
                      <div>
                        <p className="text-xs font-medium text-slate-200 print:text-slate-900 print:font-semibold">{course.name}</p>
                        <div className="flex items-center gap-2 mt-1 print:mt-0">
                          <span className="text-[10px] text-slate-400 print:text-slate-600">{course.cr} Credit Hours</span>
                          <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded text-amber-300 font-semibold border border-slate-700 print:hidden">
                            {info.emoji} {info.remarks}
                          </span>
                        </div>
                      </div>

                      {inputMode === 'grade' ? (
                        <span className="hidden print:inline-block font-bold text-xs text-indigo-900">
                          Grade: {course.grade} ({info.points >= 0 ? info.points.toFixed(2) : 'Excluded'})
                        </span>
                      ) : (
                        <span className="hidden print:inline-block font-bold text-xs text-emerald-800">
                          Marks: {course.marks || 80}% — Grade {course.grade}
                        </span>
                      )}

                      <div className="print:hidden">
                        {inputMode === 'grade' ? (
                          <select
                            value={course.grade}
                            onChange={(e) => updateGrade(course.id, e.target.value)}
                            className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-amber-400 font-bold"
                          >
                            {Object.keys(NTU_GRADES).map(g => (
                              <option key={g} value={g}>{g} ({NTU_GRADES[g].points >= 0 ? NTU_GRADES[g].points : 'Excl.'})</option>
                            ))}
                          </select>
                        ) : (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={course.marks || 80}
                              onChange={(e) => updateMarks(course.id, Number(e.target.value))}
                              className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-emerald-400 font-bold text-center"
                            />
                            <span className="text-xs text-slate-400">%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-4 print:hidden">
              Select a semester and click "Load Scheme" to display grades.
            </p>
          )}

          <button
            onClick={addCustomCourse}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline block pt-2 print:hidden"
          >
            + Add Custom Subject Manually
          </button>
        </div>

        {/* Feature 5: Visual CGPA Progress Analytics Graph (INCLUDED IN PRINT) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3 print:bg-white print:border-2 print:border-slate-300 print:p-4 print:mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 print:text-indigo-950 print:font-bold">
              <TrendingUp className="w-4 h-4 text-emerald-400 print:text-indigo-600" /> Visual GPA Analytics Curve ({selectedProgram})
            </h3>
            <span className="text-xs text-slate-400 print:text-slate-600">Active Semester: S{selectedSem}</span>
          </div>

          <div className="grid grid-cols-8 gap-2 pt-4 items-end h-28 border-b border-slate-800 pb-2 print:border-slate-300">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => {
              const semGPA = s === selectedSem ? currentCGPA : (s < selectedSem ? (currentCGPA - 0.1).toFixed(2) : 0);
              const heightPercent = Math.min(100, (Number(semGPA) / 4.0) * 100);
              return (
                <div key={s} className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] text-indigo-300 font-bold print:text-indigo-900">{Number(semGPA) > 0 ? Number(semGPA).toFixed(1) : '-'}</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-md transition-all duration-500 ${s === selectedSem ? 'bg-gradient-to-t from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/30 print:bg-indigo-600' : s < selectedSem ? 'bg-slate-700 print:bg-slate-400' : 'bg-slate-800/40 print:bg-slate-200'}`}
                  ></div>
                  <span className="text-[10px] text-slate-500 print:text-slate-700 font-semibold">S{s}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Predictor & AI Section (HIDDEN IN PRINT TO KEEP REPORT CLEAN) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:hidden">
          
          {/* Target Predictor Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-400" /> Target CGPA Predictor ({selectedProgram})
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
                <span>Graduation Target: <strong className="text-slate-200">133 CR</strong></span>
              </div>
            </div>

            <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl space-y-2">
              <span className="text-xs text-slate-400">Required Future Average GPA:</span>
              <div className="text-2xl font-black text-indigo-400">
                {requiredGPA > 4.0 ? (
                  <span className="text-rose-400 text-sm flex items-center gap-1">🚨 Mathematically Impossible (&gt;4.00)</span>
                ) : (
                  <span>{requiredGPA.toFixed(2)} / 4.00</span>
                )}
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                {requiredGPA <= 3.5 ? (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2.5 py-1 rounded-lg font-medium inline-block">
                    🎉 Achievable Target
                  </span>
                ) : requiredGPA <= 4.0 ? (
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2.5 py-1 rounded-lg font-medium inline-block">
                    🔥 Challenging Target
                  </span>
                ) : (
                  <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs px-2.5 py-1 rounded-lg font-medium inline-block">
                    🚨 Target Exceeds Max GPA Limit
                  </span>
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
                <p className="text-xs text-slate-400">Customized for {selectedProgram} (Batch 2025–29)</p>
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
                  Analyzing {selectedProgram} Transcript...
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
                <div className="font-semibold text-indigo-400 text-[10px] uppercase tracking-wider">Advisor Notes ({selectedProgram}):</div>
                <div className="whitespace-pre-line">{advice}</div>
              </div>
            )}
          </div>

        </div>

        {/* NTU Grading Policy Modal */}
        {showGradingModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" /> Official NTU Grading Policy
                </h3>
                <button
                  onClick={() => setShowGradingModal(false)}
                  className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <table className="w-full text-xs text-left text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-slate-400 border-b border-slate-700">
                    <th className="p-2">Letter Grade</th>
                    <th className="p-2">Grade Point</th>
                    <th className="p-2">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {Object.keys(NTU_GRADES).map(g => (
                    <tr key={g} className="hover:bg-slate-800/40">
                      <td className="p-2 font-bold text-amber-400">{g}</td>
                      <td className="p-2">{NTU_GRADES[g].points >= 0 ? NTU_GRADES[g].points.toFixed(2) : 'Excluded'}</td>
                      <td className="p-2">{NTU_GRADES[g].emoji} {NTU_GRADES[g].remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
