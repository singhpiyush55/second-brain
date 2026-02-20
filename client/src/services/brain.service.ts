import api from "./api";

export const getBrains = async () => {
  const res = await api.get("/brain");
  return res.data;
};

export const createBrain = async (title: string) => {
  const res = await api.post("/brain", { title });
  return res.data;
};

export const shareBrain = async (brainId: string) => {
  const res = await api.post("/share", { brainId });
  console.log("Share response:", res.data, res);
  return res.data.sharedId; // should return shareId
};

export const getSharedBrain = async (shareId: string) => {
  const res = await api.get(`/share/${shareId}`);
  return res.data;
};
