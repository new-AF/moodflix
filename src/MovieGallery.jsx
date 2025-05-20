import { MovieCard } from "./MovieCard";

export const MovieGallery = ({ search, list }) => {
    return (
        <section className="flex flex-col px-5 mx-auto outline">
            <h2 className="py-10 font-bold text-2xl">
                Result of search for "{search}":
            </h2>
            <ul className="flex flex-wrap gap-10">
                {list.map((obj, index) => {
                    const { Title: title, Poster: image, Plot: plot } = obj;
                    return (
                        <li key={title + " " + index}>
                            <MovieCard
                                title={title}
                                image={image}
                                plot={plot}
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
