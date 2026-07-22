import { Link } from "react-router-dom";
import { CreditCard, LockKeyhole, WalletCards } from "lucide-react";
import { LuxuryLogo } from "./Navbar.jsx";

const SOCIAL_LINKS = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  twitter: "https://x.com/",
  youtube: "https://youtube.com/",
  telegram: "https://t.me/",
};

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M14 8.2h2.2V4.4A16 16 0 0 0 13 4.2c-3.2 0-5.4 2-5.4 5.6V13H4v4.3h3.6V22H12v-4.7h3.5l.6-4.3H12v-2.8c0-1.2.3-2 2-2z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  );
}

function YouTubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="6.5" width="18" height="11" rx="3.2" />
      <path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M21 4.8 17.9 20c-.2.9-.9 1.1-1.7.7l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8L17.3 7c.4-.4-.1-.6-.6-.3L5.8 13.5 1.1 12c-.9-.3-.9-1 .2-1.5L19.6 3.4c.8-.3 1.6.2 1.4 1.4z" />
    </svg>
  );
}

const socialItems = [
  { key: "instagram", label: "Instagram", icon: InstagramIcon },
  { key: "facebook", label: "Facebook", icon: FacebookIcon },
  { key: "twitter", label: "X (Twitter)", icon: XIcon },
  { key: "youtube", label: "YouTube", icon: YouTubeIcon },
  { key: "telegram", label: "Telegram", icon: TelegramIcon },
];

const groups = {
  "Quick Links": [
    { label: "Home", to: "/" },
    { label: "Games", href: "/#games" },
    { label: "Promotions", href: "/#top" },
    { label: "Rewards", href: "/#top" },
  ],
  Support: [
    { label: "Live Chat", href: "/#top" },
    { label: "Help Center", href: "/#top" },
  ],
  Policies: [
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
    { label: "Privacy Policy", to: "/privacy-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <LuxuryLogo />
            <p className="mt-5 max-w-sm text-sm leading-7 text-cream/65">
              A premium sweepstakes gaming destination with exclusive platforms, secure account flows, and responsive support.
            </p>
            <div className="mt-6 text-center sm:text-left">
              <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-gold-200">Follow Us</h3>
              <div className="mt-4 flex flex-wrap justify-center gap-3 text-gold-200 sm:justify-start">
                {socialItems.map(({ key, label, icon: Icon }) => (
                  <a
                    key={key}
                    href={SOCIAL_LINKS[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Golden Sweep on ${label}`}
                    className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-gold-200/45 bg-black text-gold-200 shadow-luxury transition duration-300 hover:scale-110 hover:border-gold-200 hover:bg-gold-300/10 hover:shadow-gold focus:outline-none focus:ring-2 focus:ring-gold-200/60"
                  >
                    <Icon className="h-[18px] w-[18px] stroke-current stroke-2" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(groups).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-gold-200">{title}</h3>
                <ul className="mt-4 space-y-3 text-sm text-cream/65">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link to={link.to} className="transition hover:text-gold-200">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="transition hover:text-gold-200">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
          <div>
            <p>Contact: support@Golden Sweep.example | 1-800-555-0199</p>
            <address className="mt-2 not-italic">
              Address:
              <br />
              Gameverse LLC
              <br />
              16192 Coastal Highway
              <br />
              Lewes DE 19958
            </address>
            <p className="mt-1">Copyright 2026 Golden Sweep. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[CreditCard, LockKeyhole, WalletCards].map((Icon, index) => (
              <span key={index} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-cream/70">
                <Icon size={16} />
                Secure
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
