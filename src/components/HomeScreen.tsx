import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ScanSearch, ShieldCheck, Swords, Search, SearchCheck } from "lucide-react";
import RiskGauge from "@/components/RiskGauge";
import MessageScanner from "@/components/MessageScanner";
import MuleCheck from "@/components/MuleCheck";
import TrendsPage from "@/components/TrendsPage";

type Tab = "home" | "scanner" | "mule" | "war" | "trends";

const spring = { type: "spring" as const, stiffness: 90, damping: 14, mass: 0.8 };

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring },
};

const HomeScreen = () => {
  const [tab, setTab] = useState<Tab>("home");

  return (
    <AnimatePresence mode="wait">
      {tab === "scanner" ? (
        <MessageScanner key="scanner" onBack={() => setTab("home")} />
      ) : tab === "mule" ? (
        <MuleCheck key="mule" onBack={() => setTab("home")} />
      ) : tab === "trends" ? (
        <TrendsPage key="trends" onBack={() => setTab("home")} />
      ) : (
        <HomeView
          key="home"
          onOpenScanner={() => setTab("scanner")}
          onOpenMule={() => setTab("mule")}
          onOpenTrends={() => setTab("trends")}
          tab={tab}
          setTab={setTab}
        />
      )}
    </AnimatePresence>
  );
};

interface HomeViewProps {
  onOpenScanner: () => void;
  onOpenMule: () => void;
  onOpenTrends: () => void;
  tab: Tab;
  setTab: (t: Tab) => void;
}

const HomeView = ({ onOpenScanner, onOpenMule, onOpenTrends, tab, setTab }: HomeViewProps) => {
  return (
    <motion.main
      className="relative min-h-screen bg-background pb-28"
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      variants={container}
    >
      <div
        className="absolute inset-x-0 top-0 h-72 -z-0 opacity-70"
        style={{ background: "var(--gradient-sage-soft)" }}
      />

      <div className="relative z-10 px-6 pt-12">
        <motion.header variants={item} className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">
            Hi Mala <span className="inline-block">👋</span>
          </h1>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full obsidian-glass">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary pulse-dot" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-xs font-medium text-foreground">System Protected</span>
          </div>
        </motion.header>

        <motion.section
          variants={item}
          className="mt-12 flex flex-col items-center"
        >
          <RiskGauge value={12} />
          <p className="mt-6 text-sm text-muted-foreground text-center max-w-xs">
            You're well protected. Keep scanning suspicious messages before paying.
          </p>
        </motion.section>

        <motion.section variants={item} className="mt-6">
          <button
            onClick={onOpenTrends}
            className="w-full obsidian-glass rounded-3xl p-5 flex items-center gap-4 text-left shadow-[var(--shadow-glass)]"
          >
            <div
              className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-primary-foreground shadow-[0_6px_18px_-6px_hsl(var(--primary)/0.55)]"
              style={{ background: "var(--gradient-sage)" }}
            >
              <SearchCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Latest Scam Trends</p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                Real-time alerts &amp; threat intelligence
              </p>
            </div>
          </button>
        </motion.section>

        <motion.section variants={item} className="mt-10 grid grid-cols-2 gap-4">
          <button onClick={onOpenScanner} className="obsidian-glass rounded-3xl p-5 text-left shadow-[var(--shadow-glass)]">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-primary-foreground shadow-[0_6px_18px_-6px_hsl(var(--primary)/0.55)]"
              style={{ background: "var(--gradient-sage)" }}
            >
              <Search className="w-5 h-5" />
            </div>
            <p className="mt-4 font-semibold text-foreground">Message Scanner</p>
            <p className="mt-1 text-xs text-muted-foreground leading-snug">
              Detect scams in seconds
            </p>
          </button>

          <button onClick={onOpenMule} className="obsidian-glass rounded-3xl p-5 text-left shadow-[var(--shadow-glass)]">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-primary-foreground shadow-[0_6px_18px_-6px_hsl(var(--primary)/0.55)]"
              style={{ background: "var(--gradient-sage)" }}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="mt-4 font-semibold text-foreground">Mule Account Check</p>
            <p className="mt-1 text-xs text-muted-foreground leading-snug">
              Verify before you pay
            </p>
          </button>
        </motion.section>
      </div>

      <motion.nav
        variants={item}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-2 rounded-full obsidian-glass shadow-[var(--shadow-glass)]"
      >
        {([
          { icon: Home, label: "Home", key: "home" as Tab },
          { icon: ScanSearch, label: "Scanner", key: "scanner" as Tab },
          { icon: Swords, label: "War Room", key: "war" as Tab },
        ]).map(({ icon: Icon, label, key }) => {
          const active = tab === key;
          return (
            <button
              key={label}
              aria-label={label}
              onClick={() => setTab(key)}
              className={`nav-glow flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              style={active ? { background: "var(--gradient-sage)" } : undefined}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </motion.nav>
    </motion.main>
  );
};

export default HomeScreen;