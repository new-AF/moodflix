import { Navbar } from "./Navbar";
import { Hero } from "./Hero";

export const Header = ({ showHero }) => {
    return (
        <header>
            <Navbar />
            {showHero && <Hero />}
        </header>
    );
};
