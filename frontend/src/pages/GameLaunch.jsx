import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Gamepad2, Sparkles } from "lucide-react";

function titleFromId(id) {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function GameLaunch() {
  const { gameId } = useParams();
  const gameTitle = titleFromId(gameId || "game");

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-cream sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-gold-200 transition hover:text-white">
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-3xl border border-gold-200/30 bg-black/55 p-8 text-center shadow-luxury backdrop-blur-2xl"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-gold-200/45 bg-gold-300/10 text-gold-200 shadow-gold">
            <Gamepad2 size={30} />
          </div>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-200/35 bg-gold-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">
            <Sparkles size={14} />
            Game Launch Stub
          </p>
          <h1 className="mt-5 font-heading text-4xl font-black text-white md:text-5xl">{gameTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cream/72 sm:text-base">
            This route is ready for the real game launch integration.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
