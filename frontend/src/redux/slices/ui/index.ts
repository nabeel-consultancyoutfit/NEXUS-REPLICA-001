import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  pageTitle: string;
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: 'light',
  pageTitle: 'Dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setPageTitle: (state, action: PayloadAction<string>) => {
      state.pageTitle = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setTheme, setPageTitle } =
  uiSlice.actions;

export default uiSlice.reducer;
