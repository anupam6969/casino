import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Block helpers
// p = paragraph, h = sub-heading, ul = bullets, ol = numbered list, kv = bold label + text,
// notice = highlighted box, hl = highlighted line, quote = quoted statement, table = simple table
const p = (text) => ({ type: "p", text });
const h = (text) => ({ type: "h", text });
const ul = (...items) => ({ type: "ul", items });
const ol = (...items) => ({ type: "ol", items });
const kv = (label, text) => ({ type: "kv", label, text });
const notice = (...lines) => ({ type: "notice", lines });
const hl = (text) => ({ type: "hl", text });
const quote = (text) => ({ type: "quote", text });
const table = (head, rows) => ({ type: "table", head, rows });

const SITE = "https://www.goldensweep.ai";
const EMAIL = "support@goldensweep.com";
const PHONE = "+1 (972) 535-9119";
const ADDRESS = "Gameverse LLC / Golden Sweep\n16192 Coastal Highway\nLewes, Delaware 19958\nUnited States";

const meta = [
  ["Sponsor", "Gameverse LLC"],
  ["Website", SITE],
  ["Effective Date", "October 12, 2026"],
  ["Version", "1.1"],
];

const noPurchase = [
  "NO PURCHASE OR PAYMENT IS NECESSARY TO ENTER, PARTICIPATE, OR WIN.",
  "A PURCHASE WILL NOT INCREASE A PARTICIPANT'S CHANCES OF WINNING.",
];

const intro = [
  `These Official Sweepstakes Rules (“Official Rules”) govern Sweepstakes promotions offered through ${SITE} by Gameverse LLC (“Sponsor,” “Gameverse,” “Golden Sweep,” “we,” “us,” or “our”).`,
  "Participation constitutes acceptance of these Official Rules.",
];

