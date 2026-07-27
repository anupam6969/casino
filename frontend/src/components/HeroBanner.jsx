import { Link } from "react-router-dom";
import { ArrowRight, Gift, ShieldCheck, Trophy } from "lucide-react";
import heroImg from "../data/images/hero.png";

const trustItems = [
  { title: "Daily Rewards", subtitle: "Claim Every Day", icon: Gift },
  { title: "Safe & Secure", subtitle: "Your Security, Our Priority", icon: ShieldCheck },
  { title: "Redeem Eligible", subtitle: "Prizes Anytime", icon: Trophy },
];

export default function HeroBanner() {
  return (
    <section id="top" className="w-full px-6 pb-10 pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl">
          <img
            src={heroImg}
            alt="GoldenSweep casino table with premium games banner"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/20" aria-hidden="true" />

          <div className="relative z-10 flex min-h-[560px] items-center justify-center px-5 pb-56 pt-16 text-center sm:min-h-[520px] sm:px-8 sm:pb-36 md:aspect-[2/1] md:min-h-0 md:px-10">
            <div className="mx-auto max-w-3xl">
              {/* <h1 className="text-center text-2xl font-black uppercase leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
                Play &amp; Enjoy Premium Games
              </h1> */}
              {/* <Link
                to="/sign-up"
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 text-lg font-bold uppercase text-black shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Start Playing
                <ArrowRight className="h-5 w-5" />
              </Link> */}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-yellow-500/20 bg-black/60 px-5 py-4 backdrop-blur-sm sm:px-8">
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              {trustItems.map(({ title, subtitle, icon: Icon }) => (
                <div key={title} className="flex items-center justify-center gap-3 text-left">
                  <Icon className="h-8 w-8 shrink-0 text-yellow-400" />
                  <div>
                    <p className="text-sm font-bold uppercase text-white">{title}</p>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
