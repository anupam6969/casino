import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Block helpers: p = paragraph, h = sub-heading, ul = bullet list, kv = bold label + text
const p = (text) => ({ type: "p", text });
const h = (text) => ({ type: "h", text });
const ul = (...items) => ({ type: "ul", items });
const kv = (label, text) => ({ type: "kv", label, text });

const EMAIL = "support@goldensweep.com";

const meta = [
  ["Sponser", "Gameverse LLC"],
  ["Website", "https://www.goldensweep.ai"],
  ["Effective Date", "October 12, 2026"],
  ["Version", "1.1"],
];

const intro = [
  "Gameverse LLC (“Gameverse,” “Golden Sweep,” “we,” “us,” or “our”) respects the privacy of Users of Golden Sweep.",
  "This Privacy Policy explains the categories of personal information we may collect, how we may collect and use that information, circumstances in which information may be disclosed, the choices and rights that may be available to Users, and how to contact us regarding privacy matters.",
  "Please read this Privacy Policy carefully.",
];

const sections = [
  {
    title: "1. SCOPE",
    blocks: [
      p("This Privacy Policy applies to personal information processed by Gameverse LLC in connection with Golden Sweep and related services, including information collected through:"),
      ul(
        "the Golden Sweep Website;",
        "User Accounts;",
        "Account registration;",
        "identity and eligibility verification;",
        "payment-related activities;",
        "Gold Coin purchases;",
        "Sweepstakes participation;",
        "Alternative Method of Entry administration;",
        "gameplay;",
        "Prize redemption;",
        "Customer Support;",
        "responsible-gaming requests;",
        "marketing communications;",
        "security and fraud-prevention activities; and",
        "cookies and similar technologies used in connection with Golden Sweep."
      ),
      p("This Policy applies to information that identifies, relates to, describes, is reasonably capable of being associated with, or may reasonably be linked to an identifiable person where treated as personal information under applicable law."),
    ],
  },
  {
    title: "2. PERSONAL INFORMATION WE MAY COLLECT",
    blocks: [
      p("The personal information we collect depends on how a User interacts with Golden Sweep."),
      h("2.1 Account and Contact Information"),
      p("We may collect:"),
      ul(
        "full legal name;",
        "username;",
        "email address;",
        "residential or mailing address;",
        "telephone number;",
        "date of birth;",
        "Account identifiers;",
        "Account preferences;",
        "login-related information; and",
        "other information provided during Account registration or Account management."
      ),
      h("2.2 Identity and Age Verification Information"),
      p("Where verification is required, information may include:"),
      ul(
        "full legal name;",
        "date of birth;",
        "residential address;",
        "government-issued identification information;",
        "images or copies of identification documents;",
        "photographs, selfies, or likeness information used for verification;",
        "verification results;",
        "identity-match results;",
        "age-verification results;",
        "document-validation information;",
        "fraud or risk indicators; and",
        "other information reasonably necessary to verify identity or eligibility."
      ),
      p("Identity verification may be performed with assistance from authorized service providers."),
      h("2.3 Payment and Transaction Information"),
      p("When a User makes or attempts a transaction, we or authorized payment providers may process information such as:"),
      ul(
        "transaction amount;",
        "transaction date and time;",
        "payment method information;",
        "payment status;",
        "transaction identifiers;",
        "billing information;",
        "payment-ownership information;",
        "refunds;",
        "reversals;",
        "failed transactions;",
        "chargebacks;",
        "fraud and risk information; and",
        "related transaction records."
      ),
      p("Sensitive payment credentials may be processed directly by authorized payment providers."),
      p("Golden Sweep may not receive or store complete payment credentials where they are processed directly by such providers."),
      h("2.4 Sweepstakes and Prize Information"),
      p("We may process information relating to:"),
      ul(
        "Sweepstakes Coins (“SC”);",
        "SC promotional awards;",
        "Alternative Method of Entry (“AMOE”) submissions;",
        "AMOE validation and processing;",
        "Sweepstakes gameplay;",
        "qualifying winning outcomes;",
        "Redeemable Credits (“RC”);",
        "redemption requests;",
        "Prize amounts;",
        "Prize-payment status;",
        "Player Tier information;",
        "redemption limits;",
        "verification results;",
        "affidavits or eligibility documentation;",
        "tax information; and",
        "Prize-related Customer Support communications."
      ),
      p("For clarity:"),
      p("Gold Coins (“GC”) are entertainment-only virtual credits and have no cash value."),
      p("Sweepstakes Coins (“SC”) are free promotional play credits and cannot themselves be redeemed for Prizes."),
      p("Eligible winning outcomes from qualifying SC gameplay may produce separately recorded Redeemable Credits (“RC”), which may be submitted for eligible Prize redemption."),
      h("2.5 Geolocation Information"),
      p("We may collect or process location-related information to determine geographic eligibility, protect the Platform, detect fraud, and comply with applicable requirements."),
      p("Information may include:"),
      ul(
        "IP address;",
        "approximate geographic location;",
        "precise location where enabled and permitted;",
        "device-location signals;",
        "network information;",
        "GPS-related information;",
        "VPN indicators;",
        "proxy indicators;",
        "location-manipulation indicators; and",
        "other technical signals relevant to geographic verification."
      ),
      p("Location information may be processed by authorized geolocation or security providers."),
      h("2.6 Device, Internet, and Technical Information"),
      p("We may collect:"),
      ul(
        "IP address;",
        "browser type;",
        "operating system;",
        "device type;",
        "device identifiers;",
        "language;",
        "referring URLs;",
        "timestamps;",
        "session information;",
        "network information;",
        "log information;",
        "diagnostic information;",
        "security events;",
        "cookie identifiers; and",
        "similar technical information."
      ),
      h("2.7 Gameplay and Account Activity"),
      p("We may collect information concerning:"),
      ul(
        "login activity;",
        "Account activity;",
        "GC activity;",
        "SC activity;",
        "RC activity;",
        "games accessed;",
        "gameplay history;",
        "transaction history;",
        "promotional activity;",
        "Player Tier;",
        "redemption history;",
        "Account restrictions;",
        "security events;",
        "suspected rule violations; and",
        "other interactions with Golden Sweep."
      ),
      h("2.8 Communications and Customer Support"),
      p("If a User contacts us, we may collect:"),
      ul(
        "name;",
        "email address;",
        "Account information;",
        "contents of the communication;",
        "support-ticket information;",
        "attachments provided by the User;",
        "complaint information;",
        "security reports;",
        "transaction questions; and",
        "records of our response."
      ),
      h("2.9 Responsible Gaming Information"),
      p("When a User requests a responsible-gaming control, we may process information concerning:"),
      ul(
        "purchase limits;",
        "Cooling-Off requests;",
        "Self-Exclusion requests;",
        "selected duration;",
        "effective and expiration dates;",
        "Account restrictions;",
        "reactivation requests;",
        "marketing suppression;",
        "linked-Account review;",
        "balance handling; and",
        "related communications."
      ),
      p("This information may be retained where reasonably necessary to administer and enforce responsible-gaming restrictions."),
      h("2.10 Marketing Information"),
      p("Where permitted, we may collect or generate information concerning:"),
      ul(
        "marketing preferences;",
        "email subscriptions;",
        "SMS/text consent;",
        "unsubscribe requests;",
        "advertising interactions;",
        "campaign identifiers;",
        "advertising identifiers;",
        "pages or content viewed;",
        "referral information; and",
        "interactions with advertisements or promotional communications."
      ),
    ],
  },
  {
    title: "3. HOW WE COLLECT PERSONAL INFORMATION",
    blocks: [
      p("We may collect personal information:"),
      h("Directly from Users"),
      p("For example, when a User:"),
      ul(
        "registers an Account;",
        "updates Account information;",
        "completes verification;",
        "makes a purchase;",
        "participates in a promotion;",
        "submits an AMOE request;",
        "requests Prize redemption;",
        "contacts Customer Support;",
        "requests a responsible-gaming control; or",
        "subscribes to marketing."
      ),
      h("Automatically"),
      p("Certain information may be collected automatically when a User accesses or interacts with Golden Sweep through cookies, logs, device information, security technologies, and similar mechanisms."),
      h("From Authorized Service Providers"),
      p("We may receive information from providers supporting functions such as:"),
      ul(
        "identity verification;",
        "payment processing;",
        "geographic verification;",
        "fraud prevention;",
        "cybersecurity;",
        "hosting;",
        "communications;",
        "analytics; and",
        "advertising."
      ),
      h("From Other Lawful Sources"),
      p("We may receive information from governmental, regulatory, sanctions, fraud-prevention, or other lawful sources where reasonably necessary."),
    ],
  },
  {
    title: "4. HOW WE USE PERSONAL INFORMATION",
    blocks: [
      p("We may use personal information to:"),
      ul(
        "create and administer Accounts;",
        "authenticate Users;",
        "verify identity and age;",
        "verify geographic eligibility;",
        "process transactions;",
        "administer GC purchases;",
        "administer SC promotions;",
        "validate and process AMOE requests;",
        "operate games;",
        "record eligible RC;",
        "administer Prize redemptions;",
        "determine applicable Player Tier and redemption limits;",
        "provide Customer Support;",
        "administer responsible-gaming controls;",
        "process Account closure requests;",
        "detect and prevent fraud;",
        "identify payment abuse;",
        "detect unauthorized multiple Accounts;",
        "investigate suspicious activity;",
        "enforce security measures;",
        "comply with sanctions and financial-crime requirements;",
        "satisfy tax and reporting obligations;",
        "maintain business and compliance records;",
        "communicate service and security information;",
        "send marketing where permitted;",
        "provide and measure targeted advertising where permitted;",
        "understand Platform usage;",
        "improve the Website and Services;",
        "diagnose technical problems;",
        "establish, exercise, or defend legal claims;",
        "comply with legal obligations; and",
        "protect Users, Gameverse LLC, and the Platform."
      ),
    ],
  },
  {
    title: "5. IDENTITY, AGE, AND ELIGIBILITY VERIFICATION",
    blocks: [
      p("Golden Sweep may use personal information to verify that a User is who they claim to be and satisfies applicable Account and participation requirements."),
      p("Verification may include analysis of:"),
      ul(
        "identity information;",
        "date of birth;",
        "government-issued identification;",
        "residential information;",
        "photographs or selfies;",
        "Account information;",
        "payment information;",
        "location information;",
        "device information;",
        "fraud indicators; and",
        "verification results."
      ),
      p("Authorized verification providers may process such information on our behalf or as otherwise permitted under their applicable role."),
      p("We may retain verification results and related records where reasonably necessary for security, compliance, dispute handling, or legal obligations."),
    ],
  },
  {
    title: "6. GEOLOCATION AND GEOGRAPHIC ELIGIBILITY",
    blocks: [
      p("Golden Sweep may process location and device information to determine whether a User is physically located in a jurisdiction where access or participation is permitted."),
      p("Geographic verification may occur at appropriate points during use of the Platform."),
      p("We may use location information to:"),
      ul(
        "determine eligibility;",
        "enforce geographic restrictions;",
        "detect location manipulation;",
        "identify VPN or proxy activity;",
        "protect against fraud;",
        "maintain security; and",
        "satisfy applicable legal requirements."
      ),
      p("Geolocation data may be considered sensitive personal information under certain privacy laws."),
    ],
  },
  {
    title: "7. HOW WE DISCLOSE PERSONAL INFORMATION",
    blocks: [
      p("We may disclose personal information when reasonably necessary for the purposes described in this Privacy Policy."),
      h("7.1 Authorized Service Providers"),
      p("Information may be disclosed to service providers supporting functions including:"),
      ul(
        "hosting and infrastructure;",
        "identity and age verification;",
        "payment processing;",
        "geographic verification;",
        "fraud prevention;",
        "security;",
        "communications;",
        "analytics;",
        "advertising and marketing;",
        "game technology;",
        "Customer Support; and",
        "professional services."
      ),
      p("We seek to disclose information reasonably relevant to the services being provided."),
      p("Service providers may have independent legal obligations concerning information they process."),
      h("7.2 Legal, Regulatory, and Compliance Disclosures"),
      p("We may disclose personal information where reasonably necessary to:"),
      ul(
        "comply with law;",
        "respond to valid legal process;",
        "respond to governmental or regulatory authorities;",
        "satisfy tax obligations;",
        "comply with sanctions requirements;",
        "investigate suspected fraud;",
        "protect against security threats;",
        "enforce legal rights;",
        "protect Users or others; or",
        "establish, exercise, or defend legal claims."
      ),
      h("7.3 Corporate Transactions"),
      p("Personal information may be disclosed as part of an actual or proposed:"),
      ul(
        "merger;",
        "acquisition;",
        "financing;",
        "restructuring;",
        "sale of assets;",
        "bankruptcy;",
        "reorganization; or",
        "similar corporate transaction."
      ),
      p("Where appropriate, reasonable confidentiality protections may be applied."),
    ],
  },
  {
    title: "8. TARGETED ADVERTISING, SALE, AND SHARING",
    blocks: [
      p("Golden Sweep may use personal information for targeted advertising, including through advertising or marketing technologies that help us measure campaigns or present advertising based on activity or interests."),
      h("We Do Not Sell Personal Information for Money"),
      p("Golden Sweep does not sell personal information in exchange for monetary consideration."),
      p("However, privacy laws in some U.S. states use broader definitions of terms such as “sale,” “sharing,” “targeted advertising,” or “cross-context behavioral advertising.”"),
      p("As a result, certain disclosures of identifiers, Internet activity, device information, advertising identifiers, or similar information to advertising or analytics providers may be legally characterized as a “sale” or “sharing” even where no money is exchanged."),
      p("Where applicable law gives an eligible User the right to opt out of:"),
      ul(
        "targeted advertising;",
        "sale of personal information;",
        "sharing of personal information; or",
        "cross-context behavioral advertising,"
      ),
      p("Golden Sweep will provide or honor the applicable mechanism as required by law."),
      p("We do not knowingly sell personal information for monetary consideration."),
    ],
  },
  {
    title: "9. COOKIES AND SIMILAR TECHNOLOGIES",
    blocks: [
      p("Golden Sweep may use cookies and similar technologies such as:"),
      ul(
        "browser cookies;",
        "pixels;",
        "tags;",
        "software development kits (“SDKs”);",
        "local storage;",
        "device identifiers; and",
        "similar technologies."
      ),
      p("These technologies may support:"),
      ul(
        "essential Website functionality;",
        "Account sessions;",
        "security;",
        "fraud prevention;",
        "preferences;",
        "analytics;",
        "performance measurement;",
        "advertising;",
        "marketing measurement; and",
        "targeted advertising."
      ),
      p("Where required by applicable law, non-essential technologies may be subject to consent or opt-out controls."),
      p("Golden Sweep intends to maintain a current technology inventory or preference mechanism identifying applicable technologies by relevant details such as provider/domain, purpose, category, and duration."),
    ],
  },
  {
    title: "10. EMAIL AND SMS/TEXT COMMUNICATIONS",
    blocks: [
      p("Golden Sweep may send Account-related or transactional communications reasonably necessary to provide the Services."),
      p("Where a User separately consents, Golden Sweep may also send promotional email or SMS/text communications."),
      p("Users may unsubscribe from promotional email using the unsubscribe mechanism provided in the communication."),
      p("Where supported, Users may opt out of promotional text messages by replying STOP."),
      p("Withdrawal from promotional marketing does not necessarily prevent service-related, security, legal, verification, responsible-gaming, or transaction communications."),
    ],
  },
  {
    title: "11. DATA RETENTION",
    blocks: [
      p("Golden Sweep retains personal information for as long as reasonably necessary for the purpose for which it was collected and for legitimate operational, security, compliance, tax, accounting, dispute-resolution, and legal purposes."),
      p("Retention periods may vary based on:"),
      ul(
        "the type of information;",
        "Account status;",
        "transaction history;",
        "Sweepstakes and Prize activity;",
        "legal requirements;",
        "tax requirements;",
        "fraud and security needs;",
        "responsible-gaming restrictions;",
        "disputes or investigations; and",
        "applicable limitation periods."
      ),
      p("For example, certain information associated with permanent Self-Exclusion may need to be retained to recognize the User and continue enforcing the exclusion."),
      p("When information is no longer reasonably required, it may be deleted, de-identified, anonymized, or otherwise handled in accordance with applicable requirements and operational procedures."),
    ],
  },
  {
    title: "12. DATA SECURITY",
    blocks: [
      p("Golden Sweep uses reasonable administrative, technical, and organizational safeguards designed to protect personal information against unauthorized access, acquisition, disclosure, alteration, loss, or destruction."),
      p("Depending on the information and systems involved, safeguards may include:"),
      ul(
        "access controls;",
        "authentication;",
        "secure communications;",
        "encrypted connections;",
        "monitoring;",
        "security logging;",
        "fraud-detection controls; and",
        "service-provider security measures."
      ),
      p("No Internet transmission, electronic storage system, or security measure can be guaranteed to be completely secure."),
      p("Users should maintain strong Account credentials and promptly report suspected unauthorized Account activity."),
    ],
  },
  {
    title: "13. PRIVACY RIGHTS",
    blocks: [
      p("Depending on where a User resides and applicable law, the User may have rights concerning personal information, potentially including the right to:"),
      ul(
        "confirm whether personal information is being processed;",
        "access personal information;",
        "request correction of inaccurate information;",
        "request deletion;",
        "obtain a portable copy of certain information;",
        "opt out of targeted advertising;",
        "opt out of certain sales or sharing;",
        "limit certain uses of sensitive personal information where applicable;",
        "withdraw consent where processing depends on consent; and",
        "appeal certain privacy-request decisions where applicable."
      ),
      p("These rights are not absolute and may be subject to legal exceptions."),
      p("For example, Golden Sweep may need to retain information despite a deletion request where reasonably necessary for:"),
      ul(
        "transaction records;",
        "fraud prevention;",
        "responsible-gaming restrictions;",
        "tax requirements;",
        "legal compliance;",
        "security;",
        "dispute resolution; or",
        "establishment or defense of legal claims."
      ),
    ],
  },
  {
    title: "14. HOW TO EXERCISE PRIVACY RIGHTS",
    blocks: [
      p("To submit a privacy request, contact:"),
      p(EMAIL),
      p("Please use the subject line:"),
      p("Privacy Request"),
      p("The request should identify:"),
      ul(
        "the User's name;",
        "the email address associated with the Account;",
        "the privacy right being requested; and",
        "sufficient information to understand the request."
      ),
      p("Golden Sweep may take reasonable steps to verify the identity of the person submitting the request before disclosing, correcting, or deleting personal information."),
      p("Verification information will be used for the purpose of evaluating and fulfilling the request."),
      p("Where applicable law permits an authorized agent to submit a request, Golden Sweep may require reasonable proof of authorization and identity verification."),
    ],
  },
  {
    title: "15. PRIVACY REQUEST APPEALS",
    blocks: [
      p("Where applicable law provides a right to appeal a denied privacy request, the User may submit an appeal to:"),
      p(EMAIL),
      p("with the subject:"),
      p("Privacy Request Appeal"),
      p("The User should identify the original request and explain the basis for the appeal."),
      p("Golden Sweep will review eligible appeals in accordance with applicable law."),
    ],
  },
  {
    title: "16. SENSITIVE PERSONAL INFORMATION",
    blocks: [
      p("Depending on applicable law, certain information processed by Golden Sweep may constitute sensitive personal information, including potentially:"),
      ul(
        "precise geolocation;",
        "government identification information;",
        "Account credentials;",
        "financial information;",
        "information used for identity verification; and",
        "certain other legally designated categories."
      ),
      p("Golden Sweep uses sensitive information for purposes such as:"),
      ul(
        "providing requested Services;",
        "verifying identity;",
        "determining eligibility;",
        "processing transactions;",
        "preventing fraud;",
        "maintaining security;",
        "processing eligible Prize redemptions; and",
        "complying with legal obligations."
      ),
      p("Golden Sweep does not use sensitive personal information to infer characteristics about Users for unrelated advertising purposes."),
    ],
  },
  {
    title: "17. CHILDREN AND MINORS",
    blocks: [
      p("Golden Sweep is not intended for children or persons who do not satisfy applicable age requirements."),
      p("We do not knowingly permit minors to maintain eligible Golden Sweep Accounts."),
      p("If we learn that a minor has improperly provided personal information or accessed the Platform, we may restrict the Account and take appropriate steps regarding the information, subject to legal and recordkeeping requirements."),
      p("A parent or guardian who believes a minor has improperly provided information may contact:"),
      p(EMAIL),
    ],
  },
  {
    title: "18. U.S. STATE PRIVACY RIGHTS",
    blocks: [
      p("Privacy rights vary by state and may change over time."),
      p("Where an applicable U.S. state privacy law provides eligible consumers with additional rights, Golden Sweep will process qualifying requests in accordance with applicable requirements."),
      p("Depending on the law, these may include rights relating to:"),
      ul(
        "access;",
        "correction;",
        "deletion;",
        "portability;",
        "targeted advertising;",
        "sale or sharing;",
        "sensitive personal information; and",
        "appeals."
      ),
      p("Golden Sweep will not unlawfully discriminate against a User for exercising an applicable privacy right."),
    ],
  },
  {
    title: "19. PRIVACY PREFERENCE SIGNALS",
    blocks: [
      p("Where Golden Sweep is legally required to recognize an applicable browser-based or device-based privacy preference signal, we will process supported signals in accordance with applicable law and our implemented technology."),
      p("A privacy preference signal may apply only to the browser or device from which it is transmitted unless it can reasonably be associated with an authenticated User as required by applicable law."),
      p("Users may still need to manage certain Account-specific preferences separately."),
    ],
  },
  {
    title: "20. THIRD-PARTY WEBSITES AND SERVICES",
    blocks: [
      p("Golden Sweep may contain links to or integrate with third-party websites or services."),
      p("Third parties may maintain their own privacy practices."),
      p("Golden Sweep does not control independent third-party websites and encourages Users to review applicable third-party privacy information before providing personal information directly to those parties."),
    ],
  },
  {
    title: "21. DATA PROCESSING LOCATIONS",
    blocks: [
      p("Golden Sweep and authorized service providers may process information in the United States or other locations in which they operate."),
      p("Where applicable law requires safeguards concerning transfers or processing locations, appropriate measures may be used."),
    ],
  },
  {
    title: "22. RESPONSIBLE-GAMING INFORMATION",
    blocks: [
      p("Golden Sweep may process and retain information concerning responsible-gaming restrictions to administer User-requested protections."),
      p("This may include information necessary to:"),
      ul(
        "enforce purchase limits;",
        "administer Cooling-Off Periods;",
        "enforce Self-Exclusion;",
        "identify reasonably linked Accounts;",
        "suppress promotional marketing;",
        "process reactivation requests; and",
        "prevent circumvention."
      ),
      p("A request to delete personal information may not require Golden Sweep to delete information reasonably necessary to maintain an active or permanent responsible-gaming restriction where applicable law permits retention."),
    ],
  },
  {
    title: "23. FRAUD PREVENTION AND SECURITY",
    blocks: [
      p("Golden Sweep may process Account, transaction, device, payment, location, gameplay, and other relevant information to identify and investigate:"),
      ul(
        "identity fraud;",
        "Account takeover;",
        "unauthorized payment activity;",
        "multiple-Account abuse;",
        "geographic manipulation;",
        "promotion abuse;",
        "suspicious redemption activity;",
        "security threats; and",
        "other prohibited activity."
      ),
      p("Automated tools and authorized service providers may assist in this analysis."),
      p("Where appropriate, suspicious activity may be reviewed manually."),
    ],
  },
  {
    title: "24. ACCOUNT CLOSURE AND PERSONAL INFORMATION",
    blocks: [
      p("Closing a Golden Sweep Account does not necessarily result in immediate deletion of all personal information."),
      p("Certain information may continue to be retained where reasonably necessary for:"),
      ul(
        "transaction records;",
        "tax and accounting requirements;",
        "Prize records;",
        "fraud prevention;",
        "security;",
        "responsible-gaming restrictions;",
        "legal obligations;",
        "investigations;",
        "disputes; or",
        "enforcement of applicable rights."
      ),
      p("Information no longer reasonably required may be deleted, anonymized, or de-identified in accordance with applicable practices."),
    ],
  },
  {
    title: "25. CHANGES TO THIS PRIVACY POLICY",
    blocks: [
      p("Golden Sweep may update this Privacy Policy from time to time to reflect changes in:"),
      ul(
        "information practices;",
        "Platform functionality;",
        "service providers;",
        "advertising technologies;",
        "privacy laws;",
        "security practices; or",
        "operational requirements."
      ),
      p("When material changes are made, Golden Sweep may provide notice through the Website, Account interface, email, or another reasonable method where appropriate or required."),
      p("The current Effective Date and Version will be displayed at the beginning of this Privacy Policy."),
    ],
  },
  {
    title: "26. CONTACT US",
    blocks: [
      p("For privacy questions or to exercise an applicable privacy right, contact:"),
      p("Golden Sweep Customer Support"),
      kv("Email:", EMAIL),
      kv("Subject:", "Privacy Request"),
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

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Golden Sweep";
    setMetaDescription(
      "Read the Golden Sweep Privacy Policy, including how account, verification, payment, gameplay, cookie, and support information may be handled."
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
              Privacy Policy
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

          <footer className="mt-12 border-t border-gold-200/20 pt-6 text-center text-xs text-cream/60 sm:text-sm">
            <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Golden Sweep Privacy Policy</p>
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