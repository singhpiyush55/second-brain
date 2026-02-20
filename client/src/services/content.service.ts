import api from "./api";

// Get all content (without brainId - for dashboard)
export const getContent = async () => {
  const res = await api.get("/content");
  return res.data;
};

// Get content for a specific brain
export const getBrainContent = async (brainId: string) => {
  const res = await api.get(`/content/${brainId}`);
  return res.data;
};

// Add content without brainId (root content)
export const addContent = async (data: {
  title: string;
  link: string;
  type: string;
  tags: string[];
}) => {
  const res = await api.post("/content", data);
  return res.data;
};

// Add content to a specific brain
export const addContentToBrain = async (
  brainId: string,
  data: {
    title: string;
    link: string;
    type: string;
    tags: string[];
  }
) => {
  const res = await api.post(`/content/${brainId}`, data);
  return res.data;
};

// Delete content
export const deleteContent = async (contentId: string) => {
  const res = await api.delete(`/content/${contentId}`);
  return res.data;
};
