import { configureStore, createSlice } from "@reduxjs/toolkit";
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const initialState = {
    searchValue: "",
    apiKey,
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
    },
});

export const store = configureStore({
    reducer: {
        search: slice.reducer,
    },
});

export const { setSearch } = slice.actions;
