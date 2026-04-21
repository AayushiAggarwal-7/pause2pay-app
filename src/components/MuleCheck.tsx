import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, ShieldAlert, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MuleCheckProps {
  onBack: () => void;
}

type Result = "safe" | "flagged" | null;

const spring = { type: "spring" as const, stiffness: 90, damping: 14, mass: 0.8 };

const MuleCheck = ({ onBack }: MuleCheckProps) => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result>(null);

  const handleVerify = () => {
    const id = value.trim().toLowerCase();
    if (!id) return;
    const isSafe = id === "mala@upi";
    setResult(isSafe ? "safe" : "flagged");
    if (navigator.vibrate) {
      navigator.vibrate(isSafe ? 50 : [200, 100, 200]);
    }
  };

  const handleChange = (v: string) => {
    setValue(v);
    if (result) setResult(null);
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
          <h1 className="text-xl font-semibold text-foreground">Account Verification</h1>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="mt-8"
        >
          <label className="text-xs uppercase tracking-wider text-muted-foreground">
            UPI ID or Account Number
          </label>
          <div className="mt-2 glass-card rounded-2xl p-2 pl-4 flex items-center gap-2 shadow-[var(--shadow-glass)]">

            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <Input
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              placeholder="e.g. name@upi or 1234567890"
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={!value.trim()}
            className="nav-glow mt-5 w-full h-14 rounded-2xl text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-[var(--shadow-soft)] disabled:opacity-60 transition-all"
            style={{ background: "var(--gradient-sage)" }}
          >
            Verify Account
          </button>
        </motion.section>

        <AnimatePresence mode="wait">
          {result === "safe" && (
            <motion.div
              key="safe"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring}
              className="mt-8 glass-card rounded-3xl p-6 shadow-[var(--shadow-glass)] border border-primary/30"

            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-primary-foreground"
                  style={{ background: "var(--gradient-sage)" }}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Status
                  </p>
                  <p className="font-semibold text-foreground">Account Verified</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground leading-relaxed">
                ✅ No fraud history detected. This account looks safe to transact with.
              </p>
            </motion.div>
          )}

          {result === "flagged" && (
            <motion.div
              key="flagged"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring}
              className="mt-8 rounded-3xl p-6 shadow-[var(--shadow-glass)] bg-destructive/10 border border-destructive/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-destructive text-destructive-foreground">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Status
                  </p>
                  <p className="font-semibold text-destructive">High Risk Account</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-foreground leading-relaxed">
                🚨 <span className="font-semibold">WARNING:</span> This ID has been flagged{" "}
                <span className="font-semibold">14 times</span> for fraudulent activity in the
                last 24 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.main>
  );
};

export default MuleCheck;