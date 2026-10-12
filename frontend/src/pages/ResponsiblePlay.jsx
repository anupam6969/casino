import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Block helpers: p = paragraph, h = sub-heading, ul = bullets, kv = bold label + text
const p = (text) => ({ type: "p", text });
const h = (text) => ({ type: "h", text });
const ul = (...items) => ({ type: "ul", items });
const kv = (label, text) => ({ type: "kv", label, text });

const EMAIL = "support@goldensweep.com";
const PHONE = "+1 (972) 535-9119";
const ADDRESS = "Gameverse LLC\n16192 Coastal Highway\nLewes, DE 19958\nUnited States";

const meta = [
  ["Sponser", "Gameverse LLC"],
  ["Website", "https://www.goldensweep.ai"],
  ["Effective Date", "October 12, 2026"],
  ["Version", "1.1"],
  ["Customer Support", EMAIL],
  ["Phone", PHONE],
];

const intro = [
  "www.goldensweep.ai is intended to provide entertainment for eligible adults.",
  "Gameverse LLC (“Golden Sweep,” “we,” “us,” or “our”) encourages Users to participate responsibly and provides tools designed to help Users manage their spending, gameplay, and access to the Platform. Responsible Gaming tools are intended to help Users maintain control over their participation.",
  "Users who believe their gaming activity is becoming difficult to control are encouraged to use these tools promptly.",
];

