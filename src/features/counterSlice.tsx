import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  user: {}
}

const initialState: CounterState = {
  user: {},
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<object>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload
    },
    incrementByAmount: (state, action: PayloadAction<string>) => {
      state.user += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer