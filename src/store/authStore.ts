import { create } from "zustand";
export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    otherNames: string | null;
    role: "user" | "admin";
    profilePicture: string | null;
    dateOfBirth: string | null;
    gender: "male" | "female" | "other" | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
  

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set ) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
