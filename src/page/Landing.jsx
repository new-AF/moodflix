import { mergeClassNames } from "simple-merge-class-names";
import { ErrorAlert } from "../components/ErrorAlert";
import { MoodSelector } from "../components/MoodSelector";
import { useSelector } from "react-redux";
import {
    API_CALL_IN_PROGRESS,
    API_CALL_ERRORED,
    APP_JUST_STARTED,
    MOOD_SET,
} from "../app-state/constants/status";

export const Landing = () => {
    const status = useSelector((state) => state.app.status);
    const error = useSelector((state) => state.app.error);

    return (
        <>
            <main
                className={mergeClassNames(
                    "flex",
                    "flex-col",
                    "gap-y-10",
                    "mx-auto"
                )}
            >
                {/* conditional render; default <MoodSelector />  */}
                {
                    {
                        APP_JUST_STARTED: <MoodSelector />,
                        MOOD_SET: <MoodSelector />,
                        API_CALL_IN_PROGRESS: (
                            <span className="daisy-loading daisy-loading-spinner daisy-loading-md"></span>
                        ),
                        API_CALL_ERRORED: <ErrorAlert error={error} />,
                    }[status]
                }
            </main>
        </>
    );
};
