import { createContext, useContext, useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";

const AuthContext = createContext(null);

function parseStoredUser(storedUser) {
  try {
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = parseStoredUser(localStorage.getItem(USER_KEY));

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    function handleUnauthorized() {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setToken(null);
      setUser(null);
      setLoading(false);
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  function login(userData, authToken) {
    localStorage.setItem(TOKEN_KEY, authToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  }

  async function signup({ username, email, password }) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    login(data.user, data.token);
    return data;
  }

  async function signin({ identifier, password }) {
    const res = await fetch(`${API_BASE}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    login(data.user, data.token);
    return data;
  }

  async function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);

    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Local logout should still complete if the server is unavailable.
    }
  }

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      signup,
      signin,
      isAuthenticated: Boolean(token && user),
      loading,
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
