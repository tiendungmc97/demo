import { RootState } from "./store";

const STORAGE_KEY = "redux-state";

export const loadState = (): Partial<RootState> | undefined => {
  try {
    if (typeof window === "undefined") return undefined;

    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Failed to load state from localStorage:", err);
    return undefined;
  }
};

export const saveState = (state: Partial<RootState>) => {
  try {
    if (typeof window === "undefined") return;

    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.warn("Failed to save state to localStorage:", err);
  }
};

export const clearPersistedState = () => {
  try {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn("Failed to clear persisted state:", err);
  }
};
