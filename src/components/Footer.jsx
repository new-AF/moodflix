import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="daisy-footer daisy-sm:footer-horizontal daisy-footer-center  text-base-content p-4">
            <aside>
                <p>
                    Made with ❤️ by{" "}
                    <Link className="underline" to="https://github.com/new-AF">
                        Abdullah Fatota
                    </Link>
                </p>
            </aside>
        </footer>
    );
};
