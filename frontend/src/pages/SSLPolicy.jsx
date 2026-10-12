import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

// Block helpers: p = paragraph, ul = bullet list, kv = bold label + text
const p = (text) => ({ type: "p", text });
const ul = (...items) => ({ type: "ul", items });
const kv = (label, text) => ({ type: "kv", label, text });

const SITE = "https://www.goldensweep.ai";
const EMAIL = "support@goldensweep.com";

const meta = [
  ["Sponser", "Gameverse LLC"],
  ["Website", SITE],
  ["Effective Date", "October 12, 2026"],
  ["Version", "1.0"],
];

const intro = [
  `At ${SITE}, operated by Gameverse LLC, protecting the security of our Users, Accounts, transactions, and Platform is an important part of our operations. We use reasonable administrative, technical, and organizational safeguards designed to protect information and Platform activity against unauthorized access, misuse, alteration, disclosure, loss, or destruction.`,
  `This page provides general information about security measures associated with ${SITE}.`,
];

const sections = [
  {
    title: "1. SECURE CONNECTIONS",
    blocks: [
      p(`${SITE} is designed to use secure connections when information is transmitted between a User's browser or device and our Website.`),
      p(`Users should access Golden Sweep only through the official ${SITE} domain.`),
      p(`Before entering Account, payment, identity, or other sensitive information, Users should verify that they are accessing the legitimate ${SITE} Website through a secure HTTPS connection.`),
    ],
  },
  {
    title: "2. SSL/TLS ENCRYPTION",
    blocks: [
      p(`${SITE} uses SSL/TLS encryption designed to protect information transmitted between a User's browser and the Website.`),
      p("SSL/TLS technology helps protect information while it is in transit by encrypting communications between supported devices and Golden Sweep systems. This helps reduce the risk that information transmitted through a secure connection can be intercepted or read by unauthorized parties."),
      p("SSL/TLS encryption protects information in transit and should not be interpreted as a guarantee that any online system is completely secure."),
    ],
  },
  {
    title: "3. ACCOUNT SECURITY",
    blocks: [
      p("Golden Sweep uses security controls designed to help protect User Accounts."),
      p("Depending on the circumstances, these controls may include:"),
      ul(
        "Account authentication;",
        "login security;",
        "session management;",
        "access controls;",
        "suspicious-activity detection;",
        "device or network analysis;",
        "Account verification;",
        "identity verification; and",
        "temporary Account restrictions when potentially unauthorized activity is identified."
      ),
      p("Users also play an important role in protecting their Accounts."),
    ],
  },
  {
    title: "4. USER PASSWORD AND LOGIN SECURITY",
    blocks: [
      p("Users should:"),
      ul(
        "create a strong and unique password;",
        "avoid using the same password on multiple websites;",
        "keep login credentials confidential;",
        "never provide passwords to another person;",
        "avoid saving credentials on shared or public devices;",
        "log out after using a shared device;",
        "protect devices with passwords or biometric security where available; and",
        "immediately report suspected unauthorized Account access."
      ),
      p("Golden Sweep Customer Support should never need a User's Account password in order to provide ordinary assistance."),
    ],
  },
  {
    title: "5. PAYMENT SECURITY",
    blocks: [
      p("Payment information may be processed through authorized payment-service providers."),
      p("Depending on the transaction and payment method, certain sensitive payment information may be transmitted directly to or processed by the applicable payment provider."),
      p("Golden Sweep may receive information necessary to administer a transaction, such as:"),
      ul(
        "transaction identifier;",
        "payment status;",
        "amount;",
        "date and time;",
        "payment-method information;",
        "risk information;",
        "verification results; and",
        "related transaction records."
      ),
      p("Golden Sweep does not claim that every payment credential is stored directly by Gameverse LLC. Payment providers may maintain their own security controls and compliance obligations."),
    ],
  },
  {
    title: "6. IDENTITY VERIFICATION SECURITY",
    blocks: [
      p("Golden Sweep may require identity or age verification to help:"),
      ul(
        "confirm Account ownership;",
        "establish User eligibility;",
        "prevent identity fraud;",
        "protect Prize redemptions;",
        "investigate suspicious activity; and",
        "satisfy applicable compliance requirements."
      ),
      p("Identity verification may be performed with assistance from authorized service providers."),
      p("Users should provide verification information only through legitimate Golden Sweep interfaces or authorized verification processes."),
    ],
  },
  {
    title: "7. GEOLOCATION SECURITY",
    blocks: [
      p("Golden Sweep may use geographic-verification technology to determine whether a User is physically located in an eligible jurisdiction."),
      p("Geographic and technical signals may include:"),
      ul(
        "IP address;",
        "device information;",
        "network information;",
        "location signals;",
        "GPS-related information where applicable;",
        "VPN indicators;",
        "proxy indicators; and",
        "location-manipulation indicators."
      ),
      p("Users may not attempt to circumvent geographic restrictions through VPNs, proxies, GPS spoofing, false location information, remote-access tools, or similar methods."),
    ],
  },
  {
    title: "8. FRAUD PREVENTION",
    blocks: [
      p("Golden Sweep may use security and fraud-prevention controls designed to identify potentially unauthorized or prohibited activity."),
      p("These controls may consider information relating to:"),
      ul(
        "Account activity;",
        "login activity;",
        "devices;",
        "networks;",
        "geographic location;",
        "purchases;",
        "payment activity;",
        "gameplay;",
        "promotions;",
        "Gold Coins (“GC”);",
        "Sweepstakes Coins (“SC”);",
        "Redeemable Credits (“RC”);",
        "Prize-redemption activity; and",
        "other relevant security signals."
      ),
      p("Potentially suspicious activity may be subject to additional verification or review."),
    ],
  },
  {
    title: "9. PROTECTION OF STORED INFORMATION",
    blocks: [
      p("Golden Sweep uses reasonable safeguards designed to protect information maintained within systems under its control."),
      p("Depending on the system and information involved, safeguards may include:"),
      ul(
        "access restrictions;",
        "authentication controls;",
        "role-based or authorized access;",
        "secure system configurations;",
        "logging;",
        "security review;",
        "data-protection measures; and",
        "procedures for responding to security concerns."
      ),
      p("Access to sensitive information should be limited to persons or service providers with an appropriate business, operational, security, compliance, or legal need."),
    ],
  },
  {
    title: "10. THIRD-PARTY SECURITY",
    blocks: [
      p("Golden Sweep may rely on authorized third parties to provide services relating to:"),
      ul(
        "payment processing;",
        "identity verification;",
        "geographic verification;",
        "hosting or infrastructure;",
        "security;",
        "fraud prevention;",
        "communications;",
        "analytics; and",
        "other Platform functions."
      ),
      p("Third-party providers may maintain their own systems, security controls, and security responsibilities."),
      p("Golden Sweep seeks to use providers appropriate for the functions they perform, but no third-party system can be guaranteed to be completely secure."),
    ],
  },
  {
    title: "11. SECURITY MONITORING",
    blocks: [
      p("Golden Sweep may use automated and manual measures designed to identify security events or suspicious activity."),
      p("Depending on the circumstances, Golden Sweep may:"),
      ul(
        "request additional verification;",
        "require a password or credential reset;",
        "restrict a transaction;",
        "restrict certain Account functions;",
        "review Account activity;",
        "investigate suspected unauthorized activity; or",
        "temporarily restrict an Account while a security issue is reviewed."
      ),
      p("Security restrictions may remain in effect for a reasonable period necessary to investigate and address the identified concern."),
    ],
  },
  {
    title: "12. PHISHING AND FRAUDULENT WEBSITES",
    blocks: [
      p("Users should be alert to phishing attempts and websites that impersonate Golden Sweep."),
      p("Users should:"),
      ul(
        `verify that they are accessing ${SITE};`,
        "avoid clicking suspicious links;",
        "avoid providing credentials through unsolicited messages;",
        "never send passwords by email or text;",
        "verify unexpected payment or verification requests; and",
        "report suspicious communications claiming to represent Golden Sweep."
      ),
      p("Golden Sweep is not responsible for independent fraudulent websites operated by unauthorized third parties, but Users are encouraged to report suspected impersonation."),
    ],
  },
  {
    title: "13. KEEPING YOUR DEVICE SECURE",
    blocks: [
      p("Users should maintain reasonable security on devices used to access Golden Sweep."),
      p("Recommended practices include:"),
      ul(
        "installing operating-system security updates;",
        "keeping browsers current;",
        "using reputable device-security protections;",
        "securing devices with passwords or biometric authentication;",
        "avoiding untrusted public devices;",
        "avoiding suspicious downloads;",
        "securing email Accounts connected to Golden Sweep; and",
        "monitoring devices for unauthorized access."
      ),
      p("A compromised device or email Account may increase the risk of unauthorized Golden Sweep Account access."),
    ],
  },
  {
    title: "14. REPORTING UNAUTHORIZED ACCOUNT ACTIVITY",
    blocks: [
      p("Users who believe their Account has been accessed without authorization should contact Golden Sweep as soon as reasonably possible."),
      kv("Contact:", EMAIL),
      p("Users should provide sufficient information to identify the Account and describe the suspected activity."),
      p("Golden Sweep may temporarily restrict the Account while investigating."),
      p("Users may be asked to:"),
      ul(
        "verify identity;",
        "reset credentials;",
        "identify unauthorized transactions;",
        "confirm recent Account activity; or",
        "provide other information reasonably necessary to investigate."
      ),
    ],
  },
  {
    title: "15. REPORTING SECURITY CONCERNS",
    blocks: [
      p(`If a User discovers a potential security issue involving ${SITE}, the User should report it to:`),
      p(EMAIL),
      p("The report should include enough information for Golden Sweep to understand and investigate the concern."),
      p("Users should not exploit a suspected vulnerability, access information belonging to another User, interfere with Platform operation, or publicly disclose sensitive information in a manner that could create additional security risk."),
    ],
  },
  {
    title: "16. SHARED RESPONSIBILITY",
    blocks: [
      p("Platform security is a shared responsibility."),
      p("Golden Sweep is responsible for maintaining reasonable safeguards for systems and information under its control."),
      p("Users are responsible for taking reasonable steps to protect:"),
      ul(
        "passwords;",
        "email Accounts;",
        "devices;",
        "payment methods;",
        "authentication information; and",
        "other credentials under their control."
      ),
      p("Users should promptly notify Golden Sweep if they suspect their Account has been compromised."),
    ],
  },
  {
    title: "17. NO SYSTEM IS COMPLETELY SECURE",
    blocks: [
      p("No Internet-based service, electronic transmission, storage system, payment system, or security technology can guarantee absolute security."),
      p("Although Golden Sweep uses safeguards designed to reduce security risks, we cannot guarantee that unauthorized access, cyberattacks, technical failures, or other security incidents will never occur."),
      p("Nothing on this page should be interpreted as a guarantee of absolute security."),
    ],
  },
  {
    title: "18. SECURITY UPDATES",
    blocks: [
      p("Golden Sweep may update its security practices as:"),
      ul(
        "technology evolves;",
        "Platform functionality changes;",
        "security threats develop;",
        "service providers change;",
        "compliance requirements change; or",
        "additional safeguards become appropriate."
      ),
      p("This SSL Encryption & Security page may be updated to reflect material changes in our public-facing security practices."),
    ],
  },
  {
    title: "19. CONTACT US",
    blocks: [
      p("For Account-security concerns, suspected unauthorized activity, or questions concerning this page, contact:"),
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

export default function SSLSecurity() {
  useEffect(() => {
    document.title = "SSL Encryption & Security | Golden Sweep";
    setMetaDescription(
      "Learn how Golden Sweep uses SSL/TLS encryption and other safeguards to help protect accounts, payments, and personal information, and how you can stay safe."
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
              SSL Encryption & Security
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
            <p className="font-semibold uppercase tracking-[0.14em] text-gold-200">Golden Sweep — SSL Encryption & Security</p>
            <p className="mt-1">Effective Date: October 12, 2026 · Version 1.0</p>
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