import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../../services/userService";
import styles from "../create-account/CreateAccountForm.module.css";
import TestimonialCard from "../create-account/TestimonialCard";

function resolveTargetByRole(role) {
  if (role === "refugee") return "/refugee-dashboard";
  return "/dashboard";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier || !password) {
      toast.error("Please enter your phone/email and password.");
      return;
    }

    const isEmail = trimmedIdentifier.includes("@");
    const payload = isEmail
      ? { email: trimmedIdentifier, password }
      : { phone: trimmedIdentifier, password };

    setIsSubmitting(true);

    try {
      const res = await loginUser(payload);
      const token = res?.data?.token || res?.token;
      const user = res?.data?.user || res?.user;

      if (!token || !user) {
        throw new Error("Unexpected login response from server.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful.");
      const returnPath = location.state?.from || localStorage.getItem("returnTo");
      if (returnPath) {
        localStorage.removeItem("returnTo");
      }
      navigate(returnPath || resolveTargetByRole(user.role));
    } catch (error) {
      toast.error(error?.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <div style={{ marginBottom: "0.6rem" }}>
            <div className={styles.iconWrapper}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="#4f8ef7" strokeWidth="2" />
                <path
                  d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                  stroke="#4f8ef7"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h1 className={styles.heading}>Sign In</h1>
            <p className={styles.subheading}>Sign in to continue to your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            <label className={styles.sectionLabel} htmlFor="identifier">Phone or Email</label>
            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M2 7.5l10 6 10-6" stroke="#6b7a99" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <input
                id="identifier"
                className={styles.input}
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. 81303398 or sami@example.com"
                autoComplete="username"
              />
            </div>

            <label className={styles.sectionLabel} htmlFor="password">Password</label>
            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="8" width="18" height="12" rx="2" stroke="#6b7a99" strokeWidth="1.6" />
                </svg>
              </span>
              <input
                id="password"
                className={styles.input}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                style={{ marginLeft: "0.25rem" }}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 3l18 18" stroke="#6b7a99" strokeWidth="1.6" strokeLinecap="round"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7z" stroke="#6b7a99" strokeWidth="1.6" strokeLinecap="round"/></svg>
                )}
              </button>
            </div>

            <button type="submit" className={styles.continueBtn} disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p style={{ marginTop: "0.9rem", color: "#8892aa" }}>
            No account yet? <Link to="/">Create one</Link>
          </p>
        </div>

        <TestimonialCard />
      </div>
    </div>
  );
}
