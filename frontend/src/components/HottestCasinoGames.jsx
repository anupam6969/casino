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
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-slate-800 text-left transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
    >
      <div className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${game.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.34),transparent_22%),radial-gradient(circle_at_72%_68%,rgba(255,255,255,0.16),transparent_26%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold uppercase text-white backdrop-blur-sm">
          {game.provider}
        </span>
        <span className="absolute inset-x-3 bottom-3 text-center text-base font-black uppercase leading-tight text-white drop-shadow-lg">
          {game.name}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold leading-snug text-white">{game.name}</h3>
      </div>
    </button>
  );
}

export default function HottestCasinoGames() {
  return (
    <section id="games" className="w-full px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-slate-900/40 p-8 md:p-10">
        <div className="relative mb-4 flex flex-col items-center gap-4 text-center sm:block">
          <h2 className="text-xl font-black md:text-2xl">
            <span className="text-red-500">Hottest</span>
            <span className="text-white"> Casino Games</span>
          </h2>
          <button
            type="button"
            className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2"
          >
            See More
          </button>
        </div>

        <div className="mb-8 flex justify-center">
          <span className="inline-block w-fit rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2 text-sm font-bold text-white">
            500+ Games
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {hotGames.map((game) => (
            <HotGameCard key={`${game.provider}-${game.name}`} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}
