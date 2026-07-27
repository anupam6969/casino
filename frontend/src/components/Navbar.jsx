import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
      <img src={logoImg} alt="GoldenSweep Casino" className="h-28 w-auto max-w-[230px] object-contain sm:h-32 sm:max-w-[280px] lg:h-36 lg:max-w-[330px]" />
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-20 border-b border-white/10 bg-slate-950">
      <nav className="flex h-full w-full items-center justify-between px-4 sm:px-8">
        <LuxuryLogo />
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <span className="hidden items-center gap-2 bg-transparent p-0 text-sm font-semibold text-white sm:inline-flex">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
            5,000
          </span>
          <Link to="/sign-in">
            <GoldButton variant="outline" className="!rounded-lg !border-white/30 !bg-transparent !px-5 !py-2 !text-sm !font-semibold !text-white !shadow-none hover:!bg-white/5">
              Login
            </GoldButton>
          </Link>
          <Link to="/sign-up">
            <GoldButton className="!rounded-lg !bg-yellow-500 !bg-none !px-5 !py-2 !text-sm !font-bold !uppercase !text-black !shadow-none hover:!brightness-110">SIGN UP</GoldButton>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((current) => !current)}
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/30 bg-transparent text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-4 pb-5 lg:hidden">
          <div className="flex flex-col gap-2 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
              >
                {link.label}
              </Link>
            ))}
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
              5,000
            </span>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link to="/sign-in" onClick={() => setOpen(false)}>
                <GoldButton variant="outline" className="w-full !rounded-lg !border-white/30 !bg-transparent !px-5 !py-2 !text-sm !font-semibold !text-white !shadow-none hover:!bg-white/5">
                  Login
                </GoldButton>
              </Link>
              <Link to="/sign-up" onClick={() => setOpen(false)}>
                <GoldButton className="w-full !rounded-lg !bg-yellow-500 !bg-none !px-5 !py-2 !text-sm !font-bold !uppercase !text-black !shadow-none hover:!brightness-110">
                  SIGN UP
                </GoldButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
