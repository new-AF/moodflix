export const MovieCard = ({ image, title, plot, year }) => {
    return (
        <div className="daisy-card bg-base-100 w-96 shadow-sm">
            <figure>
                <img src={image} alt="move poster" />
            </figure>
            <div className="daisy-card-body">
                <h2 className="daisy-card-title">
                    {title} ({year})
                </h2>
                <p>{plot}</p>
                <div className="daisy-card-actions justify-end">
                    <button className="daisy-btn daisy-btn-primary">
                        Watch
                    </button>
                </div>
            </div>
        </div>
    );
};
