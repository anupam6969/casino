import { Link } from "react-router-dom";
import { Coins, MessageCircle } from "lucide-react";

import gameVaultImage from "../data/images/gamevault.png";
import milkyImage from "../data/images/milky.jpg";
import orionImage from "../data/images/orion.jpg";

const featuredGames = {
  cyan: { name: "JUWA", className: "from-cyan-300 via-teal-500 to-slate-950" },
  pink: { name: "Orion Stars", image: orionImage, className: "from-pink-500/80 via-purple-600/70 to-slate-950" },
};

const thumbnailGames = [
  { name: "JUWA", className: "from-cyan-300 via-teal-500 to-slate-900" },
  { name: "MilkyWay", image: milkyImage, className: "from-indigo-400 to-slate-900" },
  { name: "Orion Stars", image: orionImage, className: "from-purple-400 to-slate-900" },
  { name: "Vblink", className: "from-pink-400 via-fuchsia-600 to-slate-900" },
  { name: "Game Vault", image: gameVaultImage, className: "from-amber-300 to-slate-900" },
];

const phoneGames = [
  { name: "JUWA", className: "from-cyan-300 via-teal-500 to-slate-900" },
  { name: "MilkyWay", image: milkyImage, className: "from-indigo-400 to-slate-900" },
  { name: "Orion Stars", image: orionImage, className: "from-purple-400 to-slate-900" },
  { name: "Vblink", className: "from-pink-400 via-fuchsia-600 to-slate-900" },
];

function GameTile({ game, size = "sm" }) {
  const sizeClass = size === "phone" ? "h-[50px] rounded-lg text-[9px]" : "h-10 w-10 rounded-lg text-[8px]";
  const labelClass = size === "phone" ? "px-1 leading-tight" : "px-0.5 leading-none";

  return (
    <span className={`relative grid ${sizeClass} shrink-0 place-items-center overflow-hidden border border-white/15 bg-gradient-to-br ${game.className} font-black uppercase text-white shadow-lg shadow-black/20`}>
      {game.image && <img src={game.image} alt={`${game.name} thumbnail`} className="absolute inset-0 h-full w-full object-cover opacity-80" loading="lazy" />}
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <span className={`relative z-10 text-center drop-shadow ${labelClass}`}>{game.name}</span>
    </span>
  );
}

function GameThumbnails() {
  return (
    <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
      {thumbnailGames.map((game) => (
        <GameTile key={game.name} game={game} />
      ))}
    </div>
  );
}

function PhoneMockup({ accent = "cyan", buttonLabel }) {
  const isPink = accent === "pink";
  const featuredGame = featuredGames[accent];
  const coinPillClass = isPink ? "bg-pink-500 text-white" : "bg-cyan-400 text-black";
  const badgeClass = isPink ? "bg-pink-500 text-white" : "bg-cyan-400 text-black";

  return (
    <div className="relative z-10 mx-auto mt-7 w-[220px] rounded-[2.5rem] border-4 border-slate-800 bg-slate-900 p-2.5 shadow-2xl shadow-black/45 md:absolute md:bottom-[-18px] md:right-[-4px] md:mx-0 md:mt-0 md:w-[250px] lg:right-6 lg:w-[260px]">
      <div className="overflow-hidden rounded-[2rem] bg-slate-950 p-3">
        <div className="flex items-center justify-between">
          <p className="font-['Dancing_Script'] text-lg font-bold leading-none text-white">GoldenSweep</p>
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black ${coinPillClass}`}>
            <Coins className="h-3 w-3" />
            $100
          </span>
        </div>

        <div className={`relative mt-3 flex h-[100px] flex-col justify-end overflow-hidden rounded-lg bg-gradient-to-br ${featuredGame.className} p-3`}>
          {featuredGame.image && <img src={featuredGame.image} alt={`${featuredGame.name} featured game`} className="absolute inset-0 h-full w-full object-cover opacity-80" loading="lazy" />}
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <p className="relative text-[10px] font-black uppercase tracking-wide text-white/70">Welcome Banner</p>
          <p className="relative text-xl font-black leading-none text-white">{featuredGame.name}</p>
        </div>

        <button type="button" className="mx-auto mt-3 block rounded-full bg-slate-800 px-5 py-2 text-[11px] font-black uppercase tracking-wide text-white">
          {buttonLabel}
        </button>

        <div className="mx-auto mt-3 grid w-fit grid-cols-2 gap-2">
          {phoneGames.map((game) => (
            <GameTile key={game.name} game={game} size="phone" />
          ))}
        </div>

        <div className={`mx-auto mt-3 w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${badgeClass}`}>
          GoldenSweep Branded
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ title, subtitle, cta, theme, buttonLabel }) {
  const isPink = theme === "pink";
  const cardClass = isPink
    ? "from-purple-900/50 via-slate-900 to-slate-900 shadow-purple-500/10"
    : "from-teal-900/40 via-slate-900 to-slate-900 shadow-teal-500/10";
  const buttonClass = isPink ? "bg-pink-500 text-white" : "bg-cyan-400 text-black";
  const glowClass = isPink ? "bg-pink-500/20" : "bg-cyan-400/20";

  return (
    <article className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-5 shadow-2xl sm:p-7 md:min-h-[450px] md:rounded-3xl md:p-10 ${cardClass}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:18px_18px]"
        aria-hidden="true"
      />
      <div className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl ${glowClass}`} aria-hidden="true" />

      {/* Mobile stacks content naturally; desktop restores the split mockup composition. */}
      <div className="relative z-20 flex flex-col md:min-h-[370px] md:max-w-[52%] lg:max-w-[55%]">
        <h2 className="max-w-sm text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-gray-400 sm:text-base">{subtitle}</p>
        <GameThumbnails />
        <Link
          to="/#support"
          className={`mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 md:w-fit ${buttonClass}`}
        >
          <MessageCircle className="h-4 w-4" />
          {cta}
        </Link>
      </div>

      <PhoneMockup accent={theme} buttonLabel={buttonLabel} />
    </article>
  );
}

export default function WhiteLabelLeasing() {
  return (
    <section className="w-full px-3 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
        <PlatformCard
          title="White label this platform"
          subtitle="Boost sales. Cut costs."
          cta="Let's talk"
          theme="cyan"
          buttonLabel="PLAY NOW"
        />
        <PlatformCard
          title="Leasing Program"
          subtitle="Fully automated GoldenSweep website."
          cta="Lease now"
          theme="pink"
          buttonLabel="ADD GAME"
        />
      </div>
    </section>
  );
}
