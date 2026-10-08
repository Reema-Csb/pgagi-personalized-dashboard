import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  mobileSidebarOpen: boolean;
  searchQuery: string;
}

const initialState: UiState = {
  mobileSidebarOpen: false,
  searchQuery: "",
};

const uiSlice = createSlice({
  name: "ui",

  initialState,

  reducers: {
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileSidebarOpen = action.payload;
    },

    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    clearSearch: (state) => {
      state.searchQuery = "";
    },
  },
});

export const {
  setMobileSidebarOpen,
  toggleMobileSidebar,
  setSearchQuery,
  clearSearch,
} = uiSlice.actions;

export default uiSlice.reducer;
