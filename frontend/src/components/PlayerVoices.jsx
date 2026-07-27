import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah K.",
    statusColor: "text-cyan-400",
    avatarClass: "from-cyan-300 to-teal-700",
    quote:
      "Didn't expect it to be this smooth. Claimed my coins, played a bit, and redemption went through without any issues. Clean platform.",
  },
  {
    name: "Joseph R.",
    statusColor: "text-emerald-400",
    avatarClass: "from-emerald-300 to-green-800",
    quote:
      "First time trying something like this and honestly impressed. The games feel premium and the whole process is super easy.",
  },
  {
    name: "Andrew L.",
    statusColor: "text-cyan-400",
    avatarClass: "from-fuchsia-300 to-purple-800",
    quote: "Redeemed my coins faster than I thought. No delays, no confusion. Definitely sticking with this.",
  },
  {
    name: "Maxim P.",
    statusColor: "text-emerald-400",
    avatarClass: "from-amber-300 to-orange-800",
    quote: "Love the panda and dragon games, relaxing after work and the rewards actually keep it interesting.",
  },
  {
    name: "John T.",
    statusColor: "text-cyan-400",
    avatarClass: "from-sky-300 to-blue-800",
    quote: "The mobile lobby feels polished, bonuses are easy to understand, and support answered fast when I had a question.",
  },
  {
    name: "Henry M.",
    statusColor: "text-emerald-400",
    avatarClass: "from-rose-300 to-pink-800",
    quote: "GoldenSweep feels cleaner than the other platforms I tried. Free coins, quick access, and the games load without fuss.",
  },
];

const marqueeItems = [...testimonials, ...testimonials];

function RatingStars() {
  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <article className="w-[280px] shrink-0 rounded-2xl border border-white/10 bg-slate-900/60 p-6 sm:w-[360px]">
      <div className="flex items-center gap-4">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${testimonial.avatarClass} text-sm font-black text-white shadow-lg shadow-black/25`}>
          {testimonial.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
        <div>
          <RatingStars />
          <h3 className="mt-1 text-base font-semibold text-white">{testimonial.name}</h3>
          <p className={`mt-0.5 text-xs font-semibold uppercase tracking-wide ${testimonial.statusColor}`}>Verified GoldenSweep Player</p>
        </div>
      </div>
      <p className="mt-5 text-sm italic leading-relaxed text-gray-300">"{testimonial.quote}"</p>
    </article>
  );
}

export default function PlayerVoices() {
  return (
    <section className="overflow-hidden border-y border-yellow-500/20 px-6 py-12">
      <div className="mx-auto mb-10 flex max-w-7xl justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-300">Player Voices</span>
        </div>
      </div>

      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent" />

        <div className="flex w-max animate-marquee-rtl gap-4 will-change-transform group-hover:[animation-play-state:paused]">
          {marqueeItems.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
