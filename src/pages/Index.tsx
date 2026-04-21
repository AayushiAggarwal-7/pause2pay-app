import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import LoginScreen from "@/components/LoginScreen";
import HomeScreen from "@/components/HomeScreen";

type Phase = "splash" | "login" | "home";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("splash");

  useEffect(() => {
    if (phase !== "splash") return;
    const t = setTimeout(() => setPhase("login"), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {phase === "splash" && <SplashScreen key="splash" />}
        {phase === "login" && (
          <LoginScreen key="login" onLogin={() => setPhase("home")} />
        )}
        {phase === "home" && <HomeScreen key="home" />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
