import { Link } from "react-router-dom";

export default function NoPurchaseCTA() {
  return (
    <section className="w-full px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-center md:p-12">
          <h2 className="text-center text-2xl font-black uppercase leading-tight text-white md:text-4xl">
            No Purchase Necessary
          </h2>
          <p className="mb-8 mt-3 text-base text-gray-400">It's always FREE to play at EasyPlay!</p>

          <Link
            to="/sign-up"
            className="w-full max-w-md rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 py-4 text-center text-lg font-bold text-black shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Play Now
          </Link>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
            <span>18+ only</span>
            <span aria-hidden="true">.</span>
            <Link to="/terms-and-conditions" className="underline transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
              Terms
            </Link>
            <span aria-hidden="true">.</span>
            <Link to="/#sweepstakes-rules" className="underline transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
              Sweepstakes Rules
            </Link>
            <span aria-hidden="true">.</span>
            <Link to="/#responsible-play" className="underline transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
              Play responsibly
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
