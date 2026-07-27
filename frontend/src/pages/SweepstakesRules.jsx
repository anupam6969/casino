import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const sections = [
  {
    title: "01 Overview",
    body: [
      "Effective / Last Updated: May 25, 2026",
      "These Rules govern GoldenSweep promotional play, eligibility, prize-related balances, prohibited conduct, verification, and promotional outcomes.",
      "Website: goldensweep.ai",
      "Support: support@goldensweep.ai",
    ],
  },
  {
    title: "02 Sponsor and Promotion Period",
    body: [
      "Sponsor: GoldenSweep, . Unless a specific promotion states otherwise, promotional play is offered on an ongoing basis and may be modified or ended prospectively.",
    ],
  },
  {
    title: "03 Eligibility",
    body: [
      "Open only to verified natural persons meeting the applicable minimum age and physically located in an eligible U.S. jurisdiction. Employees, contractors, vendors, household members, and persons involved in administration may be excluded. Void where prohibited or restricted. The restricted-state list must be confirmed by counsel immediately before launch and maintained operationally through geolocation controls.",
    ],
  },
  {
    title: "04 Promotional Credits",
    body: [
      "Promotional credits may be offered through registration, Daily Bonus, Spin the Wheel, one-time bonus, tasks, loyalty, referrals, adjustments, or other offers. They are provided for entertainment and are not cash, deposits, bank funds, stored value, or property transferable between users.",
    ],
  },
  {
    title: "05 Key Redemption Rule",
    body: [
      "After a qualifying purchase, a player must complete eligible play and reach a redeemable balance equal to at least 4× the actual amount paid for that purchase. The maximum amount eligible for redemption from that purchase cycle is 10× the actual amount paid. Bonus Play redemption is governed by the separate Bonus Play Limited Redemption rule. Purchased balances will not be affected by Bonus Play voiding rules.",
    ],
  },
  {
    title: "06 Purchase-Cycle Calculation",
    body: [
      "The “actual amount paid” means the final amount charged for the qualifying purchase after discounts and before any unrelated payment-processor fee. Bonus credits, advertised package face value, prior balances, gifts, adjustments, and free promotional awards do not increase the calculation base. Each purchase cycle must be tracked in GoldenSweep’s ledger to prevent double counting.",
    ],
  },
  {
    title: "07 Bonus Play Limited Redemption",
    body: [
      "Players using free promotional rewards—including Daily Rewards, Spin the Wheel, first-time bonuses, tasks and other complimentary bonuses—must reach a promotional balance of at least 100 SC before requesting redemption. The maximum amount redeemable from Bonus Play is 25 SC per verified player and account. This limit applies regardless of the total promotional balance. For example, whether the player wins 100 SC, 200 SC or more from Bonus Play, only 25 SC may be redeemed. After the approved 25 SC redemption is successfully paid, all remaining Bonus Play balances and winnings will be voided. Purchased balances will not be affected. No purchase is required for this limited Bonus Play redemption. Identity, age, location, account ownership and eligibility verification are required.",
    ],
  },
  {
    title: "08 Odds and Results",
    body: [
      "Game results are determined by the applicable game system. Odds vary by game, play, and promotion and are not improved merely because a user purchases a larger package. GoldenSweep makes no promise that any player will win or become eligible to redeem.",
    ],
  },
  {
    title: "09 Verification and Winner Conditions",
    body: [
      "Identity, age, location, account ownership, payment ownership, tax, sanctions, gameplay, and promotion verification may be required. Potential eligibility is subject to validation of the account ledger and all Rules. A potential recipient is not entitled to a prize until GoldenSweep issues final written approval and completes required payment processing.",
    ],
  },
  {
    title: "10 Prohibited Activity",
    body: [
      "Multiple accounts, false identity, account sharing, collusion, location masking, bots, scripts, emulators, exploits, or manipulation.",
      "Promotion farming, coordinated households, circular payments, chargebacks, bonus abuse, or activity lacking genuine entertainment play.",
      "Use from a restricted location or by a prohibited person.",
    ],
  },
  {
    title: "11 Disqualification and Errors",
    body: [
      "GoldenSweep may disqualify entries or play reasonably determined to violate these Rules, correct ledger or display errors, and withhold or void balances associated with prohibited activity, subject to applicable law. GoldenSweep should not modify a completed result solely because the result was unfavorable to GoldenSweep.",
    ],
  },
  {
    title: "12 Taxes, Publicity, and General Conditions",
    body: [
      "Recipients are responsible for taxes and may be required to provide tax information. Publicity rights may be used only with consent where required. GoldenSweep may suspend, modify, or terminate a promotion if fraud, technical failure, legal change, or events beyond reasonable control impair integrity, subject to honoring vested rights required by law.",
    ],
  },
  {
    title: "13 Entry and Eligibility Note",
    body: [
      "GoldenSweep will publish and maintain promotion-specific entry, eligibility, and free-entry instructions where required. Rules may vary by account status, promotion, and jurisdiction.",
    ],
  },
  {
    title: "14 Contact Us",
    body: [
      "Questions about this policy may be sent to support@goldensweep.ai.",
    ],
  },
];

function setMetaDescription(content) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export default function SweepstakesRules() {
  useEffect(() => {
    document.title = "Sweepstakes Rules | GoldenSweep";
    setMetaDescription("Clear rules for no-purchase participation, free entry, virtual currency, and redemption eligibility.");
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-cream">
      <Navbar />
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_16%,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_80%_42%,rgba(231,184,69,0.1),transparent_28%)]" />
        <article className="relative z-10 mx-auto max-w-[900px] rounded-3xl border border-gold-200/30 bg-black/55 p-5 shadow-luxury backdrop-blur-2xl sm:p-8 lg:p-10">
          <header className="mb-10 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-black text-white md:text-5xl">
              Sweepstakes Rules
            </motion.h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">Last Updated: May 25, 2026</p>
          </header>

          <div className="space-y-9">
            {sections.map((section) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-heading text-xl font-bold text-gold-200">{section.title}</h2>
                <div className="mt-3 space-y-3 text-sm leading-7 text-cream/72 sm:text-base">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>

          <div className="mt-12 text-center">
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
      <Footer />
    </main>
  );
}
