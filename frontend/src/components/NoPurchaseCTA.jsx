import { Link } from "react-router-dom";

export default function NoPurchaseCTA() {
  return (
    <section className="w-full px-3 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center sm:p-6 md:p-12">
          <h2 className="text-center text-xl font-black uppercase leading-tight text-white min-[390px]:text-2xl md:text-4xl">
            No Purchase Necessary
          </h2>
          <p className="mb-6 mt-3 text-sm text-gray-400 sm:mb-8 sm:text-base">It's always FREE to play at EasyPlay!</p>

          <Link
            to="/sign-up"
            className="flex min-h-11 w-full max-w-md items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-3 text-center text-base font-bold text-black shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 sm:py-4 sm:text-lg"
          >
            Play Now
          </Link>

          {/* Legal links wrap cleanly without causing page-level horizontal overflow. */}
          <div className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs text-gray-400">
            <span>18+ only</span>
            <span aria-hidden="true">.</span>
            <Link to="/terms-and-conditions" className="inline-flex min-h-11 items-center underline transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
              Terms
            </Link>
            <span aria-hidden="true">.</span>
            <Link to="/#sweepstakes-rules" className="inline-flex min-h-11 items-center underline transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
              Sweepstakes Rules
            </Link>
            <span aria-hidden="true">.</span>
            <Link to="/#responsible-play" className="inline-flex min-h-11 items-center underline transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
              Play responsibly
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
