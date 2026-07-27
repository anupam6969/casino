import { Link } from "react-router-dom";
import { games } from "../data/games.js";

export default function ExclusivePlatforms() {
  return (
    <section className="w-full px-3 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="whitespace-nowrap text-lg font-black text-white sm:text-2xl">Exclusive Platforms</h2>
          <Link to="/sign-up" className="inline-flex min-h-11 shrink-0 items-center text-xs font-bold uppercase tracking-wide text-yellow-400 transition hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
            See All
          </Link>
        </div>

        {/* Mobile uses snap scrolling with a visible next-card peek; desktop remains a full row. */}
        <div className="hide-scrollbar -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
          {games.slice(1, 7).map((game) => (
            <Link
              key={game.id}
              to="/sign-up"
              className="group w-[38vw] min-w-[120px] max-w-[150px] shrink-0 snap-start overflow-hidden rounded-xl border border-white/10 bg-slate-900/70 text-center shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 sm:w-[24vw] lg:w-auto lg:min-w-0 lg:max-w-none"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={game.image} alt={`${game.name} platform`} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-lg border border-yellow-500/35 bg-black/60 text-[10px] font-black text-yellow-300 backdrop-blur">
                  {game.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex min-h-11 items-center justify-center px-2 py-2">
                <h3 className="text-xs font-bold uppercase leading-tight text-white sm:text-sm">{game.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
