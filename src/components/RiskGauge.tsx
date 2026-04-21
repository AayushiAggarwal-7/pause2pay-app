import { motion, AnimatePresence } from "framer-motion";

interface RiskGaugeProps {
  value: number; // 0-100
}

const RiskGauge = ({ value }: RiskGaugeProps) => {
  const size = 260;
  const stroke = 20;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const riskColor =
    value <= 30
      ? "hsl(153 25% 62%)"
      : value <= 60
      ? "hsl(45 96% 60%)"
      : "hsl(0 84% 60%)";

  const glowId = "gaugeGlow";
  const shimId = "gaugeShimmer";
  const arcId = "liquidArc";
  const metalId = "metalShine";

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-[2rem] p-8 flex items-center justify-center obsidian-glass"
        style={{
          boxShadow:
            "0 8px 40px -12px hsla(153,17%,49%,0.22), inset 0 1px 0 hsla(0,0%,100%,0.5)",
        }}
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: size + 32,
            height: size + 32,
            background: `radial-gradient(circle, ${riskColor.replace(")", " / 0.18)")} 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <defs>
              <linearGradient id={arcId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="40%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>

              <linearGradient id={metalId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsla(0,0%,100%,0)" />
                <stop offset="30%" stopColor="hsla(0,0%,100%,0.55)" />
                <stop offset="50%" stopColor="hsla(0,0%,100%,0.3)" />
                <stop offset="70%" stopColor="hsla(0,0%,100%,0.55)" />
                <stop offset="100%" stopColor="hsla(0,0%,100%,0)" />
              </linearGradient>

              <linearGradient id={shimId} x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="hsla(0,0%,100%,0)" />
                <stop offset="40%" stopColor="hsla(0,0%,100%,0.45)" />
                <stop offset="60%" stopColor="hsla(0,0%,100%,0.45)" />
                <stop offset="100%" stopColor="hsla(0,0%,100%,0)" />
              </linearGradient>

              <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="hsl(153 17% 88%)"
              strokeWidth={stroke + 4}
              fill="none"
              opacity={0.5}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="hsl(0 0% 100%)"
              strokeWidth={stroke}
              fill="none"
              opacity={0.35}
            />

            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={`url(#${arcId})`}
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="none"
              filter={`url(#${glowId})`}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />

            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={`url(#${metalId})`}
              strokeWidth={stroke - 2}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </svg>

          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 4px 14px -4px hsla(0,0%,0%,0.12), inset 0 -2px 8px -2px hsla(0,0%,100%,0.25)",
              margin: stroke / 2,
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-6xl font-extrabold text-foreground"
              style={{
                textShadow: `0 0 24px ${riskColor.replace(")", " / 0.6)")}, 0 0 48px ${riskColor.replace(")", " / 0.35)")}, 0 0 72px ${riskColor.replace(")", " / 0.15)")}`,
                color: riskColor,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {value}%
            </motion.span>
            <span className="mt-2 text-[11px] tracking-[0.18em] text-muted-foreground font-medium">
              CURRENT RISK LEVEL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;