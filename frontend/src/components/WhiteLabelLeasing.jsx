import { useState } from "react";
import { Link } from "react-router-dom";
import { Coins, MessageCircle } from "lucide-react";
import { promoPlatforms } from "../games.js";

const featuredGames = {
  bronze: { name: "JUWA", style: { background: "linear-gradient(135deg, #BA7517, #412402)" } },
  amber: { name: "Orion Stars", style: { background: "linear-gradient(135deg, #EF9F27, #633806)" } },
};

const chipStyles = {
  juwa: { background: "linear-gradient(135deg, #FAC775, #BA7517)" },
  milkyway: { background: "linear-gradient(135deg, #EF9F27, #633806)" },
  "orion-stars": { background: "linear-gradient(135deg, #BA7517, #412402)" },
  vblink: { background: "linear-gradient(135deg, #FAC775, #EF9F27)" },
  "game-vault": { background: "linear-gradient(135deg, #EF9F27, #412402)" },
};

const promoGames = promoPlatforms.map((platform) => ({
  ...platform,
  style: chipStyles[platform.id],
}));

const thumbnailGames = promoGames;
const phoneGames = promoGames.slice(0, 4);

function GameTile({ game, size = "sm" }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const sizeClass =
    size === "phone"
      ? "h-[50px] rounded-lg text-[9px]"
      : "h-7 w-7 rounded-md text-[5.5px] min-[375px]:h-8 min-[375px]:w-8 min-[375px]:text-[6px] md:h-10 md:w-10 md:rounded-lg md:text-[8px]";
  const labelClass = size === "phone" ? "px-1 leading-tight" : "px-0.5 leading-none md:px-0.5";
  const logoAvailable = Boolean(game.logo && !logoFailed);

  return (
    <span className={`relative grid ${sizeClass} shrink-0 place-items-center overflow-hidden border border-white/15 font-black uppercase text-white shadow-lg shadow-black/20`} style={game.style}>
      {logoAvailable && (
        <img
          src={game.logo}
          alt={`${game.name} logo`}
          className="absolute inset-0 h-full w-full object-contain p-1 opacity-90"
          loading="lazy"
          onError={() => setLogoFailed(true)}
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
      <span className={`relative z-10 text-center drop-shadow ${labelClass}`}>{game.name}</span>
    </span>
  );
}

function GameThumbnails() {
  return (
    <div className="mt-3 grid max-w-full grid-cols-3 gap-1.5 min-[375px]:gap-2 md:mt-6 md:flex md:flex-wrap md:gap-2">
      {thumbnailGames.map((game) => (
        <GameTile key={game.name} game={game} />
      ))}
    </div>
  );
}

function PhoneMockup({ accent = "bronze", buttonLabel }) {
  const featuredGame = featuredGames[accent];

  return (
    <div className="relative z-10 mt-6 hidden w-full max-w-[220px] rounded-[2.25rem] border-4 border-slate-800 bg-slate-900 p-2 shadow-2xl shadow-black/45 sm:max-w-[240px] sm:rounded-[2.5rem] sm:p-2.5 md:mt-0 md:block md:w-[250px] md:max-w-none md:self-end lg:w-[260px]">
      <div className="overflow-hidden rounded-[1.75rem] bg-slate-950 p-2.5 sm:rounded-[2rem] sm:p-3">
        <div className="flex items-center justify-between">
          <p className="font-['Dancing_Script'] text-base font-bold leading-none text-white sm:text-lg">GoldenSweep</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#412402] px-2.5 py-1 text-[10px] font-black text-[#FAC775]">
            <Coins className="h-3 w-3" />
            $100
          </span>
        </div>

        <div className="relative mt-3 flex h-[100px] flex-col justify-end overflow-hidden rounded-lg p-3" style={featuredGame.style}>
          {featuredGame.image && <img src={featuredGame.image} alt={`${featuredGame.name} featured game`} className="absolute inset-0 h-full w-full object-cover opacity-80" loading="lazy" />}
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <p className="relative text-[10px] font-black uppercase tracking-wide text-[#FAEEDA]/80">Welcome Banner</p>
          <p className="relative text-xl font-black leading-none text-white">{featuredGame.name}</p>
        </div>

        <button type="button" className="mx-auto mt-3 block rounded-full bg-[#1c2740] px-5 py-2 text-[11px] font-black uppercase tracking-wide text-white">
          {buttonLabel}
        </button>

        <div className="mx-auto mt-3 grid w-fit grid-cols-2 gap-2">
          {phoneGames.map((game) => (
            <GameTile key={game.name} game={game} size="phone" />
          ))}
        </div>

        <div className="mx-auto mt-3 w-fit rounded-full bg-[#412402] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#FAC775]">
          GoldenSweep Branded
        </div>
      </div>
    </div>
  );
}

function PlatformCard({ title, subtitle, cta, theme, buttonLabel }) {
  const isAmber = theme === "amber";
  const buttonStyle = {
    background: isAmber ? "linear-gradient(90deg, #FAC775, #EF9F27)" : "linear-gradient(90deg, #EF9F27, #BA7517)",
  };
  const glowClass = isAmber ? "bg-[#EF9F27]/20" : "bg-[#BA7517]/20";

  return (
    <article className="relative flex w-full max-w-full min-w-0 flex-col items-start overflow-hidden rounded-xl border border-white/10 bg-[#131b2e] p-3 text-left shadow-2xl shadow-black/25 min-[375px]:p-3.5 md:min-h-[450px] md:max-w-none md:flex-row md:items-stretch md:justify-between md:gap-8 md:rounded-3xl md:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:18px_18px]"
        aria-hidden="true"
      />
      <div className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl ${glowClass}`} aria-hidden="true" />

      {/* Mobile keeps a compact content-only card; desktop restores the split mockup composition. */}
      <div className="relative z-20 flex w-full min-w-0 flex-col items-start md:min-h-[370px] md:max-w-[52%] lg:max-w-[55%]">
        <h2 className="w-full text-[15px] font-bold leading-tight text-white min-[375px]:text-base sm:text-lg md:max-w-sm md:text-4xl">{title}</h2>
        <p className="mt-1.5 w-full text-[10px] leading-snug text-gray-400 min-[375px]:text-[11px] sm:text-sm md:mt-3 md:max-w-sm md:text-base">{subtitle}</p>
        <GameThumbnails />
        <Link
          to="/#support"
          className="mt-4 inline-flex min-h-9 w-full items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-semibold text-[#412402] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 min-[375px]:text-xs md:mt-6 md:min-h-11 md:w-fit md:gap-2 md:px-6 md:py-3 md:text-sm"
          style={buttonStyle}
        >
          <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
          {cta}
        </Link>
      </div>

      <PhoneMockup accent={theme} buttonLabel={buttonLabel} />
    </article>
  );
}

export default function WhiteLabelLeasing() {
  return (
    <section className="relative left-1/2 box-border w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden px-3 py-8 sm:px-6 sm:py-16">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 min-[375px]:gap-4 md:gap-6">
        <PlatformCard
          title="White label this platform"
          subtitle="Boost sales. Cut costs."
          cta="Let's talk"
          theme="bronze"
          buttonLabel="PLAY NOW"
        />
        <PlatformCard
          title="Leasing Program"
          subtitle="Fully automated GoldenSweep website."
          cta="Lease now"
          theme="amber"
          buttonLabel="ADD GAME"
        />
      </div>
    </section>
  );
}
