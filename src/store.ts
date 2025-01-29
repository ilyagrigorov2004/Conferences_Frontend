import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authorsSlice from "./slices/AuthorsSlice"
import ConferenceSlice from "./slices/conferenceSlice"
import userSlice from "./slices/userSlice"
import conferencesClice from "./slices/conferencesSlice"

export const store = configureStore({
    reducer: combineReducers({
        authors: authorsSlice,
        conference: ConferenceSlice,
        user: userSlice,
        conferences: conferencesClice,
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch