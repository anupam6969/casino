import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logoImg from "../data/images/logo.png";

const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "Games", href: "/#games" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Promotions", href: "/#promotions" },
  { label: "Support", href: "/#support" },
];

function GoldButton({ children, variant = "solid", className = "", ...props }) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-950";
  const styles =
    variant === "solid"
      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg hover:brightness-110"
      : "border border-white/30 bg-transparent text-white backdrop-blur hover:bg-white/5";

  return (
    <motion.button type="button" whileTap={{ scale: 0.97 }} className={`${base} ${styles} ${className}`} {...props}>
      <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

export function LuxuryLogo() {
  return (
    <Link to="/" className="flex h-full items-center overflow-visible" aria-label="Goldensweep home">
      <img src={logoImg} alt="GoldenSweep Casino" className="h-20 w-auto max-w-[96px] object-contain min-[375px]:max-w-[118px] sm:h-24 sm:max-w-[170px] lg:h-36 lg:max-w-[330px]" />
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-white/10 bg-slate-950 sm:h-20">
      {/* Mobile keeps logo, counter, Login, and Sign Up in one compact tap-friendly row. */}
      <nav className="flex h-full w-full items-center justify-between gap-1 px-2 min-[375px]:gap-2 min-[375px]:px-3 sm:px-8">
        <LuxuryLogo />
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex min-w-0 items-center gap-1.5 min-[375px]:gap-2 lg:gap-4">
          <span className="inline-flex h-11 shrink-0 items-center gap-1.5 bg-transparent p-0 text-[11px] font-semibold text-white sm:gap-2 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse sm:h-2.5 sm:w-2.5" />
            5,000
          </span>
          <Link to="/sign-in">
            <GoldButton variant="outline" className="!min-h-11 !rounded-lg !border-white/30 !bg-transparent !px-2.5 !py-2 !text-xs !font-semibold !text-white !shadow-none hover:!bg-white/5 min-[375px]:!px-3 sm:!px-5 sm:!text-sm">
              Login
            </GoldButton>
          </Link>
          <Link to="/sign-up">
            <GoldButton className="!min-h-11 !rounded-lg !bg-yellow-500 !bg-none !px-2.5 !py-2 !text-xs !font-bold !uppercase !text-black !shadow-none hover:!brightness-110 min-[375px]:!px-3 sm:!px-5 sm:!text-sm">SIGN UP</GoldButton>
          </Link>
        </div>
      </nav>
    </header>
  );
}
