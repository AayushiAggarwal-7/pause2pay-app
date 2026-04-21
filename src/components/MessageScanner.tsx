import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldAlert, Sparkles, AlertTriangle, Ban } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface MessageScannerProps {
  onBack: () => void;
}

type Phase = "idle" | "analyzing" | "report";

const spring = { type: "spring" as const, stiffness: 90, damping: 14, mass: 0.8 };

const MessageScanner = ({ onBack }: MessageScannerProps) => {
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");

  const handleAnalyze = () => {
    if (!message.trim()) return;
    setPhase("analyzing");
    setTimeout(() => setPhase("report"), 3000);
  };

  return (
    <motion.main
      className="relative min-h-screen bg-background pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-x-0 top-0 h-72 -z-0 opacity-70"
        style={{ background: "var(--gradient-sage-soft)" }}
      />

      <div className="relative z-10 px-6 pt-12">
        <header className="flex items-center gap-3">
          <button
            onClick={onBack}
            aria-label="Back"
            className="w-10 h-10 rounded-full glass flex items-center justify-center text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">AI Message Scanner</h1>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="mt-8"
        >
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste the suspicious SMS or WhatsApp message here..."
            disabled={phase === "analyzing"}
            className="min-h-[180px] rounded-3xl glass-card border-0 p-5 text-sm text-foreground placeholder:text-muted-foreground shadow-[var(--shadow-glass)] resize-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />

          <button
            onClick={handleAnalyze}
            disabled={phase === "analyzing" || !message.trim()}
            className="nav-glow mt-5 w-full h-14 rounded-2xl text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-[var(--shadow-soft)] disabled:opacity-60 transition-all"
            style={{ background: "var(--gradient-sage)" }}
          >
            <Sparkles className="w-5 h-5" />
            {phase === "analyzing" ? "Analyzing..." : "Analyze with Sentinel AI"}
          </button>
        </motion.section>

        <AnimatePresence mode="wait">
          {phase === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring}
              className="mt-8 glass-card rounded-3xl p-6 flex items-center gap-4 shadow-[var(--shadow-glass)]"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary pulse-dot" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <div>
                <p className="font-semibold text-foreground">Sentinel AI is analyzing</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Checking for scam patterns, urgency cues & malicious links…
                </p>
              </div>
            </motion.div>
          )}

          {phase === "report" && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring}
              className="mt-8 glass-card rounded-3xl p-6 shadow-[var(--shadow-glass)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                  <h2 className="font-semibold text-foreground">Risk Analysis Report</h2>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Sentinel AI
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Risk Score
                  </p>
                  <p className="mt-1 text-5xl font-semibold text-destructive leading-none">
                    89<span className="text-2xl">%</span>
                  </p>
                </div>
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold text-destructive-foreground bg-destructive/90">
                  High Risk
                </span>
              </div>

              <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "89%" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="h-full rounded-full bg-destructive"
                />
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-accent/60 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Threat Type
                  </p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    Urgency / Social Engineering
                  </p>
                </div>
              </div>

              <div className="mt-3 p-4 rounded-2xl bg-destructive/10 flex items-start gap-3">
                <Ban className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Recommendation
                  </p>
                  <p className="mt-1 text-sm text-foreground leading-relaxed">
                    Do <span className="font-semibold">NOT</span> click any links. This message
                    uses fear-based tactics common in UPI scams.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setPhase("idle");
                  setMessage("");
                }}
                className="mt-6 w-full h-12 rounded-2xl glass text-foreground font-medium nav-glow"
              >
                Scan another message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default MessageScanner;