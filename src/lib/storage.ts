const STORAGE_KEY = "pgagi-dashboard-state";

export function saveToStorage<T>(value: T) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function loadFromStorage<T>(): T | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = localStorage.getItem(STORAGE_KEY);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function clearStorage() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}
