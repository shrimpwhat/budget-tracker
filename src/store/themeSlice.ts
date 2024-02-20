import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";


const getInitalState = () => {
  const mode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" as PaletteMode
  document.documentElement.dataset.theme = mode
  return { mode }
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitalState(),
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      document.documentElement.dataset.theme = state.mode
    }
  }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer;