const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

export const fetchMovies = async ({ genres = [] } = {}) => {
    /* console.log(
        "[fetchMovies]",
        { genres },
        typeof genres,
        Array.isArray(genres)
    ); */

    /* TMDB API; query parameter */
    const baseUrl =
        "https://api.themoviedb.org/3/discover/movie?include_adult=false";

    /* additional query parameters */
    const urlAdditions = [];

    urlAdditions.push("sort_by=popularity.desc");

    if (genres) {
        urlAdditions.push("with_genres=" + genres.join(","));
    }

    const url = [baseUrl, ...urlAdditions].join("&");

    console.log({ url });

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
        return { success: true, data, movies: data.results };
    } catch (error) {
        console.error(error);
        return { success: false, error };
    }
};
