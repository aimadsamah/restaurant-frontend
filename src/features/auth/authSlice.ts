import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types';

// Safe initial state — localStorage is read client-side only
const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('mn_token', action.payload.token);
        localStorage.setItem('mn_user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mn_token');
        localStorage.removeItem('mn_user');
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Called on client mount to rehydrate from localStorage
    rehydrateAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('mn_token');
        const userStr = localStorage.getItem('mn_user');
        if (token && userStr) {
          try {
            state.token = token;
            state.user = JSON.parse(userStr);
            state.isAuthenticated = true;
          } catch {
            localStorage.removeItem('mn_token');
            localStorage.removeItem('mn_user');
          }
        }
      }
    },
  },
});

export const { setCredentials, logout, setLoading, rehydrateAuth } = authSlice.actions;
export default authSlice.reducer;
