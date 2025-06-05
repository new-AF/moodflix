import { setMood } from "../app-state/store";
import { useDispatch } from "react-redux";

const moods = [
    { label: "Happy", emoji: "😊" },
    { label: "Sad", emoji: "😢" },
    { label: "Angry", emoji: "😡" },
    { label: "Scared", emoji: "😨" },
    { label: "Thoughtful", emoji: "🤔" },
    { label: "Laughing", emoji: "🤣" },
    { label: "In Love", emoji: "😍" },
    { label: "Cool", emoji: "😎" },
    { label: "Bored", emoji: "🥱" },
    { label: "Sleepy", emoji: "😴" },
];

export const MoodSelector = () => {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col gap-4 justify-center">
            <span className="mx-auto font-bold text-2xl">Select your mood</span>
            <ul className="flex flex-wrap gap-2 justify-center">
                {moods.map(({ label, emoji }) => (
                    <button
                        key={label}
                        className="daisy-btn daisy-btn-xl"
                        onClick={() => dispatch(setMood(label))}
                    >
                        {label} {emoji}
                    </button>
                ))}
            </ul>
        </div>
    );
};
