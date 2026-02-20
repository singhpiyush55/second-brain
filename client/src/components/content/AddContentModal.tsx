import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useBrain } from "../../context/BrainContext";

type Props = {
  onClose: () => void;
};

export default function AddContentModal({ onClose }: Props) {
  const { id } = useParams();
  const location = useLocation();
  const { addContent, addRootContent } = useBrain();

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<"document" | "tweet" | "youtube" | "link">("link");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isOnDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !link.trim()) {
      setError("Title and Link are required");
      return;
    }

    const data = {
      title: title.trim(),
      link: link.trim(),
      type,
      tags: tag.trim() ? [tag.trim()] : [],
    };

    try {
      setLoading(true);
      setError("");

      if (isOnDashboard) {
        await addRootContent(data);
      } else if (id) {
        await addContent(id, data);
      } else {
        setError("No brain selected");
        return;
      }

      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to add content");
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = [
    { value: "link", label: "🔗 Link", color: "#3b82f6" },
    { value: "document", label: "📄 Document", color: "#d97706" },
    { value: "tweet", label: "🐦 Tweet", color: "#0284c7" },
    { value: "youtube", label: "▶️ YouTube", color: "#ef4444" },
  ];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.modalHeader}>
          <div>
            <h2 style={styles.modalTitle}>Add Content</h2>
            <p style={styles.modalSubtitle}>
              {isOnDashboard ? "Save to your dashboard" : "Add to this brain"}
            </p>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Title</label>
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give it a descriptive title"
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>URL</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com/article"
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Type</label>
            <div style={styles.typeGrid}>
              {typeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setType(opt.value as any)}
                  style={{
                    ...styles.typeOption,
                    ...(type === opt.value ? {
                      borderColor: "var(--color-accent)",
                      background: "var(--color-accent-light)",
                      color: "var(--color-accent)",
                    } : {}),
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Tag <span style={{ color: "var(--color-text-tertiary)", fontWeight: 400 }}>(optional)</span></label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="e.g., productivity, ai, design"
              style={styles.input}
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/>
                <path d="M8 5v3M8 10.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Saving..." : "Save Content"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.15s ease",
    padding: "24px",
  },
  modal: {
    background: "var(--color-surface)",
    borderRadius: "var(--radius-xl)",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "var(--shadow-overlay)",
    animation: "scaleIn 0.2s ease",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "28px 28px 0",
  },
  modalTitle: {
    fontSize: "var(--text-xl)",
    fontWeight: 700,
    color: "var(--color-text-primary)",
    marginBottom: "4px",
  },
  modalSubtitle: {
    fontSize: "var(--text-sm)",
    color: "var(--color-text-tertiary)",
  },
  closeBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "var(--radius-md)",
    border: "none",
    background: "var(--color-surface-hover)",
    color: "var(--color-text-tertiary)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    flexShrink: 0,
  },
  form: {
    padding: "24px 28px 28px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
  },
  input: {
    padding: "11px 14px",
    fontSize: "var(--text-base)",
    border: "1.5px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    outline: "none",
    background: "var(--color-bg)",
    color: "var(--color-text-primary)",
    transition: "all var(--transition-fast)",
  },
  typeGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },
  typeOption: {
    padding: "9px 12px",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    background: "var(--color-bg)",
    border: "1.5px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    textAlign: "center" as const,
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
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    paddingTop: "4px",
  },
  cancelBtn: {
    padding: "10px 20px",
    fontSize: "var(--text-sm)",
    fontWeight: 500,
    color: "var(--color-text-secondary)",
    background: "var(--color-surface-hover)",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  submitBtn: {
    padding: "10px 24px",
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
};