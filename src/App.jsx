const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

import { useEffect } from "react";
import { mergeClassNames } from "simple-merge-class-names";
import { useSelector, useDispatch } from "react-redux";
import {
    setMovies,
    clearMovies,
    setSearchRunning,
    setSearchComplete,
} from "./store/store";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MoodSelector } from "./components/MoodSelector";
import { Footer } from "./components/Footer";

function App() {
    /* `search` is trimmed automatically */
    const search = useSelector((state) => state.search.searchValue);
    const movies = useSelector((state) => state.search.movies);
    const apiKey = useSelector((state) => state.search.apiKey);
    const searchRunning = useSelector((state) => state.search.searchRunning);
    const dispatch = useDispatch();

    const callAPI = async () => {
        return;
        /* console.log("callAPIing ... `callAPI`");
        return; */

        /* TMDB API; query parameter */
        const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false`;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_READ_TOKEN}`,
            },
        };

        try {
            const response = await fetch(url, options);

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
    useEffect(() => {}, []);

    return (
        <div
            className={mergeClassNames(
                "min-h-dvh",
                "grid",
                "grid-rows-[auto_1fr_auto]",
                "gap-4"
            )}
        >
            <header>
                <Navbar title={"My Moodflix"} />
                <Hero />
            </header>

            <main
                className={mergeClassNames(
                    "flex",
                    "flex-col",
                    "gap-y-10",
                    "max-w-lg",
                    "mx-auto"
                )}
            >
                {/* App Hero image but only initially, and whenever search box is empty */}
                <MoodSelector />
                {/* Search box */}
                {/* <MovieSearch /> */}
                {/* <MovieGallery search={search} list={movies} /> */}
            </main>

            <Footer />
        </div>
    );
}

export default App;
