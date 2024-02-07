import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  sidebarOpen: boolean;
}

const initialState: CounterState = {
  sidebarOpen: false,
}

export const globalSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSideBarOpen: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.sidebarOpen = !state.sidebarOpen
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSideBarOpen } = globalSlice.actions

export default globalSlice.reducer