import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

// Block helpers: p = paragraph, ul = bullet list, flow = arrow list, notice = highlighted box, kv = bold label + text
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const flow = (...items) => ({ type: "flow", items });
const notice = (...lines) => ({ type: "notice", lines });
const kv = (label, text) => ({ type: "kv", label, text });

const SITE = "https://www.goldensweep.ai";

const meta = [
  ["Sponser", "Gameverse LLC"],
  ["Website", SITE],
  ["Effective Date", "October 12, 2026"],
  ["Version", "1.1"],
];

const welcome = {
  title: "WELCOME TO GOLDEN SWEEP",
  blocks: [
    p(`${SITE} is an online social gaming and promotional Sweepstakes platform operated by Gameverse LLC.`),
    p("Our goal is to provide eligible adult Users with an entertaining online gaming experience while maintaining clear Sweepstakes rules, free methods of participation, responsible-gaming options, security controls, and transparent Prize-redemption procedures."),
    p("Golden Sweep is designed around two distinct ways to enjoy participating games: entertainment gameplay using Gold Coins and promotional Sweepstakes gameplay using Sweepstakes Coins."),
  ],
};

const sections = [
  {
    title: "1. GOLD COINS",
    blocks: [
      p("Gold Coins (“GC”) are virtual entertainment credits used to enjoy eligible games on Golden Sweep."),
      p("GC:"),
      ul(
        "are intended for entertainment gameplay;",
        "have no cash value;",
        "are not legal tender;",
        "cannot be redeemed for cash;",
        "cannot be redeemed for Prizes."
      ),
      p("Users may obtain GC through eligible Gold Coin packages and through promotions that Golden Sweep may make available from time to time."),
    ],
  },
  {
    title: "2. SWEEPSTAKES COINS",
    blocks: [
      p("Sweepstakes Coins (“SC”) are free promotional play credits that may be used to participate in eligible Sweepstakes gameplay."),
      p("SC:"),
      ul(
        "are not sold separately;",
        "are not cash;",
        "are not legal tender;",
        "do not themselves constitute a Prize;",
        "cannot themselves be redeemed for cash or Prizes."
      ),
      p("Eligible Users may obtain SC through promotional methods, including a free Alternative Method of Entry (“AMOE”)."),
      p("No purchase or payment is necessary to obtain an eligible Sweepstakes participation opportunity, participate, or win. A purchase does not increase a Participant's chances of winning."),
    ],
  },
  {
    title: "3. REDEEMABLE CREDITS",
    blocks: [
      p("Redeemable Credits (“RC”) are separate from both GC and SC."),
      p("Eligible winning outcomes resulting from qualifying SC gameplay, after applicable requirements have been satisfied, may produce separately recorded RC."),
      p("Eligible RC may then be submitted for Prize redemption, subject to applicable eligibility, verification, redemption limits, and other requirements."),
      p("For clarity:"),
      flow(
        "GC → Entertainment gameplay only → Not redeemable",
        "SC → Free promotional Sweepstakes gameplay → SC themselves are not redeemable",
        "Eligible winning SC gameplay → May produce RC",
        "Eligible RC → May be submitted for Prize redemption"
      ),
    ],
  },
  {
    title: "4. NO PURCHASE NECESSARY",
    blocks: [
      p("Golden Sweep provides an eligible free method of Sweepstakes participation."),
      notice(
        "NO PURCHASE OR PAYMENT IS NECESSARY TO ENTER, PARTICIPATE, OR WIN.",
        "A PURCHASE WILL NOT INCREASE YOUR CHANCES OF WINNING."
      ),
      p("Eligible Participants may obtain promotional SC without making a purchase through Golden Sweep's free postal AMOE."),
    ],
  },
  {
    title: "5. FREE ALTERNATIVE METHOD OF ENTRY",
    blocks: [
      p("Golden Sweep provides a free postal Alternative Method of Entry (“AMOE”) through which eligible Participants may request promotional SC without making a purchase."),
      p("Each valid AMOE request provides:"),
      notice("3 Sweepstakes Coins (3 SC)."),
      p("The applicable AMOE eligibility, mailing, validation, and processing requirements are provided with Golden Sweep's Sweepstakes rules."),
      p("SC obtained through the free AMOE provide the same Sweepstakes opportunity as an equivalent amount of eligible SC obtained through another promotional method."),
    ],
  },
  {
    title: "6. FAIR SWEEPSTAKES PARTICIPATION",
    blocks: [
      p("Golden Sweep is committed to administering its Sweepstakes promotions according to their published requirements."),
      p("A purchase does not provide better odds than an equivalent amount of eligible SC obtained through a free promotional method."),
      p("Eligible Participants using the free AMOE are not required to make a purchase as a condition of receiving valid AMOE SC."),
    ],
  },
  {
    title: "7. PRIZE REDEMPTION",
    blocks: [
      p("Eligible winning outcomes from qualifying SC gameplay may result in RC."),
      p("Only eligible RC may be submitted for Prize redemption."),
      p("Prize-redemption requests may be subject to requirements including:"),
      ul(
        "minimum redemption requirements;",
        "applicable Player Tier redemption maximums;",
        "identity and age verification;",
        "geographic eligibility;",
        "Account verification;",
        "fraud and security review;",
        "payment verification;",
        "tax requirements;",
        "other applicable compliance requirements."
      ),
      p("Submitting a redemption request does not itself guarantee approval."),
    ],
  },
  {
    title: "8. RESPONSIBLE GAMING",
    blocks: [
      p("Golden Sweep is intended for entertainment."),
      p("We encourage Users to:"),
      ul(
        "establish reasonable spending limits;",
        "establish reasonable time limits;",
        "avoid chasing losses;",
        "avoid using money needed for essential expenses;",
        "take breaks when appropriate;",
        "seek assistance if gaming stops being enjoyable or becomes difficult to control."
      ),
      p("Golden Sweep provides responsible-gaming options including purchase limits, Cooling-Off periods, Self-Exclusion, and permanent Account closure."),
    ],
  },
  {
    title: "9. SAFETY AND SECURITY",
    blocks: [
      p("Golden Sweep uses reasonable administrative, technical, and organizational safeguards designed to protect Users and the Platform."),
      p("Depending on the activity involved, Golden Sweep may use:"),
      ul(
        "identity and age verification;",
        "geographic verification;",
        "payment-security controls;",
        "fraud-prevention measures;",
        "Account-security controls;",
        "encrypted connections;",
        "monitoring designed to identify suspicious activity."
      ),
      p("No online system can be guaranteed to be completely secure, and Users are encouraged to protect their Account credentials and devices."),
    ],
  },
  {
    title: "10. ELIGIBILITY AND GEOGRAPHIC AVAILABILITY",
    blocks: [
      p("Golden Sweep is available only to eligible Users physically located in permitted U.S. jurisdictions."),
      p(`${SITE} and its Services are not available in:`),
      p("California, Connecticut, Delaware, Idaho, Indiana, Louisiana, Maine, Michigan, Montana, Nevada, New Jersey, New York, Oklahoma, Tennessee, Utah, and Washington."),
      p("Access is also void where prohibited by applicable law."),
      p("Golden Sweep may use geographic verification to determine whether a User is physically located in an eligible jurisdiction."),
    ],
  },
  {
    title: "11. OUR COMMITMENT",
    blocks: [
      p("Golden Sweep seeks to provide Users with:"),
      ul(
        "clear promotional terms;",
        "a genuine free method of Sweepstakes participation;",
        "transparent GC, SC, and RC distinctions;",
        "fair treatment of eligible promotional SC;",
        "transparent Prize-redemption procedures;",
        "responsible-gaming tools;",
        "Account and transaction security;",
        "Customer Support;",
        "appropriate compliance controls."
      ),
      p("We continue to review our Platform, policies, and procedures as Golden Sweep develops."),
    ],
  },
  {
    title: "12. CONTACT GOLDEN SWEEP",
    blocks: [
      p("Questions about Golden Sweep may be directed to:"),
      p("Golden Sweep Customer Support"),
      kv("Email:", "support@goldensweep.com"),
      kv("Phone:", "+1 (972) 535-9119"),
      p("Written correspondence may be sent to:"),
      p("Gameverse LLC / Golden Sweep\n16192 Coastal Highway\nLewes, Delaware 19958\nUnited States"),
    ],
  },
];

function setMetaDescription(content) {
  let tag = document.querySelector('meta[name="description"]');
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", "description");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function renderBlock(block, index) {
  switch (block.type) {
    case "ul":
      return (
        <ul key={index} className="list-disc space-y-1.5 pl-6 marker:text-gold-200">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "flow":
      return (
        <ul key={index} className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="rounded-xl border border-gold-200/20 bg-white/5 px-4 py-3 text-cream/85">
              {item}
            </li>
          ))}
        </ul>
      );
    case "notice":
      return (
        <div key={index} className="rounded-2xl border border-gold-200/40 bg-gold-200/10 px-5 py-4 text-center font-bold uppercase tracking-wide text-gold-200">
          {block.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
    case "kv":
      return (
        <p key={index}>
          <strong className="font-semibold text-white">{block.label}</strong> {block.text}
        </p>
      );
    default:
      return (
        <p key={index} className="whitespace-pre-line">
          {block.text}
        </p>
      );
  }
}

function Section({ section }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="font-heading text-xl font-bold text-gold-200">{section.title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-cream/72 sm:text-base">
        {section.blocks.map(renderBlock)}
      </div>
    </motion.section>
  );
}

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us | Golden Sweep";
    setMetaDescription(
      "Learn about Golden Sweep, a social gaming and promotional Sweepstakes platform operated by Gameverse LLC, including Gold Coins, Sweepstakes Coins, Redeemable Credits, and the free AMOE."
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background font-sans text-cream">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_26%_16%,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_80%_42%,rgba(231,184,69,0.1),transparent_28%)]"
        aria-hidden="true"
      />
      <Navbar />
      <section className="relative z-10 px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-[900px] rounded-3xl border border-gold-200/30 bg-black/55 p-5 shadow-luxury backdrop-blur-2xl sm:p-8 lg:p-10">
          <header className="mb-10 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-black text-white md:text-5xl">
              About Us
            </motion.h1>
            <dl className="mt-5 space-y-1 text-sm text-cream/72">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt className="inline font-semibold uppercase tracking-[0.14em] text-gold-200">{label}: </dt>
                  <dd className="inline">{value}</dd>
                </div>
              ))}
            </dl>
          </header>

          <div className="space-y-9">
            <Section section={welcome} />
            {sections.map((section) => (
              <Section key={section.title} section={section} />
            ))}
          </div>

          <footer className="mt-12 border-t border-gold-200/20 pt-6 text-center text-xs text-cream/60 sm:text-sm">
            <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Golden Sweep · About Us</p>
            <p className="mt-1">Operated by Gameverse LLC</p>
            <p className="mt-3 font-semibold uppercase">
              No purchase or payment necessary for Sweepstakes participation. A purchase will not increase your chances of winning. Void where prohibited.
            </p>
            <p className="mt-3">© 2026 Gameverse LLC / Golden Sweep. All rights reserved.</p>
          </footer>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 px-6 py-3 text-sm font-semibold text-black shadow-gold transition duration-300 hover:shadow-gold-lg focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 focus:ring-offset-black"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                <ArrowLeft size={17} />
                Back to Home
              </span>
            </Link>
          </div>
        </article>
      </section>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}