import axios from "axios";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface FileListResponse {
  files: string[];
  folders: string[];
}

export const auth = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", { username, password });
    return response.data;
  },
};

export const files = {
  list: async (path?: string): Promise<FileListResponse> => {
    const response = await api.get("/files", {
      params: { path },
    });
    return response.data;
  },
};

export default api;
