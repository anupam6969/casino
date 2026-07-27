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
      "This Policy describes GoldenSweep’s entertainment-only approach, player controls, warning signs, self-exclusion, protection of minors, staff responsibilities, and support resources.",
      "Website: goldensweep.ai",
      "Support: support@goldensweep.ai",
    ],
  },
  {
    title: "02 Our Commitment",
    body: [
      "GoldenSweep is intended for entertainment, not as a way to make money, recover losses, pay bills, or solve financial problems. Outcomes are uncertain. Players should use only discretionary funds and stop whenever play is no longer enjoyable or manageable.",
    ],
  },
  {
    title: "03 Know the Redemption Limits",
    body: [
      "Redemption is conditional. A qualifying purchase does not guarantee a return, winnings, or redemption. Purchased-balance redemption is subject to the 4× minimum and 10× maximum based on the actual amount paid. Bonus Play has a separate limited redemption rule: players must reach 100 SC from Bonus Play to redeem up to 25 SC, and remaining Bonus Play balances are voided after the successful 25 SC payment. These rules must never be described as a reason to spend more or chase a balance.",
    ],
  },
  {
    title: "04 Player Tools",
    body: [
      "Deposit or purchase limits by day, week, and month.",
      "Session-time reminders and cooling-off periods.",
      "Temporary account breaks.",
      "Promotional-message opt-out.",
      "Permanent or fixed-term self-exclusion.",
      "Access to transaction, purchase, play, and redemption history.",
    ],
  },
  {
    title: "05 Self-Exclusion",
    body: [
      "A user may request self-exclusion by contacting support@goldensweep.ai. GoldenSweep should promptly restrict access and direct marketing for the selected period, explain the treatment of any lawful remaining balance, and take reasonable steps to prevent re-registration. Early reinstatement should not be allowed during a fixed exclusion period except where required by law.",
    ],
  },
  {
    title: "06 Warning Signs",
    body: [
      "Spending more time or money than planned.",
      "Trying to win back losses or repeatedly purchasing to reach a redemption threshold.",
      "Borrowing money, hiding activity, missing obligations, or experiencing relationship conflict.",
      "Feeling anxious, angry, guilty, or unable to stop.",
      "Opening new accounts after limits or exclusion.",
    ],
  },
  {
    title: "07 Practical Safer-Play Steps",
    body: [
      "Set a firm entertainment budget before playing.",
      "Do not chase losses or purchase solely to unlock a displayed promotional balance.",
      "Take regular breaks and avoid play while upset, impaired, or under financial pressure.",
      "Review account history and use limits early.",
      "Seek confidential professional help if play is causing harm.",
    ],
  },
  {
    title: "08 Minors and Vulnerable Persons",
    body: [
      "Only eligible adults may use GoldenSweep. Adults must not share credentials or payment methods with minors. GoldenSweep may use age and identity verification, restrict accounts, and investigate suspected underage or vulnerable-person use.",
    ],
  },
  {
    title: "09 Marketing Standards",
    body: [
      "Marketing must not target minors or self-excluded users, imply guaranteed income, suggest play solves financial problems, encourage chasing losses, or create misleading urgency. Promotions must display material eligibility and redemption restrictions clearly and close to the offer.",
    ],
  },
  {
    title: "10 Staff and Intervention",
    body: [
      "Customer-support, fraud, payments, and marketing teams should receive responsible-play training. Where activity indicates possible harm, GoldenSweep may offer tools, suppress marketing, impose limits, request a wellbeing check, or restrict the account, consistent with privacy and applicable law.",
    ],
  },
  {
    title: "11 Help Resources",
    body: [
      "If play is causing harm, stop playing and seek help. U.S. users may contact the National Problem Gambling Helpline by calling or texting 1-800-MY-RESET (1-800-697-3738), or use the current resource listed by the National Council on Problem Gambling. In an immediate safety emergency, call 911 or 988 in the United States. GoldenSweep should verify all resource information immediately before publication.",
    ],
  },
  {
    title: "12 Complaints and Feedback",
    body: [
      "Responsible-play concerns and requests may be sent to support@goldensweep.ai. GoldenSweep should acknowledge urgent restriction requests promptly and document all actions taken.",
    ],
  },
  {
    title: "13 Contact Us",
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

export default function ResponsiblePlay() {
  useEffect(() => {
    document.title = "Responsible Play | GoldenSweep";
    setMetaDescription("Simple player protections, account controls, and support resources for safer entertainment.");
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
              Responsible Play
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
