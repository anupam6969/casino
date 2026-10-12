import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Block helpers: p = paragraph, ul = bullet list, ol = numbered list, kv = bold label + text
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const ol = (...items) => ({ type: "ol", items });
const kv = (label, text) => ({ type: "kv", label, text });

const SITE = "https://www.goldensweep.ai";
const EMAIL = "support@goldensweep.com";

const meta = [
  ["Sponser", "Gameverse LLC"],
  ["Website", SITE],
  ["Effective Date", "October 12, 2026"],
  ["Version", "1.1"],
];

const intro = [
  `This Refund & Cancellation Policy explains how Gameverse LLC (“Gameverse,” “Golden Sweep,” “we,” “us,” or “our”) handles Gold Coin purchase cancellations, refund requests, failed or duplicate transactions, payment reversals, and chargebacks associated with ${SITE}.`,
];

const sections = [
  {
    title: "1. GOLD COIN PURCHASES",
    blocks: [
      p("Golden Sweep offers Gold Coins (“GC”) for entertainment gameplay."),
      p("GC:"),
      ul(
        "are virtual entertainment credits;",
        "have no cash value;",
        "are not legal tender;",
        "cannot be redeemed for cash or Prizes; and",
        "are separate from Sweepstakes Coins (“SC”) and Redeemable Credits (“RC”)."
      ),
      p("Where promotional SC are included with an eligible Gold Coin package, the purchase is for the applicable Gold Coin package. Promotional SC are provided as a promotional benefit and are not separately sold."),
    ],
  },
  {
    title: "2. GENERAL REFUND POLICY",
    blocks: [
      p("Except where required by applicable law or expressly approved by Golden Sweep, completed Gold Coin purchases are final and non-refundable."),
      p("Users should carefully review:"),
      ul("the purchase amount;", "Gold Coin package;", "payment method; and", "other transaction information"),
      p("before confirming a purchase."),
      p("Nothing in this Policy limits any refund or other consumer right that cannot lawfully be waived."),
    ],
  },
  {
    title: "3. CANCELLING A PURCHASE",
    blocks: [
      p("A User may attempt to cancel a purchase before the transaction has been completed. However, electronic transactions may be processed immediately."),
      p("Once a transaction has been authorized, completed, or the applicable GC have been credited, cancellation may no longer be possible."),
      p("If a User believes a purchase was made in error, the User should contact:"),
      p(EMAIL),
      p("as soon as reasonably possible."),
      p("A cancellation request does not guarantee cancellation."),
    ],
  },
  {
    title: "4. REFUND REQUESTS",
    blocks: [
      p("Although completed Gold Coin purchases are generally non-refundable, Golden Sweep may review a refund request where circumstances reasonably warrant review."),
      p("Examples may include:"),
      ul(
        "a duplicate charge;",
        "an incorrect transaction amount;",
        "a transaction charged but not properly credited;",
        "a technical processing error;",
        "unauthorized Account activity;",
        "a payment-processing error; or",
        "another circumstance requiring correction under applicable law."
      ),
      p("Each request will be reviewed based on the facts and available transaction records."),
    ],
  },
  {
    title: "5. HOW TO REQUEST A REFUND REVIEW",
    blocks: [
      p("To request review of a transaction, contact:"),
      p(EMAIL),
      p("The User should provide, where available:"),
      ul(
        "full name;",
        "registered email address;",
        "Golden Sweep username;",
        "transaction date;",
        "transaction amount;",
        "transaction identifier;",
        "payment method information sufficient to locate the transaction; and",
        "explanation of the issue."
      ),
      p("Golden Sweep may request additional information reasonably necessary to identify and investigate the transaction."),
      p("Users should not send full payment-card numbers, passwords, or other unnecessary sensitive credentials through ordinary Customer Support communications."),
    ],
  },
  {
    title: "6. REFUND REVIEW AND APPROVAL",
    blocks: [
      p("Refund requests are reviewed by Golden Sweep based on applicable Account, transaction, payment, security, and gameplay records."),
      p("Golden Sweep may also obtain relevant transaction status or processing information from its authorized payment-service providers."),
      p("A refund may be approved where:"),
      ul(
        "required by law;",
        "a duplicate or erroneous charge is confirmed;",
        "a payment-processing error is confirmed;",
        "unauthorized activity is substantiated;",
        "the applicable purchased benefit was not properly delivered; or",
        "another legitimate basis for refund is established."
      ),
      p("A request may be denied where records demonstrate that the transaction was validly authorized, completed, credited, and used, unless applicable law requires otherwise."),
    ],
  },
  {
    title: "7. REFUND DECISIONS",
    blocks: [
      p("Approval of a discretionary refund is determined by Gameverse LLC or its authorized personnel based on the applicable circumstances."),
      p("A payment processor or financial institution may assist in processing or implementing an approved refund, but use of a payment provider does not itself determine Golden Sweep's customer-facing refund policy."),
      p("Where a refund is approved, Golden Sweep may communicate the decision to the User through the registered email address, Account, Customer Support channel, or another reasonable method."),
    ],
  },
  {
    title: "8. REFUND PROCESSING TIME",
    blocks: [
      p("Golden Sweep will seek to review refund requests within a reasonable period after receiving sufficient information to investigate the request."),
      p("Once an approved refund has been submitted for processing, the time required for the funds to appear may depend on:"),
      ul(
        "the payment method;",
        "payment network;",
        "financial institution;",
        "weekends or holidays;",
        "verification requirements; and",
        "circumstances outside Golden Sweep's reasonable control."
      ),
      p("Golden Sweep does not guarantee a specific bank-posting date unless one is expressly provided for the applicable transaction."),
    ],
  },
  {
    title: "9. DUPLICATE TRANSACTIONS",
    blocks: [
      p("If a User believes they were charged more than once for the same intended purchase, the User should contact Customer Support."),
      p("Golden Sweep may review:"),
      ul(
        "transaction identifiers;",
        "timestamps;",
        "amounts;",
        "GC credits;",
        "payment records;",
        "Account activity; and",
        "related information."
      ),
      p("If a duplicate charge is confirmed, Golden Sweep may correct or refund the duplicate transaction as appropriate."),
    ],
  },
  {
    title: "10. FAILED OR DECLINED TRANSACTIONS",
    blocks: [
      p("A failed or declined transaction normally does not result in a completed Gold Coin purchase."),
      p("However, a financial institution may temporarily display a pending authorization even where a transaction was not successfully completed. Pending authorizations are generally controlled by the applicable payment provider or financial institution and may require time to expire or be released."),
      p("If a User is charged for a transaction that Golden Sweep records as unsuccessful, the User should contact Customer Support so the transaction can be investigated."),
    ],
  },
  {
    title: "11. PURCHASE CREDITING ERRORS",
    blocks: [
      p("If payment is successfully completed but the applicable Gold Coins are not properly credited, the User should contact Customer Support."),
      p("Golden Sweep may verify:"),
      ul(
        "payment status;",
        "transaction identifier;",
        "purchase amount;",
        "Account ownership;",
        "Account ledger; and",
        "related system records."
      ),
      p("If a legitimate crediting error is confirmed, Golden Sweep may correct the Account balance or otherwise resolve the transaction appropriately."),
    ],
  },
  {
    title: "12. EFFECT OF A REFUND ON GOLD COINS",
    blocks: [
      p("Where a Gold Coin purchase is refunded, reversed, canceled, or otherwise invalidated, Golden Sweep may remove the GC associated with that transaction from the User's Account."),
      p("If some or all of the applicable GC have already been used, Golden Sweep may reconcile the Account records to reflect the refund or reversal."),
      p("Golden Sweep will not knowingly allow both the refunded purchase amount and the corresponding purchased GC benefit to remain available where doing so would result in duplicate value."),
    ],
  },
  {
    title: "13. EFFECT OF A REFUND ON PROMOTIONAL SWEEPSTAKES COINS",
    blocks: [
      p("If promotional SC were provided in connection with a Gold Coin purchase that is later refunded, reversed, canceled, determined to be unauthorized, or otherwise invalidated, Golden Sweep may review the status of those promotional SC."),
      p("Unused promotional SC directly associated with the invalidated transaction may be removed where appropriate."),
      p("If the promotional SC have already been used, Golden Sweep may review the related gameplay and resulting Account activity to determine the appropriate correction."),
      p("Any adjustment must be reasonably connected to the affected transaction and supported by applicable Account records."),
    ],
  },
  {
    title: "14. EFFECT ON REDEEMABLE CREDITS",
    blocks: [
      p("If SC associated with a refunded, reversed, unauthorized, or invalid transaction were used in gameplay and resulted in RC, Golden Sweep may review whether the resulting RC remain eligible."),
      p("Golden Sweep may correct RC that are directly traceable to:"),
      ul(
        "an invalid transaction;",
        "unauthorized payment activity;",
        "a reversed purchase;",
        "a confirmed duplicate benefit;",
        "fraud; or",
        "another transaction that did not validly qualify for the associated promotional benefit."
      ),
      p("A refund or payment dispute will not automatically cause unrelated legitimate RC to be forfeited."),
      p("Any adjustment should be reasonably related to the affected transaction and supported by applicable Account and transaction records."),
    ],
  },
  {
    title: "15. EFFECT ON GAMEPLAY HISTORY",
    blocks: [
      p("Golden Sweep may preserve gameplay and transaction history associated with a refunded, reversed, or disputed transaction for:"),
      ul(
        "reconciliation;",
        "accounting;",
        "fraud prevention;",
        "security;",
        "compliance;",
        "dispute handling;",
        "tax purposes; and",
        "legal recordkeeping."
      ),
      p("A refund does not necessarily erase historical Account records. Where balances must be corrected, Golden Sweep may make corresponding ledger adjustments while preserving the underlying transaction history."),
    ],
  },
  {
    title: "16. EFFECT ON PENDING PRIZE REDEMPTIONS",
    blocks: [
      p("If a refund, reversal, or payment dispute materially affects SC or RC connected to a pending Prize-redemption request, Golden Sweep may temporarily place the affected redemption under review."),
      p("During review, Golden Sweep may determine whether the redemption:"),
      ul(
        "remains fully eligible;",
        "should be adjusted;",
        "should proceed in part;",
        "requires additional verification; or",
        "is directly attributable to invalid or reversed activity."
      ),
      p("A refund or reversal will not automatically invalidate an unrelated legitimate Prize redemption."),
      p("Golden Sweep may continue processing the portion of a redemption that remains independently eligible where reasonably practicable."),
    ],
  },
  {
    title: "17. CHARGEBACKS AND PAYMENT DISPUTES",
    blocks: [
      p("A chargeback occurs when a User disputes a transaction through a bank, card issuer, payment provider, or other financial institution."),
      p("Users who believe a Golden Sweep transaction is incorrect are encouraged to contact Customer Support promptly so that the issue may be investigated."),
      p("Nothing in this Policy prevents a User from exercising lawful rights available through their financial institution."),
    ],
  },
  {
    title: "18. EFFECT OF A CHARGEBACK",
    blocks: [
      p("When Golden Sweep receives notice of a chargeback or payment dispute, it may:"),
      ul(
        "review the affected transaction;",
        "review associated GC;",
        "review promotional SC;",
        "review RC resulting from affected activity;",
        "review related gameplay;",
        "temporarily restrict affected transaction functionality;",
        "temporarily hold a directly affected pending redemption while the dispute is investigated;",
        "provide transaction evidence through the applicable payment-dispute process; and",
        "correct Account balances where appropriate."
      ),
      p("Golden Sweep will seek to distinguish legitimate payment disputes from fraudulent or abusive chargeback activity."),
    ],
  },
  {
    title: "19. CHARGEBACK ABUSE",
    blocks: [
      p("Golden Sweep may take appropriate action where evidence establishes intentional chargeback abuse, including circumstances where a User:"),
      ul(
        "knowingly disputes a legitimate authorized purchase after receiving and using the associated benefit;",
        "repeatedly submits false payment disputes;",
        "uses chargebacks to obtain duplicate value;",
        "coordinates fraudulent payment activity; or",
        "otherwise engages in intentional payment fraud."
      ),
      p("Action may include Account restrictions, removal of improperly obtained benefits, suspension, closure, or other measures permitted by applicable law."),
      p("A good-faith payment dispute will not, by itself, be treated as fraud."),
    ],
  },
  {
    title: "20. UNAUTHORIZED TRANSACTIONS",
    blocks: [
      p("A User who believes their Golden Sweep Account or payment method was used without authorization should contact:"),
      p(EMAIL),
      p("as soon as reasonably possible."),
      p("Golden Sweep may temporarily restrict the Account while investigating."),
      p("The User may be asked to:"),
      ul(
        "verify identity;",
        "secure the Account;",
        "reset credentials;",
        "identify disputed transactions; and",
        "provide information reasonably necessary to investigate the activity."
      ),
      p("Users should also contact their applicable financial institution where appropriate."),
    ],
  },
  {
    title: "21. ACCOUNT SECURITY",
    blocks: [
      p("Users are responsible for taking reasonable steps to protect their Account credentials."),
      p("Users should:"),
      ul(
        "use a strong and unique password;",
        "keep login credentials confidential;",
        "not permit unauthorized persons to access the Account;",
        "secure devices used to access Golden Sweep;",
        "review transaction activity; and",
        "promptly report suspected unauthorized access."
      ),
    ],
  },
  {
    title: "22. TECHNICAL AND ACCOUNTING CORRECTIONS",
    blocks: [
      p("Golden Sweep may correct genuine:"),
      ul(
        "payment errors;",
        "duplicate credits;",
        "technical errors;",
        "accounting errors;",
        "balance-display errors; and",
        "transaction-reconciliation errors."
      ),
      p("Corrections should be supported by applicable system, Account, or transaction records."),
      p("This provision will not be used merely to reverse a legitimate transaction or eligible Prize because the result is unfavorable to Golden Sweep."),
    ],
  },
  {
    title: "23. ACCOUNT RESTRICTIONS DURING REVIEW",
    blocks: [
      p("Where reasonably necessary to investigate a payment issue, Golden Sweep may temporarily restrict certain Account functions."),
      p("Depending on the circumstances, restrictions may affect:"),
      ul(
        "additional purchases;",
        "gameplay involving disputed credits;",
        "transfers or adjustments;",
        "affected Prize redemptions; or",
        "other transaction functionality reasonably related to the investigation."
      ),
      p("Restrictions should be proportionate to the issue being investigated."),
      p("Unrelated eligible balances should not be automatically confiscated merely because a transaction review is pending."),
    ],
  },
  {
    title: "24. CUSTOMER NOTIFICATION",
    blocks: [
      p("Where reasonably appropriate, Golden Sweep may notify the User concerning:"),
      ul(
        "receipt of a refund request;",
        "requests for additional information;",
        "refund approval or denial;",
        "transaction correction;",
        "failed payment;",
        "returned payment;",
        "chargeback review;",
        "Account restrictions related to a payment dispute; or",
        "completion of an investigation."
      ),
      p("Communications may be delivered to the registered email address, through the Account, through Customer Support, or another reasonable communication method."),
    ],
  },
  {
    title: "25. NO DUPLICATE VALUE",
    blocks: [
      p("A User is not entitled to retain duplicate value resulting from the same transaction."),
      p("For example, where a purchase is fully refunded, the User generally may not retain both:"),
      ol(
        "the refunded purchase amount; and",
        "the corresponding purchased GC or directly associated promotional benefit."
      ),
      p("Any Account adjustment should be reasonably connected to the refunded or invalidated transaction."),
    ],
  },
  {
    title: "26. PROMOTIONAL BENEFITS",
    blocks: [
      p("Promotional benefits may be subject to additional disclosed terms."),
      p("Where a promotional benefit was conditioned on a transaction that is subsequently invalidated, the associated promotional benefit may be reviewed and corrected as appropriate."),
      p("A legitimate free promotional benefit that was not dependent on the affected purchase should not automatically be removed merely because another transaction was refunded."),
    ],
  },
  {
    title: "27. LEGALLY REQUIRED REFUNDS",
    blocks: [
      p("Nothing in this Policy is intended to exclude, restrict, or waive a refund, cancellation, dispute, or other consumer right that cannot lawfully be excluded or waived."),
      p("Where applicable law requires a different result from this Policy, applicable law controls."),
    ],
  },
  {
    title: "28. RECORDKEEPING",
    blocks: [
      p("Gameverse LLC may maintain records concerning:"),
      ul(
        "purchases;",
        "refund requests;",
        "refund decisions;",
        "transaction corrections;",
        "failed transactions;",
        "duplicate transactions;",
        "chargebacks;",
        "reversals;",
        "Account adjustments;",
        "GC, SC, and RC adjustments;",
        "affected gameplay;",
        "pending redemptions;",
        "fraud investigations; and",
        "related Customer Support communications."
      ),
      p("Authorized payment providers may separately maintain transaction and payment records according to their respective responsibilities and retention requirements."),
    ],
  },
  {
    title: "29. CHANGES TO THIS POLICY",
    blocks: [
      p("Golden Sweep may update this Refund & Cancellation Policy to reflect changes in:"),
      ul(
        "payment processes;",
        "Platform functionality;",
        "applicable law;",
        "payment-provider requirements;",
        "fraud-prevention practices;",
        "compliance procedures; or",
        "operational requirements."
      ),
      p("The current Effective Date and Version will be displayed with this Policy."),
      p("Material changes will be communicated where reasonably appropriate or legally required."),
    ],
  },
  {
    title: "30. CONTACT US",
    blocks: [
      p("For refund, payment, duplicate transaction, unauthorized transaction, or chargeback questions, contact:"),
      p("Golden Sweep Customer Support"),
      kv("Email:", EMAIL),
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
    case "ol":
      return (
        <ol key={index} className="list-decimal space-y-1.5 pl-6 marker:font-semibold marker:text-gold-200">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "kv":
      return (
        <p key={index}>
          <strong className="font-semibold text-white">{block.label}</strong> {block.text}
        </p>
      );
    default:
      return (
        <p key={index} className="whitespace-pre-line break-words">
          {block.text}
        </p>
      );
  }
}

export default function RefundPolicy() {
  useEffect(() => {
    document.title = "Refund & Cancellation Policy | Golden Sweep";
    setMetaDescription(
      "Read the Golden Sweep Refund & Cancellation Policy, including Gold Coin purchases, refund requests, duplicate or failed transactions, and chargebacks."
    );
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
              Refund & Cancellation Policy
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

          <div className="mb-10 space-y-3 text-sm leading-7 text-cream/72 sm:text-base">
            {intro.map((paragraph) => (
              <p key={paragraph} className="break-words">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-9">
            {sections.map((section) => (
              <motion.section
                key={section.title}
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
            ))}
          </div>

          <footer className="mt-12 border-t border-gold-200/20 pt-6 text-center text-xs text-cream/60 sm:text-sm">
            <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Golden Sweep — Refund & Cancellation Policy</p>
            <p className="mt-1">Effective Date: October 12, 2026 · Version 1.1</p>
            <p className="mt-1">© 2026 Gameverse LLC / Golden Sweep. All rights reserved.</p>
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
      <Footer />
    </main>
  );
}