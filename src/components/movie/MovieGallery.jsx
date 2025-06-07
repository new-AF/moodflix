import { MovieCard } from "./MovieCard";

/*
movies shape: array of objects:
    title,
    image (path),
    plot
    year
*/
export const MovieGallery = ({ title, movies }) => {
    return (
        <section className="flex flex-col mx-auto">
            <h2 className="pb-[3rem] font-bold text-2xl text-center">
                {title}
            </h2>
            <ul className="flex flex-wrap gap-10 justify-center">
                {movies.map((obj, index) => {
                    const { title, image, plot, year } = obj;

                    return (
                        <li key={title + " " + index}>
                            <MovieCard
                                title={title}
                                image={image}
                                plot={plot}
                                year={year}
                            />
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