const sections = [
  {
    title: "1. NO PURCHASE NECESSARY",
    blocks: [
      p("No purchase or payment is necessary to obtain eligible Sweepstakes participation opportunities, participate in Sweepstakes gameplay, or win a Prize."),
      p("A purchase does not increase the odds or chances of winning."),
      p("Eligible Participants may obtain Sweepstakes Coins (“SC”) through free promotional methods, including the free Alternative Method of Entry (“AMOE”) described in these Official Rules."),
      p("Gold Coin purchases are separate from the free Sweepstakes opportunity."),
    ],
  },
  {
    title: "2. SPONSOR AND SCOPE",
    blocks: [
      p("The Sponsor is:"),
      p(ADDRESS),
      kv("Customer Support:", EMAIL),
      p(`These Official Rules govern Sweepstakes participation and Prize redemption through ${SITE}.`),
    ],
  },
  {
    title: "3. ELIGIBILITY",
    blocks: [
      p("To participate, a person must:"),
      ol(
        "be at least eighteen (18) years old or the age of legal majority in the person's jurisdiction, whichever is greater;",
        "be physically located in an eligible U.S. jurisdiction when participating;",
        "maintain an eligible Golden Sweep Account in the person's own name;",
        "provide accurate registration information;",
        "satisfy applicable identity, age, residence, location, Account, payment, tax, security, and compliance verification requirements;",
        "not be an ineligible person under Rule 4;",
        "not be located in a Restricted Jurisdiction under Rule 5; and",
        "comply with these Official Rules."
      ),
      p("Eligibility is determined based on the Participant's physical location and other applicable requirements at the relevant time."),
    ],
  },
  {
    title: "4. INELIGIBLE PERSONNEL",
    blocks: [
      p("The following persons are not eligible to participate in Golden Sweep Sweepstakes:"),
      ul(
        "employees, officers, directors, representatives, and agents of Gameverse LLC;",
        "persons directly involved in administering, developing, operating, auditing, or promoting the Sweepstakes;",
        "employees and representatives of service providers materially involved in Sweepstakes administration where their duties could provide access to nonpublic information or affect Sweepstakes outcomes;",
        "members of the immediate family of an ineligible person; and",
        "persons residing in the same household as an ineligible person."
      ),
      p("For purposes of this Rule, immediate family includes a spouse, domestic partner, parent, child, sibling, and their respective spouses or domestic partners."),
    ],
  },
  {
    title: "5. RESTRICTED JURISDICTIONS",
    blocks: [
      p(`Golden Sweep Sweepstakes and the ${SITE} Services are not available in the following jurisdictions:`),
      p("California, Connecticut, Delaware, Idaho, Indiana, Louisiana, Maine, Michigan, Montana, Nevada, New Jersey, New York, Oklahoma, Tennessee, Utah, and Washington."),
      p("Participation is also void wherever prohibited by applicable law."),
      p(`The geographic restriction applies to the entire ${SITE} Website and Services, including:`),
      ul(
        "eligibility;",
        "Account access;",
        "geolocation;",
        "promotional marketing where applicable;",
        "purchases;",
        "gameplay;",
        "Sweepstakes participation; and",
        "Prize redemption."
      ),
      p("A Participant physically located in a Restricted Jurisdiction may not participate in Golden Sweep Services."),
      p("Participants may not use a VPN, proxy, GPS-spoofing technology, remote-access software, false location information, or another method intended to disguise, manipulate, or circumvent physical-location restrictions."),
      p("Golden Sweep may conduct location verification at appropriate points before or during Account access, gameplay, transactions, Sweepstakes participation, or Prize redemption."),
    ],
  },
  {
    title: "6. SWEEPSTAKES COINS",
    blocks: [
      h("6.1 Nature of Sweepstakes Coins"),
      p("Sweepstakes Coins (“SC”) are free promotional play credits used for eligible Sweepstakes gameplay."),
      p("SC:"),
      ul(
        "are not sold separately;",
        "are not legal tender;",
        "are not cash;",
        "do not themselves constitute a Prize;",
        "cannot themselves be redeemed for cash or a Prize;",
        "cannot be transferred between Participants; and",
        "may be used only as permitted through Golden Sweep."
      ),
      h("6.2 Obtaining Sweepstakes Coins"),
      p("Eligible Participants may obtain SC through methods including:"),
      ul(
        "the free postal AMOE described below;",
        "daily or periodic promotional awards;",
        "promotional campaigns;",
        "promotional SC accompanying eligible Gold Coin package offers;",
        "social-media or special promotions where offered; and",
        "other free promotional methods made available by Golden Sweep."
      ),
      p("Availability and amounts may vary by promotion."),
      p("No purchase is necessary to obtain an eligible Sweepstakes participation opportunity."),
    ],
  },
  {
    title: "7. GOLD COINS AND SWEEPSTAKES GAMEPLAY",
    blocks: [
      p("Gold Coins (“GC”) and Sweepstakes Coins are separate."),
      p("Gold Coins are virtual entertainment credits. GC have no cash value and cannot be redeemed for Prizes."),
      p("Sweepstakes Coins are free promotional play credits that may be used in eligible Sweepstakes gameplay."),
      p("Eligible winning outcomes resulting from qualifying SC gameplay may produce separately recorded Redeemable Credits (“RC”), subject to these Official Rules."),
      p("GC gameplay and SC Sweepstakes gameplay are maintained as distinct modes."),
    ],
  },
  {
    title: "8. FREE ALTERNATIVE METHOD OF ENTRY — POSTAL AMOE",
    blocks: [
      p("Eligible Participants may obtain Sweepstakes Coins without making a purchase by using the following free postal Alternative Method of Entry."),
      h("8.1 Promotional Award"),
      p("Each valid AMOE request will receive:"),
      hl("3 Sweepstakes Coins (3 SC)."),
      p("There is no purchase requirement."),
      p("There is no fixed numerical limit on the number of valid AMOE requests an eligible Participant may submit, provided that:"),
      ul(
        "each request independently satisfies these Official Rules;",
        "each request is separately prepared;",
        "each request is separately mailed; and",
        "each envelope contains only one request."
      ),
      p("Each valid AMOE award provides the same Sweepstakes opportunity as an equivalent amount of SC obtained through another eligible promotional method."),
    ],
  },
  {
    title: "9. REQUIRED AMOE INDEX CARD",
    blocks: [
      p("For each request, the Participant must use a:"),
      hl("Standard, white, one-sided, unfolded, unlined 4 × 6-inch index card."),
      p("The Participant must personally and legibly handwrite the following information on the card in the following order:"),
      ol(
        "Full legal name;",
        `${SITE} username;`,
        "Email address registered to the Golden Sweep Account;",
        "Residential address;",
        "Date of birth; and",
        "The following exact statement:"
      ),
      quote(`“I request 3 Sweepstakes Coins through the ${SITE} Alternative Method of Entry. I have read and agree to the ${SITE} Official Sweepstakes Rules.”`),
      p("The request must be personally and manually handwritten by the Participant."),
      p("Photocopied, printed, typed, mechanically reproduced, computer-generated, automated, stamped, or otherwise non-handwritten requests are not valid."),
    ],
  },
  {
    title: "10. AMOE ENVELOPE AND MAILING",
    blocks: [
      p("Place each completed 4 × 6-inch index card in a separate envelope."),
      p("Each envelope must:"),
      ul(
        "contain only one AMOE request;",
        "display the Participant's return address;",
        "display the words “AMOE REQUEST” on the outside;",
        "have sufficient postage; and",
        "be individually mailed."
      ),
      p("Bulk submissions or multiple requests in one envelope are not permitted."),
      p("Mail requests to:"),
      p("Gameverse LLC / Golden Sweep — AMOE Request\n16192 Coastal Highway\nLewes, Delaware 19958\nUnited States"),
      p("The Participant is responsible for applicable postage."),
    ],
  },
  {
    title: "11. AMOE ACCOUNT MATCHING AND PROCESSING",
    blocks: [
      p("Information contained in an AMOE request must reasonably match the information associated with the Participant's eligible Golden Sweep Account."),
      p("Golden Sweep may validate the Participant's:"),
      ul(
        "legal name;",
        "username;",
        "registered email;",
        "residential address;",
        "date of birth;",
        "Account status; and",
        "eligibility."
      ),
      p("A valid AMOE request will generally be processed and credited with 3 SC within seven (7) business days after receipt and successful validation."),
      p("Processing may take longer where reasonable verification is required."),
      p("No purchase history may be required as a condition of validating an otherwise eligible AMOE request."),
    ],
  },
  {
    title: "12. INVALID AMOE REQUESTS",
    blocks: [
      p("An AMOE request may be rejected where, for example:"),
      ul(
        "required information is missing;",
        "information is illegible;",
        "information materially fails to match the Participant's Account;",
        "the required statement is missing or materially altered;",
        "the request is not personally handwritten;",
        "the required 4 × 6-inch card is not used;",
        "more than one request is included in an envelope;",
        "the request is mechanically reproduced or automated;",
        "the Participant is ineligible;",
        "the Account is fraudulent or not legitimately controlled by the Participant; or",
        "the request otherwise materially fails to comply with the published AMOE requirements."
      ),
      p("An AMOE request will not be rejected merely because the Participant did not make a purchase."),
    ],
  },
  {
    title: "13. AMOE ADMINISTRATION AND RECORDS",
    blocks: [
      p("Golden Sweep may maintain reasonable records relating to:"),
      ul(
        "AMOE receipt;",
        "validation;",
        "Account matching;",
        "approval or rejection;",
        "SC crediting;",
        "processing dates; and",
        "suspected duplicate, fraudulent, or automated requests."
      ),
      p("AMOE requests become administrative records of the Sponsor upon receipt and may not be returned."),
    ],
  },
  {
    title: "14. 1× PLAYTHROUGH REQUIREMENT",
    blocks: [
      p("Unless applicable promotion-specific terms expressly provide otherwise, applicable SC must satisfy a one-time (1×) playthrough requirement through eligible Sweepstakes gameplay before qualifying winning outcomes may result in eligible RC."),
      p("For example:"),
      p("If a Participant receives 10 SC, the Participant must use the applicable 10 SC once in qualifying Sweepstakes gameplay to satisfy the 1× playthrough requirement."),
      p("The requirement applies, as applicable, to:"),
      ul(
        "SC obtained through the AMOE;",
        "promotional SC accompanying eligible Gold Coin package offers;",
        "free promotional SC; and",
        "other applicable promotional SC."
      ),
      p("Playthrough does not guarantee a winning outcome or Prize."),
    ],
  },
  {
    title: "15. WINNING OUTCOMES AND REDEEMABLE CREDITS",
    blocks: [
      p("Eligible winning outcomes from qualifying SC gameplay, after applicable requirements have been satisfied, may produce separately recorded Redeemable Credits (“RC”)."),
      p("RC are distinct from both GC and SC."),
      ul(
        "GC cannot be redeemed for Prizes.",
        "SC themselves cannot be redeemed for Prizes.",
        "Only eligible RC may be submitted for Prize redemption."
      ),
      p("The amount of RC resulting from an eligible winning outcome will be determined according to the applicable game outcome and displayed information."),
    ],
  },
  {
    title: "16. REDEMPTION ELIGIBILITY",
    blocks: [
      p("Before an RC balance may be redeemed for a Prize, the Participant must:"),
      ol(
        "maintain an eligible Account in good standing;",
        "possess sufficient eligible RC;",
        "satisfy applicable playthrough requirements;",
        "successfully complete required identity and age verification;",
        "successfully complete applicable geographic verification;",
        "satisfy Account and payment-ownership requirements;",
        "provide requested tax information where required;",
        "satisfy applicable fraud, sanctions, security, and compliance review;",
        "not be subject to a restriction preventing redemption; and",
        "otherwise comply with these Official Rules."
      ),
      p("Submitting a redemption request does not itself constitute approval of the request."),
    ],
  },
  {
    title: "17. MINIMUM REDEMPTION",
    blocks: [
      p("The minimum Prize-redemption request is:"),
      hl("50 RC."),
      p("A Participant must have at least 50 eligible RC available at the time the request is submitted."),
    ],
  },
  {
    title: "18. PLAYER-TIER REDEMPTION MAXIMUMS",
    blocks: [
      p("Golden Sweep applies maximum redemption limits based on the Participant's current Player Tier."),
      h("18.1 Standard and VIP Tier Limits"),
      table(
        ["Player Tier", "Maximum Redemption"],
        [
          ["Iron through Gold", "$2,500"],
          ["Platinum through Sapphire", "$5,000"],
          ["Emerald", "$7,500"],
        ]
      ),
    ],
  },
  {
    title: "19. PLAYER-TIER CRITERIA AND LIMIT INCREASES",
    blocks: [
      p("Player Tier status is determined through Golden Sweep's applicable player-level program based on objective Account and activity criteria established for the applicable tier."),
      p("For purposes of redemption-limit increases above $7,500, an increase is not guaranteed."),
      p("A Participant requesting or being considered for an increase above $7,500 must, at minimum:"),
      ol(
        "maintain an active Account in good standing;",
        "demonstrate a consistent legitimate purchase and gameplay history;",
        "have no history of material violations, promotion abuse, payment abuse, fraudulent activity, or other disqualifying misconduct; and",
        "satisfy applicable identity, security, fraud, payment, and compliance reviews."
      ),
      p("Any increase above $7,500 requires documented review and approval by an authorized representative of Gameverse LLC."),
      p("An increased limit does not create a permanent entitlement to that limit."),
      p("Any approved increase remains subject to continuing eligibility and applicable compliance requirements."),
    ],
  },
  {
    title: "20. CHANGES TO REDEMPTION LIMITS",
    blocks: [
      p("Golden Sweep may prospectively adjust redemption limits where reasonably necessary because of:"),
      ul(
        "banking or payment-network requirements;",
        "applicable legal or regulatory requirements;",
        "compliance requirements;",
        "system-integrity considerations;",
        "security requirements; or",
        "anti-fraud controls."
      ),
      p("Where reasonably practicable, material changes will be communicated or displayed before they apply to a new redemption request."),
      p("A change to a redemption limit will not, by itself, automatically void or forfeit an otherwise legitimate eligible RC balance."),
      p("Nothing in this Rule authorizes Golden Sweep to withhold an eligible Prize in violation of applicable law."),
    ],
  },
  {
    title: "21. REDEMPTION REQUEST FREQUENCY",
    blocks: [
      p("There is no fixed numerical limit on the number of eligible redemption requests a Participant may submit."),
      p("Each request:"),
      ul(
        "must independently satisfy the minimum and applicable maximum;",
        "is subject to verification;",
        "may be subject to processing controls; and",
        "remains subject to these Official Rules."
      ),
      p("Golden Sweep may investigate patterns reasonably indicative of fraud, abuse, structuring, or attempts to circumvent an applicable redemption limit."),
    ],
  },
  {
    title: "22. HOW TO REQUEST PRIZE REDEMPTION",
    blocks: [
      p("An eligible Participant may initiate a Prize redemption through the Redeem functionality made available through the Account."),
      p("The redemption interface may display:"),
      ul(
        "available eligible RC;",
        "available redemption methods;",
        "minimum redemption amount;",
        "applicable Player Tier;",
        "applicable maximum;",
        "verification requirements; and",
        "other information necessary to submit the request."
      ),
      p("Redemptions must be requested by the verified Account holder."),
      p("Where required, the receiving payment Account or method must belong to or be lawfully controlled by the verified Participant."),
    ],
  },
  {
    title: "23. REDEMPTION VERIFICATION",
    blocks: [
      p("Before approving or releasing a Prize, Golden Sweep may verify:"),
      ul(
        "identity;",
        "age;",
        "residence;",
        "physical location;",
        "Account ownership;",
        "payment ownership;",
        "eligibility;",
        "RC history;",
        "applicable playthrough;",
        "Player Tier;",
        "tax information;",
        "sanctions status;",
        "fraud indicators; and",
        "other information reasonably necessary for compliance."
      ),
      p("Golden Sweep may use authorized identity-verification, geolocation, payment, financial-services, fraud-prevention, security, or compliance providers to assist with these processes."),
    ],
  },
  {
    title: "24. REDEMPTION REVIEW PERIOD",
    blocks: [
      p("Where available and appropriate, Golden Sweep may attempt to process eligible redemption requests promptly or through automated processing."),
      p("A redemption request may require up to 24 hours after submission for Golden Sweep's review before approval or release."),
      p("Additional time may be required where:"),
      ul(
        "identity verification is incomplete;",
        "payment information requires correction;",
        "compliance review is required;",
        "suspicious activity is identified;",
        "additional documentation is reasonably required; or",
        "circumstances outside Golden Sweep's reasonable control cause delay."
      ),
    ],
  },
  {
    title: "25. EXPECTED PRIZE DELIVERY",
    blocks: [
      p("After an eligible redemption request has been approved and released, Prize delivery will generally occur within:"),
      hl("1–3 business days."),
      p("Actual delivery timing may depend on:"),
      ul(
        "the receiving financial institution;",
        "the selected payment method;",
        "payment networks;",
        "weekends or holidays;",
        "processing interruptions;",
        "additional verification; or",
        "circumstances outside Golden Sweep's reasonable control."
      ),
      p("The 1–3 business-day period generally begins after approval and release, not merely when the request is submitted."),
    ],
  },
  {
    title: "26. REDEMPTION FEES",
    blocks: [
      p("Golden Sweep does not currently charge a Golden Sweep redemption fee for an eligible Prize redemption."),
      p("A bank, payment provider, financial institution, or other third party may impose its own fees or charges."),
      p("Golden Sweep does not control independent third-party charges."),
    ],
  },
  {
    title: "27. REJECTED OR RETURNED REDEMPTIONS",
    blocks: [
      p("If an approved redemption cannot be completed because the payment is rejected, returned, or unsuccessful:"),
      ol(
        "Golden Sweep will reconcile the unsuccessful transaction;",
        "the eligible amount will be returned to the Participant's eligible Account balance where appropriate;",
        "the Participant may be notified that the payment was unsuccessful;",
        "the Participant may be required to correct or verify payment information; and",
        "the Participant may submit a new eligible redemption request."
      ),
      p("Golden Sweep will not knowingly issue a duplicate Prize for the same RC."),
      p("An unsuccessful payment does not automatically cause the underlying eligible RC to be forfeited."),
    ],
  },
  {
    title: "28. AFFIDAVIT OF ELIGIBILITY AND RELEASE",
    blocks: [
      p("Golden Sweep may require a potential Prize recipient to execute and return an affidavit or declaration of eligibility and, where lawful and appropriate, a liability release."),
      p("Additional documentation may be required for significant Prizes or where necessary to satisfy legal, tax, reporting, or compliance obligations."),
      p("A publicity release will only be required where lawful and appropriately disclosed."),
      p("Failure to provide required documentation within a reasonable stated period may delay or prevent Prize delivery where the documentation is legally or operationally necessary."),
    ],
  },
  {
    title: "29. TAXES AND REPORTING",
    blocks: [
      p("Prize recipients are responsible for determining and satisfying their applicable tax obligations."),
      p("Golden Sweep may:"),
      ul(
        "request a Form W-9 or other taxpayer information;",
        "verify taxpayer-identification information;",
        "issue applicable tax forms;",
        "report Prize information to governmental authorities;",
        "maintain required tax records; and",
        "withhold amounts where required by law."
      ),
      p("A Participant's refusal or failure to provide legally required tax information may prevent or delay Prize payment."),
    ],
  },
  {
    title: "30. PROMOTION AND PRIZE COMPLIANCE RESPONSIBILITY",
    blocks: [
      p("Before a Golden Sweep promotion begins, the person responsible for promotion compliance will review and address, as applicable:"),
      ul(
        "promotion registration requirements;",
        "bonding or security requirements;",
        "required governmental filings;",
        "state-specific Prize requirements;",
        "applicable Prize caps;",
        "tax-reporting requirements;",
        "withholding requirements;",
        "eligibility requirements;",
        "geographic restrictions;",
        "no-purchase entry requirements; and",
        "other applicable promotion-specific legal or compliance obligations."
      ),
      p("For Gameverse LLC, the designated person responsible for this review is:"),
      p("Adeep Gurung\nFounder and Authorized Representative\nGameverse LLC"),
      p("The designated responsible person may obtain advice or assistance from legal counsel, compliance consultants, payment providers, tax professionals, or other qualified service providers as appropriate."),
      p("A promotion requiring registration, bonding, filing, or other pre-launch action should not begin until the applicable requirement has been addressed."),
    ],
  },
  {
    title: "31. PROMOTION AND PRIZE RECORDS",
    blocks: [
      p("Gameverse LLC may maintain records reasonably necessary to document Sweepstakes and Prize administration, including as applicable:"),
      ul(
        "applicable Official Rules and promotion-specific terms;",
        "promotion dates;",
        "approval records;",
        "eligibility requirements;",
        "applicable geographic restrictions;",
        "AMOE records;",
        "SC promotional awards;",
        "qualifying gameplay records;",
        "RC records;",
        "redemption requests;",
        "approval or rejection records;",
        "Prize-payment status;",
        "verification results;",
        "tax documentation;",
        "compliance review records;",
        "required filings or registrations;",
        "bonding or security records where applicable; and",
        "customer communications relating to material Prize matters."
      ),
      p("Authorized payment or verification providers may separately maintain records generated through their systems in accordance with their applicable responsibilities and retention practices."),
      p("Gameverse LLC may retain information or records received from those providers to the extent reasonably necessary for Sweepstakes administration, reconciliation, compliance, fraud prevention, tax reporting, dispute handling, or legal obligations."),
    ],
  },
  {
    title: "32. PRIZE CONDITIONS",
    blocks: [
      p("Prizes:"),
      ul(
        "are subject to verification;",
        "are payable only to an eligible verified Participant;",
        "may not be transferred to another person except where expressly permitted;",
        "may not be assigned or sold before delivery;",
        "may be subject to tax reporting;",
        "may be delayed while legitimate verification or compliance review is pending; and",
        "remain subject to applicable law."
      ),
      p("Golden Sweep may require reasonable documentation before releasing a Prize."),
    ],
  },
  {
    title: "33. ODDS",
    blocks: [
      p("The odds of obtaining a particular winning outcome depend on the applicable Sweepstakes game and its available outcomes."),
      p("SC obtained through the free AMOE provide the same Sweepstakes opportunity as an equivalent amount of eligible SC obtained through another promotional method."),
      p("Making a purchase does not increase the odds or chances of winning."),
    ],
  },
  {
    title: "34. SWEEPSTAKES-SPECIFIC PROHIBITED CONDUCT",
    blocks: [
      p("Participants may not:"),
      ul(
        "create or control unauthorized multiple Accounts;",
        "submit fraudulent or automated AMOE requests;",
        "falsify AMOE information;",
        "manipulate location;",
        "use VPNs, proxies, GPS spoofing, or other methods to circumvent geographic restrictions;",
        "manipulate gameplay;",
        "exploit errors or vulnerabilities;",
        "use bots or unauthorized automation;",
        "collude with others;",
        "engage in promotion or bonus abuse;",
        "use another person's identity;",
        "use unauthorized payment methods;",
        "falsify verification information;",
        "manipulate Player Tier status;",
        "artificially structure redemption requests to circumvent applicable limits;",
        "interfere with verification or security systems; or",
        "engage in fraud or other unlawful conduct."
      ),
    ],
  },
  {
    title: "35. INVESTIGATION AND DISQUALIFICATION",
    blocks: [
      p("Where Golden Sweep reasonably suspects a material violation of these Official Rules, fraud, abuse, manipulation, ineligibility, or unlawful activity, it may investigate."),
      p("During an investigation, Golden Sweep may temporarily restrict:"),
      ul(
        "Sweepstakes participation;",
        "Account functionality;",
        "promotional awards;",
        "gameplay;",
        "RC activity; or",
        "redemption."
      ),
      p("If a material violation is substantiated, Golden Sweep may disqualify affected participation, correct improperly obtained benefits or credits, deny invalid claims, or take other proportionate action permitted by law."),
      p("A legitimate Prize or eligible RC will not be forfeited merely because a Participant is subject to a review; there must be an applicable basis under these Official Rules or law for adverse action."),
    ],
  },
  {
    title: "36. TECHNICAL OR ACCOUNTING ERRORS",
    blocks: [
      p("Golden Sweep may correct genuine technical, display, calculation, accounting, or system errors."),
      p("If a system error incorrectly credits or debits GC, SC, RC, or a Prize amount, Golden Sweep may make a reasonable correction supported by applicable system records."),
      p("Golden Sweep will not knowingly rely on this Rule to retroactively alter a legitimate outcome merely because the outcome is unfavorable to Golden Sweep."),
    ],
  },
  {
    title: "37. SUSPENSION, MODIFICATION, OR TERMINATION OF A PROMOTION",
    blocks: [
      p("Golden Sweep may suspend, modify, or terminate a promotion where reasonably necessary because of:"),
      ul(
        "fraud or abuse;",
        "technical failure;",
        "cybersecurity incidents;",
        "system-integrity concerns;",
        "governmental action;",
        "legal or regulatory requirements;",
        "circumstances materially affecting fair administration; or",
        "events outside Golden Sweep's reasonable control."
      ),
      p("Where practicable, Golden Sweep will administer already-accrued eligible rights in a manner consistent with the applicable rules and law."),
    ],
  },
  {
    title: "38. PRIVACY",
    blocks: [
      p("Golden Sweep may collect and process information reasonably necessary to administer Sweepstakes, validate AMOE requests, verify eligibility, maintain Account records, conduct geolocation and security checks, process redemptions, prevent fraud, satisfy tax requirements, and comply with applicable law."),
      p("Applicable privacy disclosures are provided separately."),
    ],
  },
  {
    title: "39. RESPONSIBLE PARTICIPATION",
    blocks: [
      p("Golden Sweep Sweepstakes are intended for entertainment."),
      p("Participants should maintain reasonable limits on time and spending and should not treat Sweepstakes participation as a source of income or a solution to financial difficulties."),
      p("Golden Sweep may make responsible-gaming controls available to eligible Users."),
    ],
  },
  {
    title: "40. PROMOTION-SPECIFIC TERMS",
    blocks: [
      p("Certain promotions may include additional written terms concerning matters such as:"),
      ul(
        "promotion dates;",
        "eligibility;",
        "promotional SC amounts;",
        "participation requirements;",
        "game availability; or",
        "other promotion-specific conditions."
      ),
      p("Promotion-specific terms supplement these Official Rules."),
      p("They may not eliminate the free AMOE or create a purchase requirement where doing so would conflict with the Sweepstakes structure described in these Official Rules."),
    ],
  },
  {
    title: "41. CHANGES TO THESE OFFICIAL RULES",
    blocks: [
      p("Golden Sweep may update these Official Rules prospectively to reflect changes in law, regulatory requirements, Platform functionality, promotions, compliance practices, or operational requirements."),
      p("Material changes will be posted or otherwise communicated where appropriate."),
      p("Changes will not be applied retroactively to deprive a Participant of a Prize already validly won except where required by law or necessary to correct fraud or a genuine technical/accounting error."),
    ],
  },
  {
    title: "42. SPONSOR AND CUSTOMER SUPPORT",
    blocks: [
      p("Sponsor:"),
      p(ADDRESS),
      kv("Customer Support:", EMAIL),
      kv("Phone:", PHONE),
      p("Questions concerning Sweepstakes participation, AMOE requests, RC, or Prize redemption may be directed to Customer Support."),
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

function Notice({ lines }) {
  return (
    <div className="rounded-2xl border border-gold-200/40 bg-gold-200/10 px-5 py-4 text-center text-sm font-bold uppercase tracking-wide text-gold-200 sm:text-base">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
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
      return <Notice key={index} lines={block.lines} />;
    case "hl":
      return (
        <p key={index} className="rounded-xl border border-gold-200/30 bg-white/5 px-4 py-3 text-center font-bold text-gold-200">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote key={index} className="border-l-4 border-gold-200/60 bg-white/5 px-4 py-3 italic text-cream/85">
          {block.text}
        </blockquote>
      );
    case "table":
      return (
        <div key={index} className="overflow-x-auto rounded-xl border border-gold-200/30">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-gold-200/10 text-gold-200">
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-gold-200/20">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3">
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
        <p key={index} className="whitespace-pre-line">
          {block.text}
        </p>
      );
  }
}

export default function OfficialRules() {
  useEffect(() => {
    document.title = "Official Sweepstakes Rules | Golden Sweep";
    setMetaDescription(
      "Read the Golden Sweep Official Sweepstakes Rules, including free AMOE entry, Sweepstakes Coins, Redeemable Credits, prize redemption, limits, and eligibility."
    );
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-cream">
      <Navbar />
      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_26%_16%,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_80%_42%,rgba(231,184,69,0.1),transparent_28%)]" />
        <article className="relative z-10 mx-auto max-w-[900px] rounded-3xl border border-gold-200/30 bg-black/55 p-5 shadow-luxury backdrop-blur-2xl sm:p-8 lg:p-10">
          <header className="mb-8 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-black text-white md:text-5xl">
              Official Sweepstakes Rules
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

          <div className="mb-10 space-y-4">
            <h2 className="text-center font-heading text-sm font-bold uppercase tracking-[0.18em] text-gold-200">Important Notice</h2>
            <Notice lines={noPurchase} />
            <div className="space-y-3 text-sm leading-7 text-cream/72 sm:text-base">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
            <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Golden Sweep Official Sweepstakes Rules</p>
            <p className="mt-1">Effective Date: October 12, 2026 · Version 1.1</p>
            <p className="mt-3 font-semibold uppercase">
              No purchase or payment necessary. A purchase will not increase your chances of winning. Void where prohibited.
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