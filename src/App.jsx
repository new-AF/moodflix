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

    const callAPI = async () => {
        console.log("callAPIing ... `callAPI`");
        return;
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

    useEffect(() => {
        // if (fetchComplete.current) return; // prevents double fetching because of <StrictMode> double-rendering and running useEffect. useRef persists across renders

        /* delay/debounce */
        const id = setTimeout(() => {
            fetchComplete.current = true;
            dispatch(setSearchRunning());
            callAPI();
        }, 500);

        /* runs before every `search change/`re-render */
        return () => clearTimeout(id);
    }, [search]);

    return (
        <>
            <header>
                <Navbar title={"My Moodflix"} />
            </header>

            <main className="flex flex-col gap-y-10 outline px-10">
                <MovieSearch />
                {searchRunning ? (
                    <span className="daisy-loading daisy-loading-spinner daisy-loading-sm mx-auto"></span>
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
