import { motion } from "framer-motion";
import { useState } from "react";

const spring = { type: "spring" as const, stiffness: 90, damping: 14, mass: 0.8 };

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <motion.div
      className="relative min-h-screen bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sage wave at the top */}
      <svg
        className="absolute top-0 left-0 w-full"
        viewBox="0 0 375 260"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: "260px" }}
      >
        <defs>
          <linearGradient id="sageWave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(153 17% 49%)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="hsl(153 25% 62%)" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <path
          d="M0 0H375V180C320 230 250 250 187 230C124 210 60 180 0 210V0Z"
          fill="url(#sageWave)"
        />
      </svg>

      <div className="relative z-10 flex flex-col px-7 pt-20">
        <motion.h1
          className="text-5xl font-bold text-foreground mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          Welcome
        </motion.h1>
        <motion.p
          className="text-muted-foreground mt-2 text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          Sign in to keep your payments protected.
        </motion.p>

        <motion.div
          className="mt-12 space-y-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          <div>
            <label className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Phone Number
            </label>
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="mt-2 w-full h-12 px-4 rounded-2xl bg-card border border-border/70 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
              style={{ borderWidth: "1px" }}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full h-12 px-4 rounded-2xl bg-card border border-border/70 text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/25"
              style={{ borderWidth: "1px" }}
            />
          </div>
        </motion.div>

        <motion.button
          onClick={onLogin}
          className="mt-10 w-full h-14 rounded-full text-primary-foreground font-semibold text-base shadow-[var(--shadow-soft)] active:scale-[0.98] transition-transform"
          style={{ background: "var(--gradient-sage)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.3 }}
        >
          Login
        </motion.button>

        <motion.p
          className="mt-6 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          New here? <span className="text-primary font-medium">Create an account</span>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoginScreen;