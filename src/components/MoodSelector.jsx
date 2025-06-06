import { useNavigate } from "react-router-dom";
import { setMood } from "../app-state/store";
import { useDispatch } from "react-redux";
import { moodMapping } from "../api/mapping";

const moods = Object.keys(moodMapping);

export const MoodSelector = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 justify-center">
            <span className="mx-auto font-bold text-2xl">Select your mood</span>
            <ul className="flex flex-wrap gap-2 justify-center">
                {moods.map((key) => (
                    <button
                        key={key}
                        className="daisy-btn daisy-btn-xl"
                        onClick={() => {
                            navigate("/mood/" + key.toLowerCase());
                            dispatch(setMood(key));
                        }}
                    >
                        {key} {moodMapping[key].emoji}
                    </button>
                ))}
            </ul>
        </div>
    );
};
