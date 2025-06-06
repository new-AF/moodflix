import { useEffect } from "react";
import { mergeClassNames } from "simple-merge-class-names";

import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer";

import { useLocation, Outlet } from "react-router-dom";

/* Fetch API */

export const App = () => {
    const { pathname } = useLocation();

    return (
        <div
            className={mergeClassNames(
                "app",
                "min-h-dvh",
                "grid",
                "grid-rows-[auto_1fr_auto]",
                "outline"
            )}
        >
            <Header showHero={pathname === "/"} />
            <Outlet />
            <Footer />
        </div>
    );
};
