import { configureStore, createSlice } from "@reduxjs/toolkit";
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const initialState = {
    searchValue: "",
    apiKey,
    searchRunning: false,
    movies: [],
};

const slice = createSlice({
    name: "search slice",
    initialState,
    /* update state */
    reducers: {
        setSearch: (state, action) => {
            const val = action.payload;
            state.searchValue = val;
        },
        setMovies: (state, action) => {
            const obj = action.payload;
            state.movies =
                "Response" in obj === false || obj.Response === "False"
                    ? []
                    : obj.Search;
        },
        setSearchRunning: (state) => {
            state.searchRunning = true;
        },
        setSearchComplete: (state) => {
            state.searchRunning = false;
        },
    },
});

export const store = configureStore({
    reducer: {
        search: slice.reducer,
    },
});

export const { setSearch, setMovies, setSearchRunning, setSearchComplete } =
    slice.actions;
