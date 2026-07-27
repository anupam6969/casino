import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronDown,
  CircleDollarSign,
  Crown,
  Gamepad2,
  LogOut,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserRound,
  WalletCards,
} from "lucide-react";
import { apiFetch } from "../api/apiClient.js";
import { useAuth } from "../context/AuthContext.jsx";
import Footer from "../components/Footer.jsx";

const casinoImages = [
  "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1596838132737-3306ed4a2e6d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1518895312237-a9e23508077d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=700&q=80",
];

const games = [
  "Player",
  "Game Vault",
  "Mafia",
  "Blue Dragon",
  "Juwa",
  "Vegas Sweeps",
  "Billion Balls",
  "Cash Machine",
  "Milky Way",
  "Panda Master",
  "Fire Kirin",
  "Orion Stars",
].map((name) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  name,
}));

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function DashboardLogo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="GoldenSweep home">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-200/50 bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 text-black shadow-gold">
        <Trophy size={22} />
      </span>
      <span>
        <span className="block font-heading text-lg font-bold leading-none text-white">GoldenSweep</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-200">Sweeps Club</span>
      </span>
    </Link>
  );
}

function GameCard({ game, index, onClick }) {
  return (
    <motion.button
      type="button"
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group overflow-hidden rounded-2xl border border-gold-200/25 bg-white/[0.05] text-left shadow-luxury transition duration-300 hover:border-gold-200/80 hover:shadow-gold-lg focus:outline-none focus:ring-2 focus:ring-gold-200/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={casinoImages[index % casinoImages.length]}
          alt={`${game.name} platform preview`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl border border-gold-200/45 bg-black/55 font-heading text-sm font-bold text-gold-200 backdrop-blur">
          {game.name.slice(0, 2).toUpperCase()}
        </div>
        <div className="absolute bottom-3 right-3 rounded-xl border border-gold-200/35 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-200 backdrop-blur">
          Play
        </div>
      </div>
      <div className="px-3 py-4 text-center">
        <h3 className="font-heading text-sm font-bold text-white sm:text-base">{game.name}</h3>
      </div>
    </motion.button>
  );
}

export default function Dashboard() {
  const { user, logout, login } = useAuth();
  const [profile, setProfile] = useState(user);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const displayUser = profile || user;
  const username = displayUser?.username || displayUser?.name || "Player";
  const initials = useMemo(() => username.slice(0, 2).toUpperCase(), [username]);

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      try {
        const res = await apiFetch("/user/me");
        if (res.status === 401) {
          await logout();
          navigate("/sign-in", { replace: true });
          return;
        }

        const data = await res.json();
        if (!res.ok) throw data;

        if (!ignore) {
          setProfile(data.user);
          const token = localStorage.getItem("authToken");
          if (token) login(data.user, token);
        }
      } catch {
        if (!ignore) {
          setProfile(user);
        }
      }
    }

    loadProfile();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/sign-in", { replace: true });
  }

  return (
    <main className="min-h-screen bg-background text-cream">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <DashboardLogo />
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="flex items-center gap-3 rounded-2xl border border-gold-200/30 bg-white/[0.045] px-3 py-2 text-left transition duration-300 hover:border-gold-200 hover:bg-gold-300/10 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-gold-200/60"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-200/50 bg-black text-sm font-bold text-gold-200">
                {initials}
              </span>
              <span className="hidden sm:block">
                <span className="block text-sm font-bold text-white">{username}</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-200">Member</span>
              </span>
              <ChevronDown className={`text-gold-200 transition ${menuOpen ? "rotate-180" : ""}`} size={18} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-gold-200/25 bg-black/95 p-1 shadow-luxury backdrop-blur-xl">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-cream/75 transition hover:bg-gold-300/10 hover:text-gold-200"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.16),transparent_28%),radial-gradient(circle_at_85%_28%,rgba(231,184,69,0.1),transparent_26%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div variants={container} initial="hidden" animate="visible" className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <motion.div variants={fadeUp} className="rounded-3xl border border-gold-200/30 bg-black/55 p-6 shadow-luxury backdrop-blur-2xl sm:p-8">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-200/35 bg-gold-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">
                <Sparkles size={15} />
                Premium Member Dashboard
              </div>
              <h1 className="font-heading text-4xl font-black leading-tight text-white md:text-5xl">
                Welcome back, <span className="text-gradient-gold">{username}</span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/72 sm:text-base">
                Choose a platform, launch your favorite sweepstakes games, and keep your account status in view.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-luxury backdrop-blur">
                <CircleDollarSign className="text-gold-200" size={24} />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-cream/55">Coin Balance</p>
                <p className="mt-1 font-heading text-2xl font-bold text-white">{displayUser?.coinBalance ?? 5000}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-luxury backdrop-blur">
                <ShieldCheck className="text-gold-200" size={24} />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-cream/55">Account Status</p>
                <p className="mt-1 font-heading text-2xl font-bold text-white">{displayUser?.accountStatus || "Active"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-luxury backdrop-blur">
                <WalletCards className="text-gold-200" size={24} />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-cream/55">Tier</p>
                <p className="mt-1 font-heading text-2xl font-bold text-white">Gold</p>
              </div>
            </motion.div>
          </motion.div>

          <section className="mt-12">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-200">Game Lobby</p>
                <h2 className="mt-2 font-heading text-3xl font-bold text-white">Exclusive Platforms</h2>
              </div>
              <div className="hidden items-center gap-1 text-gold-200 sm:flex">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {games.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} onClick={() => navigate(`/dashboard/play/${game.id}`)} />
              ))}
            </motion.div>
          </section>
        </div>
      </section>
      <Footer />
    </main>

  );
}
