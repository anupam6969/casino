import { useEffect, useState } from "react";
import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchGames } from "../api/gamesApi.js";

function LobbyGamePreview() {
  const [games, setGames] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetchGames({ currency: "GC", limit: 6 })
      .then(({ data }) => {
        if (active) setGames(data);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => { active = false; };
  }, []);

  if (failed) return <p role="status" className="text-sm text-gray-400">Game preview is unavailable.</p>;
  if (!games) return <p role="status" className="text-sm text-gray-400">Loading games…</p>;
  if (!games.length) return <p className="text-sm text-gray-400">No games are available right now.</p>;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {games.map((game) => {
        const image = game.thumbnails?.square || game.thumbnails?.landscape || game.icon;
        return (
          <li key={game.slug} className="overflow-hidden rounded-xl border border-white/10 bg-slate-950">
            <div className="grid aspect-square place-items-center bg-slate-800">
              {image ? (
                <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <Gamepad2 aria-hidden="true" className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <p className="p-3 text-sm font-bold text-white">{game.name}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default function HottestCasinoGames({ showPreview = false }) {
  return (
    <section id="games" className="w-full px-3 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl space-y-4 rounded-2xl border border-white/10 bg-slate-900/40 p-4 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-black text-white sm:text-2xl">{showPreview ? "Lobby Games" : "Casino Games"}</h2>
          <Link
            to="/lobby"
            className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/20 px-4 text-xs font-bold uppercase text-white transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
          >
            {showPreview ? "View Lobby" : "Browse Games"}
          </Link>
        </div>
        {showPreview && <LobbyGamePreview />}
      </div>
    </section>
  );
}
