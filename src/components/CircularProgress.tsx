import { motion } from 'framer-motion';

type Props = {
  value: number; // 0..4
  max?: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
};

export default function CircularProgress({
  value,
  max = 4,
  size = 200,
  stroke = 16,
  label,
  sublabel,
}: Props) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.max(0, Math.min(1, value / max));
  const offset = circumference * (1 - ratio);

  const color =
    value >= 3.5 ? '#34d399' : value >= 2.5 ? '#38bdf8' : value >= 1.5 ? '#fbbf24' : '#f87171';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={value.toFixed(2)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight text-white tabular-nums"
        >
          {value.toFixed(2)}
        </motion.span>
        {label && (
          <span className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
            {label}
          </span>
        )}
        {sublabel && <span className="text-[11px] text-slate-500">{sublabel}</span>}
      </div>
    </div>
  );
}
