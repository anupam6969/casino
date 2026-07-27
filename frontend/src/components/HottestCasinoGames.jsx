const hotGames = [
  { name: "Pirate Queen 2", provider: "JILI", gradient: "from-rose-500 via-orange-500 to-slate-900" },
  { name: "Sin City", provider: "JILI", gradient: "from-fuchsia-500 via-purple-600 to-slate-900" },
  { name: "Fortune Monkey", provider: "JILI", gradient: "from-yellow-400 via-amber-600 to-slate-900" },
  { name: "Boxing King", provider: "JILI", gradient: "from-red-500 via-stone-700 to-slate-900" },
  { name: "Beach Fun", provider: "CP", gradient: "from-cyan-300 via-blue-500 to-slate-900" },
  { name: "Bee Workshop", provider: "CP", gradient: "from-yellow-300 via-orange-500 to-slate-900" },
  { name: "Big Five", provider: "CP", gradient: "from-lime-400 via-emerald-700 to-slate-900" },
  { name: "Blessing of Ice and Fire", provider: "CP", gradient: "from-sky-300 via-red-500 to-slate-900" },
  { name: "Adventure To The West", provider: "FASTSPIN", gradient: "from-violet-400 via-indigo-700 to-slate-900" },
  { name: "Alien Smash", provider: "FASTSPIN", gradient: "from-green-300 via-teal-700 to-slate-900" },
  { name: "Apollo Ray of Luck", provider: "FASTSPIN", gradient: "from-yellow-200 via-orange-500 to-slate-900" },
  { name: "Book of Giza", provider: "PIXMOVE", gradient: "from-amber-300 via-yellow-700 to-slate-900" },
  { name: "Call Of The Jungle", provider: "PIXMOVE", gradient: "from-emerald-300 via-green-800 to-slate-900" },
  { name: "Captain Dodger", provider: "PIXMOVE", gradient: "from-blue-300 via-indigo-700 to-slate-900" },
  { name: "Castle Smashers", provider: "PIXMOVE", gradient: "from-purple-300 via-pink-700 to-slate-900" },
];

function HotGameCard({ game }) {
  return (
    <button
      type="button"
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-slate-800 text-left transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 sm:rounded-xl"
    >
      <div className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${game.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_72%_68%,rgba(255,255,255,0.16),transparent_26%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute left-1.5 top-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[8px] font-bold uppercase text-white backdrop-blur-sm sm:left-2 sm:top-2 sm:px-2 sm:py-1 sm:text-[10px]">
          {game.provider}
        </span>
        <span className="absolute inset-x-1.5 bottom-2 text-center text-[10px] font-black uppercase leading-tight text-white drop-shadow-lg sm:inset-x-3 sm:bottom-3 sm:text-base">
          {game.name}
        </span>
      </div>
      <div className="flex min-h-11 items-center p-2 sm:p-3">
        <h3 className="text-[11px] font-semibold leading-snug text-white sm:text-sm">{game.name}</h3>
      </div>
    </button>
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
          {hotGames.map((game) => (
            <HotGameCard key={`${game.provider}-${game.name}`} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
