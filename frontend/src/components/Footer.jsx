import { Link } from "react-router-dom";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import logoImg from "../data/images/logo.png";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/goldensweep", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com/goldensweep", icon: InstagramIcon },
  { label: "Telegram", href: "https://t.me/goldensweep", icon: TelegramIcon },
];

const linkGroups = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", to: "/" },
      { label: "Games", href: "/#games" },
      { label: "Blog", href: "/#blog" },
      { label: "Support", href: "/#support" },
      { label: "Login", to: "/sign-in" },
      { label: "Sign Up", to: "/sign-up" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Sweepstakes Rules", to: "/sweepstakes-rules" },
      { label: "Redemption Rules", to: "/redemption-rules" },
      { label: "Responsible Play", to: "/responsible-play" },
    ],
  },
];

const supportLinks = [
  { label: "Start support chat", href: "/#support", icon: MessageCircle },
  { label: "support@goldensweep.ai", href: "mailto:support@goldensweep.ai", icon: Mail },
  { label: "contact@goldensweep.ai", href: "mailto:contact@goldensweep.ai", icon: Mail },
];

function FooterHeading({ children }) {
  return (
    <h3 className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wide text-white md:justify-start">
      <span className="h-4 w-1 rounded-full bg-yellow-500" aria-hidden="true" />
      {children}
    </h3>
  );
}

function FooterLink({ link }) {
  if (link.to || link.href?.startsWith("/")) {
    return (
      <Link to={link.to || link.href} className="inline-flex min-h-11 items-center justify-center text-gray-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70 md:justify-start">
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} className="inline-flex min-h-11 items-center justify-center text-gray-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70 md:justify-start">
      {link.label}
    </a>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14.2 8.5h2.5V4.4A18.8 18.8 0 0 0 13.1 4c-3.6 0-6 2.2-6 6.2V14H3v4.6h4.1V24h5v-5.4H16l.7-4.6h-4.6v-3.3c0-1.3.4-2.2 2.1-2.2Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.7 4.6 18.5 20c-.2 1.1-.9 1.4-1.9.8l-5.1-3.8-2.4 2.4c-.3.3-.6.6-1.2.6l.4-5.2L17.7 7c.4-.4-.1-.6-.7-.3L5.5 13.9.5 12.3c-1.1-.3-1.1-1.1.2-1.6L20.2 3.2c.9-.3 1.7.2 1.5 1.4Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="support" className="w-full bg-slate-950 text-white">
      <div className="flex h-[3px] w-full" aria-hidden="true">
        <div className="h-full flex-1 bg-gradient-to-r from-teal-400 to-emerald-400" />
        <div className="h-full flex-1 bg-gradient-to-r from-purple-500 to-blue-500" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Link to="/" aria-label="GoldenSweep home" className="inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
            <img src={logoImg} alt="GoldenSweep Casino" className="h-24 w-auto max-w-[240px] object-contain sm:h-32 lg:h-36" loading="lazy" />
          </Link>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-300">
            <CheckCircle2 className="h-4 w-4 text-gray-100" />
            Official Platform
          </div>

          <p className="mt-6 max-w-md text-sm leading-7 text-gray-400">
            Wallet-first free coin play with ad and bonus-based rewards, clear transfers, mobile access, official support, and no cash redemption.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GoldenSweep on ${label}`}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer columns collapse into a single comfortable mobile column. */}
        <div className="mt-10 grid gap-8 text-center md:mt-14 md:grid-cols-3 md:text-left">
          {linkGroups.map((group) => (
            <section key={group.title} aria-labelledby={`${group.title.toLowerCase().replace(/\s+/g, "-")}-footer-heading`}>
              <FooterHeading>
                <span id={`${group.title.toLowerCase().replace(/\s+/g, "-")}-footer-heading`}>{group.title}</span>
              </FooterHeading>
              <ul className="mt-4 space-y-1 text-sm md:mt-5 md:space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section aria-labelledby="support-footer-heading">
            <FooterHeading>
              <span id="support-footer-heading">Support</span>
            </FooterHeading>
            <ul className="mt-4 space-y-1 text-sm md:mt-5 md:space-y-3">
              {supportLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  {href.startsWith("/") ? (
                    <Link to={href} className="inline-flex min-h-11 items-center justify-center gap-2 text-gray-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70 md:justify-start">
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ) : (
                    <a href={href} className="inline-flex min-h-11 items-center justify-center gap-2 break-all text-gray-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70 md:justify-start">
                      <Icon className="h-4 w-4" />
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 py-6 text-center text-xs leading-6 text-gray-500 md:mt-14 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="max-w-3xl">
            No purchase necessary. Void where prohibited. Must be 18+ to play. Bonus and coin availability may vary by account and jurisdiction.
          </p>
          <p className="shrink-0">
            &copy; 2026 <span className="font-bold text-white">GOLDENSWEEP CASINO.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
