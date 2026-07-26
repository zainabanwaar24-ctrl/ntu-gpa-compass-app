import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Sparkles, AlertCircle } from 'lucide-react';
import {
  semesterGpa,
  overallTotals,
  type Semester,
} from '@/lib/grades';

type Props = { semesters: Semester[]; targetCgpa: number };

const SYSTEM_PROMPT =
  "You are 'Compass AI', an expert Academic Advisor for National Textile University (NTU) BS AI students. Analyze the student's SGPA/CGPA history, target CGPA, and required GPA. Provide 3 specific, empathetic, and actionable study tips under 150 words. Highlight courses where performance needs boost.";

export default function AiAdvisor({ semesters, targetCgpa }: Props) {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;

  const buildContext = () => {
    const totals = overallTotals(semesters);
    const lines: string[] = [];
    lines.push(`Overall CGPA: ${totals.cgpa.toFixed(2)}`);
    lines.push(`Total earned credit hours: ${totals.totalCredits}`);
    lines.push(`Total quality points: ${totals.earnedPoints.toFixed(2)}`);
    lines.push(`Target CGPA: ${targetCgpa.toFixed(2)}`);
    lines.push('');
    semesters.forEach((s, i) => {
      lines.push(`${s.name || `Semester ${i + 1}`}: SGPA ${semesterGpa(s).toFixed(2)}`);
      s.courses.forEach((c) => {
        lines.push(`  - ${c.name || 'Untitled'} (${c.credits} CR): ${c.letter}`);
      });
    });
    return lines.join('\n');
  };

  const ask = async () => {
    if (!apiKey) {
      setError('Groq API key is not configured. Set VITE_GROQ_API_KEY in your environment to enable the AI Advisor.');
      return;
    }
    setLoading(true);
    setError('');
    setAdvice('');
    try {
      const context = buildContext();
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Here is my academic record:\n\n${context}\n\nPlease give me advice.` },
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Groq request failed (${res.status}): ${txt.slice(0, 200)}`);
      }
      const data = await res.json();
      const text =
        data?.choices?.[0]?.message?.content ?? 'No advice returned.';
      setAdvice(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong contacting the AI advisor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/30 via-slate-900/60 to-slate-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur">
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/30 to-indigo-500/30 text-sky-300">
          <Bot size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Compass AI Advisor</h2>
          <p className="text-xs text-slate-400">Personalized study tips based on your transcript.</p>
        </div>
      </div>

      <button
        onClick={ask}
        disabled={loading}
        className="relative mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <Sparkles size={16} />
            </motion.span>
            Analyzing your transcript…
          </>
        ) : (
          <>
            <Send size={16} /> Ask Compass AI Advisor
          </>
        )}
      </button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {advice && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur"
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-sky-300">
              <Sparkles size={14} /> Compass AI says
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-200">{advice}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
