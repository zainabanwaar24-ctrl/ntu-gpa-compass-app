import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NTU_GRADES } from '@/lib/grades';

type Props = { open: boolean; onClose: () => void };

export default function GradingTableModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-auto rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-slate-900/95 px-5 py-4 backdrop-blur">
              <div>
                <h2 className="text-lg font-bold text-white">NTU Official Grading Table</h2>
                <p className="text-xs text-slate-400">Marks % → Points → Letter → Remarks</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5">
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-3 py-2.5">Marks %</th>
                      <th className="px-3 py-2.5">Grade</th>
                      <th className="px-3 py-2.5">Points</th>
                      <th className="px-3 py-2.5">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {NTU_GRADES.filter((g) => !g.excluded).map((g) => (
                      <tr key={g.letter} className="transition hover:bg-white/[0.03]">
                        <td className="px-3 py-2.5 text-slate-300 tabular-nums">
                          {g.minPercent === 0 ? 'Below 50%' : `${g.minPercent} – ${g.maxPercent === 100.01 ? '100' : (g.maxPercent - 0.1).toFixed(1)}`}
                        </td>
                        <td className="px-3 py-2.5">
                          <span className="font-semibold text-white">{g.emoji} {g.letter}</span>
                        </td>
                        <td className="px-3 py-2.5 tabular-nums text-slate-200">{g.points.toFixed(2)}</td>
                        <td className="px-3 py-2.5 text-slate-400">{g.remarks}</td>
                      </tr>
                    ))}
                    {NTU_GRADES.filter((g) => g.excluded).map((g) => (
                      <tr key={g.letter} className="bg-amber-500/[0.03]">
                        <td className="px-3 py-2.5 text-slate-300">Special</td>
                        <td className="px-3 py-2.5">
                          <span className="font-semibold text-white">{g.emoji} {g.letter}</span>
                        </td>
                        <td className="px-3 py-2.5 tabular-nums text-slate-200">Excluded</td>
                        <td className="px-3 py-2.5 text-slate-400">{g.remarks} — not counted in GPA</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
