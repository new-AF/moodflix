import { useEffect } from "react";
import { mergeClassNames } from "simple-merge-class-names";

import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer";

/* Observe state */
import { useSelector, useDispatch } from "react-redux";

import { useLocation, Outlet } from "react-router-dom";

/* Update state */
import {
    clearMovies,
    setMovies,
    setAPICallInProgrss,
    setAPICallErrored,
    setAPICallSuccessful,
} from "./app-state/store";

/* Status constants of state */
import {
    APP_JUST_STARTED,
    API_CALL_IN_PROGRESS,
    API_CALL_SUCCESSFUL,
    API_CALL_ERRORED,
} from "./app-state/constants/status";

/* Fetch API */
import { fetchMovies } from "./api/fetchMovies";

/* Components */
import { Landing } from "./page/Landing";

export const App = () => {
    const { pathname } = useLocation();

    /* State */
    const status = useSelector((state) => state.app.status);
    const error = useSelector((state) => state.app.error);
    const mood = useSelector((state) => state.app.mood);
    const movies = useSelector((state) => state.app.movies);
    const dispatch = useDispatch();

    const fetchAPI = async () => {
        dispatch(setAPICallInProgrss());
        const { success, data, error } = await fetchMovies();

        if (success === false) {
            dispatch(setAPICallErrored(error));
            return;
        }

        dispatch(setAPICallSuccessful());
        dispatch(setMovies(data));
    };

    /* will run once and then every time `mood` changes */
    useEffect(() => {
        if (status === APP_JUST_STARTED) {
            return;
        }

        // fetchAPI();

        /* run this cleanup function before every re-render */
        return () => dispatch(clearMovies());
    }, [mood]);

    return (
        <div
            className={mergeClassNames(
                "app",
                "min-h-dvh",
                "grid",
                "grid-rows-[auto_1fr_auto]",
                "gap-4",
                "outline"
            )}
        >
            <Header showHero={pathname === "/"} />
            <Outlet />
            <Footer />
        </div>
    );
};
