import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const sections = [
  {
    title: "1. Overview",
    body: [
      "This Privacy Policy explains how Golden Sweep collects, uses, discloses, and protects information when you visit the website, create an account, contact support, or interact with our entertainment services.",
      "By using the website, you acknowledge that your information will be handled as described in this policy.",
    ],
  },
  {
    title: "2. Information We Collect",
    body: [
      "We may collect information you provide directly, such as username, email address, login credentials, support messages, verification details, payment-related information, and promotional preferences.",
      "We may also collect technical and usage information such as device details, browser type, IP address, pages viewed, session activity, referral URLs, approximate location, and security logs.",
    ],
  },
  {
    title: "3. How We Use Information",
    body: [
      "We use information to create and manage accounts, provide website features, process support requests, operate promotions, maintain security, detect fraud, personalize the experience, and comply with legal obligations.",
      "We may use aggregated or de-identified information to understand website performance, improve content, and evaluate platform reliability.",
    ],
  },
  {
    title: "4. Cookies and Similar Technologies",
    body: [
      "We may use cookies, local storage, pixels, and similar technologies to keep you signed in, remember preferences, measure traffic, improve performance, and protect the website.",
      "You can adjust browser settings to limit cookies, but some features may not work correctly if cookies are disabled.",
    ],
  },
  {
    title: "5. Sharing of Information",
    body: [
      "We may share information with service providers that help us operate the website, including hosting, analytics, payment, verification, security, customer support, and communications providers.",
      "We may also disclose information if required by law, to protect rights and safety, to investigate suspected fraud or abuse, or in connection with a business transaction such as a merger, acquisition, or asset transfer.",
    ],
  },
  {
    title: "6. Third-Party Links",
    body: [
      "The website may link to third-party websites, social platforms, payment providers, or partner services. Their privacy practices are governed by their own policies, not this Privacy Policy.",
      "We encourage you to review third-party privacy notices before providing information to those services.",
    ],
  },
  {
    title: "7. Data Security",
    body: [
      "We use reasonable administrative, technical, and organizational safeguards designed to protect information from unauthorized access, misuse, loss, and alteration.",
      "No online service can guarantee absolute security. You are responsible for protecting your account credentials and notifying us if you suspect unauthorized access.",
    ],
  },
  {
    title: "8. Data Retention",
    body: [
      "We retain information for as long as needed to provide the services, maintain records, resolve disputes, enforce terms, prevent fraud, and comply with legal obligations.",
      "When information is no longer needed, we may delete, anonymize, or securely retain it as required by applicable law and operational needs.",
    ],
  },
  {
    title: "9. Your Choices",
    body: [
      "You may request access, correction, or deletion of certain account information by contacting support. We may need to verify your identity before processing requests.",
      "You may opt out of certain promotional communications by using available unsubscribe tools or contacting us. Important account or security messages may still be sent.",
    ],
  },
  {
    title: "10. Children's Privacy",
    body: [
      "The website is not intended for children or anyone below the required age of eligibility. We do not knowingly collect personal information from children.",
      "If we learn that information has been collected from an ineligible user, we may delete it and restrict account access.",
    ],
  },
  {
    title: "11. International Use",
    body: [
      "Your information may be processed in locations where we or our service providers operate. Data protection laws may differ from those in your jurisdiction.",
      "By using the website, you understand that information may be transferred, stored, and processed as described in this policy.",
    ],
  },
  {
    title: "12. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. The updated version will be posted on this page with a revised last updated date.",
      "Your continued use of the website after updates means you acknowledge the revised policy.",
    ],
  },
  {
    title: "13. Contact",
    body: [
      "Questions or privacy requests may be sent to support@Golden Sweep.example. Please include enough detail for us to identify your account and respond appropriately.",
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

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Golden Sweep";
    setMetaDescription("Read the Golden Sweep Privacy Policy, including how account, usage, cookie, and support information may be handled.");
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
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">Last Updated: July 22, 2026</p>
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
