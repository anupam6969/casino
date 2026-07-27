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
      "These Rules explain when balances may be submitted for redemption, the 4× minimum and 10× maximum, source restrictions, verification, review, denial, and processing.",
      "Website: goldensweep.ai",
      "Support: support@goldensweep.ai",
    ],
  },
  {
    title: "02 Redemption Is Conditional",
    body: [
      "Displaying a balance or enabling a request button does not guarantee eligibility or payment. Every request is subject to these Rules, the Sweepstakes Rules, verification, account review, legal availability, and final approval.",
    ],
  },
  {
    title: "03 Key Redemption Rule",
    body: [
      "After a qualifying purchase, a player must complete eligible play and reach a redeemable balance equal to at least 4× the actual amount paid for that purchase. The maximum amount eligible for redemption from that purchase cycle is 10× the actual amount paid. Bonus Play redemption is governed by the separate Bonus Play Limited Redemption rule. Purchased balances will not be affected by Bonus Play voiding rules.",
    ],
  },
  {
    title: "04 How the 4× Minimum Works",
    body: [
      "The eligible redeemable balance must equal at least four times the actual amount paid for the applicable qualifying purchase cycle. Example: actual payment of $50 → minimum eligible balance of 200 SC. Promotional credits and non-redeemable winnings do not count toward the eligible balance unless GoldenSweep’s approved ledger rules expressly reclassify them after a qualifying purchase.",
    ],
  },
  {
    title: "05 How the 10× Maximum Works",
    body: [
      "No more than ten times the actual amount paid may be redeemed from the applicable purchase cycle. Example: actual payment of $50 → maximum redemption of 500 SC from that cycle. A displayed balance above the maximum is not automatically eligible. GoldenSweep must define in the product and customer-facing disclosures whether excess remains playable, expires, or is removed; counsel must approve that treatment.",
    ],
  },
  {
    title: "06 Discounted Purchases",
    body: [
      "The actual checkout payment controls. Example: if a package is advertised as 100 SC but the player pays $75 after a discount, the minimum is 300 SC and the maximum is 750 SC. Bonus value and the undiscounted package label do not increase the calculation base.",
    ],
  },
  {
    title: "07 Bonus Play Limited Redemption",
    body: [
      "Players using free promotional rewards—including Daily Rewards, Spin the Wheel, first-time bonuses, tasks and other complimentary bonuses—must reach a promotional balance of at least 100 SC before requesting redemption.",
      "The maximum amount redeemable from Bonus Play is 25 SC per verified player and account. This limit applies regardless of the total promotional balance. For example, whether the player wins 100 SC, 200 SC or more from Bonus Play, only 25 SC may be redeemed.",
      "After the approved 25 SC redemption is successfully paid, all remaining Bonus Play balances and winnings will be voided. Purchased balances will not be affected.",
      "No purchase is required for this limited Bonus Play redemption. Identity, age, location, account ownership and eligibility verification are required.",
    ],
  },
  {
    title: "08 Request Requirements",
    body: [
      "Account in good standing with accurate information.",
      "Required identity, age, location, address, payment ownership, and tax verification completed.",
      "Eligible purchased balance within the applicable 4× minimum and 10× maximum range, or eligible Bonus Play balance meeting the 100 SC / up to 25 SC limited redemption rule.",
      "Redemption destination owned by and matching the verified account holder.",
      "No unresolved chargeback, fraud, duplicate-account, promotion-abuse, or restricted-location concern.",
    ],
  },
  {
    title: "09 Review and Processing",
    body: [
      "GoldenSweep may request additional records and place a reasonable hold while reviewing. Processing estimates are not guarantees and begin only after all requested verification is complete. Approved redemptions may be delivered through available payment methods, which may impose their own timing and limits. Any fee must be disclosed before the player confirms the request.",
    ],
  },
  {
    title: "10 Denial, Cancellation, and Appeal",
    body: [
      "A request may be denied or cancelled for failure to meet these Rules, prohibited conduct, inaccurate information, failed verification, payment reversal, restricted location, legal requirement, or confirmed ledger error. GoldenSweep should provide a concise reason where legally permitted. A player may appeal within 30 days by contacting support@goldensweep.ai with the request ID and supporting information. Appeals should receive a documented human review.",
    ],
  },
  {
    title: "11 Source-of-Funds and Ledger Priority",
    body: [
      "GoldenSweep’s ledger will trace purchased, promotional, wagered, won, adjusted, redeemed, expired, and voided amounts. The written allocation method must be deterministic, consistently applied, auditable, and disclosed if it materially affects eligibility. Manual adjustments may not be used to evade the published 4×/10× limits.",
    ],
  },
  {
    title: "12 Taxes and Finality",
    body: [
      "Users are responsible for applicable taxes. GoldenSweep may request tax forms and report payments when required. Approval is final only after funds are successfully issued; payment failures may be returned to the verified eligible balance after review.",
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

export default function RedemptionRules() {
  useEffect(() => {
    document.title = "Redemption Rules | GoldenSweep";
    setMetaDescription("How redemption eligibility, review, limits, and processing work on GoldenSweep.");
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
              Redemption Rules
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
