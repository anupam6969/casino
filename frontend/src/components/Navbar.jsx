import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

function GoldButton({ children, variant = "solid", className = "", ...props }) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 focus:ring-offset-black";
  const styles =
    variant === "solid"
      ? "bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 text-black shadow-gold hover:shadow-gold-lg"
      : "border border-gold-200/70 bg-white/5 text-cream backdrop-blur hover:border-gold-200 hover:bg-gold-300/10 hover:shadow-gold";

  return (
    <motion.button whileTap={{ scale: 0.97 }} className={`${base} ${styles} ${className}`} {...props}>
      <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

export function LuxuryLogo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Goldensweep home">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-200/50 bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 text-black shadow-gold">
        <Trophy size={22} />
      </span>
      <span>
        <span className="block font-heading text-lg font-bold leading-none text-white">Goldensweep</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-200">Sweeps Club</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <LuxuryLogo />
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/auth?mode=signin">
            <GoldButton variant="outline" className="px-4 py-2 sm:px-5">
              Login
            </GoldButton>
          </Link>
          <Link to="/auth?mode=signup">
            <GoldButton className="px-4 py-2 sm:px-5">Register</GoldButton>
          </Link>
        </div>
      </nav>
    </header>
  );
}
