import { useAuth } from "../../context/AuthContext";

type Props = {
  onOpenAddContent: () => void;
};

export default function Header({ onOpenAddContent }: Props) {
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        {/* Could add breadcrumbs or search here */}
      </div>

      <div style={styles.right}>
        <button onClick={onOpenAddContent} style={styles.addBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add Content
        </button>

        <div style={styles.divider}></div>

        <div style={styles.userSection}>
          <div style={styles.avatar}>
            {(user?.username || "U")[0].toUpperCase()}
          </div>
          <button onClick={logout} style={styles.logoutBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    height: "var(--header-height)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    background: "var(--color-surface)",
    borderBottom: "1px solid var(--color-border-light)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  addBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 18px",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    color: "white",
    background: "var(--color-accent)",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    boxShadow: "0 1px 2px rgba(99, 102, 241, 0.15)",
  },
  divider: {
    width: "1px",
    height: "24px",
    background: "var(--color-border)",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #a855f7)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
  },
  logoutBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    background: "transparent",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
};
