import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, Check, ChevronDown, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.8 3-4.3 3-7.2Z" />
      <path fill="#34A853" d="M12 22c2.7 0 5-0.9 6.6-2.5l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.4 13.8a6 6 0 0 1 0-3.6V7.6H3.1a10 10 0 0 0 0 8.8l3.3-2.6Z" />
      <path fill="#EA4335" d="M12 6.1c1.5 0 2.8.5 3.8 1.5l2.9-2.9A9.7 9.7 0 0 0 12 2a10 10 0 0 0-8.9 5.6l3.3 2.6C7.2 7.9 9.4 6.1 12 6.1Z" />
    </svg>
  );
}

function Divider({ children }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-white/15" />
      <span className="px-4 text-xs text-gray-500">{children}</span>
      <span className="h-px flex-1 bg-white/15" />
    </div>
  );
}

function GoogleButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-lg bg-white py-3.5 font-semibold text-black transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text", autoComplete, error, rightLabel, isPassword = false }) {
  const [visible, setVisible] = useState(false);
  const inputType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={name} className="text-sm font-semibold text-white">
          {label}
        </label>
        {rightLabel}
      </div>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full rounded-lg border border-white/20 bg-transparent px-4 py-3.5 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-0 ${
            isPassword ? "pr-12" : ""
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="absolute right-4 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md text-gray-400 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-2 flex items-center gap-2 text-xs text-red-300">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}

function PasswordChecklist({ password }) {
  const checks = [
    { label: "Minimum 8 characters", active: password.length >= 8 },
    { label: "Includes letters and numbers", active: /[A-Za-z]/.test(password) && /\d/.test(password) },
    { label: "Symbols are allowed", active: password.length > 0 && /^[\x20-\x7E]+$/.test(password) },
  ];

  return (
    <div className="-mt-2 mb-5 space-y-1">
      {checks.map((check) => (
        <div key={check.label} className="flex items-center gap-2 text-sm text-gray-400">
          <Check className={`h-4 w-4 ${check.active ? "text-green-500" : "text-gray-600"}`} />
          {check.label}
        </div>
      ))}
    </div>
  );
}

function SubmitButton({ children, disabled, loading }) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="mt-6 w-full rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 py-3.5 text-base font-bold text-black transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yellow-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:hover:brightness-100"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

function AuthShell({ children }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="flex min-h-screen justify-center bg-slate-950 px-4 pb-16 pt-28">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl sm:p-10">{children}</div>
      </section>
    </main>
  );
}

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const modeParam = searchParams.get("mode");
  const initialMode = location.pathname === "/sign-up" || modeParam === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    identifier: "",
    referralCode: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { signup, signin } = useAuth();
  const navigate = useNavigate();

  const isSignup = mode === "signup";
  const passwordChecks = useMemo(
    () => ({
      minLength: form.password.length >= 8,
      lettersAndNumbers: /[A-Za-z]/.test(form.password) && /\d/.test(form.password),
    }),
    [form.password],
  );

  const signupDisabled =
    !form.fullName.trim() ||
    !form.email.trim() ||
    !form.username.trim() ||
    !form.password ||
    !termsAccepted ||
    !passwordChecks.minLength ||
    !passwordChecks.lettersAndNumbers;
  const loginDisabled = !form.identifier.trim() || !form.password;

  useEffect(() => {
    const routeMode = location.pathname === "/sign-up" || modeParam === "signup" ? "signup" : "signin";
    setMode(routeMode);
    setErrors({});
  }, [location.pathname, modeParam]);

  function changeMode(nextMode) {
    setMode(nextMode);
    setSearchParams({ mode: nextMode });
    setErrors({});
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
      if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";

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

      if (!termsAccepted) nextErrors.terms = "You must confirm eligibility and accept the terms.";
    } else if (!form.identifier.trim()) {
      nextErrors.identifier = "Email or username is required.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (isSignup && form.password.length < 8) {
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

  if (isSignup) {
    return (
      <AuthShell>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white md:text-4xl">Registration</h1>
          <p className="mx-auto mb-8 mt-2 max-w-sm text-sm text-gray-400 md:text-base">Create one goldensweep wallet for premium games and support.</p>
        </div>

        <GoogleButton />
        <Divider>Or sign up with email</Divider>

        {errors.general && (
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Field label="Full Name*" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your full name" error={errors.fullName} autoComplete="name" />
          <Field label="Email Address*" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" error={errors.email} autoComplete="email" />
          <Field label="Username*" name="username" value={form.username} onChange={handleChange} placeholder="Username" error={errors.username} autoComplete="username" />
          <Field label="Password*" name="password" value={form.password} onChange={handleChange} placeholder="Password" error={errors.password} autoComplete="new-password" isPassword />
          <PasswordChecklist password={form.password} />

          <div className="mb-5">
            <button
              type="button"
              onClick={() => setReferralOpen((current) => !current)}
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-white/20 px-4 py-3.5 text-left text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/70"
            >
              Referral code (optional)
              <ChevronDown className={`h-5 w-5 text-gray-400 transition ${referralOpen ? "rotate-180" : ""}`} />
            </button>
            {referralOpen && (
              <input
                name="referralCode"
                value={form.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code"
                className="mt-2 w-full rounded-lg border border-white/20 bg-transparent px-4 py-3.5 text-white placeholder:text-gray-500 focus:border-yellow-500 focus:outline-none focus:ring-0"
              />
            )}
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-lg border border-white/20 p-4 text-sm text-gray-400">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                if (errors.terms) setErrors({ ...errors, terms: undefined });
              }}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 accent-yellow-500 focus:ring-yellow-500"
            />
            <label htmlFor="terms">
              I am 18+ and agree to the{" "}
              <Link to="/terms-and-conditions" className="font-semibold text-white hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/#sweepstakes-rules" className="font-semibold text-white hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
                Sweepstakes Rules
              </Link>
              . No purchase necessary.
            </label>
          </div>
          {errors.terms && <p className="mt-2 text-xs text-red-300">{errors.terms}</p>}

          <SubmitButton disabled={signupDisabled} loading={submitting}>
            Sign Up
          </SubmitButton>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/sign-in" onClick={() => changeMode("signin")} className="font-bold text-yellow-500 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
            Login here
          </Link>
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white md:text-4xl">Login</h1>
        <p className="mt-2 text-sm text-gray-400 md:text-base">Sign in to your Easy Play account</p>
      </div>

      <div className="mb-6 mt-6 flex justify-center gap-3">
        {["Secure Login", "Wallet Protected"].map((badge) => (
          <span key={badge} className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-xs font-semibold uppercase text-white">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            {badge}
          </span>
        ))}
      </div>

      {errors.general && (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Field label="Email or username" name="identifier" value={form.identifier} onChange={handleChange} placeholder="Enter your email" error={errors.identifier} autoComplete="username" />
        <Field
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          autoComplete="current-password"
          isPassword
          rightLabel={
            <button type="button" className="text-xs text-gray-400 transition hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
              Forgot password?
            </button>
          }
        />

        <SubmitButton disabled={loginDisabled} loading={submitting}>
          Login
        </SubmitButton>
      </form>

      <Divider>Or continue with</Divider>
      <GoogleButton />

      <div className="mt-6 space-y-3 text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/sign-up" onClick={() => changeMode("signup")} className="font-bold text-yellow-500 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
            Create one now
          </Link>
        </p>
        <button type="button" className="text-sm font-semibold text-yellow-500 hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-500/70">
          Reset password
        </button>
      </div>
    </AuthShell>
  );
}
