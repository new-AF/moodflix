import { configureStore, createSlice } from "@reduxjs/toolkit";
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const initialState = {
    searchValue: "",
    apiKey,
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
            state.movies =
                "Response" in obj === false || obj.Response === "False"
                    ? []
                    : obj.Search;
        },
        /* useEffect cleanup function, clear movies before next re-render */
        clearMovies: (state) => {
            state.movies = [];
        },

        setSearchRunning: (state) => {
            state.searchRunning = true;
        },
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
