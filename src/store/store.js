import { configureStore, createSlice } from "@reduxjs/toolkit";

export const APP_STATUS_CONSTANTS = {
    APP_JUST_STARTED: "APP_JUST_STARTED",
    MOOD_SET: "MOOD_SET",
    API_CALL_IN_PROGRESS: "API_CALL_IN_PROGRESS",
    API_CALL_SUCCESSFUL: "API_CALL_SUCCESSFUL",
    API_CALL_ERRORED: "API_CALL_ERRORED",
};

const initialState = {
    mood: undefined,
    status: APP_STATUS_CONSTANTS.APP_JUST_STARTED,
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
            state.mood = action.payload;
            state.status = APP_STATUS_CONSTANTS.MOOD_SET;
        },
        setMovies: (state, action) => {
            const { page, results, total_pages, total_results } =
                action.payload;

            /* remap movie object keys */
            const movies = results.map(
                ({
                    title,
                    release_date: date,
                    overview: plot,
                    poster_path,
                }) => {
                    const year = date.split("-").at(0);
                    const image =
                        "https://image.tmdb.org/t/p/w500/" + poster_path;
                    return {
                        title,
                        year,
                        plot,
                        image,
                    };
                }
            );

            state.movies = movies;
        },
        /* useEffect cleanup function, clear movies before next re-render */
        clearMovies: (state) => {
            state.movies = [];
        },
        /* user is typing */
        setAPICallInProgrss: (state) => {
            state.status = APP_STATUS_CONSTANTS.API_CALL_IN_PROGRESS;
        },
        /* API fetch completed successfully */
        setAPICallSuccessful: (state) => {
            state.status = APP_STATUS_CONSTANTS.API_CALL_SUCCESSFUL;
        },
        /* API fetch errored  */
        setAPICallErrored: (state, action) => {
            state.status = APP_STATUS_CONSTANTS.API_CALL_ERRORED;
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
