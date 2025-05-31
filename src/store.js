import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
    searchRunning: false,
    movies: [],
};

/* actual state */
const slice = createSlice({
    name: "search slice",
    initialState,
    /* update state */
    reducers: {
        setSearch: (state, action) => {
            const val = action.payload;
            /* return trimmed */
            const trimmed = val.trim();
            state.searchValue = trimmed;
        },
        setMovies: (state, action) => {
            const obj = action.payload;
            /* response key: 'results' */
            state.movies = obj.results;
        },
        /* useEffect cleanup function, clear movies before next re-render */
        clearMovies: (state) => {
            state.movies = [];
        },

        /* user is typing */
        setSearchRunning: (state) => {
            state.searchRunning = true;
        },

        /* API fetch completed successfully */
        setSearchComplete: (state) => {
            state.searchRunning = false;
        },
    },
});

/* initialize redux with the store */
export const store = configureStore({
    reducer: {
        search: slice.reducer,
    },
});

/* export state changers */
export const {
    setSearch,
    setMovies,
    clearMovies,
    setSearchRunning,
    setSearchComplete,
} = slice.actions;
