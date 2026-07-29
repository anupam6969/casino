import { Link } from "react-router-dom";
import heroBg from "../data/images/hero-bg.png";
import heroLogo from "../data/images/hero_logo.png";

export default function HeroBanner() {
  return (
    <section id="top" className="relative w-full overflow-hidden px-3 pb-6 pt-20 sm:px-6 sm:pb-8 sm:pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-background" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-4 text-center sm:px-8 sm:py-6">
        <img
          src={heroLogo}
          alt="GoldenSweep Casino"
          className="block h-auto max-h-72 w-full max-w-[420px] object-contain sm:max-h-80 sm:max-w-[520px] lg:max-h-96 lg:max-w-[620px]"
        />
        <div className="-mt-4 flex flex-col items-center sm:-mt-6 lg:-mt-8">
          <p className="font-montserrat text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/90 min-[375px]:text-xs sm:text-sm">
            Enter The Golden World
          </p>
          <p className="mt-4 text-sm font-semibold leading-6 text-white/90 min-[375px]:text-base sm:text-xl">
            One Account. Multiple Gaming Worlds.
          </p>
          <p className="mt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold text-white/90 min-[375px]:text-base sm:text-xl">
            {/* <span>Buy Credits</span>
            <span className="text-gold-300">•</span>
            <span>Recharge</span>
            <span className="text-gold-300">•</span>
            <span>Play</span> */}
          </p>
          <Link
            to="/sign-up"
            className="mt-5 inline-flex min-h-12 min-w-44 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-8 text-sm font-extrabold uppercase text-slate-950 shadow-lg shadow-black/25 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:min-h-14 sm:min-w-56 sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
