import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Coins, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import logoImg from "../data/images/logo.png";

const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "Games", href: "/#games" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Promotions", href: "/#promotions" },
  { label: "FAQ", href: "/faq" },
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

function getInitials(user) {
  const source = user?.name || user?.username || user?.email || "User";
  return source
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function LoggedInMenu() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const username = user?.username || user?.name || "Player";
  const coinBalance = Number.isFinite(Number(user?.coinBalance)) ? Number(user.coinBalance).toLocaleString() : "5,000";

  async function handleLogout() {
    await logout();
    setOpen(false);
    navigate("/");
  }

  return (
    <div className="relative flex min-w-0 items-center gap-1.5 min-[375px]:gap-2 lg:gap-3">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex min-h-11 min-w-0 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-2 py-1.5 text-left text-white transition hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-yellow-500/70 min-[375px]:px-3 sm:px-4"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-yellow-500 text-xs font-black text-black sm:h-9 sm:w-9">
          {getInitials(user)}
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block max-w-28 truncate text-sm font-bold leading-5 lg:max-w-36">{username}</span>
          <span className="flex items-center gap-1 text-xs font-semibold text-gold-200">
            <Coins className="h-3.5 w-3.5" />
            {coinBalance}
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gray-300 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] w-56 overflow-hidden rounded-xl border border-white/15 bg-slate-950 text-white shadow-2xl">
          <div className="border-b border-white/10 px-4 py-3 sm:hidden">
            <p className="truncate text-sm font-bold">{username}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-gold-200">
              <Coins className="h-3.5 w-3.5" />
              {coinBalance}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex min-h-11 w-full items-center gap-3 px-4 text-left text-sm font-semibold text-gray-300 transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-white/10 bg-slate-950 sm:h-20">
      {/* Mobile keeps logo and auth controls in one compact tap-friendly row. */}
      <nav className="flex h-full w-full items-center justify-between gap-1 px-2 min-[375px]:gap-2 min-[375px]:px-3 sm:px-8">
        <LuxuryLogo />
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        {/* Auth-aware rendering: guests see Login/Sign Up, authenticated users see account controls. */}
        {isAuthenticated ? (
          <LoggedInMenu />
        ) : (
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
        )}
      </nav>
    </header>
  );
}
