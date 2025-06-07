/* rudeimentary, may keep out false positives, but it is the best we cad for now, filter Not Safe For Work content
expects original tmdb 'data.results' array' */

export const filterNSFW = (array) => {
    const nsfwKeywords = [
        "penis",
        "cock",
        "sex",
        "porn",
        "adult content",
        "explicit",
        "nudity",
    ];

    /* only keep entry if test returns true */
    /* ignore adult content, convert to lowercase, then run keep filter */

    const keep = ({ title, overview }) => {
        const titleLowerCase = title.toLowerCase();
        const overviewLowerCase = overview.toLowerCase();

        /* .some returns true if any */
        const ignore = nsfwKeywords.some(
            (keyword) =>
                titleLowerCase.includes(keyword) ||
                overviewLowerCase.includes(keyword)
        );

        if (ignore) {
            // console.log("[filterNSFW/filter out:]", title, "-", overview);
        }

        return ignore === false;
    };

    const nonAdult = array.filter(({ adult }) => adult === false);
    // console.log({ nonAdult });

    const filtered = nonAdult.filter(keep);
    // console.log({filtered})

    return filtered;
};
