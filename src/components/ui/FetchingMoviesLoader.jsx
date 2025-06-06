export const FetchingMoviesLoader = () => {
    return (
        <span className="mx-auto flex gap-(--custom-spacing-xs)">
            Fetching movies{" "}
            <span className="daisy-loading daisy-loading-spinner daisy-loading-md"></span>
        </span>
    );
};
