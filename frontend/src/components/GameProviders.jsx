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
    <section className="overflow-hidden border-b border-yellow-500/20 px-6 py-12">
      <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">Game Providers</h2>

      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent" />

        <div className="flex w-max animate-marquee gap-4 will-change-transform group-hover:[animation-play-state:paused]">
          {marqueeProviders.map((provider, index) => (
            <article
              key={`${provider.name}-${index}`}
              className="flex h-[135px] w-[150px] shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4"
            >
              <img src={provider.logo} alt={`${provider.name} logo`} className="mb-2 h-16 w-auto object-contain" loading="lazy" />
              <h3 className="text-center text-sm font-bold uppercase tracking-wide text-white">{provider.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
