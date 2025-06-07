import { filterNSFW } from "./filterNSFW";

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

    // urlAdditions.push("sort_by=popularity.desc");
    urlAdditions.push("sort_by=revenue.desc");

    if (genres) {
        urlAdditions.push("with_genres=" + genres.join(","));
    }

    const url = [baseUrl, ...urlAdditions].join("&");

    /* console.log({ url }); */

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${TMDB_READ_TOKEN}`,
        },
    };

    try {
        const response = await fetch(url, options);

        /* server could could not fulfill request, e.g.
            404 server cannot find the requested resource. */
        if (response.ok === false) {
            const errorArray = [`Failed to fetch: ${response.status}.`];
            /* often server provides more information about error */
            try {
                const serverJson = await response.json();
                if ("status_code" in serverJson) {
                    errorArray.push(
                        `Internal Server Error Code: "${serverJson.status_code}".`
                    );
                }
                if ("status_message" in serverJson) {
                    errorArray.push(
                        `Error Message: "${serverJson.status_message}".`
                    );
                }
            } catch (errorParsingJson) {}
            return {
                success: false,
                error: errorArray.join(" "),
            };
        }

        /* data is an array of movie objects */
        const data = await response.json();
        console.info("API results", data);
        const filteredArray = filterNSFW(data.results);
        // console.log({ filteredArray });
        return { success: true, data: { ...data, results: filteredArray } };
    } catch (error) {
        console.error(error);
        return { success: false, error };
    }
};
