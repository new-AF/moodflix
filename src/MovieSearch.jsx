import { setSearch } from "./store";
import { useSelector, useDispatch } from "react-redux";

export const MovieSearch = () => {
    const dispatch = useDispatch();
    const apiKey = useSelector((state) => state.search.apiKey);

    return (
        <div className="max-w-md mx-auto flex flex-col gap-y-1">
            <label htmlFor="input-search-movies" className="daisy-label">
                Search Movies
            </label>
            <input
                onChange={(e) => dispatch(setSearch(e.target.value))}
                id="input-search-movies"
                type="text"
                className="daisy-input daisy-input-bordered w-full"
            />
        </div>
    );
};
