import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Calculator } from 'lucide-react';
import { requiredGpa, feasibilityOf, gpaColor, type Totals } from '@/lib/grades';

type Props = { totals: Totals; defaultGraduationCredits: number };

export default function TargetPredictor({ totals, defaultGraduationCredits }: Props) {
  const [target, setTarget] = useState(3.5);
  const [graduationCredits, setGraduationCredits] = useState(defaultGraduationCredits);

  const remainingCredits = Math.max(0, graduationCredits - totals.totalCredits);
  const required = requiredGpa(target, graduationCredits, totals.earnedPoints, remainingCredits);

  const displayRequired = required === null ? 0 : Math.max(0, required);
  const feasibility = feasibilityOf(displayRequired);
  const color = gpaColor(displayRequired);
  const impossible = required !== null && required > 4.0;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur p-6 shadow-xl shadow-black/20">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-rose-500/20 text-amber-300">
          <Target size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Target CGPA Predictor</h2>
          <p className="text-xs text-slate-400">Plan the GPA you need in your remaining credits.</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Target CGPA</span>
          <input
            type="number"
            min={0}
            max={4}
            step={0.01}
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="mt-1.5 w-full rounded-xl bg-slate-800 px-3 py-2.5 text-white outline-none border border-white/5 focus:border-amber-500/50 tabular-nums"
          />
        </label>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Graduation Credits</span>
          <input
            type="number"
            min={0}
            step={1}
            value={graduationCredits}
            onChange={(e) => setGraduationCredits(Number(e.target.value))}
            className="mt-1.5 w-full rounded-xl bg-slate-800 px-3 py-2.5 text-white outline-none border border-white/5 focus:border-amber-500/50 tabular-nums"
          />
        </label>
        <div className="rounded-xl bg-white/[0.03] px-3 py-2.5">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Remaining Credits</span>
          <p className="mt-1.5 text-lg font-semibold text-white tabular-nums">{remainingCredits} CR</p>
          <p className="text-xs text-slate-500">{totals.totalCredits} earned so far</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 border border-white/5">
        <div className="flex items-center gap-2 text-slate-400">
          <Calculator size={16} />
          <span className="text-xs font-medium uppercase tracking-wider">Required GPA ahead</span>
        </div>
        {required === null ? (
          <p className="mt-3 text-sm text-slate-400">
            Enter a positive number of remaining credits to see the required GPA.
          </p>
        ) : (
          <>
            <div className="mt-2 flex items-end gap-3">
              <span className="text-5xl font-bold tabular-nums" style={{ color }}>
                {displayRequired.toFixed(2)}
              </span>
              <span className="mb-1.5 text-sm text-slate-500">/ 4.00</span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold"
                style={{ backgroundColor: `${feasibility.color}22`, color: feasibility.color }}
              >
                <span>{feasibility.emoji}</span> {feasibility.label}
              </motion.span>
            </div>
            <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (displayRequired / 4) * 100)}%` }}
                transition={{ duration: 0.7 }}
                style={{ backgroundColor: color }}
              />
            </div>
            <p className="mt-3 text-sm">
              {impossible ? (
                <span className="text-rose-400">
                  That target is out of reach — even straight A's (4.00) would only get you to{' '}
                  {((totals.earnedPoints + remainingCredits * 4) / graduationCredits).toFixed(2)}.
                  Consider lowering your target.
                </span>
              ) : (
                <span className="text-slate-300">
                  You need an average of{' '}
                  <span className="font-semibold" style={{ color }}>
                    {displayRequired.toFixed(2)}
                  </span>{' '}
                  across {remainingCredits} remaining credits to reach a CGPA of {target.toFixed(2)}.
                </span>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
