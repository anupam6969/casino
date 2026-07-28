import { Coins, Gift, Headphones, LayoutGrid, WalletCards } from "lucide-react";
import HottestCasinoGames from "../components/HottestCasinoGames.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const dashboardTabs = [
  { label: "Games", icon: LayoutGrid, active: true },
  { label: "Wallet", icon: WalletCards, active: false },
  { label: "Promotions", icon: Gift, active: false },
  { label: "Support", icon: Headphones, active: false },
];

export default function Dashboard() {
  const { user } = useAuth();
  const username = user?.username || user?.name || "Player";
  const coinBalance = Number.isFinite(Number(user?.coinBalance)) ? Number(user.coinBalance).toLocaleString() : "5,000";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-3 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        {/* <section className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-5 shadow-xl sm:px-6 sm:py-7"> */}
          {/* <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gold-200">Dashboard</p>
              <h1 className="mt-2 text-2xl font-black leading-tight text-white sm:text-4xl">Welcome back, {username}</h1>
            </div>

            <div className="flex w-full items-center gap-3 rounded-lg border border-gold-200/25 bg-black/25 px-4 py-3 sm:w-auto">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-yellow-500 text-black">
                <Coins className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wide text-gray-400">Coin Balance</span>
                <span className="block text-2xl font-black text-white">{coinBalance}</span>
              </span>
            </div>
          </div> */}

          {/* <nav className="mt-6 flex gap-2 overflow-x-auto" aria-label="Dashboard sections">
            {dashboardTabs.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                type="button"
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border px-4 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-yellow-500/70 ${
                  active ? "border-yellow-500/60 bg-yellow-500 text-black" : "border-white/15 bg-white/[0.03] text-gray-300 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav> */}
        {/* </section> */}

        <HottestCasinoGames />
        

      </div>
    </main>
  );
}
