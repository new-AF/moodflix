const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

import { useEffect } from "react";
import { mergeClassNames } from "simple-merge-class-names";
import { useSelector, useDispatch } from "react-redux";
import {
    clearMovies,
    setMovies,
    setAPICallInProgrss,
    setAPICallErrored,
    setAPICallSuccessful,
    APP_STATUS_CONSTANTS,
} from "./store/store";

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MoodSelector } from "./components/MoodSelector";
import { MovieGallery } from "./components/MovieGallery";
import { Footer } from "./components/Footer";

function App() {
    /* `search` is trimmed automatically */

    const status = useSelector((state) => state.app.status);
    const error = useSelector((state) => state.app.error);
    const mood = useSelector((state) => state.app.mood);
    const movies = useSelector((state) => state.app.movies);
    const dispatch = useDispatch();

    const getMoviesAPI = async () => {
        /* TMDB API; query parameter */
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&with_genres=35`;

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_READ_TOKEN}`,
            },
        };

        try {
            dispatch(setAPICallInProgrss());
            const response = await fetch(url, options);

            if (response.ok === false) {
                dispatch(setAPICallErrored());
                return;
            }

            /* data is an array of movie objects */
            const data = await response.json();
            console.info("API results", data);

            dispatch(setAPICallSuccessful());
            dispatch(setMovies(data));
        } catch (error) {
            console.error(error);
        }
    };

    /* will run once and then every time `mood` changes */
    useEffect(() => {
        if (status === APP_STATUS_CONSTANTS.APP_JUST_STARTED) {
            return;
        }

        getMoviesAPI();

        /* run this cleanup function before every re-render */
        return () => dispatch(clearMovies());
    }, [mood]);

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
                    "mx-auto"
                )}
            >
                {status === APP_STATUS_CONSTANTS.API_CALL_IN_PROGRESS ? (
                    <span className="daisy-loading daisy-loading-spinner daisy-loading-md"></span>
                ) : status === APP_STATUS_CONSTANTS.API_CALL_ERRORED ? (
                    <div role="alert" className="daisy-alert daisy-alert-error">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                ) : status === APP_STATUS_CONSTANTS.API_CALL_SUCCESSFUL ? (
                    <MovieGallery movies={movies} />
                ) : (
                    <MoodSelector />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