const sections = [
  {
    title: "1. PLAY RESPONSIBLY",
    blocks: [
      p("Gaming should be treated as entertainment and not as a source of income or a solution to financial problems."),
      p("Golden Sweep encourages Users to:"),
      ul(
        "Establish a budget before playing.",
        "Spend only money they can afford to spend.",
        "Avoid using money needed for rent, food, utilities, medical expenses, debt payments, or other essential expenses.",
        "Never borrow money for gameplay.",
        "Establish reasonable time limits.",
        "Take regular breaks.",
        "Avoid chasing losses.",
        "Avoid playing while emotionally distressed, impaired, or under significant financial pressure.",
        "Understand that outcomes are uncertain.",
        "Regularly evaluate whether gaming remains enjoyable and under control."
      ),
      p("Spending more does not guarantee winning."),
    ],
  },
  {
    title: "2. PURCHASE LIMITS",
    blocks: [
      p("Eligible Users may request a responsible-gaming purchase limit designed to control the amount they can spend on eligible Gold Coin purchases."),
      p("Purchase limits may be established on a:"),
      ul("Daily basis.", "Weekly basis.", "Monthly basis.", "Another interval made available by Golden Sweep."),
      p(`Users may request a purchase limit by contacting ${EMAIL}. Where Account-based responsible-gaming controls are available, Users may also be able to establish limits directly through their Account.`),
      h("2.1 Decreasing a Purchase Limit"),
      p("A request to decrease an existing purchase limit will take effect as soon as reasonably practicable after the request is processed."),
      p("Golden Sweep will not intentionally delay a requested decrease for the purpose of allowing additional purchases."),
      h("2.2 Increasing or Removing a Purchase Limit"),
      p("A request to increase or remove a responsible-gaming purchase limit will not take effect immediately."),
      p("A minimum 24-hour cooling period will apply before the requested increase or removal may become effective. During that period, the existing lower limit remains applicable."),
      p("Golden Sweep may decline or delay an increase where reasonably appropriate for responsible-gaming, security, compliance, or Account-safety reasons."),
      h("2.3 Circumvention"),
      p("Users may not attempt to circumvent a purchase limit by:"),
      ul(
        "Creating another Account.",
        "Using another person's Account.",
        "Changing payment methods.",
        "Using another person's payment method.",
        "Manipulating Account information.",
        "Using any other method intended to bypass the restriction."
      ),
    ],
  },
  {
    title: "3. MANAGING GAMING TIME",
    blocks: [
      p("Users should consider the amount of time spent gaming in addition to the amount spent on purchases."),
      p("We encourage Users to:"),
      ul(
        "Decide how long they intend to play before beginning.",
        "Take regular breaks.",
        "Avoid extended gaming sessions.",
        "Avoid allowing gaming to interfere with work, education, sleep, family, or other responsibilities.",
        "Stop playing when gaming is no longer enjoyable."
      ),
      p("Users who want a stronger temporary restriction may request a Cooling-Off Period."),
    ],
  },
  {
    title: "4. COOLING-OFF PERIOD",
    blocks: [
      p("A User may request a temporary Cooling-Off Period when they want a break from Golden Sweep."),
      p("Available Cooling-Off Periods are:"),
      ul("24 hours.", "7 days.", "30 days.", "90 days."),
      p(`Requests may be submitted through ${EMAIL}.`),
      p("Golden Sweep may perform reasonable identity verification before applying a restriction where necessary to ensure the request is being made by the Account holder."),
    ],
  },
  {
    title: "5. WHEN A COOLING-OFF PERIOD TAKES EFFECT",
    blocks: [
      p("A Cooling-Off request will take effect as soon as reasonably practicable after the request is received, verified where necessary, and processed."),
      p("Once effective, the selected Cooling-Off Period cannot be shortened or canceled by the User."),
      p("During the Cooling-Off Period, the User will be restricted from:"),
      ul(
        "Making Gold Coin purchases.",
        "Initiating GC gameplay.",
        "Initiating SC Sweepstakes gameplay.",
        "Actively participating in new promotions through the restricted Account.",
        "Otherwise using gaming functionality that is subject to the restriction."
      ),
      p("Golden Sweep may maintain access to limited Account functionality where reasonably necessary for security, Customer Support, verification, tax matters, or the administration of an eligible existing balance or pending Prize redemption."),
    ],
  },
  {
    title: "6. COOLING-OFF BALANCES AND PENDING REDEMPTIONS",
    blocks: [
      p("Starting a Cooling-Off Period does not automatically forfeit legitimate existing GC, SC, or eligible RC balances."),
      p("Applicable balances will remain recorded on the Account, subject to ordinary eligibility, verification, expiration terms where lawfully applicable, and correction of fraud or genuine Account errors."),
      p("An eligible Prize-redemption request submitted before a Cooling-Off Period became effective may continue through ordinary verification, compliance review, approval, and payment processing."),
      p("A User should not be required to resume gameplay merely to receive an eligible Prize that had already satisfied applicable redemption requirements."),
      p("A Cooling-Off Period does not prevent Golden Sweep from investigating fraud, correcting invalid credits, satisfying legal obligations, or conducting required compliance reviews."),
    ],
  },
  {
    title: "7. END OF A COOLING-OFF PERIOD",
    blocks: [
      p("When the selected Cooling-Off Period expires, Account gaming functionality may be restored automatically, provided that:"),
      ul(
        "The Account remains eligible.",
        "No separate self-exclusion applies.",
        "No legal, security, compliance, or Account restriction prevents access.",
        "The User remains located in an eligible jurisdiction."
      ),
      p("If the User believes a longer break is necessary, the User may request another Cooling-Off Period or Self-Exclusion."),
    ],
  },
  {
    title: "8. SELF-EXCLUSION",
    blocks: [
      p("Self-Exclusion is intended for Users who want a stronger and longer restriction from gaming activity."),
      p("Golden Sweep offers the following Self-Exclusion periods:"),
      ul("6 months.", "1 year.", "3 years.", "5 years.", "Permanent."),
      p(`A User may request Self-Exclusion by contacting ${EMAIL}.`),
      p("The User should state the requested Self-Exclusion duration."),
      p("Golden Sweep may conduct reasonable identity verification before implementing the request to protect against unauthorized Account changes."),
    ],
  },
  {
    title: "9. WHEN SELF-EXCLUSION TAKES EFFECT",
    blocks: [
      p("A Self-Exclusion request will be implemented as soon as reasonably practicable after the request is received, verified where necessary, and processed."),
      p("Once Self-Exclusion becomes effective, the User may not cancel or shorten the selected exclusion period."),
      p("During Self-Exclusion, Golden Sweep will restrict the User from:"),
      ul(
        "Purchasing Gold Coins.",
        "GC gameplay.",
        "SC Sweepstakes gameplay.",
        "Participating in new gaming promotions through the excluded Account.",
        "Opening or using another Account to circumvent the exclusion."
      ),
      p("The Account may remain administratively accessible or restricted as necessary to handle balances, pending redemptions, verification, tax matters, security matters, Customer Support, or legal requirements."),
    ],
  },
  {
    title: "10. MARKETING DURING SELF-EXCLUSION",
    blocks: [
      p("After a Self-Exclusion becomes effective, Golden Sweep will take reasonable steps to suppress the excluded User from promotional email and SMS/text marketing associated with the excluded Account."),
      p("Operational communications may still be sent where reasonably necessary, including communications concerning:"),
      ul(
        "Account security.",
        "Identity verification.",
        "Pending Prize redemption.",
        "Tax matters.",
        "Self-Exclusion administration.",
        "Account balances.",
        "Legal notices.",
        "Customer Support."
      ),
      p("Because marketing systems may require processing time, a User may receive communications already in transit shortly after Self-Exclusion begins."),
      p("Golden Sweep will take reasonable steps to prevent new promotional communications from being intentionally directed to an excluded User during the exclusion period."),
    ],
  },
  {
    title: "11. LINKED AND DUPLICATE ACCOUNTS",
    blocks: [
      p("Self-Exclusion applies to the person requesting exclusion, not merely to a particular username or email address."),
      p("Golden Sweep may therefore use reasonably available Account information to identify other Accounts that appear to belong to or be controlled by the same excluded User."),
      p("Where such an Account is reasonably identified, Golden Sweep may restrict or close the linked Account to prevent circumvention."),
      p("An excluded User may not:"),
      ul(
        "Create another Account.",
        "Use a different email address to create another Account.",
        "Use another person's Account.",
        "Provide materially different identifying information.",
        "Use another device or payment method.",
        "Otherwise attempt to circumvent Self-Exclusion."
      ),
      p("Golden Sweep will not automatically treat an Account belonging to another legitimate household member as the excluded User's Account solely because the Users share an address or device."),
      p("Additional information may be reviewed where necessary to determine Account ownership."),
    ],
  },
  {
    title: "12. SELF-EXCLUSION BALANCES",
    blocks: [
      p("Self-Exclusion does not automatically cause legitimate existing balances to be forfeited."),
      p("Golden Sweep may restrict gameplay access while preserving applicable Account records."),
      p("Eligible balances will be handled according to their applicable status and ordinary verification requirements."),
      p("Self-Exclusion does not prevent Golden Sweep from:"),
      ul(
        "Completing required verification.",
        "Investigating suspected fraud.",
        "Correcting genuine Account or transaction errors.",
        "Reconciling invalid or reversed transactions.",
        "Satisfying tax requirements.",
        "Complying with law.",
        "Taking action concerning balances that were obtained through prohibited conduct."
      ),
      p("Self-Exclusion itself will not be used as the sole basis for confiscating an otherwise legitimate eligible balance."),
    ],
  },
  {
    title: "13. PENDING REDEMPTIONS DURING SELF-EXCLUSION",
    blocks: [
      p("An eligible Prize-redemption request submitted before Self-Exclusion becomes effective may continue through normal:"),
      ul(
        "Identity verification.",
        "Eligibility verification.",
        "Compliance review.",
        "Payment review.",
        "Approval.",
        "Prize-delivery processing."
      ),
      p("Where a User has eligible RC that already satisfy applicable redemption requirements but has not yet submitted a redemption request, Golden Sweep Customer Support may provide an appropriate process for resolving the eligible balance without requiring the User to resume gameplay."),
      p("Self-Exclusion does not guarantee approval of an otherwise ineligible redemption request."),
    ],
  },
  {
    title: "14. REACTIVATION AFTER FIXED-TERM SELF-EXCLUSION",
    blocks: [
      p("A fixed-term Self-Exclusion does not automatically reactivate the User's gaming access when the selected period expires."),
      p(`After the entire selected period has expired, the User must contact ${EMAIL} and expressly request reactivation.`),
      p("Golden Sweep may:"),
      ul(
        "Verify the User's identity.",
        "Confirm that the exclusion period has fully expired.",
        "Conduct applicable eligibility checks.",
        "Confirm geographic eligibility.",
        "Conduct a reasonable responsible-gaming review before restoring access."
      ),
      p("Golden Sweep may decline or delay reactivation where reasonably necessary for User safety, legal requirements, compliance, security, or other legitimate responsible-gaming reasons."),
      p("No request for early reactivation will be accepted during an active fixed-term Self-Exclusion."),
    ],
  },
  {
    title: "15. PERMANENT SELF-EXCLUSION",
    blocks: [
      p("A User selecting Permanent Self-Exclusion is requesting an indefinite and permanent restriction from Golden Sweep gaming activity."),
      p("Permanent Self-Exclusion does not automatically expire and is not eligible for ordinary Account reactivation."),
      p("Golden Sweep may maintain information reasonably necessary to recognize and enforce the permanent exclusion, prevent circumvention, administer legitimate balances or payments, satisfy legal obligations, and maintain appropriate responsible-gaming records."),
    ],
  },
  {
    title: "16. PERMANENT ACCOUNT CLOSURE",
    blocks: [
      p(`A User may separately request permanent Account closure by contacting ${EMAIL}.`),
      p("Where the closure request is being made because of problematic gaming or an inability to control participation, the User should tell Customer Support so that Golden Sweep can apply appropriate responsible-gaming restrictions rather than treating the request solely as an ordinary Account closure."),
      p("Reasonable identity verification may be required."),
      p("Permanent Account closure does not automatically eliminate legitimate outstanding balances, pending Prize matters, compliance investigations, payment obligations, tax obligations, or other matters that must be resolved."),
    ],
  },
  {
    title: "17. RESPONSIBLE GAMING OPTIONS THROUGH CUSTOMER SUPPORT",
    blocks: [
      p("Customer Support may assist Users with:"),
      ul(
        "Purchase limits.",
        "Reducing existing purchase limits.",
        "Cooling-Off Periods.",
        "Self-Exclusion.",
        "Permanent Self-Exclusion.",
        "Permanent Account closure.",
        "Concerns about gaming time.",
        "Concerns about spending.",
        "Questions regarding active restrictions.",
        "Other responsible-gaming concerns."
      ),
      p("Some responsible-gaming options may require Customer Support assistance rather than being available as automated Account controls."),
      kv("Contact:", EMAIL),
    ],
  },
  {
    title: "18. RECOGNIZING PROBLEMATIC GAMING BEHAVIOR",
    blocks: [
      p("A User should consider reducing or stopping gaming if they:"),
      ul(
        "Regularly spend more than intended.",
        "Repeatedly attempt to recover previous losses.",
        "Borrow money to continue playing.",
        "Use money intended for essential expenses.",
        "Hide gaming activity or spending from family or others.",
        "Experience stress, anxiety, anger, or distress related to gaming.",
        "Find it difficult to stop.",
        "Neglect work, school, sleep, relationships, or other responsibilities.",
        "Repeatedly increase spending beyond planned limits.",
        "View gaming as a dependable way to earn money."
      ),
      p("Users experiencing these behaviors should consider using available limits, Cooling-Off, or Self-Exclusion."),
    ],
  },
  {
    title: "19. PROTECTING MINORS",
    blocks: [
      p("Golden Sweep is intended only for persons who satisfy applicable age requirements."),
      p("Parents and guardians should take reasonable precautions to prevent minors from accessing their Accounts or payment methods."),
      p("Recommended precautions include:"),
      ul(
        "Keeping Account credentials confidential.",
        "Enabling device passwords or biometric security.",
        "Not leaving an authenticated Account unattended.",
        "Securing payment methods.",
        "Using available parental-control technology.",
        "Educating minors about age-restricted online activities."
      ),
      p("Users should immediately contact Customer Support if they believe a minor has accessed their Account."),
    ],
  },
  {
    title: "20. ACCOUNT SECURITY AND RESPONSIBLE-GAMING RESTRICTIONS",
    blocks: [
      p("Responsible-gaming restrictions are personal to the User."),
      p("A User may not circumvent a restriction by:"),
      ul(
        "Opening another Account.",
        "Using another person's Account.",
        "Using different identity information.",
        "Changing payment methods.",
        "Changing devices.",
        "Using another email address.",
        "Otherwise attempting to bypass the restriction."
      ),
      p("Attempts to circumvent a responsible-gaming restriction may result in additional Account restrictions."),
    ],
  },
  {
    title: "21. RESPONSIBLE MARKETING",
    blocks: [
      p("Golden Sweep seeks to market its Services responsibly."),
      p("Golden Sweep does not intend its marketing to:"),
      ul(
        "Target minors.",
        "Represent gaming as guaranteed income.",
        "Suggest that gaming solves financial problems.",
        "Guarantee a Prize.",
        "Imply that increased spending guarantees winning.",
        "Encourage Users to chase losses.",
        "Intentionally target a User known to be actively self-excluded."
      ),
      p("Promotional marketing preferences and responsible-gaming suppression may be maintained through applicable communication systems."),
    ],
  },
  {
    title: "22. SEEKING INDEPENDENT HELP",
    blocks: [
      p("Responsible-gaming tools provided by Golden Sweep are not a substitute for professional medical, psychological, financial, or counseling assistance."),
      p("Users who believe gaming is causing significant personal, financial, emotional, or family problems should consider seeking assistance from an appropriate independent professional or responsible-gaming support organization."),
      p("If a User believes they are in immediate danger or experiencing a mental-health emergency, they should contact appropriate emergency or crisis services."),
    ],
  },
  {
    title: "23. BALANCE AND REDEMPTION PRINCIPLES",
    blocks: [
      p("To avoid uncertainty when a responsible-gaming restriction is applied, the following principles apply:"),
      kv("Gold Coins (GC):", "Existing legitimate GC may remain recorded but cannot be used for gameplay while the applicable restriction blocks gaming."),
      kv("Sweepstakes Coins (SC):", "Existing legitimate SC may remain recorded but cannot be used for Sweepstakes gameplay while the applicable restriction blocks gaming."),
      kv("Redeemable Credits (RC):", "Eligible RC remain separately recorded and may be handled through an appropriate redemption or Account-resolution process, subject to ordinary verification and eligibility requirements."),
      p("A User will not be required to violate or terminate an active responsible-gaming restriction merely to address an eligible RC balance."),
    ],
  },
  {
    title: "24. ADMINISTRATION OF RESPONSIBLE-GAMING REQUESTS",
    blocks: [
      p("Golden Sweep may maintain reasonable records concerning:"),
      ul(
        "Purchase-limit requests.",
        "Cooling-Off requests.",
        "Self-Exclusion requests.",
        "Selected duration.",
        "Effective date.",
        "Expiration date where applicable.",
        "Reactivation requests.",
        "Marketing suppression.",
        "Linked-Account reviews.",
        "Account restrictions.",
        "Balance handling.",
        "Related Customer Support communications."
      ),
      p("Such records may be used to administer and enforce responsible-gaming restrictions and to satisfy applicable legal or compliance requirements."),
    ],
  },
  {
    title: "25. POLICY UPDATES",
    blocks: [
      p("Golden Sweep may update this Responsible Gaming Policy to reflect changes in:"),
      ul(
        "Available responsible-gaming tools.",
        "Platform functionality.",
        "Operational procedures.",
        "Legal or regulatory requirements.",
        "Responsible-gaming practices.",
        "Other relevant circumstances."
      ),
      p("Material changes will be communicated or published where appropriate."),
      p("The current Effective Date and Version will be displayed on this policy."),
    ],
  },
  {
    title: "26. CONTACT US",
    blocks: [
      p("For responsible-gaming assistance, including a purchase limit, Cooling-Off Period, Self-Exclusion, or permanent Account closure, contact:"),
      p("Golden Sweep Customer Support"),
      kv("Email:", EMAIL),
      kv("Phone:", PHONE),
      h("Written Correspondence"),
      p(`Gameverse LLC / www.goldensweep.ai\n16192 Coastal Highway\nLewes, DE 19958\nUnited States`),
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
    case "h":
      return (
        <h3 key={index} className="pt-3 font-heading text-base font-bold text-white sm:text-lg">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul key={index} className="list-disc space-y-1.5 pl-6 marker:text-gold-200">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
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

export default function ResponsiblePlay() {
  useEffect(() => {
    document.title = "Responsible Gaming Policy | Golden Sweep";
    setMetaDescription(
      "Read the Golden Sweep Responsible Gaming Policy, including purchase limits, Cooling-Off periods, Self-Exclusion, account closure, and how to get support."
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
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-200">Golden Sweep</p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-2 font-heading text-4xl font-black text-white md:text-5xl">
              Responsible Gaming Policy
            </motion.h1>
            <dl className="mt-5 space-y-1 text-sm text-cream/72">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt className="inline font-semibold uppercase tracking-[0.14em] text-gold-200">{label}: </dt>
                  <dd className="inline">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 text-sm leading-7 text-cream/72">
              <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Business Address</p>
              <p className="whitespace-pre-line">{ADDRESS}</p>
            </div>
          </header>

          <div className="mb-10 space-y-3 text-sm leading-7 text-cream/72 sm:text-base">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
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

          <div className="mt-12 rounded-2xl border border-gold-200/40 bg-gold-200/10 px-5 py-6 text-center">
            <h2 className="font-heading text-xl font-bold uppercase text-gold-200">Need to set a limit or take a break?</h2>
            <p className="mt-3 text-sm text-cream/80 sm:text-base">
              Contact:{" "}
              <a href={`mailto:${EMAIL}`} className="font-semibold text-white underline underline-offset-4">
                {EMAIL}
              </a>
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold-200">Available options include</p>
            <ul className="mx-auto mt-2 inline-block list-disc space-y-1 pl-5 text-left text-sm text-cream/85 marker:text-gold-200 sm:text-base">
              <li>Purchase Limits</li>
              <li>24-Hour / 7-Day / 30-Day / 90-Day Cooling-Off</li>
              <li>6-Month / 1-Year / 3-Year / 5-Year Self-Exclusion</li>
              <li>Permanent Self-Exclusion</li>
              <li>Account Closure</li>
            </ul>
          </div>

          <footer className="mt-12 border-t border-gold-200/20 pt-6 text-center text-xs text-cream/60 sm:text-sm">
            <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Golden Sweep Responsible Gaming Policy</p>
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