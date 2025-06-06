import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { moodMapping } from "../api/mapping";
import { capitalizeString } from "../utils";

const moods = Object.keys(moodMapping);

export const MoodSelector = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center max-w-lg mx-auto">
            <h2 className="text-center font-bold text-2xl py-(--custom-spacing-md)">
                Select your mood
            </h2>
            <ul className="flex flex-wrap gap-(--custom-spacing-xs) justify-center">
                {moods.map((key) => {
                    const emoji = moodMapping[key].emoji;
                    const moodCapitalized = capitalizeString(key);
                    return (
                        <button
                            key={key}
                            className="daisy-btn daisy-btn-xl"
                            onClick={() => {
                                navigate("/mood/" + key.toLowerCase());
                            }}
                        >
                            {moodCapitalized} {emoji}
                        </button>
                    );
                })}
            </ul>
        </div>
    );
};
