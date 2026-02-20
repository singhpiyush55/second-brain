import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBrain } from "../context/BrainContext";
import * as brainService from "../services/brain.service";

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

export default function BrainPage() {
  const { id } = useParams();
  const { content, selectedBrain, fetchBrainContent, deleteContent, loading } = useBrain();

  const [shareLoading, setShareLoading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState("");

  useEffect(() => {
    if (id) fetchBrainContent(id);
    // Reset share state when switching brains
    setShareLink(null);
    setCopied(false);
    setShareError("");
  }, [id]);

  const handleShare = async () => {
    if (!id) return;

    try {
      setShareLoading(true);
      setShareError("");
      const shareId = await brainService.shareBrain(id);
      const shareUrl = `${window.location.origin}/share/${shareId}`;
      setShareLink(shareUrl);
    } catch (err: any) {
      setShareError(err.response?.data?.error || "Failed to share brain");
    } finally {
      setShareLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = shareLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCloseShare = () => {
    setShareLink(null);
    setCopied(false);
    setShareError("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>
            <span style={styles.breadcrumbLink}>Brains</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
            <span style={styles.breadcrumbCurrent}>{selectedBrain?.title || "..."}</span>
          </div>
          <h1 style={styles.title}>{selectedBrain?.title || "Brain"}</h1>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.statBadge}>
            {content.length} item{content.length !== 1 ? "s" : ""}
          </div>
          <button
            onClick={handleShare}
            disabled={shareLoading}
            style={{
              ...styles.shareBtn,
              opacity: shareLoading ? 0.7 : 1,
            }}
            title="Share this brain"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            {shareLoading ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>

      {/* Share link popup */}
      {shareLink && (
        <div style={styles.sharePopup}>
          <div style={styles.sharePopupHeader}>
            <div style={styles.sharePopupIcon}>🔗</div>
            <div>
              <h3 style={styles.sharePopupTitle}>Brain shared!</h3>
              <p style={styles.sharePopupDesc}>Anyone with this link can view this brain</p>
            </div>
            <button onClick={handleCloseShare} style={styles.shareCloseBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div style={styles.shareLinkRow}>
            <input
              type="text"
              value={shareLink}
              readOnly
              style={styles.shareLinkInput}
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button onClick={handleCopy} style={styles.copyBtn}>
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Share error */}
      {shareError && (
        <div style={styles.shareError}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/>
            <path d="M8 5v3M8 10.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {shareError}
        </div>
      )}

      {loading && content.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>⏳</div>
          <p style={styles.emptyTitle}>Loading content...</p>
        </div>
      ) : content.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🧠</div>
          <p style={styles.emptyTitle}>This brain is empty</p>
          <p style={styles.emptyDesc}>
            Add some content to this brain using the "Add Content" button above.
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {content.map((item: any) => {
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
                    {typeIcons[item.type] || "🔗"} {item.type}
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
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "8px",
  },
  breadcrumbLink: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
  },
  breadcrumbCurrent: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-secondary)",
    fontWeight: 500,
  },
  title: {
    fontSize: "var(--text-2xl)",
    fontWeight: 700,
    color: "var(--color-text-primary)",
    letterSpacing: "-0.02em",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  statBadge: {
    padding: "6px 14px",
    background: "var(--color-accent-light)",
    color: "var(--color-accent)",
    borderRadius: "var(--radius-full)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
  },
  shareBtn: {
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
    boxShadow: "0 1px 2px rgba(99, 102, 241, 0.2)",
  },
  sharePopup: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border-light)",
    borderRadius: "var(--radius-lg)",
    padding: "20px",
    marginBottom: "24px",
    boxShadow: "var(--shadow-md)",
    animation: "slideUp 0.2s ease",
  },
  sharePopupHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "16px",
  },
  sharePopupIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  sharePopupTitle: {
    fontSize: "var(--text-base)",
    fontWeight: 600,
    color: "var(--color-text-primary)",
    marginBottom: "2px",
  },
  sharePopupDesc: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
  },
  shareCloseBtn: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "var(--radius-sm)",
    border: "none",
    background: "transparent",
    color: "var(--color-text-tertiary)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    flexShrink: 0,
  },
  shareLinkRow: {
    display: "flex",
    gap: "8px",
  },
  shareLinkInput: {
    flex: 1,
    padding: "10px 14px",
    fontSize: "var(--text-sm)",
    border: "1.5px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-bg)",
    color: "var(--color-text-primary)",
    outline: "none",
  },
  copyBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 18px",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    color: "white",
    background: "var(--color-accent)",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  shareError: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    background: "var(--color-danger-light)",
    border: "1px solid #fecaca",
    borderRadius: "var(--radius-md)",
    fontSize: "var(--text-sm)",
    color: "var(--color-danger)",
    marginBottom: "24px",
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
  emptyIcon: { fontSize: "48px", marginBottom: "16px" },
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
