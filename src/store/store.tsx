import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterSlice'
import globalReducer from '../features/globalSlice'
import teamReducer from '../features/teamsSlice'
import teamGamesReducer from '../features/teamGamesSlice'

export type IRootState = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    global: globalReducer,
    counter: counterReducer,
    team: teamReducer,
    teamGames: teamGamesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch