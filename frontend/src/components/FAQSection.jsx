import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqGroups = [
  {
    title: "GOLDENSWEEP BASICS",
    items: [
      {
        question: "What is GoldenSweep?",
        answer: "GoldenSweep is a social casino and sweepstakes-style entertainment platform where eligible players can enjoy games, promotions, and support through their GoldenSweep account.",
      },
      {
        question: "How do I claim my 10% deposit bonus?",
        answer: "Complete your eligible payment and return to your GoldenSweep Wallet. If a bonus is available for your account, the bonus credit will be reflected after confirmation.",
      },
      {
        question: "Which platforms are currently available?",
        answer: "Available platforms may vary by account, provider availability, and operational status. Check your dashboard for the current list of supported game platforms.",
      },
      {
        question: "Are my personal details secure?",
        answer: "GoldenSweep uses account controls, verification steps, and support review processes designed to help protect user information and account access.",
      },
    ],
  },
  {
    title: "PAYMENT INFORMATION",
    items: [
      {
        question: "What happens after I complete a payment?",
        answer: "Return to your GoldenSweep Wallet. Only a completed payment can credit your wallet. The balance refreshes automatically, normally within about one minute after confirmation.",
      },
      {
        question: "What should I send if my payment does not show?",
        answer: "Send support your registered username, payment confirmation, amount, date, time, and any transaction reference so the team can review the wallet activity.",
      },
    ],
  },
  {
    title: "GAMES & TRANSFERS",
    items: [
      {
        question: "Why does Play Now say insufficient funds?",
        answer: "This usually means the selected game platform has not received enough balance yet, or the wallet transfer has not completed. Refresh your account and confirm your wallet balance before trying again.",
      },
      {
        question: "What if the game balance does not update?",
        answer: "Wait a short moment, refresh the game lobby, and check your GoldenSweep Wallet. If the balance still does not update, contact support with your username and game platform.",
      },
    ],
  },
  {
    title: "REDEMPTION QUESTIONS",
    items: [
      {
        question: "What is the minimum withdrawal amount?",
        answer: "Redemption eligibility depends on the posted Redemption Rules, account verification, balance source, and applicable limits shown for your account.",
      },
      {
        question: "How long does review take?",
        answer: "Review times can vary. Processing begins after required account, identity, payment, and eligibility checks are complete.",
      },
      {
        question: "Is KYC required?",
        answer: "Yes. Identity, age, location, account ownership, payment ownership, and eligibility checks may be required before redemption approval.",
      },
      {
        question: "Why can a request be declined?",
        answer: "A request may be declined if it does not meet posted rules, verification fails, account information is inaccurate, or account activity requires additional review.",
      },
      {
        question: "Is the payout automatic?",
        answer: "No. A request must be reviewed and approved before payment processing. Displayed balances or request buttons do not guarantee eligibility.",
      },
    ],
  },
  {
    title: "ACCOUNT & SAFETY",
    items: [
      {
        question: "Will support ask for my password?",
        answer: "No. GoldenSweep support will never ask for your password. Keep your login details private and contact support if you suspect unauthorized access.",
      },
      {
        question: "Where do I find my game username and password?",
        answer: "Game login details, when available, are shown in your account dashboard or provided through official GoldenSweep support channels.",
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function FAQItem({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const answerId = `${item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-answer`;

  return (
    <div className="overflow-hidden rounded-2xl border border-gold-200/25 bg-slate-950/60 transition duration-300 hover:border-gold-200/45">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={answerId}
        className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left text-base font-black leading-snug text-white transition hover:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-gold-200/70 sm:text-lg"
      >
        <span>{item.question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-cream transition ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div id={answerId} className="border-t border-gold-200/15 px-4 pb-5 pt-4 text-sm leading-7 text-gray-400 sm:text-base">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="w-full px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="faq-heading">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-7xl rounded-3xl border border-gold-200/25 bg-slate-950/70 p-5 shadow-luxury backdrop-blur-2xl sm:p-7 lg:p-10"
      >
        <header className="mb-8 grid gap-4 lg:grid-cols-[1fr_1.05fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-cream/80">Help Center</p>
            <h2 id="faq-heading" className="mt-3 font-heading text-3xl font-black leading-tight text-white md:text-4xl">
              Quick answers before you email
            </h2>
          </div>
          <p className="text-sm leading-7 text-gray-400 md:text-base lg:text-right">
            These are the most common questions customers have after payment, transfer, or login.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {faqGroups.map((group, groupIndex) => (
            <section key={group.title} aria-labelledby={`${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`} className="rounded-3xl border border-gold-200/25 bg-slate-950/45 p-4">
              <h3 id={`${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`} className="mb-4 text-sm font-black uppercase tracking-wide text-cream/90">
                {group.title}
              </h3>
              <div className="space-y-3">
                {group.items.map((item, itemIndex) => (
                  <FAQItem key={item.question} item={item} defaultOpen={groupIndex === 1 && itemIndex === 0} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
