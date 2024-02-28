import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TeamsState {
  teams: {}
}

const initialState: TeamsState = {
  teams: {},
}

export const teamsSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addTeams: (state, action: PayloadAction<object>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.teams = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTeams } = teamsSlice.actions

export default teamsSlice.reducer