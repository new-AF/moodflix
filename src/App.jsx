import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Navbar } from "./Navbar";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar title={"My Moodflix"} />
        </>
    );
}

export default App;
