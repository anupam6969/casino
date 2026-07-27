import { ImageIcon } from "lucide-react";

// TODO: replace with real platform logos and names.
const platforms = Array.from({ length: 8 }, (_, index) => ({
  id: `platform-${index + 1}`,
  name: "",
  image: null,
}));

const marqueePlatforms = [...platforms, ...platforms];

function PlatformCard({ platform }) {
  return (
    <article className="flex w-[136px] shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 p-3 text-center shadow-lg shadow-black/20 sm:w-[150px] sm:rounded-2xl sm:p-4">
      <div className="grid aspect-square w-full place-items-center rounded-lg border border-white/10 bg-slate-800/80 text-gray-400">
        {platform.image ? (
          <img src={platform.image} alt={platform.name ? `${platform.name} logo` : "Platform logo"} className="h-full w-full object-contain p-3" loading="lazy" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageIcon className="h-6 w-6 text-gray-500" aria-hidden="true" />
            <span className="text-xs font-black uppercase tracking-wide text-gray-500">IMG</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default function ExclusivePlatforms() {
  return (
    <section className="overflow-hidden px-3 py-10 sm:px-6 sm:py-12">
      <h2 className="mb-6 text-center text-xl font-bold text-white sm:mb-10 sm:text-2xl md:text-3xl">Exclusive Platforms</h2>

      <div className="relative">
        {/* Marquee row reuses the existing horizontal snap + hidden-scrollbar treatment used by other card rows. */}
        <div className="hide-scrollbar -mx-3 flex w-max animate-marquee snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-1 will-change-transform hover:[animation-play-state:paused] sm:-mx-6 sm:gap-4 sm:px-6 md:mx-0 md:px-0">
          {marqueePlatforms.map((platform, index) => (
            <PlatformCard key={`${platform.id}-${index}`} platform={platform} />
          ))}
        </div>
      </div>
    </section>
  );
}
