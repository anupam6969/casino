import { useState } from "react";
import { Link } from "react-router-dom";
import { hottestCasinoGames } from "../games.js";

function HotGameCard({ game }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const isExternal = game.redirectLink?.startsWith("http");
  const cardClass =
    "group relative block cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-slate-800 text-left transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 sm:rounded-xl";
  const logoAvailable = Boolean(game.logo && !logoFailed);

  const content = (
    <>
      <div className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${game.gradient}`}>
        {logoAvailable && (
          <img
            src={game.logo}
            alt={`${game.name} logo`}
            onError={() => setLogoFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_72%_68%,rgba(255,255,255,0.16),transparent_26%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute left-1.5 top-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[8px] font-bold uppercase text-white backdrop-blur-sm sm:left-2 sm:top-2 sm:px-2 sm:py-1 sm:text-[10px]">
          {game.provider}
        </span>
      </div>
      <div className="flex min-h-11 items-center p-2 sm:p-3">
        <h3 className="text-[11px] font-semibold leading-snug text-white sm:text-sm">{game.name}</h3>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={game.redirectLink} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {content}
      </a>
    );
  }

  return (
    <Link to={game.redirectLink || "#"} className={cardClass}>
      {content}
    </Link>
  );
}

export default function HottestCasinoGames() {
  return (
    <section id="games" className="w-full px-3 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-slate-900/40 p-3 min-[375px]:p-4 sm:p-8 md:p-10">
        {/* Mobile keeps the title and action on one row with no wrapping. */}
        <div className="mb-4 flex items-center justify-between gap-2 text-center">
          <h2 className="whitespace-nowrap text-base font-black min-[375px]:text-lg sm:text-xl md:text-2xl">
            <span className="text-red-500">Hottest</span>
            <span className="text-white"> Casino Games</span>
          </h2>
          <button
            type="button"
            className="min-h-11 shrink-0 rounded-full border border-white/20 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 sm:px-5 sm:text-xs"
          >
            See More
          </button>
        </div>

        <div className="mb-8 flex justify-center">
          <span className="inline-block w-fit rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 text-sm font-bold text-white">
            500+ Games
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:grid-cols-5">
          {hottestCasinoGames.map((game) => (
            <HotGameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
