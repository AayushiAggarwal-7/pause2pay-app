import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Radio, Zap, Wallet, Briefcase } from "lucide-react";

interface TrendsPageProps {
  onBack: () => void;
}

const trends = [
  {
    icon: Zap,
    title: "New Electricity Bill Scam",
    detail:
      "Scammers are sending fake disconnection notices via WhatsApp.",
    time: "2 hours ago",
  },
  {
    icon: Wallet,
    title: "UPI Lite Reward Fraud",
    detail:
      "Beware of links promising ₹500 cashback for 'activating' UPI Lite.",
    time: "5 hours ago",
  },
  {
    icon: Briefcase,
    title: "Jamtara Style Job Scams",
    detail:
      "Part-time 'Work from Home' offers on Telegram are stealing bank credentials.",
    time: "1 day ago",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 14 } },
};

const TrendsPage = ({ onBack }: TrendsPageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.main
      className="min-h-screen bg-background pb-12"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 16 }}
    >
      <div className="px-6 pt-12">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-destructive/15 border border-destructive/30">
            <Radio className="w-3.5 h-3.5 text-destructive animate-pulse" />
            <span className="text-xs font-bold tracking-wide text-destructive">LIVE</span>
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Scam Watch</h1>
        <p className="mt-1 text-sm text-muted-foreground font-medium">Latest threats reported in real-time</p>

        <motion.div
          className="mt-8 flex flex-col gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {trends.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={i}
                variants={item}
                className="rounded-3xl p-5 shadow-[var(--shadow-glass)] obsidian-glass overflow-hidden relative"
              >
                {!loaded && (
                  <div className="absolute inset-0 shimmer-loading rounded-3xl z-10" />
                )}
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center text-primary-foreground shadow-[0_6px_18px_-6px_hsl(var(--primary)/0.55)]"
                    style={{ background: "var(--gradient-sage)" }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground leading-snug tracking-tight">{t.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed font-medium">
                      {t.detail}
                    </p>
                    <p className="mt-2 text-[11px] text-muted-foreground/70">{t.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.main>
  );
};

export default TrendsPage;