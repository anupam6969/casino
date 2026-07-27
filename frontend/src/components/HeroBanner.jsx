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
    <section id="top" className="w-full px-3 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-28">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl sm:rounded-3xl">
          <img
            src={heroImg}
            alt="GoldenSweep casino table with premium games banner"
            className="absolute inset-0 h-full w-full object-cover object-[52%_center] sm:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/20" aria-hidden="true" />

          {/* Mobile hero keeps copy compact and centered over the cropped image. */}
          <div className="relative z-10 flex min-h-[430px] items-center justify-center px-4 pb-36 pt-10 text-center min-[390px]:min-h-[470px] sm:min-h-[520px] sm:px-8 sm:pb-36 md:aspect-[2/1] md:min-h-0 md:px-10">
            <div className="mx-auto max-w-3xl">
              
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-yellow-500/20 bg-black/60 px-2 py-3 backdrop-blur-sm sm:px-8 sm:py-4">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-6">
              {trustItems.map(({ title, subtitle, icon: Icon }) => (
                <div key={title} className="flex min-w-0 items-center justify-center gap-1.5 text-left sm:gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-yellow-400 sm:h-8 sm:w-8" />
                  <div>
                    <p className="text-[10px] font-bold uppercase leading-tight text-white sm:text-sm">{title}</p>
                    <p className="text-[9px] leading-tight text-gray-400 sm:text-xs">{subtitle}</p>
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
