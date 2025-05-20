import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Navbar } from "./Navbar";
import { MovieSearch } from "./MovieSearch";

function App() {
    const [count, setCount] = useState(0);

    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    console.log(apiKey); // API key

    return (
        <>
            <Navbar title={"My Moodflix"} />
            <MovieSearch />
        </>
    );
}

export default App;
