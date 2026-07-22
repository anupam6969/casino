import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Check,
  Crown,
  Eye,
  EyeOff,
  Gamepad2,
  Headphones,
  LockKeyhole,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const heroImage =
  "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=2200&q=85";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const cardMotion = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  left: `${(index * 29) % 100}%`,
  top: `${(index * 47) % 100}%`,
  size: 3 + (index % 4),
  delay: (index % 9) * 0.28,
  duration: 4.5 + (index % 5),
}));

function LuxuryLogo({ centered = false }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 ${centered ? "justify-center" : ""}`} aria-label="Golden Sweep home">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold-200/55 bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 text-black shadow-gold">
        <Trophy size={20} />
      </span>
      <span>
        <span className="block font-heading text-lg font-bold leading-none text-white">Golden Sweep</span>
        <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-gold-200">Sweeps Club</span>
      </span>
    </Link>
  );
}

function CompactLogo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2" aria-label="Golden Sweep home">
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-gold-200/55 bg-gradient-to-br from-gold-200 via-gold-300 to-gold-500 text-black shadow-gold">
        <Trophy size={17} />
      </span>
      <span className="text-left">
        <span className="block font-heading text-base font-bold leading-none text-white">Golden Sweep</span>
        <span className="block text-[8px] font-semibold uppercase tracking-[0.2em] text-gold-200">Sweeps Club</span>
      </span>
    </Link>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-gold-200 shadow-gold"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ opacity: [0.15, 0.85, 0.2], y: [0, -42, 0], scale: [1, 1.65, 1] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute left-[12%] top-[18%] h-48 w-48 rounded-full bg-gold-200/15 blur-3xl"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.16, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[16%] right-[14%] h-56 w-56 rounded-full bg-gold-300/12 blur-3xl"
        animate={{ opacity: [0.18, 0.48, 0.18], scale: [1, 1.2, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
    </div>
  );
}

function AuthField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
  autoComplete,
  canToggle = false,
}) {
  const [visible, setVisible] = useState(false);
  const inputType = canToggle ? (visible ? "text" : "password") : type;
  const isValid = value && !error;

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-cream/70">
        {label}
      </label>
      <div
        className={`group relative rounded-xl border bg-black/45 transition duration-300 ${
          error
            ? "border-red-400/70 shadow-[0_0_24px_rgba(248,113,113,0.16)]"
            : "border-gold-200/25 focus-within:border-gold-200/80 focus-within:shadow-gold"
        }`}
      >
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-200/75" size={17} />}
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`h-11 w-full rounded-xl bg-transparent py-2.5 text-sm text-white outline-none transition placeholder:text-cream/38 lg:h-12 ${
            Icon ? "pl-11" : "pl-4"
          } ${canToggle || isValid || error ? "pr-12" : "pr-4"}`}
        />
        {canToggle && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-cream/62 transition hover:bg-white/10 hover:text-gold-200 focus:outline-none focus:ring-2 focus:ring-gold-200/60"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {!canToggle && isValid && <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-200" size={18} />}
        {!canToggle && error && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-300" size={18} />}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 flex items-center gap-2 text-xs font-medium text-red-200">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["Enter password", "Weak", "Fair", "Strong", "Elite"];
  const widths = ["8%", "25%", "50%", "75%", "100%"];

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-cream/60">Password strength</span>
        <span className="text-xs font-bold text-gold-200">{labels[score]}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-200"
          animate={{ width: widths[score] }}
          transition={{ duration: 0.35 }}
        />
      </div>
    </div>
  );
}

function GoldButton({ children, loading, success }) {
  return (
    <motion.button
      type="submit"
      disabled={loading || success}
      whileHover={{ scale: loading ? 1 : 1.018 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className="group relative mt-1 h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400 px-6 py-3 text-sm font-bold text-black shadow-gold-lg transition focus:outline-none focus:ring-2 focus:ring-gold-200 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-80"
    >
      <span className="absolute inset-0 -translate-x-full bg-white/35 transition duration-700 group-hover:translate-x-full" />
      <span className="relative flex items-center justify-center gap-2">
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" aria-hidden="true" />}
        {success && <Check size={18} />}
        {children}
      </span>
    </motion.button>
  );
}

function SocialButton({ icon: Icon, label }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gold-200/25 bg-white/[0.045] px-3 text-xs font-semibold text-cream transition hover:border-gold-200/70 hover:bg-gold-300/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-gold-200/60"
      aria-label={`Continue with ${label}`}
    >
      <Icon size={17} />
      <span>{label}</span>
    </motion.button>
  );
}

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    identifier: "",
  });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signup, signin } = useAuth();
  const navigate = useNavigate();

  const isSignup = mode === "signup";
  const copy = useMemo(
    () =>
      isSignup
        ? {
            heading: "Create Your Account",
            subtitle: "Join thousands of players today.",
            button: "Create Account",
            footer: "Already have an account?",
            footerAction: "Sign In",
          }
        : {
            heading: "Welcome Back",
            subtitle: "Sign in to continue your gaming journey.",
            button: "Sign In",
            footer: "Don't have an account?",
            footerAction: "Create Account",
          },
    [isSignup]
  );

  function changeMode(nextMode) {
    setMode(nextMode);
    setSearchParams({ mode: nextMode });
    setErrors({});
    setSuccess(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  }

  function validateLocal() {
    const nextErrors = {};

    if (isSignup) {
      if (!form.username.trim()) {
        nextErrors.username = "Username is required.";
      } else if (!/^[A-Za-z0-9_]{3,20}$/.test(form.username.trim())) {
        nextErrors.username = "Use 3-20 letters, numbers, or underscores.";
      }

      if (!form.email.trim()) {
        nextErrors.email = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        nextErrors.email = "Enter a valid email address.";
      }
    } else if (!form.identifier.trim()) {
      nextErrors.identifier = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.identifier.trim())) {
      nextErrors.identifier = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    return nextErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const localErrors = validateLocal();
    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSuccess(false);
    try {
      if (isSignup) {
        await signup({
          username: form.username,
          email: form.email,
          password: form.password,
        });
      } else {
        await signin({ identifier: form.identifier, password: form.password });
      }
      setSuccess(true);
      navigate("/dashboard");
    } catch (err) {
      if (err?.fields) {
        setErrors(err.fields);
      } else {
        setErrors({ general: err?.error || "Something went wrong. Please try again." });
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-y-auto bg-background text-cream lg:h-screen lg:overflow-hidden">
      <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55 blur-[1px] lg:hidden" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/72 lg:hidden" />
      <FloatingParticles />

      <div className="relative z-10 grid min-h-screen lg:h-screen lg:grid-cols-[55fr_45fr] xl:grid-cols-[52fr_48fr]">
        <section className="relative hidden min-h-screen overflow-hidden lg:block lg:h-screen">
          <img src={heroImage} alt="Luxury casino lounge with glowing gaming tables" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,13,13,0.96),rgba(13,13,13,0.76),rgba(13,13,13,0.45))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_26%,rgba(212,175,55,0.28),transparent_28%),radial-gradient(circle_at_76%_72%,rgba(231,184,69,0.16),transparent_30%)]" />
          <FloatingParticles />

          <div className="relative z-10 flex h-full min-h-screen flex-col justify-between px-8 py-7 xl:px-12">
            <LuxuryLogo />

            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-2xl pb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-200/35 bg-black/40 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-200 backdrop-blur">
                <Sparkles size={15} />
                Premium Member Access
              </div>
              <h1 className="font-heading text-4xl font-black leading-tight text-white xl:text-5xl">
                Welcome to <span className="text-gradient-gold">Golden Sweep</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-cream/82 xl:text-lg">
                Play your favorite sweepstakes games with a secure and trusted platform.
              </p>
              <div className="mt-7 grid max-w-xl grid-cols-3 gap-3">
                {[
                  { label: "Secure", icon: ShieldCheck },
                  { label: "Premium", icon: Crown },
                  { label: "Support", icon: Headphones },
                ].map(({ label, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3 text-center shadow-luxury backdrop-blur-xl">
                    <Icon className="mx-auto text-gold-200" size={20} />
                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-cream/70">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-0">
          <motion.div variants={cardMotion} initial="hidden" animate="visible" className="w-full max-w-[31rem] lg:flex lg:max-h-[90vh] lg:flex-col lg:justify-center">
            <div className="mb-5 lg:hidden">
              <LuxuryLogo centered />
            </div>

            <motion.div
              className="auth-card-shell relative flex max-h-none flex-col justify-center overflow-hidden rounded-3xl border border-gold-200/45 bg-[rgba(20,20,20,0.85)] p-[1px] shadow-luxury backdrop-blur-2xl lg:max-h-[90vh]"
              animate={{ boxShadow: ["0 0 34px rgba(212,175,55,0.16)", "0 0 54px rgba(231,184,69,0.32)", "0 0 34px rgba(212,175,55,0.16)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(231,184,69,0.2),transparent)] opacity-60" />
              <div className="relative rounded-3xl bg-black/40 px-4 py-5 sm:px-6 lg:px-5 lg:py-4 xl:px-6">
                <div className="mb-3 hidden justify-center lg:flex">
                  <CompactLogo />
                </div>

                <div className="mb-3 grid grid-cols-2 gap-1.5 rounded-2xl border border-white/10 bg-black/55 p-1">
                  {[
                    ["signin", "Sign In"],
                    ["signup", "Sign Up"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => changeMode(value)}
                      className={`relative rounded-xl px-4 py-1.5 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-gold-200/60 ${
                        mode === value ? "text-black" : "text-cream/60 hover:text-white"
                      }`}
                    >
                      {mode === value && (
                        <motion.span
                          layoutId="auth-mode"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-gold-300 via-gold-200 to-gold-400"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                    <div className="mb-3 text-center">
                      <div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-xl border border-gold-200/40 bg-gold-300/10 text-gold-200 shadow-gold">
                        {isSignup ? <UserRound size={19} /> : <LockKeyhole size={19} />}
                      </div>
                      <h2 className="font-heading text-2xl font-black text-white">{copy.heading}</h2>
                      {/* <p className="mt-1 text-xs leading-5 text-cream/68 sm:text-sm">{copy.subtitle}</p> */}
                    </div>

                    {errors.general && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-3 flex items-start gap-3 rounded-2xl border border-red-300/30 bg-red-500/10 p-2.5 text-sm text-red-100"
                        role="alert"
                      >
                        <AlertCircle className="mt-0.5 shrink-0" size={18} />
                        <span>{errors.general}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-2.5">
                      {isSignup ? (
                        <>
                          <div className="grid gap-2.5 sm:grid-cols-2">
                            <AuthField label="Username" name="username" value={form.username} onChange={handleChange} placeholder="goldenplayer" error={errors.username} icon={Gamepad2} autoComplete="username" />
                            <AuthField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@email.com" error={errors.email} icon={Mail} autoComplete="email" />
                            <AuthField label="Password" name="password" value={form.password} onChange={handleChange} placeholder="At least 8 characters" error={errors.password} icon={LockKeyhole} autoComplete="new-password" canToggle />
                          </div>
                          <PasswordStrength password={form.password} />
                        </>
                      ) : (
                        <>
                          <AuthField label="Email Address" name="identifier" type="email" value={form.identifier} onChange={handleChange} placeholder="name@email.com" error={errors.identifier} icon={Mail} autoComplete="email" />
                          <AuthField label="Password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" error={errors.password} icon={LockKeyhole} autoComplete="current-password" canToggle />
                          <div className="flex items-center justify-between gap-3 text-sm">
                            <label className="flex items-center gap-2 text-cream/70">
                              <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="h-4 w-4 rounded border-gold-200/50 bg-black text-gold-300 focus:ring-gold-200"
                              />
                              Remember Me
                            </label>
                            <a href="#forgot-password" className="font-semibold text-gold-200 transition hover:text-white">
                              Forgot Password?
                            </a>
                          </div>
                        </>
                      )}

                      <GoldButton loading={submitting} success={success}>
                        {submitting ? "Securing Session..." : success ? "Success" : copy.button}
                      </GoldButton>
                    </form>

                    {!isSignup && (
                      <>
                        <div className="my-3 flex items-center gap-3">
                          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-200/35 to-gold-200/15" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream/45">OR CONTINUE WITH</span>
                          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold-200/35 to-gold-200/15" />
                        </div>

                        <div className="grid gap-2.5 sm:grid-cols-3">
                          <SocialButton icon={Mail} label="Google" />
                          <SocialButton icon={Users} label="Facebook" />
                          <SocialButton icon={Gamepad2} label="Discord" />
                        </div>
                      </>
                    )}

                    <p className="mt-3 text-center text-sm text-cream/60">
                      {copy.footer}{" "}
                      <button type="button" onClick={() => changeMode(isSignup ? "signin" : "signup")} className="font-bold text-gold-200 transition hover:text-white">
                        {copy.footerAction}
                      </button>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </section>
      </div>

      <motion.button
        type="button"
        aria-label="Open support chat"
        className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-2xl border border-gold-200/55 bg-gradient-to-br from-gold-200 to-gold-500 text-black shadow-gold-lg lg:bottom-5 lg:right-5"
        animate={{ y: [0, -8, 0], boxShadow: ["0 0 24px rgba(212,175,55,0.28)", "0 0 44px rgba(231,184,69,0.48)", "0 0 24px rgba(212,175,55,0.28)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageCircle size={24} />
      </motion.button>
    </main>
  );
}
