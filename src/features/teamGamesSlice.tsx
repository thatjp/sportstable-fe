import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TeamsState {
  games: {};
}

const initialState: TeamsState = {
  games: {},
};

export const teamGamesSlice = createSlice({
  name: "team games",
  initialState,
  reducers: {
    addTeamGames: (state, action: any) => {
      let arr: any = [];
      action?.payload?.resultSets[0]?.rowSet?.forEach((element: any, idx: any) => {
        let obj: any = {};
        action.payload.resultSets[0].headers?.forEach((k: any, i: any) => {
          obj[k] = element[i];
        });
        arr.push(obj);
      });
      state.games = arr
    },
  },
});

export const { addTeamGames } = teamGamesSlice.actions;

export default teamGamesSlice.reducer;
