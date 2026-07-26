import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Plus, RotateCcw, Table2, GraduationCap, ChevronDown } from 'lucide-react';
import CircularProgress from '@/components/CircularProgress';
import SemesterCard from '@/components/SemesterCard';
import TargetPredictor from '@/components/TargetPredictor';
import GradingTableModal from '@/components/GradingTableModal';
import AiAdvisor from '@/components/AiAdvisor';
import { overallTotals, uid, type Semester } from '@/lib/grades';
import { NTU_BS_AI_SCHEME, schemeToSemester, schemeTotalCredits } from '@/lib/scheme';

const STORAGE_KEY = 'ntu-gpa-compass:v2';
const TARGET_KEY = 'ntu-gpa-compass:target';

const blankSemester = (i: number): Semester => ({
  id: uid(),
  name: `Semester ${i + 1}`,
  courses: [{ id: uid(), name: '', credits: 3, inputMode: 'letter', letter: 'A', marks: 90 }],
});

const initialState = (): Semester[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Semester[];
  } catch {
    /* ignore */
  }
  return [blankSemester(0)];
};

export default function App() {
  const [semesters, setSemesters] = useState<Semester[]>(initialState);
  const [showGrading, setShowGrading] = useState(false);
  const [schemeOpen, setSchemeOpen] = useState(false);
  const [target, setTarget] = useState(() => {
    const v = localStorage.getItem(TARGET_KEY);
    return v ? Number(v) : 3.5;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters));
  }, [semesters]);

  useEffect(() => {
    localStorage.setItem(TARGET_KEY, String(target));
  }, [target]);

  const totals = useMemo(() => overallTotals(semesters), [semesters]);

  const addSemester = () => setSemesters((s) => [...s, blankSemester(s.length)]);
  const updateSemester = (id: string, updated: Semester) =>
    setSemesters((s) => s.map((sem) => (sem.id === id ? updated : sem)));
  const removeSemester = (id: string) => setSemesters((s) => s.filter((sem) => sem.id !== id));
  const resetAll = () => setSemesters([blankSemester(0)]);

  const loadSchemeSemester = (idx: number) => {
    const sem = schemeToSemester(NTU_BS_AI_SCHEME[idx]);
    setSemesters((s) => [...s, sem]);
    setSchemeOpen(false);
  };

  const loadFullScheme = () => {
    setSemesters(NTU_BS_AI_SCHEME.map(schemeToSemester));
    setSchemeOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500/30">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-sky-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-emerald-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 shadow-lg shadow-sky-500/20"
            >
              <Compass size={24} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                NTU GPA Compass
              </h1>
              <p className="text-sm text-slate-400">
                Track semesters, compute your CGPA, and plan your path to graduation.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowGrading(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Table2 size={15} /> Grading Table
            </button>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <RotateCcw size={15} /> Reset
            </button>
          </div>
        </header>

        {/* Overview */}
        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur lg:col-span-2"
          >
            <h2 className="text-sm font-medium uppercase tracking-wider text-slate-400">Cumulative GPA</h2>
            <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
              <CircularProgress value={totals.cgpa} label="CGPA" sublabel="out of 4.00" />
              <div className="grid flex-1 grid-cols-2 gap-3">
                <Stat label="Earned Quality Points" value={totals.earnedPoints.toFixed(2)} />
                <Stat label="Earned Credits" value={`${totals.totalCredits} CR`} />
                <Stat label="Semesters" value={String(semesters.length)} />
                <Stat
                  label="Avg Credits / Sem"
                  value={semesters.length === 0 ? '0.0' : (totals.totalCredits / semesters.length).toFixed(1)}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-900/40 to-slate-900/60 p-6 shadow-xl shadow-black/20 backdrop-blur"
          >
            <h2 className="text-sm font-medium uppercase tracking-wider text-slate-400">NTU Grading Scale</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
              {[
                ['A+', '4.00', '🏆'], ['A', '4.00', '⭐'],
                ['A-', '3.66', '🌟'], ['B+', '3.33', '👍'],
                ['B', '3.00', '✅'], ['B-', '2.66', '👌'],
                ['C+', '2.33', '⚖️'], ['C', '2.00', '🙂'],
                ['C-', '1.66', '📈'], ['D+', '1.33', '⚠️'],
                ['D', '1.00', '🛑'], ['F', '0.00', '❌'],
              ].map(([g, p, e]) => (
                <div key={g} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">{e} {g}</span>
                  <span className="tabular-nums text-slate-400">{p}</span>
                </div>
              ))}
              <div className="col-span-2 mt-1 border-t border-white/5 pt-1.5 text-xs text-amber-400/80">
                ⏳ Incomplete · 🚫 Withdrawn — excluded from GPA
              </div>
            </div>
          </motion.div>
        </section>

        {/* Semesters */}
        <section className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Semesters</h2>
            <div className="flex flex-wrap items-center gap-2">
              {/* Scheme loader */}
              <div className="relative">
                <button
                  onClick={() => setSchemeOpen((o) => !o)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  <GraduationCap size={16} /> Load NTU BS AI Scheme
                  <ChevronDown size={14} className={`transition ${schemeOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {schemeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl"
                    >
                      <button
                        onClick={loadFullScheme}
                        className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm font-semibold text-sky-300 transition hover:bg-sky-500/10"
                      >
                        Load all 8 semesters
                        <span className="text-xs text-slate-500">{schemeTotalCredits} CR</span>
                      </button>
                      <div className="max-h-72 overflow-auto">
                        {NTU_BS_AI_SCHEME.map((s, i) => (
                          <button
                            key={s.name}
                            onClick={() => loadSchemeSemester(i)}
                            className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-slate-300 transition hover:bg-white/5"
                          >
                            {s.name}
                            <span className="text-xs text-slate-500">{s.courses.length} courses</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={addSemester}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:opacity-90"
              >
                <Plus size={16} /> Add Semester
              </button>
            </div>
          </div>

          <motion.div layout className="grid gap-5 md:grid-cols-2">
            <AnimatePresence>
              {semesters.map((sem, i) => (
                <SemesterCard
                  key={sem.id}
                  semester={sem}
                  index={i}
                  onChange={(updated) => updateSemester(sem.id, updated)}
                  onRemove={() => removeSemester(sem.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {semesters.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-500">
              No semesters yet. Add one or load the NTU BS AI scheme to start tracking your GPA.
            </div>
          )}
        </section>

        {/* Predictor + AI Advisor */}
        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <TargetPredictor totals={totals} defaultGraduationCredits={schemeTotalCredits} />
          <AiAdvisor semesters={semesters} targetCgpa={target} />
        </section>

        {/* Target sync (hidden helper so AI advisor has the latest target) */}
        <input type="hidden" value={target} onChange={() => {}} />

        <footer className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-slate-500">
          NTU GPA Compass · Data saved locally in your browser · 4.00 point scale · BS AI scheme (2023–27)
        </footer>
      </div>

      <GradingTableModal open={showGrading} onClose={() => setShowGrading(false)} />

      {/* Tiny target editor so the user can set the target used by the AI advisor */}
      <div className="relative mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur">
          <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Target CGPA for AI advice
          </label>
          <input
            type="number"
            min={0}
            max={4}
            step={0.01}
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-28 rounded-lg bg-slate-800 px-3 py-1.5 text-sm text-white outline-none border border-white/5 focus:border-sky-500/50 tabular-nums"
          />
          <span className="text-xs text-slate-500">
            This is shared with Compass AI when generating advice.
          </span>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white tabular-nums">{value}</p>
    </div>
  );
}
