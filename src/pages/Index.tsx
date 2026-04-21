import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import LoginScreen from "@/components/LoginScreen";
import HomeScreen from "@/components/HomeScreen";
import { supabase } from "@/integrations/supabase/client";

type Phase = "splash" | "login" | "home";

const Index = () => {
  const [phase, setPhase] = useState<Phase>("splash");

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setPhase("home");
      } else if (phase === "home") {
        setPhase("login");
      }
    });

    // Check existing session after listener is set up
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setPhase("home");
      } else {
        // Show splash then login
        setTimeout(() => setPhase("login"), 2000);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
