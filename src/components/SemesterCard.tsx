import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import {
  NTU_GRADES,
  gradeByMarks,
  courseGradeInfo,
  courseCounts,
  semesterGpa,
  semesterCredits,
  uid,
  type Course,
  type Semester,
} from '@/lib/grades';

type Props = {
  semester: Semester;
  index: number;
  onChange: (s: Semester) => void;
  onRemove: () => void;
};

export default function SemesterCard({ semester, index, onChange, onRemove }: Props) {
  const [expanded, setExpanded] = useState(true);
  const sgpa = semesterGpa(semester);
  const credits = semesterCredits(semester);

  const updateCourse = (id: string, patch: Partial<Course>) =>
    onChange({
      ...semester,
      courses: semester.courses.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    });

  const addCourse = () =>
    onChange({
      ...semester,
      courses: [
        ...semester.courses,
        { id: uid(), name: '', credits: 3, inputMode: 'letter', letter: 'A', marks: 90 },
      ],
    });

  const removeCourse = (id: string) =>
    onChange({ ...semester, courses: semester.courses.filter((c) => c.id !== id) });

  const ringColor =
    sgpa >= 3.5 ? 'text-emerald-400' : sgpa >= 2.5 ? 'text-sky-400' : sgpa >= 1.5 ? 'text-amber-400' : 'text-rose-400';
  const barColor =
    sgpa >= 3.5 ? 'bg-emerald-400' : sgpa >= 2.5 ? 'bg-sky-400' : sgpa >= 1.5 ? 'bg-amber-400' : 'bg-rose-400';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur p-5 shadow-xl shadow-black/20"
    >
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex flex-1 items-center gap-3 text-left"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500/20 to-emerald-500/20 text-sky-300">
            <GraduationCap size={18} />
          </div>
          <input
            value={semester.name}
            onChange={(e) => onChange({ ...semester, name: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            className="w-44 bg-transparent text-lg font-semibold text-white outline-none border-b border-transparent focus:border-sky-500/50 transition"
            placeholder={`Semester ${index + 1}`}
          />
        </button>
        <button
          onClick={onRemove}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-400"
          aria-label="Remove semester"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* SGPA summary */}
      <div className="mt-4 flex items-center gap-4">
        <div className={`text-2xl font-bold tabular-nums ${ringColor}`}>{sgpa.toFixed(2)}</div>
        <div className="flex-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className={`h-full rounded-full ${barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${(sgpa / 4) * 100}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-slate-400">
            <span>{credits} earned credit hours</span>
            <span>{semester.courses.length} courses</span>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-2">
              {semester.courses.map((c) => {
                const info = courseGradeInfo(c);
                const excluded = !courseCounts(c);
                return (
                  <div
                    key={c.id}
                    className={`rounded-xl p-2.5 transition ${
                      excluded ? 'bg-white/[0.02] opacity-70' : 'bg-white/[0.03] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="grid grid-cols-12 items-center gap-2">
                      <input
                        value={c.name}
                        onChange={(e) => updateCourse(c.id, { name: e.target.value })}
                        placeholder="Course name"
                        className="col-span-12 mb-1 bg-transparent text-sm font-medium text-slate-100 placeholder:text-slate-500 placeholder:font-normal outline-none sm:col-span-6 sm:mb-0"
                      />
                      <select
                        value={c.credits}
                        onChange={(e) => updateCourse(c.id, { credits: Number(e.target.value) })}
                        className="col-span-4 rounded-lg bg-slate-800 px-2 py-1.5 text-sm text-slate-200 outline-none border border-white/5 focus:border-sky-500/50 sm:col-span-2"
                      >
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>{n} CR</option>
                        ))}
                      </select>
                      <select
                        value={c.inputMode}
                        onChange={(e) => updateCourse(c.id, { inputMode: e.target.value as Course['inputMode'] })}
                        className="col-span-4 rounded-lg bg-slate-800 px-2 py-1.5 text-sm text-slate-200 outline-none border border-white/5 focus:border-sky-500/50 sm:col-span-2"
                      >
                        <option value="letter">Letter</option>
                        <option value="marks">Marks %</option>
                      </select>
                      <button
                        onClick={() => removeCourse(c.id)}
                        className="col-span-4 flex justify-center rounded-lg p-1.5 text-slate-600 transition hover:bg-rose-500/10 hover:text-rose-400 sm:col-span-2"
                        aria-label="Remove course"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Grade input row */}
                    <div className="mt-2 grid grid-cols-12 items-center gap-2">
                      {c.inputMode === 'letter' ? (
                        <select
                          value={c.letter}
                          onChange={(e) => updateCourse(c.id, { letter: e.target.value })}
                          className="col-span-12 rounded-lg bg-slate-800 px-2 py-1.5 text-sm text-slate-200 outline-none border border-white/5 focus:border-sky-500/50 sm:col-span-7"
                        >
                          {NTU_GRADES.map((g) => (
                            <option key={g.letter} value={g.letter}>
                              {g.emoji} {g.letter} — {g.points.toFixed(2)} ({g.remarks})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          min={0}
                          max={100}
                          step={0.1}
                          value={c.marks}
                          onChange={(e) => updateCourse(c.id, { marks: Number(e.target.value) })}
                          className="col-span-12 rounded-lg bg-slate-800 px-2 py-1.5 text-sm text-slate-200 outline-none border border-white/5 focus:border-sky-500/50 tabular-nums sm:col-span-7"
                          placeholder="Marks %"
                        />
                      )}
                      <div className="col-span-12 flex items-center justify-between gap-2 rounded-lg bg-slate-950/50 px-3 py-1.5 sm:col-span-5">
                        <span className="text-lg" title={info.remarks}>{info.emoji}</span>
                        <span className="text-sm font-semibold text-slate-200">{info.letter}</span>
                        <span className="text-sm tabular-nums text-slate-400">{info.points.toFixed(2)}</span>
                        <span className="truncate text-xs text-slate-500">{info.remarks}</span>
                      </div>
                    </div>
                    {excluded && (
                      <p className="mt-1.5 text-[11px] text-amber-400/80">
                        {c.credits === 0
                          ? '0-credit courses are excluded from GPA.'
                          : 'Incomplete / Withdrawn grades are excluded from GPA.'}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={addCourse}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-2.5 text-sm font-medium text-slate-400 transition hover:border-sky-500/40 hover:bg-sky-500/5 hover:text-sky-300"
            >
              <Plus size={16} /> Add Custom Course
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
