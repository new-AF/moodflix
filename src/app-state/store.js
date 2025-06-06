import { configureStore, createSlice } from "@reduxjs/toolkit";
import { transformMovies } from "../api/transformMovies";
import { moodMapping } from "../api/mapping";

import {
    MOOD_SET,
    APP_JUST_STARTED,
    API_CALL_IN_PROGRESS,
    API_CALL_SUCCESSFUL,
    API_CALL_ERRORED,
} from "./constants/status";
import { capitalizeString } from "../utils";

const initialState = {
    mood: undefined,
    moodCapitalized: undefined,
    emoji: undefined,
    status: APP_JUST_STARTED,
    error: undefined,
    movies: [],
};

/* actual state */
const slice = createSlice({
    name: "search slice",
    initialState,
    /* state updaters/'event' handlers */
    reducers: {
        setMood: (state, action) => {
            const originalMood = action.payload;
            const mood = originalMood.toLowerCase();
            const emoji = moodMapping[mood].emoji;

            state.status = MOOD_SET;
            state.mood = mood;
            state.moodCapitalized = capitalizeString(mood);
            state.emoji = emoji;
        },
        /* useEffect cleanup function, clear movies before next re-render */
        clearMovies: (state) => {
            state.movies = [];
        },
        /* user is typing */
        setAPICallInProgrss: (state) => {
            state.status = API_CALL_IN_PROGRESS;
        },
        /* API fetch completed successfully */
        setAPICallSuccessful: (state, action) => {
            state.status = API_CALL_SUCCESSFUL;
            state.movies = transformMovies(action.payload);
        },
        /* API fetch errored  */
        setAPICallErrored: (state, action) => {
            state.status = API_CALL_ERRORED;
            state.error = action.payload;
        },
    },
});

/* initialize redux with the store */
export const store = configureStore({
    reducer: {
        app: slice.reducer,
    },
});

/* export state updaters */
export const {
    setMood,
    clearMovies,
    setAPICallInProgrss,
    setAPICallSuccessful,
    setAPICallErrored,
} = slice.actions;
