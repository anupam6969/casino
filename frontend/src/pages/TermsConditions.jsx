import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Block helpers: p = paragraph, h = sub-heading, ul = bullets, ol = numbered list,
// kv = bold label + text, notice = highlighted box
const p = (text) => ({ type: "p", text });
const h = (text) => ({ type: "h", text });
const ul = (...items) => ({ type: "ul", items });
const ol = (...items) => ({ type: "ol", items });
const kv = (label, text) => ({ type: "kv", label, text });
const notice = (...lines) => ({ type: "notice", lines });

const ADDRESS = "Gameverse LLC\n16192 Coastal Highway\nLewes, DE 19958\nUnited States";

const meta = [
  ["Sponser", "Gameverse LLC"],
  ["Website", "https://www.goldensweep.ai"],
  ["Effective Date", "October 12, 2026"],
  ["Version", "1.1"],
  ["Customer Support", "support@goldensweep.com"],
  ["Phone", "+1 (972) 535-9119"],
];

const intro = [
  "These Terms & Conditions (“Terms”) constitute a legally binding agreement between you (“User,” “you,” or “your”) and Gameverse LLC (“Gameverse,” “Golden Sweep,” “we,” “us,” or “our”), Sponser of www.goldensweep.ai (the “Website” or “Platform”).",
  "Please read these Terms carefully before creating an Account or using the Services. By accessing www.goldensweep.ai, registering an Account, clicking to accept these Terms, purchasing Gold Coins, participating in eligible promotions or sweepstakes, or otherwise using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, you must not access or use the Services.",
];

