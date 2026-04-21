import { motion } from "framer-motion";
import logo from "@/assets/pause2pay-logo.png";

const SplashScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#e8f3e9" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.img
        src={logo}
        alt="Pause 2 Pay"
        className="w-72 h-72 object-contain"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.p
        className="mt-2 text-lg font-light tracking-wide"
        style={{ color: "#545454", fontWeight: 200, letterSpacing: "0.04em" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
      >
        Stay safe before you pay
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;