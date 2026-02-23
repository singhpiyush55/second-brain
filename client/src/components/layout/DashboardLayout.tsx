import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import CreateBrainModal from "../brain/CreateBrainModal";
import AddContentModal from "../content/AddContentModal";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);

  return (
    <div style={styles.layout}>
      <Sidebar onOpenCreate={() => setIsOpen(true)} />

      <div style={styles.main}>
        <Header onOpenAddContent={() => setIsAddContentOpen(true)} />
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>

      {isOpen && <CreateBrainModal onClose={() => setIsOpen(false)} />}
      {isAddContentOpen && (<AddContentModal onClose={() => setIsAddContentOpen(false)} />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  layout: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
    background: "var(--color-bg)",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    overflowY: "auto" as const,
  },
};
