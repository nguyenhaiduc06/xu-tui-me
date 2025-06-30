import { create } from 'zustand';

export interface UserState {
  isAuthenticated: boolean;
  isPaidUser: boolean;
  userType: 'guest' | 'free' | 'paid';
  email?: string;
  setUserType: (type: 'guest' | 'free' | 'paid') => void;
  setAuthenticated: (authenticated: boolean) => void;
  setPaidUser: (isPaid: boolean) => void;
  setEmail: (email: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  isPaidUser: false,
  userType: 'guest',
  email: undefined,
  
  setUserType: (type) => set({ userType: type }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setPaidUser: (isPaid) => set({ isPaidUser: isPaid, userType: isPaid ? 'paid' : 'free' }),
  setEmail: (email) => set({ email }),
}));