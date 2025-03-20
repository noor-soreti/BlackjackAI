import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { asyncStorage } from "./storage";

interface AppState {
  user: any;
  isLoggedIn: boolean;
  setUser: (user: any) => void;
  login: () => void;
  logout: () => void;
}

const useAppStore = create(
  persist<AppState>(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => asyncStorage),
    }
  )
);

export default useAppStore;
