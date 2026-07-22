import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUp,
  BadgeCheck,
  ChevronDown,
  CircleDollarSign,
  Coins,
  CreditCard,
  Gamepad2,
  Gift,
  Headphones,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserPlus,
  WalletCards,
  Zap,
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=2200&q=85";

const casinoImages = [
  "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1596838132737-3306ed4a2e6d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1518895312237-a9e23508077d?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1605870445919-838d190e8e1b?auto=format&fit=crop&w=700&q=80",
];

const platforms = [
  "Player",
  "Game Vault",
  "Mafia",
  "Blue Dragon",
  "Juwa",
  "Vegas Sweeps",
  "Billion Balls",
  "Cash Machine",
  "Milky Way",
  "Panda Master",
  "Fire Kirin",
  "Orion Stars",
];

// const games = [
//   "Royal Reels",
//   "Golden Pharaoh",
//   "Diamond Rush",
//   "Velvet Fortune",
//   "Luxe Jackpot",
//   "Midnight Crown",
//   "Grand Vault",
//   "Solar Spins",
//   "Emerald Empire",
//   "Crystal Palace",
//   "Cash Inferno",
//   "High Roller",
//   "Vegas Bloom",
//   "Ruby Royale",
//   "Neon Nights",
//   "Treasure Tide",
//   "Fortune Flight",
//   "Starlight Spins",
//   "Golden Lotus",
//   "Platinum Pulse",
//   "Lucky Mirage",
//   "Crown Quest",
//   "Elite Sevens",
//   "Opal Odyssey",
// ];

const features = [
  {
    title: "Instant Redemption",
    text: "Fast reward requests with clear status updates and white-glove handling.",
    icon: CircleDollarSign,
  },
  {
    title: "Secure Payments",
    text: "Modern account protection, encrypted flows, and trusted payment rails.",
    icon: ShieldCheck,
  },
  {
    title: "Thousands of Games",
    text: "A curated lobby of sweepstakes slots, fish tables, jackpots, and classics.",
    icon: Gamepad2,
  },
  {
    title: "24/7 Support",
    text: "Responsive assistance from onboarding through redemption, day or night.",
    icon: Headphones,
  },
];

const steps = [
  { label: "Step 1", title: "Register", icon: UserPlus },
  { label: "Step 2", title: "Choose Platform", icon: Sparkles },
  { label: "Step 3", title: "Play Games", icon: Gamepad2 },
  { label: "Step 4", title: "Redeem Rewards", icon: WalletCards },
];

const testimonials = [
  {
    name: "Ariana Miles",
    comment: "The lobby feels polished, the support team is quick, and redemption updates are refreshingly clear.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Marcus Reed",
    comment: "Best sweepstakes experience I have tried. The platform selection is deep without feeling cluttered.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Elena Cruz",
    comment: "Premium look, smooth gameplay, and everything feels secure from signup to rewards.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
];

const faqs = [
  {
    question: "How do I register?",
    answer: "Tap Register, create your secure account, verify your details, and your sweepstakes lobby will be ready in minutes.",
  },
  {
    question: "How do I redeem?",
    answer: "Open your rewards wallet, choose the eligible redemption option, confirm your details, and track the request from your account.",
  },
  {
    question: "What games are available?",
    answer: "You can explore slots, sweepstakes games, fish tables, jackpots, table-inspired games, and exclusive partner platforms.",
  },
  {
    question: "Is it secure?",
    answer: "Yes. Account sessions, payment flows, and support workflows are designed around encrypted, privacy-conscious safeguards.",
  },
];

const SOCIAL_LINKS = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  twitter: "https://x.com/",
  youtube: "https://youtube.com/",
  telegram: "https://t.me/",
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const sectionViewport = { once: true, amount: 0.18 };

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

function GoldButton({ children, variant = "solid", className = "", ...props }) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-2 focus:ring-offset-black";
  const styles =
    variant === "solid"
      ? "bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 text-black shadow-gold hover:shadow-gold-lg"
      : "border border-gold-200/70 bg-white/5 text-cream backdrop-blur hover:border-gold-200 hover:bg-gold-300/10 hover:shadow-gold";

  return (
    <motion.button whileTap={{ scale: 0.97 }} className={`${base} ${styles} ${className}`} {...props}>
      <span className="absolute inset-0 -translate-x-full bg-white/30 transition duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={sectionViewport}
    >
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-200/30 bg-gold-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-200">
          <Sparkles size={14} />
          {eyebrow}
        </div>
      )}
      <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">{title}</h2>
      {children && <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-cream/70 md:text-base">{children}</p>}
    </motion.div>
  );
}

