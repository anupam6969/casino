import { useEffect, useState, useCallback, useRef } from "react";
import { Search, Play, Loader2, X } from "lucide-react";
import { fetchGames, launchGame, launchDemo } from "../api/gamesApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";

const DEFAULT_CURRENCY = "GC";

export default function Lobby() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pagination, setPagination] = useState({ hasMore: false, nextCursor: null, limit: 25 });
  const [launching, setLaunching] = useState(null); // { gameSlug, type: 'real' | 'demo' }
  const [launchError, setLaunchError] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(null); // game to show demo for

  const searchTimeoutRef = useRef(null);
  const requestIdRef = useRef(0);
  const retryResetRef = useRef(true);
  const loadMoreRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery]);

  // Load games when filters change
  const loadGames = useCallback(async (reset = false) => {
    const requestId = ++requestIdRef.current;
    retryResetRef.current = reset;
    try {
      setLoading(true);
      setError("");

      const cursor = reset ? null : pagination.nextCursor;
      const response = await fetchGames({
        q: debouncedSearch,
        currency: DEFAULT_CURRENCY,
        limit: pagination.limit,
        cursor,
      });

      if (requestId !== requestIdRef.current) return;

      if (reset) {
        setGames(response.data);
      } else {
        setGames((prev) => [...prev, ...response.data]);
      }

      setPagination({
        hasMore: response.pagination?.hasMore || false,
        nextCursor: response.pagination?.nextCursor || null,
        limit: response.pagination?.limit || 25,
      });
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err.message || "Failed to load games. Please try again.");
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [debouncedSearch, pagination.limit, pagination.nextCursor]);

  // Initial load and when filters change
  useEffect(() => {
    loadGames(true);
    return () => { requestIdRef.current++; };
  }, [debouncedSearch]);

  // Infinite scroll observer
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || error || loading || !pagination.hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          loadGames(false);
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [error, pagination.hasMore, loading, loadGames]);

  // Handle launching a real-money game
  const handlePlay = async (gameSlug) => {
    if (!isAuthenticated) {
      setShowDemoModal(gameSlug);
      return;
    }

    setLaunching({ gameSlug, type: "real" });
    setLaunchError("");

    try {
      const { gameUrl, sessionId } = await launchGame({
        game: gameSlug,
        currency: DEFAULT_CURRENCY,
      });

      // Open game in new window
      const gameWindow = window.open(gameUrl, "_blank", "noopener,noreferrer");
      if (!gameWindow) {
        throw new Error("Popup blocked. Please allow popups for this site.");
      }

      setLaunching(null);
    } catch (err) {
      console.error("Launch error:", err);
      setLaunchError(err.message || "Failed to launch game. Please try again.");
      setLaunching(null);
    }
  };

  // Handle launching a demo game
  const handleDemoPlay = async (gameSlug) => {
    setLaunching({ gameSlug, type: "demo" });
    setLaunchError("");
    setShowDemoModal(null);

    try {
      const { gameUrl, sessionId } = await launchDemo({
        game: gameSlug,
      });

      const gameWindow = window.open(gameUrl, "_blank", "noopener,noreferrer");
      if (!gameWindow) {
        throw new Error("Popup blocked. Please allow popups for this site.");
      }

      setLaunching(null);
    } catch (err) {
      console.error("Demo launch error:", err);
      setLaunchError(err.message || "Failed to launch demo. Please try again.");
      setLaunching(null);
    }
  };

  // Get game thumbnail (prefers square, falls back to icon)
  const getGameImage = (game) => {
    if (game.thumbnails?.square) return game.thumbnails.square;
    if (game.thumbnails?.landscape) return game.thumbnails.landscape;
    if (game.icon) return game.icon;
    return null;
  };

  // Format RTP for display
  const formatRTP = (rtp) => {
    if (!rtp) return null;
    const num = parseFloat(rtp);
    return Number.isFinite(num) ? `${num}%` : rtp;
  };

  // Get volatility label
  const getVolatilityLabel = (volatility) => {
    if (volatility === null || volatility === undefined) return null;
    if (volatility <= 2) return "Low";
    if (volatility <= 3) return "Medium";
    if (volatility <= 4) return "High";
    return "Very High";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-3 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gold-200">Game Lobby</p>
              <h1 className="mt-2 text-3xl font-black leading-tight text-white">Play Your Favorite Games</h1>
            </div>

          </div>

          {/* Search Bar */}
          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games by name, provider..."
              className="w-full min-h-12 pl-12 pr-4 rounded-lg border border-white/10 bg-black/25 text-base font-bold text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/20"
              aria-label="Search games"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>

        {/* Games Grid */}
        <section aria-label="Games">
          {error ? (
            <div className="rounded-lg border border-red-400/30 bg-red-950/40 p-6 text-center">
              <p role="alert" className="text-red-100 font-bold">{error}</p>
              <button
                type="button"
                onClick={() => loadGames(retryResetRef.current)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-gold-200/25 px-4 py-2 text-sm font-black text-gold-200 transition hover:bg-white/[0.07]"
              >
                Retry
              </button>
            </div>
          ) : games.length === 0 && !loading ? (
            <div className="rounded-lg border border-white/10 bg-slate-900/70 p-12 text-center">
              <p className="text-gray-400 font-bold">No games found</p>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search</p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {games.map((game) => {
                  const image = getGameImage(game);
                  const isLaunching = launching?.gameSlug === game.slug;

                  return (
                    <article
                      key={game.slug}
                      className={`relative group rounded-lg border overflow-hidden transition-all ${
                        game.maintenance ? "opacity-50 border-red-500/30" : "border-white/10 bg-slate-900/70 hover:border-yellow-500/30"
                      }`}
                    >
                      {/* Game Thumbnail */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                        {image ? (
                          <img
                            src={image}
                            alt={game.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <Play className="h-12 w-12" />
                          </div>
                        )}

                        {/* Maintenance Badge */}
                        {game.maintenance && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                            <span className="rounded-lg bg-red-500/90 px-3 py-1 text-xs font-bold text-white">
                              Maintenance
                            </span>
                          </div>
                        )}

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                          <button
                            type="button"
                            onClick={() => handlePlay(game.slug)}
                            disabled={isLaunching || game.maintenance}
                            aria-label={`Play ${game.name}`}
                            className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-black text-white transition-opacity transform scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                              isLaunching
                                ? "bg-gray-500 cursor-wait"
                                : "bg-yellow-500 hover:bg-yellow-400 text-black"
                            }`}
                          >
                            {isLaunching ? (
                              <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                              <>
                                <Play className="h-5 w-5" />
                                <span>Play</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Demo Button for non-authenticated or as secondary action */}
                        {!isAuthenticated && !isLaunching && (
                          <button
                            type="button"
                            onClick={() => handleDemoPlay(game.slug)}
                            disabled={game.maintenance}
                            aria-label={`Try ${game.name} demo`}
                            className="absolute bottom-3 right-3 rounded-lg bg-white/10 backdrop-blur px-3 py-1.5 text-xs font-bold text-white transition hover:bg-white/20 disabled:opacity-50"
                          >
                            Demo
                          </button>
                        )}
                      </div>

                      {/* Game Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 truncate">
                              {game.studio?.name || game.studioSlug}
                            </p>
                            <h3 className="mt-1 text-lg font-black text-white truncate">{game.name}</h3>
                          </div>

                          {game.rtp && (
                            <span className="shrink-0 rounded-lg bg-yellow-500/10 px-2 py-1 text-xs font-bold text-yellow-400">
                              {formatRTP(game.rtp)}
                            </span>
                          )}
                        </div>

                        {/* Tags/Categories */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {game.categories?.slice(0, 3).map((cat) => (
                            <span
                              key={cat}
                              className="rounded-lg border border-white/10 px-2 py-0.5 text-xs font-bold text-gray-400"
                            >
                              {cat}
                            </span>
                          ))}
                          {game.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg border border-white/10 px-2 py-0.5 text-xs font-bold text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                          {game.volatility !== null && game.volatility !== undefined && (
                            <span className="rounded-lg border border-white/10 px-2 py-0.5 text-xs font-bold text-gray-400">
                              {getVolatilityLabel(game.volatility)}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Load More Trigger */}
              <div ref={loadMoreRef} className="h-4" aria-hidden="true">
                {pagination.hasMore && loading && (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
                  </div>
                )}
                {pagination.hasMore && !loading && (
                  <div className="flex justify-center py-4">
                    <button
                      type="button"
                      onClick={() => loadGames(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-gray-300 transition hover:bg-white/[0.07] hover:text-white"
                    >
                      Load More Games
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Launch Error Toast */}
          {launchError && (
            <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right">
              <div className="rounded-lg border border-red-400/30 bg-red-950/95 px-4 py-3 shadow-xl max-w-md">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-red-100">{launchError}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLaunchError("")}
                    className="text-red-400 hover:text-red-200"
                    aria-label="Dismiss error"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in">
          <div className="mx-4 w-full max-w-md rounded-lg border border-white/10 bg-slate-900/95 p-6 shadow-xl animate-in zoom-in-95">
            <h2 className="text-xl font-black text-white">Play Demo</h2>
            <p className="mt-2 text-gray-400">
              You can try <span className="font-bold text-white">{showDemoModal}</span> for free without signing in.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => handleDemoPlay(showDemoModal)}
                disabled={launching?.gameSlug === showDemoModal}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-black text-black transition hover:bg-yellow-400 disabled:opacity-70 disabled:cursor-wait"
              >
                {launching?.gameSlug === showDemoModal ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    Play Demo
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowDemoModal(null)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-gray-300 transition hover:bg-white/[0.07] hover:text-white"
              >
                Cancel
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              Sign in to play for real rewards!
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
