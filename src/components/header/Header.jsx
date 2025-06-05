import { Navbar } from "./Navbar";
import { Hero } from "./Hero";

export const Header = ({ showHero }) => {
    return (
        <header>
            <Navbar title={"My Moodflix"} />
            {showHero && <Hero />}
        </header>
    );
};
