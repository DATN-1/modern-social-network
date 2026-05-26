"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "nova-theme";

function getServerTheme(): Theme {
  return "light";
}

function getClientTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribe(callback: () => void) {
  // Subscribe to manual theme toggles via a custom event.
  window.addEventListener("nova-theme-change", callback);
  return () => window.removeEventListener("nova-theme-change", callback);
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
  root.style.colorScheme = t;
  localStorage.setItem(STORAGE_KEY, t);
  window.dispatchEvent(new Event("nova-theme-change"));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Use external store synchronisation so the value is read from the DOM
  // (which is set by an inline script in the layout before hydration).
  const theme = useSyncExternalStore(subscribe, getClientTheme, getServerTheme);

  // Fallback local state so the hook returns stable values even if a test
  // environment doesn't render the inline script.
  const [, setBump] = useState(0);

  const setTheme = useCallback((t: Theme) => {
    applyTheme(t);
    setBump((b) => b + 1);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = getClientTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setBump((b) => b + 1);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

/**
 * Inline script content that applies the stored theme on the html element
 * before the React tree hydrates, preventing a flash of incorrect theme.
 * Used by the root layout via `dangerouslySetInnerHTML`.
 */
export const themeInitScript = `(() => {
  try {
    var key = "${STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    root.style.colorScheme = theme;
  } catch (e) {}
})();`;
