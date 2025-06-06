import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

/* API */
import { fetchMood } from "../api/fetchMood";

/* Update state */
import {
    setMood,
    clearMovies,
    setAPICallInProgrss,
    setAPICallErrored,
    setAPICallSuccessful,
} from "../app-state/store";

import {
    API_CALL_IN_PROGRESS,
    API_CALL_ERRORED,
    APP_JUST_STARTED,
    API_CALL_SUCCESSFUL,
} from "../app-state/constants/status";

import { MovieGallery } from "../components/movie/MovieGallery";
import { ErrorAlert } from "../components/ui/ErrorAlert";
import { FetchingMoviesLoader } from "../components/ui/FetchingMoviesLoader";

export const Mood = () => {
    const { mood } = useParams();
    const error = useSelector((state) => state.app.error);
    const movies = useSelector((state) => state.app.movies);
    const status = useSelector((state) => state.app.status);

    const dispatch = useDispatch();

    const fetchAPI = async () => {
        // Set the current mood in the state
        dispatch(setMood(mood));
        dispatch(setAPICallInProgrss());
        // return;

        const { success, data, error } = await fetchMood(mood);

        // console.log("[App.jsx/fetchAPI]", { success, data, error  });

        if (success === false) {
            dispatch(setAPICallErrored(error));
            return;
        }

        dispatch(setAPICallSuccessful(data));
    };

    /* will run once and then every time `mood` changes */
    useEffect(() => {
        fetchAPI();

        /* run this cleanup function before every re-render */
        return () => dispatch(clearMovies());
    }, [mood]);

    return (
        <div className="flex flex-col justify-start py-[2rem]">
            {
                {
                    API_CALL_IN_PROGRESS: <FetchingMoviesLoader />,
                    API_CALL_ERRORED: <ErrorAlert error={error} />,
                    API_CALL_SUCCESSFUL: (
                        <MovieGallery
                            movies={movies}
                            title={"Movies for " + mood + " mood"}
                        />
                    ),
                }[status]
            }
        </div>
    );
};
