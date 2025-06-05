import { useParams } from "react-router-dom";

export const Mood = () => {
    const { mood } = useParams();

    return <div>{mood}</div>;
};
