import { mergeClassNames } from "simple-merge-class-names";
import { ErrorAlert } from "../components/ui/ErrorAlert";
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
            <main className={mergeClassNames()}>
                <MoodSelector />
            </main>
        </>
    );
};
