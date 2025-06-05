const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

export const fetchMovies = async () => {
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
        const response = await fetch(url, options);

        if (response.ok === false) {
            return { success: false, error: "Failed to fetch" };
        }

        /* data is an array of movie objects */
        const data = await response.json();
        console.info("API results", data);
        return { success: true, data };
    } catch (error) {
        console.error(error);
        return { success: false, error };
    }
};
