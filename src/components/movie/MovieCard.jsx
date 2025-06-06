import { useState } from "react";

export const MovieCard = ({ image, title, plot, year }) => {
    const newTitle = `${title} (${year})`;

    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(newTitle);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000);
        } catch (error) {
            console.error("Failed to copy text", error);
        }
    };

    return (
        <div className="daisy-card bg-base-100 max-w-96 shadow-sm">
            <figure>
                <img src={image} alt="move poster" />
            </figure>

            {/* body */}
            <div className="daisy-card-body">
                {/* title + copy */}
                <h2 className="daisy-card-title flex justify-between flex-wrap">
                    <span>{newTitle}</span>

                    {/* Copy Button - moved inside the h2 */}
                    <button
                        className="daisy-btn daisy-btn-sm daisy-btn-ghost" // Using small, ghost button for a more subtle look next to title
                        onClick={handleCopyClick}
                        aria-label={isCopied ? "Copied!" : "Copy movie title"}
                    >
                        {isCopied ? (
                            // Checkmark icon when title copied
                            <>
                                Copied!{" "}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-12.75"
                                    />
                                </svg>
                            </>
                        ) : (
                            // Copy icon
                            <svg
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                                strokeWidth={2.5}
                                className="w-5 h-5"
                            >
                                <path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
                            </svg>
                        )}
                    </button>
                </h2>

                {/* plot */}
                <p>{plot}</p>

                {/* watch trailer  */}
                <div className="daisy-card-actions justify-end">
                    <button className="daisy-btn daisy-btn-primary">
                        Watch Trailer
                    </button>
                </div>
            </div>
        </div>
    );
};
