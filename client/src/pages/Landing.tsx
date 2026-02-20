import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={styles.page}>
      {/* Nav */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>🧠</div>
            <span style={styles.logoText}>Second Brain</span>
          </div>
          <div style={styles.navLinks}>
            <Link to="/login" style={styles.navLink}>Log in</Link>
            <Link to="/signup" style={styles.navCta}>Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <span style={styles.badgeDot}></span>
            Your knowledge, organized
          </div>
          <h1 style={styles.heroTitle}>
            Build your <span style={styles.heroAccent}>Second Brain</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Save links, tweets, documents, and videos in one place. 
            Organize them into brains and share your knowledge with the world.
          </p>
          <div style={styles.heroActions}>
            <Link to="/signup" style={styles.heroPrimary}>
              Start for free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "8px" }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/login" style={styles.heroSecondary}>
              I already have an account
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div style={styles.features}>
          {[
            { icon: "📎", title: "Save Anything", desc: "Links, tweets, YouTube videos, and documents — all in one place." },
            { icon: "🗂️", title: "Organize in Brains", desc: "Group related content into themed brains for easy access." },
            { icon: "🔗", title: "Share Publicly", desc: "Generate a shareable link to let others explore your collections." },
          ].map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2026 Second Brain. Built with focus.
        </p>
      </footer>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8f9fb 0%, #eef2ff 100%)",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(248, 249, 251, 0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid var(--color-border-light)",
  },
  navInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "0 24px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "var(--text-lg)",
    color: "var(--color-text-primary)",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  navLink: {
    padding: "8px 16px",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    borderRadius: "var(--radius-md)",
    transition: "all var(--transition-fast)",
  },
  navCta: {
    padding: "8px 20px",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    color: "white",
    background: "var(--color-accent)",
    borderRadius: "var(--radius-md)",
    transition: "all var(--transition-fast)",
  },
  hero: {
    flex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "80px 24px 60px",
    width: "100%",
  },
  heroContent: {
    textAlign: "center" as const,
    maxWidth: "680px",
    margin: "0 auto 72px",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 16px",
    background: "var(--color-accent-light)",
    color: "var(--color-accent)",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    marginBottom: "24px",
  },
  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--color-accent)",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
    color: "var(--color-text-primary)",
    marginBottom: "20px",
  },
  heroAccent: {
    background: "linear-gradient(135deg, var(--color-accent), #a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "var(--text-lg)",
    color: "var(--color-text-secondary)",
    lineHeight: 1.7,
    marginBottom: "36px",
    maxWidth: "540px",
    margin: "0 auto 36px",
  },
  heroActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap" as const,
  },
  heroPrimary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 28px",
    fontSize: "var(--text-base)",
    fontWeight: 600,
    color: "white",
    background: "var(--color-accent)",
    borderRadius: "var(--radius-md)",
    transition: "all var(--transition-fast)",
    boxShadow: "0 1px 2px rgba(99, 102, 241, 0.2), 0 4px 12px rgba(99, 102, 241, 0.15)",
  },
  heroSecondary: {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 28px",
    fontSize: "var(--text-base)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    background: "var(--color-surface)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-border)",
    transition: "all var(--transition-fast)",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  featureCard: {
    background: "var(--color-surface)",
    padding: "32px 28px",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border-light)",
    boxShadow: "var(--shadow-sm)",
    transition: "all var(--transition-base)",
  },
  featureIcon: {
    fontSize: "32px",
    marginBottom: "16px",
  },
  featureTitle: {
    fontSize: "var(--text-lg)",
    fontWeight: 600,
    color: "var(--color-text-primary)",
    marginBottom: "8px",
  },
  featureDesc: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-secondary)",
    lineHeight: 1.6,
  },
  footer: {
    padding: "24px",
    textAlign: "center" as const,
    borderTop: "1px solid var(--color-border-light)",
  },
  footerText: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
  },
};
