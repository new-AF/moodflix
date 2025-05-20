import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies, setSearchRunning, setSearchComplete } from "./store";

import { Navbar } from "./Navbar";
import { MovieSearch } from "./MovieSearch";
import { useRef } from "react";
import { MovieGallery } from "./MovieGallery";

function App() {
    const search = useSelector((state) => state.search.searchValue);
    const movies = useSelector((state) => state.search.movies);
    const apiKey = useSelector((state) => state.search.apiKey);
    const searchRunning = useSelector((state) => state.search.searchRunning);
    const fetchComplete = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // if (fetchComplete.current) return; // prevents double fetching because of <StrictMode> double-rendering and running useEffect. useRef persists across renders

        fetchComplete.current = true;

        dispatch(setSearchRunning());

        const call = async () => {
            const url = `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                console.info(data, { movies });

                dispatch(setMovies(data));
                dispatch(setSearchComplete());
            } catch (error) {
                console.error(error);
            }
        };

        call();
    }, [search]);

    return (
        <>
            <header>
                <Navbar title={"My Moodflix"} />
            </header>

            <main className="flex flex-col gap-y-10">
                <MovieSearch />
                {searchRunning ? (
                    <span className="daisy-loading daisy-loading-spinner daisy-loading-sm"></span>
                ) : (
                    <MovieGallery search={search} list={movies} />
                )}
            </main>
        </>
    );
}

export default App;
