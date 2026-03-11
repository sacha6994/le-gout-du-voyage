"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface DayNightContextValue {
  isDay: boolean;
  animKey: number;
  ripple: { x: number; y: number } | null;
  toggle: (origin?: { x: number; y: number }) => void;
}

const DayNightContext = createContext<DayNightContextValue>({
  isDay: false,
  animKey: 0,
  ripple: null,
  toggle: () => {},
});

export function DayNightProvider({ children }: { children: ReactNode }) {
  const [isDay, setIsDay] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("day-mode", isDay);
  }, [isDay]);

  const toggle = useCallback((origin?: { x: number; y: number }) => {
    if (origin) setRipple(origin);
    setTimeout(() => {
      setIsDay((d) => !d);
      setAnimKey((k) => k + 1);
    }, 350);
    setTimeout(() => setRipple(null), 1600);
  }, []);

  return (
    <DayNightContext.Provider value={{ isDay, animKey, ripple, toggle }}>
      {children}
    </DayNightContext.Provider>
  );
}

export function useDayNight() {
  return useContext(DayNightContext);
}
