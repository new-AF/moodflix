import { useEffect } from "react";
import { setSearch, setMovies } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

export const MovieSearch = () => {
    const dispatch = useDispatch();

    return (
        <div className="w-md mx-auto flex flex-col gap-y-1 px-10">
            <label htmlFor="input-search-movies" className="daisy-label">
                Search Movies
            </label>
            <input
                /* update state `search` */
                // onChange={(e) => dispatch(setSearch(e.target.value))}
                id="input-search-movies"
                type="text"
                className="daisy-input daisy-input-bordered w-full"
            />
        </div>
    );
};