function LuxuryLogo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Golden Sweep home">
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-200/50 bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 text-black shadow-gold">
        <Trophy size={22} />
      </span>
      <span>
        <span className="block font-heading text-lg font-bold leading-none text-white">Golden Sweep</span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-200">Sweeps Club</span>
      </span>
    </Link>
  );
}

function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <LuxuryLogo />
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/auth?mode=signin">
            <GoldButton variant="outline" className="px-4 py-2 sm:px-5">
              Login
            </GoldButton>
          </Link>
          <Link to="/auth?mode=signup">
            <GoldButton className="px-4 py-2 sm:px-5">Register</GoldButton>
          </Link>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  const stats = ["1000+ Games", "50K+ Players", "Instant Redemption", "24/7 Support"];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <img
        src={heroImage}
        alt="Luxury casino lounge with glowing gaming tables"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,13,13,0.96),rgba(13,13,13,0.74),rgba(13,13,13,0.42))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(212,175,55,0.24),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(231,184,69,0.18),transparent_28%)]" />

      <motion.div
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-200/35 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-200 backdrop-blur"
          >
            <BadgeCheck size={15} />
            Premium Sweepstakes Gaming
          </motion.div>
          <motion.h1 variants={fadeUp} className="max-w-4xl font-heading text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Play Your Favorite <span className="text-gradient-gold">Sweepstakes Games</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-cream/82 sm:text-xl">
            Thousands of Games. Instant Redemption. Secure Platform.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/auth?mode=signup">
              <GoldButton className="w-full sm:w-auto">
                Get Started
                <Zap size={17} />
              </GoldButton>
            </Link>
            <a href="#games">
              <GoldButton variant="outline" className="w-full sm:w-auto">
                Explore Games
                <Gamepad2 size={17} />
              </GoldButton>
            </a>
          </motion.div>
          <motion.div variants={container} className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                variants={fadeUp}
                key={stat}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-center shadow-luxury backdrop-blur-xl"
              >
                <div className="font-heading text-xl font-bold text-gold-200 sm:text-2xl">{stat.split(" ")[0]}</div>
                <div className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-cream/60">{stat.replace(stat.split(" ")[0], "").trim()}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block"
        >
          <div className="relative ml-auto max-w-md rounded-[2rem] border border-gold-200/35 bg-white/[0.08] p-5 shadow-luxury backdrop-blur-2xl">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-gold-200/30 via-transparent to-gold-400/10 blur-xl" />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
              <img src={casinoImages[0]} alt="Premium slot and card game table" loading="lazy" className="h-80 w-full object-cover opacity-85" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                <div className="flex items-center gap-1 text-gold-200">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-3 font-heading text-2xl font-bold text-white">Elite Rewards Lobby</p>
                <p className="mt-2 text-sm leading-6 text-cream/70">Exclusive platforms, curated jackpots, and premium support in one private club.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PlatformsSection() {
  return (
    <section id="platforms" className="bg-[#101010] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Curated Partners" title="Our Exclusive Platforms">
          Explore a private collection of high-performing sweepstakes platforms, tuned for effortless discovery on every screen.
        </SectionHeader>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6"
        >
          {platforms.map((platform, index) => (
            <motion.article
              key={platform}
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group overflow-hidden rounded-2xl border border-gold-200/25 bg-white/[0.05] shadow-luxury transition duration-300 hover:border-gold-200/80 hover:shadow-gold-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={casinoImages[index % casinoImages.length]}
                  alt={`${platform} platform preview`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl border border-gold-200/45 bg-black/55 font-heading text-sm font-bold text-gold-200 backdrop-blur">
                  {platform.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <h3 className="px-3 py-4 text-center font-heading text-sm font-bold text-white sm:text-base">{platform}</h3>
            </motion.article>
          ))}
        </motion.div>
        <motion.a
          href="#games"
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="mx-auto mt-12 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-gold-200/45 bg-black px-6 py-5 text-center font-heading text-lg font-bold text-gold-200 shadow-luxury transition hover:border-gold-200 hover:bg-gold-300/10 hover:shadow-gold-lg"
        >
          See All Exclusive Platforms
          <ChevronDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}


function FeaturesSection() {
  return (
    <section className="bg-[#101010] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Why Players Stay" title="Built For Premium Play" />
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={sectionViewport} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, text, icon: Icon }) => (
            <motion.article key={title} variants={fadeUp} whileHover={{ y: -8 }} className="rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-luxury backdrop-blur transition hover:border-gold-200/55 hover:shadow-gold">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-gold-200/40 bg-gradient-to-br from-gold-200 to-gold-500 text-black shadow-gold">
                <Icon size={25} />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-cream/68">{text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Simple Flow" title="How It Works" />
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={sectionViewport} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ label, title, icon: Icon }, index) => (
            <motion.article key={title} variants={fadeUp} className="relative rounded-2xl border border-gold-200/25 bg-secondary p-6 shadow-luxury">
              <div className="absolute right-5 top-5 font-heading text-5xl font-black text-white/[0.04]">{index + 1}</div>
              <div className="mb-6 grid h-13 w-13 place-items-center rounded-2xl border border-gold-200/45 bg-gold-300/10 text-gold-200">
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-200">{label}</p>
              <h3 className="mt-2 font-heading text-xl font-bold text-white">{title}</h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-[#101010] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Player Reviews" title="Trusted By Modern Players" />
        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={sectionViewport} className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((review) => (
            <motion.article key={review.name} variants={fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-luxury backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <img src={review.image} alt={`${review.name} profile`} loading="lazy" className="h-14 w-14 rounded-full border border-gold-200/45 object-cover" />
                <div>
                  <h3 className="font-heading font-bold text-white">{review.name}</h3>
                  <div className="mt-1 flex gap-1 text-gold-200">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-cream/72">{review.comment}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader eyebrow="FAQ" title="Questions, Answered" />
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div key={faq.question} initial={false} className="overflow-hidden rounded-2xl border border-white/10 bg-secondary shadow-luxury">
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="font-heading text-base font-bold text-white">{faq.question}</span>
                <ChevronDown className={`shrink-0 text-gold-200 transition ${open === index ? "rotate-180" : ""}`} size={20} />
              </button>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                    <p className="border-t border-white/10 px-5 py-5 text-sm leading-7 text-cream/70">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const groups = {
    "Quick Links": [
      { label: "Home", href: "#top" },
      { label: "Games", href: "#top" },
      { label: "Promotions", href: "#top" },
      { label: "Rewards", href: "#top" },
    ],
    Support: [
      { label: "Live Chat", href: "#top" },
      { label: "Help Center", href: "#top" },
    ],
    Policies: [
      { label: "Terms & Conditions", to: "/terms-and-conditions" },
      { label: "Privacy Policy", to: "/privacy-policy" },
    ],
  };

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

function FloatingComponents() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 700);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.button
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-2xl border border-gold-200/50 bg-gradient-to-br from-gold-200 to-gold-500 text-black shadow-gold-lg"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* <motion.div
        className="fixed bottom-24 left-4 z-40 hidden max-w-xs items-center gap-3 rounded-2xl border border-gold-200/30 bg-black/75 px-4 py-3 text-sm text-cream shadow-luxury backdrop-blur-xl sm:flex"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-300/15 text-gold-200">
          <Trophy size={18} />
        </span>
        <span>
          <strong className="block text-white">Recent winner</strong>
          Maya redeemed 25,000 rewards
        </span>
      </motion.div> */}

      <AnimatePresence>
        {showTop && (
          <motion.button
            aria-label="Back to top"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 left-5 z-40 grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/[0.08] text-gold-200 shadow-luxury backdrop-blur-xl transition hover:border-gold-200/70"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return <motion.div className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-gold-300 via-gold-200 to-gold-500" style={{ scaleX }} />;
}

export default function LandingPage() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-background text-cream">
      <ProgressBar />
      <Navbar />
      <HeroSection />
      <PlatformsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <FloatingComponents />
    </main>
  );
}
