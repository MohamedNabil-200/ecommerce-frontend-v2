import type { LoginResponse } from "./auth.types";

const AUTH_STORAGE_KEY = "auth";

const saveAuth = (auth: LoginResponse) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

const loadAuth = (): LoginResponse | null => {
  const auth = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!auth) return null;
  try {
    return JSON.parse(auth);
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const authStorage = {
  saveAuth,
  loadAuth,
  clearAuth,
};