const sections = [
  {
    title: "1. ACCEPTANCE OF TERMS",
    blocks: [
      p("Your use of Golden Sweep is subject to these Terms and any other policies, rules, or promotion-specific terms applicable to a particular feature or activity."),
      p("By using the Services, you represent that you have the legal capacity and authority to enter into these Terms. Where electronic acceptance is presented, selecting “I Agree,” checking an acceptance box, creating an Account, or continuing to use the Services after being presented with applicable terms constitutes your electronic acceptance to the extent permitted by law."),
    ],
  },
  {
    title: "2. Sponser AND CONTACT INFORMATION",
    blocks: [
      p("Golden Sweep is operated by:"),
      p("Gameverse LLC"),
      kv("Website:", "https://www.goldensweep.ai"),
      kv("Email:", "support@goldensweep.com"),
      kv("Phone:", "+1 (972) 535-9119"),
      h("Registered Business Address"),
      p(ADDRESS),
    ],
  },
  {
    title: "3. ELIGIBILITY TO USE THE SERVICES",
    blocks: [
      p("To create or maintain an Account or use the Services, you must:"),
      ol(
        "Be at least eighteen (18) years old or the age of legal majority in your jurisdiction, whichever is greater.",
        "Have the legal capacity to enter into a binding agreement.",
        "Provide accurate, complete, and current registration information.",
        "Use the Services only from a jurisdiction in which such use is permitted.",
        "Satisfy applicable identity, age, geographic, payment, security, and eligibility requirements.",
        "Not be prohibited from using the Services under applicable law.",
        "Comply with these Terms and applicable Golden Sweep rules and policies."
      ),
      p("Golden Sweep may require reasonable evidence establishing your identity, age, residence, location, Account ownership, or other eligibility information."),
    ],
  },
  {
    title: "4. RESTRICTED JURISDICTIONS",
    blocks: [
      p("Golden Sweep and its Services are not available in jurisdictions designated by Golden Sweep as restricted."),
      h("Restricted Jurisdictions"),
      ul(
        "California",
        "Connecticut",
        "Delaware",
        "Idaho",
        "Indiana",
        "Louisiana",
        "Maine",
        "Michigan",
        "Montana",
        "Nevada",
        "New Jersey",
        "New York",
        "Oklahoma",
        "Tennessee",
        "Utah",
        "Washington"
      ),
      p("The restriction applies to the entire Golden Sweep Website and Services, including Account eligibility, access, geolocation, promotional marketing where applicable, purchases, gameplay, Sweepstakes participation, and Prize redemption."),
      p("A person physically located in a Restricted Jurisdiction may not access or use Golden Sweep or participate in the Services."),
      p("Golden Sweep may also restrict access from any other jurisdiction where the Services are prohibited, restricted, or determined by Golden Sweep to present legal, regulatory, compliance, fraud, payment, or operational concerns."),
      p("Users may not circumvent geographic restrictions through a VPN, proxy server, location-spoofing technology, GPS manipulation, remote-access software, false location information, or any other method intended to disguise or manipulate physical location."),
      p("Golden Sweep may require location verification before or during access, gameplay, transactions, Sweepstakes participation, or Prize redemption."),
    ],
  },
  {
    title: "5. ACCOUNT REGISTRATION",
    blocks: [
      p("Users must create an Account to access certain Services. You agree to:"),
      ul(
        "Provide truthful and accurate information.",
        "Maintain current Account information.",
        "Register only for yourself.",
        "Use your own identity and contact information.",
        "Maintain control of the email address and other credentials associated with your Account.",
        "Provide additional information when reasonably requested for verification or compliance purposes."
      ),
      p("Golden Sweep may reject, suspend, restrict, or close an Account if registration information is false, misleading, incomplete, unverifiable, or inconsistent with applicable requirements."),
    ],
  },
  {
    title: "6. ONE ACCOUNT PER PERSON",
    blocks: [
      p("Unless Golden Sweep expressly authorizes otherwise in writing, each person may maintain only one Golden Sweep Account."),
      p("Creating or controlling multiple Accounts, using another person's Account, allowing another person to use your Account, or attempting to circumvent the one-Account rule is prohibited."),
      p("Duplicate or linked Accounts may be investigated, restricted, suspended, or closed."),
    ],
  },
  {
    title: "7. ACCOUNT OWNERSHIP AND TRANSFERS",
    blocks: [
      p("Accounts are personal to the registered User."),
      p("Accounts, Account credentials, Gold Coins, Sweepstakes Coins, Redeemable Credits, promotional benefits, or other Account rights may not be sold, assigned, transferred, traded, gifted, pledged, or otherwise conveyed to another person except where expressly authorized by Golden Sweep."),
    ],
  },
  {
    title: "8. ACCOUNT SECURITY",
    blocks: [
      p("You are responsible for maintaining the confidentiality and security of your Account credentials."),
      p("You must promptly notify Golden Sweep at support@goldensweep.com if you believe:"),
      ul(
        "Your Account has been accessed without authorization.",
        "Your password or credentials have been compromised.",
        "Another person is using your Account.",
        "Suspicious Account activity has occurred."
      ),
      p("Golden Sweep may temporarily restrict an Account while investigating suspected unauthorized access."),
    ],
  },
  {
    title: "9. GEOLOCATION AND LOCATION VERIFICATION",
    blocks: [
      p("Golden Sweep may use geolocation and related technical controls to determine whether a User is physically located in an eligible jurisdiction."),
      p("Location verification may occur at Account access, purchase, gameplay, Sweepstakes participation, redemption, or other appropriate points."),
      p("Attempts to manipulate or conceal location are prohibited. Golden Sweep may deny or restrict access where location cannot be reliably verified."),
    ],
  },
  {
    title: "10. VIRTUAL CURRENCIES",
    blocks: [
      p("Golden Sweep maintains distinct virtual currency and credit types."),
      h("10.1 Gold Coins (GC)"),
      p("Gold Coins are virtual entertainment credits intended solely for social gameplay."),
      p("Gold Coins:"),
      ul(
        "Have no cash value.",
        "Are not legal tender.",
        "Cannot be redeemed for cash or Prizes.",
        "Cannot be transferred between Users.",
        "Are intended only for entertainment use on Golden Sweep."
      ),
      h("10.2 Sweepstakes Coins (SC)"),
      p("Sweepstakes Coins are free promotional play credits used for eligible Sweepstakes gameplay."),
      p("Sweepstakes Coins:"),
      ul(
        "Are not sold separately.",
        "Are not legal tender.",
        "Are not cash.",
        "Cannot themselves be redeemed for cash or Prizes.",
        "May be obtained through eligible promotional methods, including free methods of entry."
      ),
      p("No purchase is necessary to obtain eligible Sweepstakes participation opportunities. The detailed rules governing Sweepstakes Coins are contained in the Official Sweepstakes Rules."),
      h("10.3 Redeemable Credits (RC)"),
      p("Redeemable Credits are a separately recorded balance that may result from qualifying winning outcomes from eligible Sweepstakes Coin gameplay after applicable requirements have been satisfied."),
      p("RC are separate from GC and SC. Only eligible RC may be submitted for Prize redemption, subject to verification, redemption limits, and the requirements contained in the Official Sweepstakes Rules."),
      p("Neither GC nor SC themselves are redeemable for Prizes."),
    ],
  },
  {
    title: "11. GOLD COIN PURCHASES",
    blocks: [
      p("Users may be offered the opportunity to purchase Gold Coin packages. The amount, price, and contents of an available package will be displayed before purchase."),
      p("Where promotional Sweepstakes Coins accompany an eligible Gold Coin package, those Sweepstakes Coins are provided as a promotional benefit and are not separately sold."),
      p("A purchase is not required to participate in eligible Sweepstakes opportunities and does not improve the odds of winning."),
    ],
  },
  {
    title: "12. PAYMENT PROCESSING",
    blocks: [
      p("Transactions may be processed through authorized third-party payment providers."),
      p("Golden Sweep may require:"),
      ul(
        "Payment verification.",
        "Identity verification.",
        "Account ownership verification.",
        "Payment-method ownership verification.",
        "Fraud screening.",
        "Sanctions screening.",
        "Additional compliance review."
      ),
      p("A transaction may be delayed, declined, reversed, or otherwise restricted where reasonably necessary for security, fraud prevention, compliance, payment-processing, or legal reasons."),
    ],
  },
  {
    title: "13. REFUNDS AND CANCELLATIONS",
    blocks: [
      p("Except where otherwise required by applicable law or expressly provided under an applicable refund policy, completed Gold Coin purchases are final and non-refundable."),
      p("Users should review purchase details before completing a transaction. Nothing in this section limits rights that cannot lawfully be waived."),
    ],
  },
  {
    title: "14. CHARGEBACKS AND PAYMENT DISPUTES",
    blocks: [
      p("Users should contact Customer Support regarding a transaction concern before initiating a chargeback where reasonably possible."),
      p("Unauthorized, fraudulent, abusive, or improper chargebacks may result in investigation or Account restrictions."),
      p("Where a transaction is reversed, refunded, charged back, or otherwise invalidated, Golden Sweep may reconcile associated Account activity, virtual currency, promotional benefits, gameplay results, or pending transactions to the extent reasonably necessary to restore the Account to the position associated with the valid transaction history."),
    ],
  },
  {
    title: "15. PROMOTIONS AND BONUSES",
    blocks: [
      p("Golden Sweep may offer promotions, bonuses, special events, or promotional benefits."),
      p("Such offers may be subject to additional terms concerning:"),
      ul(
        "Eligibility.",
        "Duration.",
        "Participation.",
        "Promotional benefits.",
        "Usage requirements.",
        "Geographic availability.",
        "Other promotion-specific conditions."
      ),
      p("Promotion-specific terms form part of the conditions governing that particular promotion."),
      p("Promotions may be modified, suspended, or terminated where reasonably necessary because of legal requirements, technical issues, fraud, abuse, security concerns, or other legitimate operational reasons, subject to applicable law."),
    ],
  },
  {
    title: "16. SWEEPSTAKES PARTICIPATION",
    blocks: [
      notice(
        "NO PURCHASE OR PAYMENT IS NECESSARY TO ENTER, PARTICIPATE, OR WIN.",
        "A PURCHASE WILL NOT INCREASE A PARTICIPANT'S CHANCES OF WINNING."
      ),
      p("Sweepstakes participation through Golden Sweep is governed by the Golden Sweep Official Sweepstakes Rules."),
      p("The Official Sweepstakes Rules establish the applicable rules for:"),
      ul(
        "Sweepstakes eligibility.",
        "Free methods of obtaining Sweepstakes Coins.",
        "Sweepstakes gameplay.",
        "Playthrough requirements.",
        "Winning outcomes.",
        "Redeemable Credits.",
        "Prize eligibility.",
        "Redemption limits.",
        "Prize redemption.",
        "Verification.",
        "Odds.",
        "Disqualification.",
        "Other Sweepstakes-specific requirements."
      ),
    ],
  },
  {
    title: "17. ALTERNATIVE METHOD OF ENTRY",
    blocks: [
      p("Golden Sweep provides a free Alternative Method of Entry (“AMOE”) for eligible Sweepstakes participation. No purchase is required to use the AMOE."),
      p("The complete AMOE instructions, including submission requirements, promotional award, mailing procedure, validation, processing, and rejection criteria, are contained in the Official Sweepstakes Rules."),
    ],
  },
  {
    title: "18. PLAYTHROUGH REQUIREMENTS",
    blocks: [
      p("Certain promotional Sweepstakes Coins are subject to applicable playthrough requirements before qualifying winning outcomes may result in eligible Redeemable Credits."),
      p("The applicable playthrough requirements are established in the Official Sweepstakes Rules and, where applicable, promotion-specific terms."),
    ],
  },
  {
    title: "19. PRIZE REDEMPTION",
    blocks: [
      p("The Golden Sweep Official Sweepstakes Rules constitute the complete customer-facing policy governing Sweepstakes Prize redemption."),
      p("They establish the requirements applicable to:"),
      ul(
        "RC eligibility.",
        "Minimum redemption amounts.",
        "Player-tier redemption maximums.",
        "Any approved increases to applicable maximums.",
        "Redemption requests.",
        "Identity and Account verification.",
        "Compliance review.",
        "Processing.",
        "Unsuccessful or returned payments.",
        "Prize delivery.",
        "Applicable tax requirements."
      ),
      p("Golden Sweep may require verification before approving or processing a Prize redemption."),
    ],
  },
  {
    title: "20. IDENTITY AND ACCOUNT VERIFICATION",
    blocks: [
      p("Golden Sweep may require verification of information including:"),
      ul(
        "Legal name.",
        "Date of birth.",
        "Residential address.",
        "Identity.",
        "Account ownership.",
        "Geographic location.",
        "Payment ownership.",
        "Tax information.",
        "Other information reasonably necessary for eligibility, security, fraud prevention, or compliance."
      ),
      p("Verification may be performed directly or through authorized service providers."),
      p("Failure or refusal to complete required verification may result in restrictions on Account functionality."),
    ],
  },
  {
    title: "21. FRAUD, AML AND FINANCIAL CRIME",
    blocks: [
      p("Golden Sweep maintains measures designed to detect, prevent, and investigate fraud, money laundering, sanctions violations, payment abuse, identity misuse, and other prohibited financial activity."),
      p("Golden Sweep may review Account activity and request additional information where reasonably necessary for these purposes."),
      p("Users may not use Golden Sweep to conceal the source of funds, facilitate unlawful transactions, misuse payment instruments, or engage in fraudulent or deceptive conduct."),
    ],
  },
  {
    title: "22. SANCTIONS AND LEGAL COMPLIANCE",
    blocks: [
      p("Users may not use the Services if doing so would violate applicable sanctions, trade restrictions, court orders, regulatory restrictions, or other applicable laws."),
      p("Golden Sweep may screen Users and transactions where reasonably necessary for legal or compliance purposes."),
    ],
  },
  {
    title: "23. TAX RESPONSIBILITY",
    blocks: [
      p("Users are responsible for determining and satisfying their own applicable tax obligations."),
      p("Golden Sweep may request taxpayer information, issue tax forms, report Prize information, or withhold amounts where required by applicable law."),
    ],
  },
  {
    title: "24. PROHIBITED PLATFORM ACTIVITY",
    blocks: [
      p("Users may not:"),
      ul(
        "Create or control unauthorized multiple Accounts.",
        "Provide false or misleading information.",
        "Impersonate another person.",
        "Access another person's Account without authorization.",
        "Use another person's payment method without authorization.",
        "Manipulate or falsify geographic location.",
        "Use VPNs, proxies, spoofing, or similar methods to bypass restrictions.",
        "Exploit bugs, errors, vulnerabilities, or technical malfunctions.",
        "Use bots, scripts, automation, or unauthorized software.",
        "Collude with other Users.",
        "Manipulate gameplay or promotions.",
        "Engage in bonus or promotion abuse.",
        "Engage in fraudulent transactions or chargebacks.",
        "Attempt to launder or disguise funds.",
        "Interfere with Platform security.",
        "Scrape, reverse engineer, or improperly access Platform systems.",
        "Harass Golden Sweep personnel or other Users.",
        "Use the Services for unlawful purposes.",
        "Assist another person in prohibited activity."
      ),
    ],
  },
  {
    title: "25. COMPLIANCE INVESTIGATIONS",
    blocks: [
      p("Golden Sweep may investigate suspected violations of these Terms, fraud, payment abuse, identity misuse, location manipulation, security incidents, or other suspicious activity."),
      p("During an investigation, Golden Sweep may reasonably:"),
      ul(
        "Request information or documentation.",
        "Restrict purchases.",
        "Restrict gameplay.",
        "Restrict promotions.",
        "Restrict redemption.",
        "Suspend Account access.",
        "Take other measures reasonably necessary to protect Users, the Platform, or legal and compliance interests."
      ),
    ],
  },
  {
    title: "26. ACCOUNT SUSPENSION OR RESTRICTION",
    blocks: [
      p("Golden Sweep may suspend or restrict an Account where reasonably necessary because of:"),
      ul(
        "Suspected fraud.",
        "Security concerns.",
        "Identity or eligibility concerns.",
        "Geographic restrictions.",
        "Payment disputes.",
        "Legal or regulatory requirements.",
        "Prohibited conduct.",
        "Responsible-gaming restrictions.",
        "Material violations of these Terms."
      ),
      p("Where appropriate and legally permissible, Golden Sweep may request additional information before determining whether access can be restored."),
    ],
  },
  {
    title: "27. ACCOUNT CLOSURE BY GOLDEN SWEEP",
    blocks: [
      p("Golden Sweep may close an Account for material violations of these Terms, fraud, unlawful conduct, repeated abuse, ineligibility, security threats, or where continued operation of the Account is prohibited by law."),
      p("Account closure does not eliminate obligations or liabilities that arose before closure."),
      p("Eligible balances and pending transactions will be handled in accordance with applicable rules, policies, verification requirements, and law."),
    ],
  },
  {
    title: "28. USER-REQUESTED ACCOUNT CLOSURE",
    blocks: [
      p("Users may request Account closure by contacting:"),
      kv("Email:", "support@goldensweep.com"),
      kv("Phone:", "+1 (972) 535-9119"),
      p("Golden Sweep may require reasonable identity verification before completing a closure request."),
      p("Account closure does not automatically eliminate outstanding payment obligations, pending compliance reviews, or other obligations that arose before closure."),
    ],
  },
  {
    title: "29. RESPONSIBLE GAMING",
    blocks: [
      p("Golden Sweep is intended for entertainment. Users are encouraged to maintain reasonable limits on time and spending and to use available responsible-gaming tools when needed."),
      p("Golden Sweep may provide tools or support options including purchase limits, cooling-off periods, self-exclusion, and Account closure."),
      p("Responsible-gaming restrictions may affect Account access and functionality."),
    ],
  },
  {
    title: "30. DEATH OF ACCOUNT HOLDER",
    blocks: [
      p("If Golden Sweep receives reliable notice that an Account holder has died, Golden Sweep may restrict the Account while verifying the information."),
      p("Golden Sweep may require documentation reasonably necessary to determine the lawful disposition of any eligible balance or other Account matter."),
    ],
  },
  {
    title: "31. INTELLECTUAL PROPERTY",
    blocks: [
      p("The Golden Sweep Website and its software, graphics, logos, trademarks, designs, interfaces, text, audiovisual materials, and other content are owned by or licensed to Gameverse LLC and are protected by applicable intellectual-property laws."),
      p("Users receive only a limited, personal, revocable, non-exclusive, and non-transferable right to access the Services for lawful personal use. No ownership rights are transferred to Users."),
    ],
  },
  {
    title: "32. THIRD-PARTY SERVICES",
    blocks: [
      p("Certain Platform functions may depend on third-party providers."),
      p("Golden Sweep is not responsible for independent third-party services outside its reasonable control. Use of a third-party service may also be subject to that provider's applicable terms and practices."),
    ],
  },
  {
    title: "33. ELECTRONIC COMMUNICATIONS AND CONSENT",
    blocks: [
      p("By using the Services, you consent to receive legally permissible electronic communications relating to your Account or use of Golden Sweep."),
      p("These may include:"),
      ul(
        "Account notices.",
        "Security alerts.",
        "Transaction confirmations.",
        "Verification requests.",
        "Redemption communications.",
        "Legal notices.",
        "Service-related communications."
      ),
      p("You are responsible for maintaining current contact information."),
    ],
  },
  {
    title: "34. EMAIL AND SMS/TEXT COMMUNICATIONS",
    blocks: [
      p("Where you separately consent, Golden Sweep may send promotional email or SMS/text communications."),
      p("Consent to promotional communications is not required as a condition of purchasing Gold Coins or participating through a free method of entry."),
      p("You may unsubscribe from promotional emails using the unsubscribe mechanism provided. Where supported, you may opt out of promotional text messages by replying STOP."),
      p("Transactional, security, legal, or Account-service communications may continue where permitted or required notwithstanding a marketing opt-out. Message and data rates may apply."),
    ],
  },
  {
    title: "35. PRIVACY",
    blocks: [
      p("Golden Sweep collects and processes information reasonably necessary to operate and protect the Platform, verify Users, process transactions, administer promotions and redemptions, provide Customer Support, conduct marketing where permitted, and satisfy applicable legal requirements."),
      p("Applicable privacy disclosures are provided separately to Users."),
    ],
  },
  {
    title: "36. DISCLAIMERS",
    blocks: [
      p("TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. GOLDEN SWEEP DOES NOT WARRANT THAT THE SERVICES WILL ALWAYS BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE FROM TECHNICAL DEFECTS."),
      p("Nothing in these Terms excludes warranties, rights, or remedies that cannot lawfully be excluded."),
    ],
  },
  {
    title: "37. LIMITATION OF LIABILITY",
    blocks: [
      p("TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, GAMEVERSE LLC AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AND SERVICE PROVIDERS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES ARISING FROM OR RELATING TO THE SERVICES."),
      p("Nothing in this section limits liability where such limitation is prohibited by applicable law."),
    ],
  },
  {
    title: "38. INDEMNIFICATION",
    blocks: [
      p("To the extent permitted by law, you agree to indemnify and hold harmless Gameverse LLC and its affiliates, officers, directors, employees, and agents from claims, losses, liabilities, damages, and reasonable costs arising from:"),
      ul(
        "Your unlawful use of the Services.",
        "Your material violation of these Terms.",
        "Your fraud or intentional misconduct.",
        "Your infringement of another person's rights."
      ),
      p("This provision does not apply to the extent prohibited by applicable law."),
    ],
  },
  {
    title: "39. INFORMAL DISPUTE RESOLUTION",
    blocks: [
      p("Before initiating arbitration, either party must provide the other with written notice describing the dispute and requested relief and make a good-faith effort to resolve the matter informally."),
      p("Notices to Golden Sweep should be sent to:"),
      kv("Email:", "support@goldensweep.com"),
      p("The communication must identify itself as a “Notice of Dispute.”"),
      p("The parties will have 30 days after receipt of a complete Notice of Dispute to attempt informal resolution before arbitration may be commenced, unless applicable law requires otherwise."),
    ],
  },
  {
    title: "40. BINDING INDIVIDUAL ARBITRATION",
    blocks: [
      notice("PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS."),
      p("Except for disputes that applicable law does not permit to be arbitrated, disputes arising from or relating to these Terms or the Services that cannot be resolved through the informal dispute process will be resolved through binding individual arbitration administered by the American Arbitration Association (“AAA”) under the applicable AAA Consumer Arbitration Rules and Mediation Procedures."),
      p("The arbitration agreement is governed by the Federal Arbitration Act. The arbitrator may award any individual remedy available under applicable law that would otherwise be available in court."),
      p("If the AAA is unavailable or unwilling to administer a dispute, the parties will attempt in good faith to select another nationally recognized arbitration administrator. If they cannot agree, a court of competent jurisdiction may appoint an administrator or arbitrator as permitted by law."),
      p("Nothing in this section prevents either party from seeking temporary or emergency relief from a court of competent jurisdiction where legally available and necessary to preserve rights pending arbitration."),
      h("Arbitration Opt-Out"),
      p("A User may opt out of this arbitration agreement by sending written notice to support@goldensweep.com within 30 days after first accepting these Terms."),
      p("The notice must include the User's full legal name, registered email address, and a clear statement that the User wishes to opt out of the arbitration agreement."),
      p("Opting out of arbitration will not affect the User's ability to use the Services, subject to all other eligibility requirements."),
    ],
  },
  {
    title: "41. CLASS-ACTION AND JURY-TRIAL WAIVER",
    blocks: [
      p("TO THE MAXIMUM EXTENT PERMITTED BY LAW, DISPUTES SUBJECT TO ARBITRATION MUST BE BROUGHT ON AN INDIVIDUAL BASIS AND NOT AS A PLAINTIFF OR CLASS MEMBER IN A CLASS, COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING."),
      p("TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE PARTIES WAIVE THE RIGHT TO A TRIAL BY JURY FOR DISPUTES COVERED BY THE ARBITRATION AGREEMENT."),
      p("If a court determines that a particular claim or remedy cannot lawfully be subject to the individual-action requirement, that claim or remedy will proceed as required by applicable law while the enforceable portions of this section remain effective."),
    ],
  },
  {
    title: "42. GOVERNING LAW",
    blocks: [
      p("These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-law principles, except where federal law—including the Federal Arbitration Act—or mandatory law requires otherwise."),
      p("Nothing in this provision deprives a User of non-waivable protections provided by applicable law."),
    ],
  },
  {
    title: "43. FORCE MAJEURE",
    blocks: [
      p("Golden Sweep will not be responsible for delay or failure caused by circumstances beyond its reasonable control, including natural disasters, governmental action, war, civil disturbance, telecommunications failures, widespread Internet outages, payment-network failures, cyberattacks, or similar events, subject to applicable law."),
    ],
  },
  {
    title: "44. CHANGES TO SERVICES OR TERMS",
    blocks: [
      p("Golden Sweep may modify the Services or these Terms from time to time."),
      p("Where a change is material, Golden Sweep may provide notice through the Website, Account interface, email, or another reasonable method."),
      p("The updated Terms will identify their effective date. Where required by law, additional consent may be requested before material changes become binding."),
    ],
  },
  {
    title: "45. ASSIGNMENT",
    blocks: [
      p("Users may not assign or transfer their rights or obligations under these Terms without prior written consent from Gameverse LLC."),
      p("Gameverse LLC may assign these Terms in connection with a merger, acquisition, corporate reorganization, financing, sale of assets, or similar transaction, subject to applicable law."),
    ],
  },
  {
    title: "46. SEVERABILITY, WAIVER AND SURVIVAL",
    blocks: [
      p("If a provision of these Terms is determined to be unlawful or unenforceable, it will be enforced to the maximum extent legally permissible, and the remaining provisions will remain effective."),
      p("Failure to enforce a provision on one occasion does not constitute a waiver of that provision."),
      p("Provisions that by their nature should survive Account closure or termination—including provisions relating to intellectual property, disputes, liability, investigations, and outstanding obligations—will survive as appropriate."),
    ],
  },
  {
    title: "47. POLICY HIERARCHY AND ORDER OF PRECEDENCE",
    blocks: [
      p("These Terms govern general access to and use of Golden Sweep."),
      p("Where separate rules or policies apply to a particular activity:"),
      ul(
        "The Official Sweepstakes Rules govern Sweepstakes participation and Prize redemption.",
        "Applicable promotion-specific terms govern the particular promotion to which they relate.",
        "Applicable refund and cancellation provisions govern eligible refund matters.",
        "Separate privacy and responsible-gaming disclosures govern matters within their respective scope."
      ),
      p("If there is a direct conflict concerning a Sweepstakes-specific or Prize-redemption matter, the Official Sweepstakes Rules control with respect to that matter."),
      p("If promotion-specific terms impose additional requirements for a particular promotion, those requirements apply to that promotion to the extent they do not conflict with applicable law or controlling Sweepstakes rules."),
    ],
  },
  {
    title: "48. CUSTOMER SUPPORT AND LEGAL NOTICES",
    blocks: [
      p("Questions regarding Golden Sweep may be directed to:"),
      p("Golden Sweep Customer Support"),
      kv("Email:", "support@goldensweep.com"),
      kv("Phone:", "+1 (972) 535-9119"),
      h("Written Correspondence"),
      p(ADDRESS),
      p("Formal legal notices should clearly identify the sender, Account information where applicable, the nature of the matter, and requested relief."),
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
    case "notice":
      return (
        <div key={index} className="rounded-2xl border border-gold-200/40 bg-gold-200/10 px-5 py-4 text-center font-bold uppercase tracking-wide text-gold-200">
          {block.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      );
    default:
      return (
        <p key={index} className="whitespace-pre-line">
          {block.text}
        </p>
      );
  }
}

export default function TermsConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | Golden Sweep";
    setMetaDescription(
      "Read the Golden Sweep Terms & Conditions, including eligibility, restricted jurisdictions, virtual currencies, sweepstakes participation, prize redemption, and dispute resolution."
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
              Terms & Conditions
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
              <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Registered Business Address</p>
              <p className="whitespace-pre-line">{ADDRESS}</p>
            </div>
          </header>

          <div className="mb-10 space-y-3 text-sm leading-7 text-cream/72 sm:text-base">
            <h2 className="font-heading text-xl font-bold text-gold-200">INTRODUCTION</h2>
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
            <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Golden Sweep Terms & Conditions</p>
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