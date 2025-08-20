import React, { useState } from "react";
import { signInPopup, signOutPopup, getActiveAccount } from "../../auth";
import type { PopupRequest } from "@azure/msal-browser";

// Simple SignIn / Register component using MSAL popup flows (no redirects)
export default function SignIn() {
  const [tab, setTab] = useState<"signIn" | "register">("signIn");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // password removed for popup flow
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const account = getActiveAccount();

  const handleSignIn = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const req: PopupRequest = {
        scopes: ["User.Read"],
        loginHint: email || undefined,
      };
      const res = await signInPopup(req);
      if (res.success) {
        setMessage(
          `Signed in as ${res.account?.username || res.account?.name}`,
        );
      } else {
        setMessage("Sign in failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      // Registration in Entra/Azure AD typically uses a dedicated policy (B2C) or self-service sign-up.
      // This component attempts to start a popup sign-in and will allow the user to create an account
      // if the tenant/app registration supports self-service sign-up.
      const req: PopupRequest = {
        scopes: ["User.Read"],
        loginHint: email || undefined,
      };

      const res = await signInPopup(req);
      if (res.success) {
        setMessage(
          `Registered / signed in as ${res.account?.username || res.account?.name}`,
        );
      } else {
        setMessage("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await signOutPopup();
      if (res.success) setMessage("Signed out");
    } finally {
      setLoading(false);
    }
  };

  if (account) {
    return (
      <div style={{ maxWidth: 480, margin: "24px auto" }}>
        <h2>Account</h2>
        <div>
          <strong>Username:</strong> {account.username || account.homeAccountId}
        </div>
        <div style={{ marginTop: 12 }}>
          <button onClick={handleSignOut} disabled={loading}>
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
        {message && <p style={{ marginTop: 12 }}>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "24px auto" }}>
      <h2>Sign in / Register</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setTab("signIn")} disabled={tab === "signIn"}>
          Sign in
        </button>
        <button
          onClick={() => setTab("register")}
          disabled={tab === "register"}
        >
          Register
        </button>
      </div>

      {tab === "signIn" ? (
        <form onSubmit={handleSignIn}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>

          {/* password handled by MS login popup; no local password field */}

          <div style={{ marginTop: 12 }}>
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in with Microsoft"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <label style={{ display: "block", marginBottom: 8 }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>

          {/* password handled by MS login popup; no local password field */}

          <label style={{ display: "block", marginBottom: 8 }}>
            Display name (optional):
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>

          <div style={{ marginTop: 12 }}>
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register with Microsoft"}
            </button>
          </div>
        </form>
      )}

      {message && <p style={{ marginTop: 12 }}>{message}</p>}

      <p style={{ marginTop: 16, color: "#666" }}>
        Note: this component uses MSAL popup flows (no redirects). Registration
        support depends on your Azure/Entra configuration (B2C sign-up policy or
        tenant self-service).
      </p>
    </div>
  );
}
