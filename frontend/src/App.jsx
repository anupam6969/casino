import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { API_BASE } from "./api/apiClient.js";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AboutUs from "./pages/About.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import PrivacyPolicy from "./pages/PrivacyNoticePage.jsx";
import OfficialRules from "./pages/OfficialRules.jsx";
import ResponsiblePlay from "./pages/ResponsiblePlay.jsx";
import SweepstakesRules from "./pages/SweepstakesRules.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import SSLPolicy from "./pages/SSLPolicy.jsx";
import RefundPolicy from "./pages/RefundPolicy.jsx";
import PromotionPolicy from "./pages/PromotionPolicy.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function PublicAuthRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return <LandingPage />;
  }

  return children;
}

function AuthLoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-gold-200">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold-200/25 border-t-gold-200" aria-label="Loading" />
    </div>
  );
}

function HomeRoute() {
  const { loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  // The landing page remains accessible after login.
  return <LandingPage />;
}

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    let frame = 0;
    let timeout = 0;
    let attempts = 0;

    function scrollToTarget() {
      const target = document.querySelector(hash);

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      attempts += 1;
      if (attempts < 12) {
        timeout = window.setTimeout(scrollToTarget, 80);
      }
    }

    frame = requestAnimationFrame(scrollToTarget);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [hash, pathname]);

  return null;
}

export default function App() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    if (!token) return;

    async function completeGoogleLogin() {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw data;

        login(data.user, token);
      } catch {
        navigate("/login?error=google_auth_failed", { replace: true });
        return;
      }

      window.history.replaceState(null, "", `${window.location.pathname}${window.location.hash}`);
    }

    completeGoogleLogin();
  }, [login, navigate]);

  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route
          path="/auth"
          element={
            <PublicAuthRoute>
              <AuthPage />
            </PublicAuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicAuthRoute>
              <AuthPage />
            </PublicAuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicAuthRoute>
              <Navigate to="/sign-up" replace />
            </PublicAuthRoute>
          }
        />
        <Route
          path="/sign-in"
          element={
            <PublicAuthRoute>
              <AuthPage />
            </PublicAuthRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicAuthRoute>
              <AuthPage />
            </PublicAuthRoute>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/official-rules" element={<OfficialRules />} />
        <Route path="/responsible-gaming" element={<ResponsiblePlay />} />
        <Route path="/sweepstakes-rules" element={<SweepstakesRules />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/ssl-policy" element={<SSLPolicy />} />
        <Route path="/refund-cancellation-policy" element={<RefundPolicy />} />
        <Route path="/promotion-policy" element={<PromotionPolicy />} />
      </Routes>
    </>
  );
}
