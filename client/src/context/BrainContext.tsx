import { createContext, useContext, useEffect, useState } from "react";
import * as brainService from "../services/brain.service.js";
import * as contentService from "../services/content.service.js";
import { useAuth } from "./AuthContext";

type BrainContextType = {
  brains: any[];
  selectedBrain: any | null;
  content: any[];
  rootContent: any[];
  loading: boolean;
  fetchBrains: () => Promise<void>;
  fetchBrainContent: (id: string) => Promise<void>;
  fetchRootContent: () => Promise<void>;
  createBrain: (title: string) => Promise<void>;
  addContent: (brainId: string, data: any) => Promise<void>;
  addRootContent: (data: any) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
};

const BrainContext = createContext<BrainContextType | null>(null);

export function BrainProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const [brains, setBrains] = useState<any[]>([]);
  const [selectedBrain, setSelectedBrain] = useState<any | null>(null);
  const [content, setContent] = useState<any[]>([]);
  const [rootContent, setRootContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all brains
  const fetchBrains = async () => {
    try {
      setLoading(true);
      const data = await brainService.getBrains();
      setBrains(data.brains || []);
    } catch (error) {
      console.error("Failed to fetch brains:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch content without brainId (for dashboard)
  const fetchRootContent = async () => {
    try {
      setLoading(true);
      const data = await contentService.getContent();
      setRootContent(data.content || []);
    } catch (error) {
      console.error("Failed to fetch root content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch content for one brain
  const fetchBrainContent = async (id: string) => {
    try {
      setLoading(true);
      const data = await contentService.getBrainContent(id);
      setContent(data.content || []);

      const brain = brains.find((b) => b._id === id);
      setSelectedBrain(brain || null);
    } catch (error) {
      console.error("Failed to fetch brain content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create brain
  const createBrain = async (title: string) => {
    const data = await brainService.createBrain(title);
    if (data.brain) {
      setBrains((prev) => [...prev, data.brain]);
    }
  };

  // Add content to brain
  const addContent = async (brainId: string, contentData: any) => {
    const result = await contentService.addContentToBrain(brainId, contentData);
    if (result.content) {
      setContent((prev) => [...prev, result.content]);
    }
  };

  // Add content without brainId
  const addRootContent = async (contentData: any) => {
    const result = await contentService.addContent(contentData);
    if (result.content) {
      setRootContent((prev) => [...prev, result.content]);
    }
  };

  // Delete content
  const deleteContent = async (id: string) => {
    await contentService.deleteContent(id);
    setContent((prev) => prev.filter((item) => item._id !== id));
    setRootContent((prev) => prev.filter((item) => item._id !== id));
  };

  useEffect(() => {
    if (user) {
      fetchBrains();
      fetchRootContent();
    }
  }, [user]);

  return (
    <BrainContext.Provider
      value={{
        brains,
        selectedBrain,
        content,
        rootContent,
        loading,
        fetchBrains,
        fetchBrainContent,
        fetchRootContent,
        createBrain,
        addContent,
        addRootContent,
        deleteContent,
      }}
    >
      {children}
    </BrainContext.Provider>
  );
}

export function useBrain() {
  const context = useContext(BrainContext);
  if (!context) throw new Error("useBrain must be used inside BrainProvider");
  return context;
}
