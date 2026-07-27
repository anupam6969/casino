import heroImg from "../data/images/hero.png";

export default function HeroBanner() {
  return (
    <section id="top" className="w-full px-3 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl sm:rounded-3xl">
          <img
            src={heroImg}
            alt="GoldenSweep casino table with premium games banner"
            className="block h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
