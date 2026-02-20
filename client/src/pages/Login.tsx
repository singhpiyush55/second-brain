import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BrainIcon } from "../icons";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Left branding */}
        <div style={styles.brandPanel}>
          <div>
            <div style={styles.brandLogo}><BrainIcon size={48} color="white" /></div>
            <h2 style={styles.brandTitle}>Second Brain</h2>
            <p style={styles.brandDesc}>
              Your personal knowledge base. Capture ideas, organize thoughts, and never forget
              what matters.
            </p>
          </div>
          <p style={styles.brandFooter}>Trusted by thousands of knowledge enthusiasts.</p>
        </div>

        {/* Right form */}
        <div style={styles.formPanel}>
          <div style={styles.formWrapper}>
            <div style={styles.formHeader}>
              <h1 style={styles.formTitle}>Welcome back</h1>
              <p style={styles.formSubtitle}>Sign in to your Second Brain</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={styles.input}
                  autoFocus
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={styles.input}
                />
              </div>

              {error && (
                <div style={styles.errorBox}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
                    <path
                      d="M8 5v3M8 10.5v.5"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.submitBtn,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p style={styles.switchText}>
              Don't have an account?{" "}
              <Link to="/signup" style={styles.switchLink}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--color-bg)",
    padding: "24px",
  },
  container: {
    display: "flex",
    width: "100%",
    maxWidth: "900px",
    minHeight: "540px",
    borderRadius: "var(--radius-xl)",
    overflow: "hidden",
    boxShadow: "var(--shadow-xl)",
    border: "1px solid var(--color-border-light)",
    background: "var(--color-surface)",
  },
  brandPanel: {
    flex: "0 0 360px",
    background: "linear-gradient(135deg, #6366f1, #a855f7)",
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    color: "white",
  },
  brandLogo: { fontSize: "48px", marginBottom: "24px" },
  brandTitle: { fontSize: "var(--text-2xl)", fontWeight: 700, marginBottom: "12px" },
  brandDesc: { fontSize: "var(--text-base)", lineHeight: 1.7, opacity: 0.85 },
  brandFooter: { fontSize: "var(--text-sm)", opacity: 0.6 },
  formPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 40px",
  },
  formWrapper: { width: "100%", maxWidth: "360px" },
  formHeader: { marginBottom: "28px" },
  formTitle: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    color: "var(--color-text-primary)",
    marginBottom: "8px",
  },
  formSubtitle: { fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-text-secondary)" },
  input: {
    padding: "10px 14px",
    fontSize: "var(--text-base)",
    border: "1.5px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    outline: "none",
    transition: "all var(--transition-fast)",
    background: "var(--color-bg)",
    color: "var(--color-text-primary)",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    background: "var(--color-danger-light)",
    border: "1px solid #fecaca",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-sm)",
    color: "var(--color-danger)",
  },
  submitBtn: {
    padding: "12px",
    fontSize: "var(--text-base)",
    fontWeight: 600,
    color: "white",
    background: "var(--color-accent)",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    height: "46px",
  },
  switchText: {
    textAlign: "center" as const,
    marginTop: "24px",
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
  },
  switchLink: { color: "var(--color-accent)", fontWeight: 500, textDecoration: "none" },
};
