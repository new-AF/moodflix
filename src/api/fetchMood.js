import { moodMapping } from "./mapping";
import { fetchMovies } from "./fetchMovies";

export const fetchMood = async (mood) => {
    // console.log("[fetchMood]", { mood });

    if (mood in moodMapping === false) return;

    const genres = moodMapping[mood].genres;

    // console.log("[fetchMood]", { genres });

    return fetchMovies({ genres });
};
