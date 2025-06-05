export const transformMovies = (
    obj,
    imagesBaseUrl = "https://image.tmdb.org/t/p/w500/"
) => {
    const { page, results, total_pages, total_results } = obj;

    /* remap movie object keys */
    const movies = results.map((innerObj) => {
        const {
            title,
            release_date: date,
            overview: plot,
            poster_path,
        } = innerObj;
        const year = date.split("-").at(0);
        const image = imagesBaseUrl + poster_path;
        const newObj = {
            title,
            year,
            plot,
            image,
        };
        return newObj;
    });

    return movies;
};
