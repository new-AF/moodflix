export const MovieSearch = () => {
    return (
        <div className="max-w-md mx-auto flex flex-col gap-y-1">
            <label htmlFor="input-search-movies" className="daisy-label">
                Search Movies
            </label>
            <input
                id="input-search-movies"
                type="text"
                className="daisy-input daisy-input-bordered w-full"
            />
        </div>
    );
};
