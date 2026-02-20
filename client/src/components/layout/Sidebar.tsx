import { NavLink, useNavigate } from "react-router-dom";
import { useBrain } from "../../context/BrainContext";

type Props = {
  onOpenCreate: () => void;
};

export default function Sidebar({ onOpenCreate }: Props) {
  const { brains } = useBrain();
  const navigate = useNavigate();

  return (
    <aside style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logoSection} onClick={() => navigate("/dashboard")}>
        <div style={styles.logoIcon}>🧠</div>
        <span style={styles.logoText}>Second Brain</span>
      </div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.section}>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {}),
            })}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            Dashboard
          </NavLink>
        </div>

        {/* Brains section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Your Brains</span>
            <button onClick={onOpenCreate} style={styles.addBtn} title="Create Brain">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </button>
          </div>

          <div style={styles.brainList}>
            {brains.length === 0 ? (
              <p style={styles.emptyText}>No brains yet</p>
            ) : (
              brains.map((brain: any) => (
                <NavLink
                  key={brain._id}
                  to={`/brain/${brain._id}`}
                  style={({ isActive }) => ({
                    ...styles.brainItem,
                    ...(isActive ? styles.brainItemActive : {}),
                  })}
                >
                  <span style={styles.brainDot}></span>
                  <span style={styles.brainTitle}>{brain.title}</span>
                </NavLink>
              ))
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: "var(--sidebar-width)",
    height: "100vh",
    background: "var(--color-surface)",
    borderRight: "1px solid var(--color-border-light)",
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: 0,
    overflow: "hidden",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    height: "var(--header-height)",
    padding: "0 24px",
    borderBottom: "1px solid var(--color-border-light)",
    cursor: "pointer",
    transition: "background var(--transition-fast)",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "var(--text-lg)",
    color: "var(--color-text-primary)",
    letterSpacing: "-0.01em",
  },
  nav: {
    flex: 1,
    overflowY: "auto" as const,
    padding: "12px",
  },
  section: {
    marginBottom: "8px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    transition: "all var(--transition-fast)",
    marginBottom: "2px",
  },
  navItemActive: {
    background: "var(--color-accent-light)",
    color: "var(--color-accent)",
    fontWeight: 600,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 12px 8px",
  },
  sectionTitle: {
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    color: "var(--color-text-tertiary)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "26px",
    height: "26px",
    borderRadius: "var(--radius-sm)",
    border: "none",
    background: "transparent",
    color: "var(--color-text-tertiary)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  brainList: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  brainItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "9px 12px",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-sm)",
    fontWeight: 400,
    color: "var(--color-text-secondary)",
    textDecoration: "none",
    transition: "all var(--transition-fast)",
  },
  brainItemActive: {
    background: "var(--color-accent-light)",
    color: "var(--color-accent)",
    fontWeight: 500,
  },
  brainDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "var(--color-accent)",
    opacity: 0.5,
    flexShrink: 0,
  },
  brainTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  emptyText: {
    padding: "8px 12px",
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
    fontStyle: "italic",
  },
};
