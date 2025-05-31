import { MovieCard } from "./MovieCard";

export const MovieGallery = ({ search, list }) => {
    /* e.g. append "poster_path": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg" */
    const imageUrlBase = `https://image.tmdb.org/t/p/w500`;

    /*

response keys: 
title, poster_path, movie_id, overview (plot)

*/
    return (
        <section className="flex flex-col px-5 mx-auto">
            <h2 className="py-10 font-bold text-2xl">
                Search results for "{search}":
            </h2>
            <ul className="flex flex-wrap gap-10">
                {list.map((obj, index) => {
                    const { title, poster_path: postPath, overview } = obj;

                    const image = imageUrlBase + postPath;

                    return (
                        <li key={title + " " + index}>
                            <MovieCard
                                title={title}
                                image={image}
                                plot={overview}
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
