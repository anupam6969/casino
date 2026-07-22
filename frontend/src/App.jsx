import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GameLaunch from "./pages/GameLaunch.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function PublicAuthRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
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
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <AuthLoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
}

export default function App() {
  return (
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
            <Navigate to="/auth?mode=signin" replace />
          </PublicAuthRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicAuthRoute>
            <Navigate to="/auth?mode=signup" replace />
          </PublicAuthRoute>
        }
      />
      <Route path="/terms-and-conditions" element={<TermsConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/play/:gameId" element={<GameLaunch />} />
      </Route>
    </Routes>
  );
}
