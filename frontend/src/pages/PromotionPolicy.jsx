import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Block helpers: p = paragraph, ul = bullet list, ol = numbered list, kv = bold label + text, table = simple table
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const ol = (...items) => ({ type: "ol", items });
const kv = (label, text) => ({ type: "kv", label, text });
const table = (headers, rows) => ({ type: "table", headers, rows });

const SITE = "https://www.goldensweep.ai";
const EMAIL = "support@goldensweep.com";
const ADDRESS = "Gameverse LLC / Golden Sweep\n16192 Coastal Highway\nLewes, Delaware 19958\nUnited States";

const meta = [
  ["Sponsor", "Gameverse LLC"],
  ["Website", SITE],
  ["Effective Date", "October 12, 2026"],
  ["Version", "1.1"],
];

const intro = [
  `These General Promotion Rules (“General Promotion Rules”) apply to promotions offered by Gameverse LLC through ${SITE} unless a particular promotion expressly provides additional or different promotion-specific terms.`,
  "Promotions may include bonuses, promotional Gold Coins, promotional Sweepstakes Coins, special events, social promotions, loyalty or Player Tier benefits, limited-time offers, and other promotional opportunities made available by Golden Sweep.",
  "Each promotion is subject to eligibility requirements, applicable law, these General Promotion Rules, and any additional terms displayed for the particular promotion.",
];

const sections = [
  {
    title: "1. SPONSOR",
    blocks: [
      p("Promotions are sponsored or offered by:"),
      p(ADDRESS),
      kv("Customer Support:", EMAIL),
    ],
  },
  {
    title: "2. PROMOTION-SPECIFIC TERMS",
    blocks: [
      p("Each promotion may include specific terms describing matters such as:"),
      ul(
        "promotion name;",
        "start and end dates;",
        "eligibility;",
        "geographic availability;",
        "promotional award;",
        "Gold Coin (“GC”) amount;",
        "Sweepstakes Coin (“SC”) amount, where applicable;",
        "participation method;",
        "free participation method where applicable;",
        "usage or playthrough requirements;",
        "redemption-related conditions;",
        "promotional limits; and",
        "other material conditions."
      ),
      p("Promotion-specific terms supplement these General Promotion Rules. Material conditions should be disclosed clearly before or at the time a User participates in the promotion."),
    ],
  },
  {
    title: "3. ELIGIBILITY",
    blocks: [
      p("Unless promotion-specific terms impose additional lawful requirements, a participant must:"),
      ol(
        "satisfy applicable age requirements;",
        "maintain an eligible Golden Sweep Account;",
        "provide accurate Account information;",
        "be physically located in an eligible jurisdiction;",
        "satisfy applicable identity and geographic verification;",
        "not be prohibited from participating under applicable law;",
        "satisfy the specific eligibility requirements of the promotion; and",
        "comply with applicable Golden Sweep rules."
      ),
      p("Golden Sweep may verify eligibility before issuing a promotional benefit or Prize."),
    ],
  },
  {
    title: "4. RESTRICTED JURISDICTIONS",
    blocks: [
      p(`${SITE} and its Services are not available in: California, Connecticut, Delaware, Idaho, Indiana, Louisiana, Maine, Michigan, Montana, Nevada, New Jersey, New York, Oklahoma, Tennessee, Utah, and Washington.`),
      p("Promotions are also void wherever prohibited by law."),
      p("Geographic restrictions apply to eligibility, Account access, promotional marketing where applicable, purchases, gameplay, Sweepstakes participation, and Prize redemption."),
      p("A promotion may be subject to additional geographic restrictions where required by applicable law or stated in its promotion-specific terms."),
      p("Participants may not circumvent geographic restrictions using VPNs, proxies, GPS spoofing, location manipulation, false information, or similar methods."),
    ],
  },
  {
    title: "5. GOLD COINS",
    blocks: [
      p("Gold Coins (“GC”) are virtual entertainment credits. GC:"),
      ul(
        "have no cash value;",
        "are not legal tender;",
        "cannot be redeemed for cash or Prizes;",
        "are intended for entertainment gameplay; and",
        "are separate from Sweepstakes Coins and Redeemable Credits."
      ),
      p("A promotion may award additional GC or offer a promotional GC benefit. The applicable promotion-specific terms should identify the GC benefit being offered."),
    ],
  },
  {
    title: "6. SWEEPSTAKES COINS",
    blocks: [
      p("Sweepstakes Coins (“SC”) are free promotional play credits used for eligible Sweepstakes gameplay. SC:"),
      ul(
        "are not sold separately;",
        "are not legal tender;",
        "are not cash;",
        "cannot themselves be redeemed for a Prize; and",
        "may be obtained through eligible promotional methods, including free methods of entry."
      ),
      p("Where promotional SC accompany an eligible Gold Coin package, the SC are provided as a promotional benefit and are not separately sold."),
    ],
  },
  {
    title: "7. REDEEMABLE CREDITS",
    blocks: [
      p("Redeemable Credits (“RC”) are separately recorded credits that may result from qualifying winning outcomes from eligible SC gameplay after applicable requirements have been satisfied."),
      p("RC are distinct from GC and SC. GC cannot be redeemed. SC themselves cannot be redeemed. Only eligible RC may be submitted for Prize redemption, subject to applicable verification and redemption requirements."),
    ],
  },
  {
    title: "8. NO PURCHASE NECESSARY",
    blocks: [
      p("For any Golden Sweep Sweepstakes promotion:"),
      p("NO PURCHASE OR PAYMENT IS NECESSARY TO ENTER, PARTICIPATE, OR WIN. A PURCHASE WILL NOT INCREASE A PARTICIPANT'S CHANCES OF WINNING."),
      p("A purchase may not be required as the exclusive method of obtaining Sweepstakes participation. Eligible free participation methods will be made available for Sweepstakes promotions."),
    ],
  },
  {
    title: "9. FREE ALTERNATIVE METHOD OF ENTRY",
    blocks: [
      p("Where a promotion involves eligible Sweepstakes participation through SC, Golden Sweep maintains a free postal Alternative Method of Entry (“AMOE”)."),
      p("Unless promotion-specific terms lawfully provide another applicable free method consistent with the Sweepstakes structure, the Golden Sweep postal AMOE provides:"),
      p("3 Sweepstakes Coins (3 SC) for each valid request."),
      p("There is no fixed numerical limit on valid AMOE requests, provided each request independently satisfies the applicable requirements and is separately mailed."),
    ],
  },
  {
    title: "10. AMOE REQUEST REQUIREMENTS",
    blocks: [
      p("For each postal AMOE request, the Participant must use a:"),
      p("Standard, white, one-sided, unfolded, unlined 4 × 6-inch index card."),
      p("The Participant must personally and legibly handwrite, in the required order:"),
      ol(
        "full legal name;",
        `${SITE} username;`,
        "registered email address;",
        "residential address;",
        "date of birth; and",
        `the following statement: “I request 3 Sweepstakes Coins through the ${SITE} Alternative Method of Entry. I have read and agree to the ${SITE} Official Sweepstakes Rules.”`
      ),
      p("The request must be personally and manually handwritten. Photocopied, printed, typed, mechanically reproduced, computer-generated, automated, or stamped requests are not valid."),
    ],
  },
  {
    title: "11. AMOE MAILING",
    blocks: [
      p("Each AMOE request must:"),
      ul(
        "be placed in a separate envelope;",
        "contain only one request;",
        "display the Participant's return address;",
        "display “AMOE REQUEST” on the outside;",
        "have sufficient postage; and",
        "be individually mailed."
      ),
      p("Mail to:"),
      p(`Gameverse LLC / Golden Sweep AMOE Request\n16192 Coastal Highway\nLewes, Delaware 19958\nUnited States`),
      p("Bulk submissions are not permitted."),
    ],
  },
  {
    title: "12. AMOE PROCESSING",
    blocks: [
      p("A valid AMOE request will generally be credited with 3 SC within seven (7) business days after receipt and successful validation."),
      p("Information on the request must reasonably match the Participant's eligible Golden Sweep Account."),
      p("A request may be rejected for objective deficiencies such as missing required information, illegibility, failure to use the required card, materially mismatched Account information, automated preparation, ineligibility, or another material failure to satisfy the published requirements."),
      p("An AMOE request will not be rejected merely because the Participant did not make a purchase."),
      p("SC obtained through the AMOE provide the same Sweepstakes opportunity as an equivalent amount of eligible SC obtained through another promotional method."),
    ],
  },
  {
    title: "13. EQUAL TREATMENT OF SWEEPSTAKES COINS",
    blocks: [
      p("Equivalent eligible SC provide equivalent Sweepstakes gameplay opportunities regardless of whether the SC were obtained through:"),
      ul(
        "the free AMOE;",
        "a promotional award;",
        "promotional SC accompanying a Gold Coin package;",
        "a social promotion;",
        "a special campaign; or",
        "another eligible promotional method."
      ),
      p("A Participant will not receive better odds merely because the Participant made a purchase. A Participant will not receive worse odds merely because SC were obtained without purchase."),
    ],
  },
  {
    title: "14. PLAYTHROUGH",
    blocks: [
      p("Unless applicable promotion-specific terms expressly provide otherwise, applicable promotional SC are subject to a one-time (1×) playthrough requirement."),
      p("For example, 10 applicable SC must be used once through qualifying Sweepstakes gameplay to satisfy a 1× playthrough requirement."),
      p("Playthrough does not guarantee a winning outcome or Prize."),
      p("Promotion-specific terms must clearly disclose any applicable playthrough requirement that differs from the generally applicable requirement."),
    ],
  },
  {
    title: "15. PROMOTIONAL GOLD COIN PACKAGES",
    blocks: [
      p("Golden Sweep may offer promotional Gold Coin packages. A package may include:"),
      ul(
        "a stated quantity of purchased GC; and",
        "promotional SC provided as a promotional benefit."
      ),
      p("The purchase price applies to the Gold Coin package. Promotional SC are not separately sold."),
      p("A User does not need to purchase a Gold Coin package to obtain an eligible Sweepstakes participation opportunity."),
    ],
  },
  {
    title: "16. FREE PROMOTIONAL AWARDS",
    blocks: [
      p("Golden Sweep may offer free promotional awards through activities such as:"),
      ul(
        "Account promotions;",
        "daily or periodic promotions;",
        "social-media promotions;",
        "promotional campaigns;",
        "special events;",
        "Player Tier promotions; or",
        "other eligible promotional methods."
      ),
      p("Availability, amounts, duration, and eligibility may vary."),
    ],
  },
  {
    title: "17. PROMOTION START AND END TIMES",
    blocks: [
      p("Promotion-specific terms should identify the applicable promotion period. Unless otherwise stated, the time zone applicable to a promotion should be clearly disclosed with its start and end time."),
      p("Entries, claims, purchases, or other actions submitted outside the applicable promotional period may not qualify."),
      p("Golden Sweep should not retroactively shorten a promotion in a manner that unfairly deprives Participants of an already-earned promotional benefit, except where reasonably necessary because of law, fraud, security, technical failure, or circumstances affecting fair administration."),
    ],
  },
  {
    title: "18. PROMOTIONAL LIMITS",
    blocks: [
      p("A promotion may impose reasonable limits such as:"),
      ul(
        "one benefit per eligible User;",
        "one benefit per Account;",
        "frequency limits;",
        "promotional award limits;",
        "time-based limits; or",
        "other objectively stated participation limits."
      ),
      p("Any material limit should be disclosed in the applicable promotion-specific terms."),
      p("Participants may not create multiple Accounts or use another person's Account to circumvent a promotional limit."),
    ],
  },
  {
    title: "19. PLAYER TIER PROMOTIONS",
    blocks: [
      p("Golden Sweep may provide promotional benefits based on a User's Player Tier. Potential tiers may include: Iron, Gold, Platinum, Sapphire, and Emerald, as applicable to the Golden Sweep Player Tier program."),
      p("Promotional benefits associated with a Player Tier may vary. Where a promotion is limited to a particular Player Tier, the applicable tier requirement should be disclosed in the promotion-specific terms."),
      p("Player Tier promotional benefits do not guarantee a winning outcome or Prize."),
    ],
  },
  {
    title: "20. PRIZE REDEMPTION",
    blocks: [
      p("Where eligible Sweepstakes gameplay produces RC, Prize redemption is subject to applicable redemption requirements."),
      kv("General minimum redemption amount:", "50 RC"),
      p("Applicable maximum redemption limits are based on Player Tier:"),
      table(
        ["Player Tier", "Maximum Redemption"],
        [
          ["Iron through Gold", "$2,500"],
          ["Platinum through Sapphire", "$5,000"],
          ["Emerald", "$7,500"],
        ]
      ),
      p("Any approved increase above $7,500 is not guaranteed and is subject to documented review and applicable eligibility, Account-standing, activity-history, compliance, security, and fraud criteria."),
      p("Promotion-specific terms may not promise a redemption treatment inconsistent with the applicable redemption rules."),
    ],
  },
  {
    title: "21. PROMOTION-SPECIFIC PRIZES",
    blocks: [
      p("Where a promotion offers a specifically identified Prize rather than ordinary RC-based Sweepstakes gameplay, the promotion-specific terms should disclose material information concerning the Prize, including where applicable:"),
      ul(
        "description;",
        "approximate retail value;",
        "quantity;",
        "eligibility;",
        "method of selection;",
        "timing;",
        "delivery;",
        "applicable restrictions; and",
        "tax responsibilities."
      ),
      p("Prize substitutions or modifications should be handled consistently with applicable law and the published promotion-specific terms."),
    ],
  },
  {
    title: "22. ODDS",
    blocks: [
      p("Where a promotion involves Sweepstakes gameplay, odds depend on the applicable game and available outcomes."),
      p("A purchase does not increase a Participant's odds or chances of winning. Equivalent SC obtained through a free method receive the same gameplay opportunity as equivalent eligible SC obtained through another promotional method."),
      p("Where a separate promotion uses a drawing or another method of winner selection, the applicable promotion-specific terms should disclose how the winner is determined and any applicable odds information."),
    ],
  },
  {
    title: "23. PROMOTION ABUSE",
    blocks: [
      p("Users may not engage in promotion abuse. Prohibited conduct may include:"),
      ul(
        "creating multiple Accounts;",
        "using false identities;",
        "manipulating geographic location;",
        "exploiting technical errors;",
        "automated participation;",
        "collusion;",
        "manipulating promotional eligibility;",
        "falsifying AMOE submissions;",
        "unauthorized payment activity;",
        "artificially structuring activity to circumvent limits;",
        "exploiting a promotion contrary to its disclosed purpose; or",
        "other fraudulent or deceptive conduct."
      ),
      p("Legitimate use of a free AMOE is not promotion abuse. Submitting multiple valid AMOE requests in accordance with the published rules is not, by itself, abuse."),
    ],
  },
  {
    title: "24. ERRORS",
    blocks: [
      p("Golden Sweep may correct genuine technical, display, accounting, or administrative errors affecting a promotion."),
      p("Where an error materially affects promotion administration, Golden Sweep may take reasonable corrective action. An obvious technical error does not create an entitlement to an unintended promotional benefit."),
      p("However, this provision will not be used merely to withdraw a legitimately earned promotional benefit because the outcome is unfavorable to Golden Sweep."),
    ],
  },
  {
    title: "25. MODIFICATION, SUSPENSION, OR TERMINATION",
    blocks: [
      p("Golden Sweep may modify, suspend, or terminate a promotion where reasonably necessary because of:"),
      ul(
        "fraud;",
        "abuse;",
        "technical failure;",
        "cybersecurity incidents;",
        "system-integrity concerns;",
        "legal or regulatory requirements;",
        "governmental action; or",
        "circumstances outside Golden Sweep's reasonable control that materially affect fair administration."
      ),
      p("Where reasonably practicable, existing legitimate promotional benefits will be handled consistently with the applicable published terms and law."),
    ],
  },
  {
    title: "26. PROMOTION APPROVAL BEFORE LAUNCH",
    blocks: [
      p("No Golden Sweep promotion should be publicly launched until its material terms have been reviewed and approved through Gameverse LLC's applicable promotion-approval process."),
      p("Before launch, the responsible person should review, as applicable:"),
      ul(
        "eligibility;",
        "age requirements;",
        "restricted jurisdictions;",
        "no-purchase participation;",
        "AMOE requirements;",
        "equal treatment of equivalent SC;",
        "promotional GC/SC terminology;",
        "playthrough;",
        "Prize structure;",
        "redemption requirements;",
        "applicable Prize caps;",
        "registration requirements;",
        "bonding or security requirements;",
        "governmental filing requirements;",
        "tax reporting;",
        "withholding;",
        "marketing disclosures;",
        "start and end dates; and",
        "other promotion-specific compliance requirements."
      ),
    ],
  },
  {
    title: "27. DESIGNATED PROMOTION COMPLIANCE RESPONSIBILITY",
    blocks: [
      p("The designated person responsible for Golden Sweep promotion-compliance review is:"),
      p("Compliance team\nGameverse LLC"),
      p("Before an applicable promotion begins, the designated responsible person will review and address applicable:"),
      ul(
        "registration;",
        "bonding;",
        "filings;",
        "Prize caps;",
        "tax reporting;",
        "withholding;",
        "geographic restrictions; and",
        "other state-specific Prize or promotion requirements."
      ),
      p("The designated responsible person may obtain assistance from legal counsel, compliance consultants, tax professionals, payment providers, or other qualified professionals where appropriate."),
    ],
  },
  {
    title: "28. PROMOTION APPROVAL RECORDS",
    blocks: [
      p("Gameverse LLC should maintain reasonable records demonstrating promotion review and approval. Depending on the promotion, records may include:"),
      ul(
        "final promotion-specific terms;",
        "approval date;",
        "responsible approver;",
        "promotional artwork and disclosures;",
        "eligibility requirements;",
        "geographic restrictions;",
        "AMOE terms;",
        "GC/SC promotional amounts;",
        "Prize structure;",
        "redemption requirements;",
        "applicable legal/compliance review;",
        "registration or filing records;",
        "bonding records where applicable;",
        "tax requirements;",
        "promotional start/end dates; and",
        "material amendments."
      ),
      p("Such records may be maintained electronically."),
    ],
  },
  {
    title: "29. MARKETING AND PROMOTIONAL COMMUNICATIONS",
    blocks: [
      p("Golden Sweep may advertise eligible promotions through channels such as:"),
      ul(
        `${SITE};`,
        "email;",
        "SMS/text;",
        "social media;",
        "online advertising; and",
        "other marketing channels."
      ),
      p("Promotional advertising should not materially misrepresent:"),
      ul(
        "eligibility;",
        "no-purchase availability;",
        "promotional benefits;",
        "Prize availability;",
        "odds;",
        "redemption;",
        "material restrictions; or",
        "the nature of GC, SC, or RC."
      ),
      p("Marketing should not state or imply that a purchase guarantees a Prize or improves Sweepstakes odds."),
    ],
  },
  {
    title: "30. TARGETED PROMOTIONAL ADVERTISING",
    blocks: [
      p("Golden Sweep may use targeted advertising to promote Golden Sweep or eligible promotions. Targeted advertising should be subject to applicable geographic, age, privacy, and responsible-marketing controls."),
      p("Golden Sweep should not intentionally target promotional gaming advertisements to known minors or Users subject to active Self-Exclusion where applicable suppression controls are available."),
    ],
  },
  {
    title: "31. RESPONSIBLE PROMOTIONS",
    blocks: [
      p("Promotions should be presented as entertainment. Golden Sweep does not intend promotions to:"),
      ul(
        "guarantee winning;",
        "present gaming as dependable income;",
        "suggest gaming solves financial difficulties;",
        "encourage chasing losses;",
        "imply increased spending guarantees success; or",
        "intentionally encourage circumvention of responsible-gaming restrictions."
      ),
    ],
  },
  {
    title: "32. TAXES",
    blocks: [
      p("Prize recipients are responsible for applicable tax obligations."),
      p("Gameverse LLC may request taxpayer information, issue applicable tax forms, report Prize information, or withhold amounts where required by law."),
      p("Promotion-specific terms may include additional tax disclosures where appropriate."),
    ],
  },
  {
    title: "33. VERIFICATION",
    blocks: [
      p("Golden Sweep may require reasonable verification before awarding certain promotional benefits or Prizes. Verification may include:"),
      ul(
        "identity;",
        "age;",
        "residence;",
        "physical location;",
        "Account ownership;",
        "payment ownership;",
        "promotional eligibility;",
        "Player Tier;",
        "tax information; and",
        "fraud/security review."
      ),
      p("Failure to satisfy a legitimately applicable verification requirement may result in ineligibility for the affected promotion or Prize."),
    ],
  },
  {
    title: "34. RECORDKEEPING",
    blocks: [
      p("Gameverse LLC may maintain records reasonably necessary to administer promotions, including:"),
      ul(
        "eligibility;",
        "promotional awards;",
        "AMOE processing;",
        "GC, SC, and RC activity;",
        "Prize/redemption information;",
        "verification results;",
        "approval records;",
        "compliance review;",
        "tax records;",
        "payment status; and",
        "customer communications."
      ),
      p("Authorized service providers may separately maintain records generated through their systems according to their applicable responsibilities and retention practices."),
    ],
  },
  {
    title: "35. CHANGES TO THESE GENERAL PROMOTION RULES",
    blocks: [
      p("Golden Sweep may update these General Promotion Rules prospectively to reflect changes in:"),
      ul(
        "promotions;",
        "Platform functionality;",
        "legal requirements;",
        "compliance practices;",
        "marketing practices; or",
        "operational procedures."
      ),
      p("The current Effective Date and Version will be displayed with these General Promotion Rules."),
      p("Material changes should not be applied retroactively to deprive a Participant of a legitimate promotional benefit already earned under the applicable published terms except where required by law or necessary to address fraud or genuine error."),
    ],
  },
  {
    title: "36. CUSTOMER SUPPORT",
    blocks: [
      p("Questions concerning Golden Sweep promotions may be directed to:"),
      p("Golden Sweep Customer Support"),
      kv("Email:", EMAIL),
      kv("Phone:", "+1 (972) 535-9119"),
      p("Written correspondence may be sent to:"),
      p(ADDRESS),
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
            <li key={item} className="break-words">{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="list-decimal space-y-1.5 pl-6 marker:font-semibold marker:text-gold-200">
          {block.items.map((item) => (
            <li key={item} className="break-words">{item}</li>
          ))}
        </ol>
      );
    case "kv":
      return (
        <p key={index}>
          <strong className="font-semibold text-white">{block.label}</strong> {block.text}
        </p>
      );
    case "table":
      return (
        <div key={index} className="overflow-x-auto rounded-xl border border-gold-200/25">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead className="bg-gold-200/10 text-gold-200">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold uppercase tracking-[0.1em]">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-gold-200/15">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cell}
                      className={`px-4 py-3 ${cellIndex === 0 ? "text-white" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return (
        <p key={index} className="whitespace-pre-line break-words">
          {block.text}
        </p>
      );
  }
}

export default function PromotionPolicy() {
  useEffect(() => {
    document.title = "General Promotion Rules | Golden Sweep";
    setMetaDescription(
      "Read the Golden Sweep General Promotion Rules, including eligibility, no-purchase participation, free AMOE, Gold Coins, Sweepstakes Coins, playthrough, and prize redemption."
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
              General Promotion Rules
            </motion.h1>
            <dl className="mt-5 space-y-1 text-sm text-cream/72">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <dt className="inline font-semibold uppercase tracking-[0.14em] text-gold-200">{label}: </dt>
                  <dd className="inline break-words">{value}</dd>
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
            <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Golden Sweep — General Promotion Rules</p>
            <p className="mt-1">Effective Date: October 12, 2026 · Version 1.1</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-cream/70 sm:text-xs">
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
      <Footer />
    </main>
  );
}