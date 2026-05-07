import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Category, MenuItem } from '../../types';

interface MenuState {
  activeCategory: string | null;
  searchQuery: string;
  categories: Category[];
  items: MenuItem[];
}

const initialState: MenuState = {
  activeCategory: null,
  searchQuery: '',
  categories: [],
  items: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<string | null>) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
    clearMenuState: (state) => {
      state.searchQuery = '';
      state.activeCategory = null;
    },
  },
});

export const { setActiveCategory, setSearchQuery, setCategories, setItems, clearMenuState } = menuSlice.actions;
export default menuSlice.reducer;
