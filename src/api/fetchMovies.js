import { filterNSFW } from "./filterNSFW";

const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;

const fetchOptions = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_READ_TOKEN}`,
    },
};

const trailersAPI = async (movieId) => {
    const API = `https://api.themoviedb.org/3/movie/${movieId}/videos`;

    try {
        const response = await fetch(API, fetchOptions);
        const { status, ok } = response;
        // e.g. 404
        if (ok === false) return { success: false };

        const json = await response.json();

        // API could not find movie, missing `results` array in json
        if ("results" in json === false) {
            return { success: false };
        }

        // no trailers found, results = []
        const { results } = json;
        if (results.length === 0) {
            return { success: false };
        }

        // array of objects, trailer websites e.g
        /* 
        {
            "iso_639_1": "en",
            "iso_3166_1": "US",
            "name": "Official Trailer",
            "key": "abc123XYZ",
            "site": "YouTube",
            "type": "Trailer"
        }
        */
        const obj = results.find(
            ({ site, type }) => site === "YouTube" && type === "Trailer"
        );

        // no YouTube trailer
        if (obj === undefined) return { success: false };

        // https://www.youtube.com/watch?v=abc123XYZ
        const { key: youtubeId } = obj;

        return {
            success: true,
            youtubeLink: `https://www.youtube.com/watch?v=${youtubeId}`,
        };
    } catch (error) {
        return { success: false };
    }
};

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

    try {
        const response = await fetch(url, fetchOptions);

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
        /* 
        data = {
            page: 1
            results: [{...}, {...}]
            total_pages: 7864
        }
        */
        const data = await response.json();
        console.info("API results", data);

        // e.g. {adult: false, backdrop_path: '/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg', genre_ids: Array(4), id: 1022789, original_language: 'en', …}
        const filteredArray = filterNSFW(data.results);

        // add YT trailer links. adds some latency
        for (const obj of filteredArray) {
            const { success, youtubeLink } = await trailersAPI(obj.id);
            if (success === false) continue;

            obj.youtubeLink = youtubeLink;
        }

        // console.log({ filteredArray });
        return { success: true, data: { ...data, results: filteredArray } };
    } catch (error) {
        console.error(error);
        return { success: false, error };
    }
};
