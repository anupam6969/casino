import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const sections = [
  {
    body: [
      "Welcome to GoldenSweep. These Terms & Conditions govern your access to and use of our website, services, applications, promotions, and related features.",
      "By accessing or using our Platform, creating an account, or participating in any activity available through the Platform, you agree to be legally bound by these Terms. If you do not agree with these Terms, please do not use our services.",
    ],
  },
  {
    title: "1. Eligibility",
    body: [
      "You must be at least 18 years old, or the age of majority in your jurisdiction if higher, to create an account or use the services. By using the website, you represent that you meet all applicable age and eligibility requirements.",
      "You are responsible for ensuring that your use of the website is lawful in your location. We may restrict, suspend, or close access where required by law, platform policy, or risk controls.",
    ],
  },
  {
    title: "2. Account Registration",
    body: [
      "You agree to provide accurate, current, and complete information during registration and to keep your account information updated. You are responsible for maintaining the confidentiality of your login credentials.",
      "You are responsible for all activity that occurs through your account. Notify support promptly if you believe your account has been accessed without authorization.",
    ],
  },
  {
    title: "3. Account Security",
    body: [
      "You are solely responsible for maintaining the confidentiality of your login credentials.",
      "We are not responsible for losses resulting from:",
      "Unauthorized account access caused by your negligence.",
      "Sharing passwords with others.",
      "Failure to protect your account information.",
    ],
  },
  {
    title: "4. User Conduct",
    body: [
      "You agree not to misuse the website, attempt unauthorized access, interfere with platform security, exploit technical errors, automate activity, impersonate another person, or use the service for unlawful purposes.",
      "We may investigate activity that appears abusive, fraudulent, automated, or inconsistent with these terms and may suspend or terminate access where appropriate.",
    ],
  },
  {
    title: "5. Payments, Promotions, and Rewards",
    body: [
      "Any purchases, promotional offers, reward requests, or redemption-related processes are subject to availability, verification, posted rules, and any applicable third-party provider terms.",
      "We may correct errors, cancel suspicious transactions, request additional verification, or withhold rewards where required to protect the platform, comply with law, or prevent fraud.",
    ],
  },
  {
    title: "6. Intellectual Property",
    body: [
      "The website, brand assets, interface, text, graphics, software, design elements, and other content are owned by GoldenSweep or its licensors and are protected by intellectual property laws.",
      "You may not copy, modify, distribute, reverse engineer, or create derivative works from the website except as expressly permitted by us in writing.",
    ],
  },
  {
    title: "7. Third-Party Services",
    body: [
      "The website may include links, integrations, payment processors, platform partners, or social media destinations operated by third parties. We are not responsible for third-party content, policies, or practices.",
      "Your use of third-party services may be governed by separate terms and privacy policies from those providers.",
    ],
  },
  {
    title: "8. Disclaimers",
    body: [
      "The website is provided on an as-is and as-available basis. We do not guarantee uninterrupted access, error-free operation, specific outcomes, winnings, or continued availability of any feature.",
      "To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, title, and non-infringement.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, GoldenSweep and its affiliates will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from your use of the website.",
      "Our total liability for any claim related to the website will be limited to the amount you paid to us, if any, during the three months preceding the event giving rise to the claim.",
    ],
  },
  {
    title: "10. Suspension and Termination",
    body: [
      "We may suspend, restrict, or terminate your account or access if we believe you have violated these terms, created risk for the platform, provided inaccurate information, or engaged in suspicious activity.",
      "You may stop using the website at any time. Certain terms will continue to apply after account closure where necessary for enforcement, compliance, dispute resolution, or recordkeeping.",
    ],
  },
  {
    title: "11. Changes to Terms",
    body: [
      "We may update these Terms & Conditions from time to time. The updated version will be posted on this page with a revised last updated date.",
      "Your continued use of the website after changes become effective means you accept the updated terms.",
    ],
  },
  {
    title: "12. Contact",
    body: [
      "Questions about these Terms & Conditions may be sent to support@goldensweep.ai. Please include enough detail for us to review and respond to your request.",
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

export default function TermsConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | GoldenSweep";
    setMetaDescription(
      "Read the GoldenSweep Terms & Conditions, including eligibility, account use, promotions, rewards, and platform rules.",
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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-4xl font-black text-white md:text-5xl"
            >
              Terms & Conditions
            </motion.h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold-200">
              Last Updated: July 22, 2026
            </p>
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
                <h2 className="font-heading text-xl font-bold text-gold-200">
                  {section.title}
                </h2>
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
