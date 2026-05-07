import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '../../types';

const initialState: UIState = {
  mobileMenuOpen: false,
  activeCategory: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    setActiveCategory: (state, action: PayloadAction<string | null>) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, setActiveCategory } = uiSlice.actions;
export default uiSlice.reducer;
