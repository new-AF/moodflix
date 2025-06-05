import { configureStore, createSlice } from "@reduxjs/toolkit";
import { transformMovies } from "../api/transformMovies";
import {
    MOOD_SET,
    APP_JUST_STARTED,
    API_CALL_IN_PROGRESS,
    API_CALL_SUCCESSFUL,
    API_CALL_ERRORED,
} from "./constants/status";

const initialState = {
    mood: undefined,
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
            state.mood = action.payload.toLowerCase();
            state.status = MOOD_SET;
        },
        setMovies: (state, action) => {
            state.movies = transformMovies(action.payload);
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
        setAPICallSuccessful: (state) => {
            state.status = API_CALL_SUCCESSFUL;
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
    setMovies,
    clearMovies,
    setAPICallInProgrss,
    setAPICallSuccessful,
    setAPICallErrored,
} = slice.actions;
