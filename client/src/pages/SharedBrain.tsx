import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedBrain } from "../services/brain.service";

const typeIcons: Record<string, string> = {
  link: "🔗",
  document: "📄",
  tweet: "🐦",
  youtube: "▶️",
};

const typeColors: Record<string, { bg: string; text: string }> = {
  link: { bg: "#eff6ff", text: "#3b82f6" },
  document: { bg: "#fef3c7", text: "#d97706" },
  tweet: { bg: "#e0f2fe", text: "#0284c7" },
  youtube: { bg: "#fef2f2", text: "#ef4444" },
};

export default function SharedBrain() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const result = await getSharedBrain(id!);
        console.log("Shared brain data:", result);
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || "This shared link is invalid or expired");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchShared();
  }, [id]);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.center}>
          <div style={styles.emptyIcon}>⏳</div>
          <p style={styles.loadingText}>Loading shared brain...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.page}>
        <div style={styles.center}>
          <div style={styles.emptyIcon}>😕</div>
          <p style={styles.errorTitle}>Oops!</p>
          <p style={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  const content = Array.isArray(data) ? data : data?.content || [];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div style={styles.logo}>
              <span style={{ fontSize: "24px" }}>🧠</span>
              <span style={styles.logoText}>Second Brain</span>
            </div>
          </div>
          <h1 style={styles.title}>{data?.brain?.title || "Shared Content"}</h1>
          <p style={styles.subtitle}>
            {content.length} item{content.length !== 1 ? "s" : ""} shared publicly
          </p>
        </div>

        {/* Content */}
        {content.length === 0 ? (
          <div style={styles.center}>
            <p style={styles.emptyText}>This shared brain has no content yet.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {content.map((item: any) => {
              const colors = typeColors[item.type] || typeColors.link;
              return (
                <div key={item._id} style={styles.card}>
                  <div style={{
                    ...styles.typeBadge,
                    background: colors.bg,
                    color: colors.text,
                  }}>
                    {typeIcons[item.type] || "🔗"} {item.type}
                  </div>
                  <h3 style={styles.cardTitle}>{item.title}</h3>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.cardLink}
                  >
                    {item.link?.length > 60 ? item.link.slice(0, 60) + "..." : item.link}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </a>
                  {item.tags?.length > 0 && (
                    <div style={styles.tags}>
                      {item.tags.map((tag: any, i: number) => (
                        <span key={i} style={styles.tag}>#{typeof tag === 'string' ? tag : tag.title}</span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "var(--color-bg)",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "32px 24px",
  },
  center: {
    textAlign: "center" as const,
    padding: "80px 24px",
  },
  header: {
    marginBottom: "40px",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoText: {
    fontWeight: 700,
    fontSize: "var(--text-lg)",
    color: "var(--color-text-primary)",
  },
  sharedBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 14px",
    background: "var(--color-success-light)",
    color: "var(--color-success)",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
  },
  title: {
    fontSize: "var(--text-3xl)",
    fontWeight: 700,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.02em",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "var(--color-surface)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border-light)",
    padding: "24px",
    boxShadow: "var(--shadow-xs)",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  typeBadge: {
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: "6px",
    padding: "4px 12px",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--text-xs)",
    fontWeight: 600,
    textTransform: "capitalize" as const,
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
  },
  tags: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "6px",
  },
  tag: {
    padding: "3px 10px",
    background: "var(--color-surface-hover)",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--text-xs)",
    color: "var(--color-text-secondary)",
    fontWeight: 500,
  },
  emptyIcon: { fontSize: "48px", marginBottom: "16px" },
  loadingText: { fontSize: "var(--text-base)", color: "var(--color-text-tertiary)" },
  errorTitle: { fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" },
  errorText: { fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" },
  emptyText: { fontSize: "var(--text-base)", color: "var(--color-text-tertiary)" },
};
