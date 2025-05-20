import { useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { MovieSearch } from "./MovieSearch";

function App() {
    const search = useSelector((state) => state.search.searchValue);

    // console.log(apiKey); // API key

    return (
        <>
            <Navbar title={"My Moodflix"} />
            <MovieSearch />
            {search}
        </>
    );
}

export default App;
