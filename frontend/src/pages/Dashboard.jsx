import { useEffect, useState } from "react";
import { Coins, Gift, Headphones, LayoutGrid, Loader2, WalletCards } from "lucide-react";
import { apiFetch } from "../api/apiClient.js";
import HottestCasinoGames from "../components/HottestCasinoGames.jsx";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const dashboardTabs = [
  { label: "Games", icon: LayoutGrid },
  { label: "Wallet", icon: WalletCards },
  { label: "Promotions", icon: Gift },
  { label: "Support", icon: Headphones },
];

function formatAmount(amountCents) {
  if (!Number.isFinite(Number(amountCents))) {
    return "Open amount";
  }

  return Number(amountCents).toLocaleString();
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("Games");
  const [transactions, setTransactions] = useState([]);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState("");
  const username = user?.username || user?.name || "Player";
  const coinBalance = Number.isFinite(Number(user?.coinBalance)) ? Number(user.coinBalance).toLocaleString() : "0";

  useEffect(() => {
    if (activeTab !== "Wallet") {
      return;
    }

    let ignore = false;

    async function loadTransactions() {
      setWalletLoading(true);
      setWalletError("");

      try {
        const res = await apiFetch("/wallet/transactions");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Unable to load transactions.");
        }

        if (!ignore) {
          setTransactions(data.transactions || []);
          refreshUser().catch(() => {});
        }
      } catch (err) {
        if (!ignore) {
          setWalletError(err.message || "Unable to load transactions.");
        }
      } finally {
        if (!ignore) {
          setWalletLoading(false);
        }
      }
    }

    loadTransactions();

    return () => {
      ignore = true;
    };
  }, [activeTab]);

  async function createCheckout(path, body, loadingKey) {
    setCheckoutLoading(loadingKey);
    setWalletError("");

    try {
      const res = await apiFetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setWalletError(err.message || "Unable to start checkout.");
      setCheckoutLoading("");
    }
  }

  function handleWithdraw(event) {
    event.preventDefault();
    createCheckout("/wallet/withdraw", { amountCents: Number(withdrawAmount) }, "withdraw");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-3 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <section className="rounded-lg border border-white/10 bg-slate-900/70 px-4 py-5 shadow-xl sm:px-6 sm:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
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
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto" aria-label="Dashboard sections">
            {dashboardTabs.map(({ label, icon: Icon }) => {
              const active = activeTab === label;
              const enabled = label === "Games" || label === "Wallet";

              return (
              <button
                key={label}
                type="button"
                onClick={() => enabled && setActiveTab(label)}
                aria-current={active ? "page" : undefined}
                disabled={!enabled}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg border px-4 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-yellow-500/70 disabled:cursor-not-allowed disabled:opacity-50 ${
                  active ? "border-yellow-500/60 bg-yellow-500 text-black" : "border-white/15 bg-white/[0.03] text-gray-300 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
              );
            })}
          </nav>
        </section>

        {activeTab === "Games" ? (
          <HottestCasinoGames />
        ) : (
          <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-yellow-500 text-black">
                  <WalletCards className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Current Balance</p>
                  <p className="text-3xl font-black text-white">{coinBalance}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => createCheckout("/wallet/deposit", null, "deposit")}
                  disabled={Boolean(checkoutLoading)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-yellow-500 px-4 text-sm font-black text-black transition hover:bg-yellow-400 disabled:cursor-wait disabled:opacity-70"
                >
                  {checkoutLoading === "deposit" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Coins className="h-4 w-4" />}
                  Deposit
                </button>

                <form onSubmit={handleWithdraw} className="flex min-w-0 gap-2">
                  <input
                    value={withdrawAmount}
                    onChange={(event) => setWithdrawAmount(event.target.value)}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Amount cents"
                    className="min-h-12 min-w-0 flex-1 rounded-lg border border-white/10 bg-black/25 px-3 text-sm font-bold text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20"
                  />
                  <button
                    type="submit"
                    disabled={Boolean(checkoutLoading)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-gold-200/25 px-4 text-sm font-black text-gold-200 transition hover:bg-white/[0.07] disabled:cursor-wait disabled:opacity-70"
                  >
                    {checkoutLoading === "withdraw" ? <Loader2 className="h-4 w-4 animate-spin" /> : <WalletCards className="h-4 w-4" />}
                    Withdraw
                  </button>
                </form>
              </div>

              {walletError ? (
                <p className="mt-4 rounded-lg border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm font-bold text-red-100">{walletError}</p>
              ) : null}
            </div>

            <div className="rounded-lg border border-white/10 bg-slate-900/70 p-5 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-black text-white">Transactions</h2>
                {walletLoading ? <Loader2 className="h-5 w-5 animate-spin text-yellow-500" /> : null}
              </div>

              <div className="mt-4 divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
                {transactions.length ? (
                  transactions.map((transaction) => (
                    <div key={transaction.id} className="grid gap-2 bg-black/20 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <p className="text-sm font-black capitalize text-white">{transaction.type}</p>
                        <p className="mt-1 text-xs font-bold text-gray-400">{formatDate(transaction.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-3 sm:justify-end">
                        <span className="text-sm font-black text-gold-200">{formatAmount(transaction.amountCents)}</span>
                        <span className="rounded-lg border border-white/10 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-gray-300">
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="bg-black/20 p-4 text-sm font-bold text-gray-400">
                    {walletLoading ? "Loading transactions..." : "No wallet transactions yet."}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
