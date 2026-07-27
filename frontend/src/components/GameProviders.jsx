import aceLogo from "../data/gameprovider/ace.png";
import cpLogo from "../data/gameprovider/cp.png";
import faLogo from "../data/gameprovider/fa.png";
import fastspinLogo from "../data/gameprovider/fastspin.png";
import jiliLogo from "../data/gameprovider/jili.png";
import pixmoveLogo from "../data/gameprovider/pixmove.png";
import rabbitGamingLogo from "../data/gameprovider/rabbitgaming.png";
import simplePlayLogo from "../data/gameprovider/simpleplay.png";

const providers = [
  { name: "JILI GAMING", logo: jiliLogo },
  { name: "FACHAI", logo: faLogo },
  { name: "ACE WIN", logo: aceLogo },
  { name: "CP", logo: cpLogo },
  { name: "FASTSPIN", logo: fastspinLogo },
  { name: "PIXMOVE", logo: pixmoveLogo },
  { name: "SIMPLE PLAY", logo: simplePlayLogo },
  { name: "VA GAMING", logo: rabbitGamingLogo },
];

const marqueeProviders = [...providers, ...providers];

export default function GameProviders() {
  return (
    <section className="overflow-hidden border-b border-yellow-500/20 px-3 py-10 sm:px-6 sm:py-12">
      <h2 className="mb-6 text-center text-xl font-bold text-white sm:mb-10 sm:text-2xl md:text-3xl">Game Providers</h2>

      <div className="group relative before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-6 before:bg-[linear-gradient(to_right,var(--bg-color),transparent)] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-6 after:bg-[linear-gradient(to_left,var(--bg-color),transparent)] [--bg-color:#0D0D0D]">
        {/* Mobile and desktop both auto-scroll, while still allowing touch swipe. */}
        <div className="hide-scrollbar -mx-3 flex w-max animate-marquee snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 will-change-transform group-hover:[animation-play-state:paused] md:mx-0 md:gap-4 md:overflow-visible md:px-0">
          {marqueeProviders.map((provider, index) => (
            <article
              key={`${provider.name}-${index}`}
              className="flex h-[118px] w-[136px] shrink-0 snap-start flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 p-3 sm:h-[135px] sm:w-[150px] sm:gap-3 sm:rounded-2xl sm:p-4"
            >
              <img src={provider.logo} alt={`${provider.name} logo`} className="mb-1 h-14 w-auto object-contain sm:mb-2 sm:h-16" loading="lazy" />
              <h3 className="text-center text-xs font-bold uppercase tracking-wide text-white sm:text-sm">{provider.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
