import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/apiClient.js";

const AuthContext = createContext(null);

async function fetchCurrentUser() {
  const { data } = await api.get("/auth/me");
  return data.user;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remove credentials and cached profiles from the previous session flow.
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");

    let active = true;
    function handleUnauthorized() {
      setUser(null);
    }

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    fetchCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  async function submitCredentials(path, credentials) {
    try {
      const { data } = await api.post(path, credentials);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error.response?.data ?? error;
    }
  }

  function signup(credentials) {
    return submitCredentials("/auth/signup", credentials);
  }

  function signin(credentials) {
    return submitCredentials("/auth/signin", credentials);
  }

  async function logout() {
    setUser(null);
    try {
      await api.post("/auth/logout");
    } catch {
      // The local session is cleared even if the server is unavailable.
    }
  }

  return (
    <AuthContext.Provider value={{ user, logout, signup, signin, isAuthenticated: Boolean(user), loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
