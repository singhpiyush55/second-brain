import { useEffect } from "react";
import { useBrain } from "../context/BrainContext";
import { typeIconMap, LinkIcon, LoadingIcon, InboxEmptyIcon } from "../icons";

const typeColors: Record<string, { bg: string; text: string }> = {
  link: { bg: "#eff6ff", text: "#3b82f6" },
  document: { bg: "#fef3c7", text: "#d97706" },
  tweet: { bg: "#e0f2fe", text: "#0284c7" },
  youtube: { bg: "#fef2f2", text: "#ef4444" },
};

export default function Dashboard() {
  const { rootContent, fetchRootContent, deleteContent, loading } = useBrain();

  useEffect(() => {
    fetchRootContent();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>All your saved content in one place</p>
        </div>
        <div style={styles.stats}>
          <div style={styles.statBadge}>
            {rootContent.length} item{rootContent.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {loading && rootContent.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}><LoadingIcon size={48} color="var(--color-text-tertiary)" /></div>
          <p style={styles.emptyTitle}>Loading your content...</p>
        </div>
      ) : rootContent.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}><InboxEmptyIcon size={48} color="var(--color-text-tertiary)" /></div>
          <p style={styles.emptyTitle}>No content yet</p>
          <p style={styles.emptyDesc}>
            Click "Add Content" to start saving links, tweets, and more.
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {rootContent.map((item: any) => {
            const colors = typeColors[item.type] || typeColors.link;
            return (
              <div key={item._id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div
                    style={{
                      ...styles.typeBadge,
                      background: colors.bg,
                      color: colors.text,
                    }}
                  >
                    {(() => { const Icon = typeIconMap[item.type] || LinkIcon; return <Icon size={14} />; })()} {item.type}
                  </div>
                  <button
                    onClick={() => deleteContent(item._id)}
                    style={styles.deleteBtn}
                    title="Delete"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                  </button>
                </div>

                <h3 style={styles.cardTitle}>{item.title}</h3>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.cardLink}
                >
                  {item.link?.length > 50 ? item.link.slice(0, 50) + "..." : item.link}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>

                {item.tags?.length > 0 && (
                  <div style={styles.tags}>
                    {item.tags.map((tag: any, i: number) => (
                      <span key={tag._id || i} style={styles.tag}>
                        #{typeof tag === "string" ? tag : tag.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "32px",
    maxWidth: "1200px",
    margin: "0 auto",
    animation: "slideUp 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "32px",
  },
  title: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
    marginTop: "4px",
  },
  stats: {
    display: "flex",
    gap: "8px",
  },
  statBadge: {
    padding: "6px 14px",
    background: "var(--color-accent-light)",
    color: "var(--color-accent)",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "var(--color-surface)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border-light)",
    padding: "24px",
    boxShadow: "var(--shadow-xs)",
    transition: "all var(--transition-base)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 12px",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    textTransform: "capitalize" as const,
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "var(--radius-sm)",
    border: "none",
    background: "transparent",
    color: "var(--color-text-tertiary)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  cardTitle: {
    fontSize: "var(--text-base)",
    fontWeight: 600,
    color: "var(--color-text-primary)",
    lineHeight: 1.4,
  },
  cardLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "var(--text-sm)",
    color: "var(--color-accent)",
    fontWeight: 500,
    wordBreak: "break-all" as const,
    transition: "color var(--transition-fast)",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "6px",
    marginTop: "2px",
  },
  tag: {
    padding: "3px 10px",
    background: "var(--color-surface-hover)",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--text-xs)",
    color: "var(--color-text-secondary)",
    fontWeight: 500,
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "80px 24px",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  emptyTitle: {
    fontSize: "var(--text-lg)",
    fontWeight: 600,
    color: "var(--color-text-primary)",
    marginBottom: "8px",
  },
  emptyDesc: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
    maxWidth: "360px",
    margin: "0 auto",
  },
};