import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setMovies,
    clearMovies,
    setSearchRunning,
    setSearchComplete,
} from "./store";

import { Navbar } from "./Navbar";
import { MovieSearch } from "./MovieSearch";
import { MovieGallery } from "./MovieGallery";

function App() {
    /* `search` is trimmed automatically */
    const search = useSelector((state) => state.search.searchValue);
    const movies = useSelector((state) => state.search.movies);
    const apiKey = useSelector((state) => state.search.apiKey);
    const searchRunning = useSelector((state) => state.search.searchRunning);
    const dispatch = useDispatch();

    const callAPI = async () => {
        /* console.log("callAPIing ... `callAPI`");
        return; */

        /* Open Movies DB API; search parameter */
        const url = `http://www.omdbapi.com/?s=${search}&apikey=${apiKey}`;
        try {
            const response = await fetch(url);

            /* data is an array of movie objects */
            const data = await response.json();
            console.info("API results", data);

            dispatch(setMovies(data));
            dispatch(setSearchComplete());
        } catch (error) {
            console.error(error);
        }
    };

    /* will run once and then every time `search` changes */
    useEffect(() => {
        if (search === "") return;

        dispatch(setSearchRunning());

        /* delay/debounce */
        const id = setTimeout(() => {
            callAPI();
        }, 500);

        /* runs before every `search change/`re-render */
        return () => {
            dispatch(clearMovies());
            clearTimeout(id);
        };
    }, [search]);

    return (
        <>
            <header>
                <Navbar title={"My Moodflix"} />
            </header>

            <main className="flex flex-col gap-y-10">
                <MovieSearch />
                {searchRunning === true ? (
                    <span className="daisy-loading daisy-loading-spinner daisy-loading-sm mx-auto"></span>
                ) : search === "" ? (
                    <span className="mx-auto"></span>
                ) : (
                    <MovieGallery search={search} list={movies} />
                )}
            </main>

            <footer className="daisy-footer daisy-sm:footer-horizontal daisy-footer-center  text-base-content p-4">
                <aside>
                    <p> Made with ❤️ by Abdullah Fatota</p>
                </aside>
            </footer>
        </>
    );
}

export default App;
