import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import { Mood } from "../page/Mood";
import { Landing } from "../page/Landing";

/* routing */
export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { index: true, element: <Landing /> },
                { path: "mood/:mood", element: <Mood /> },
            ],
        },
    ],
    {
        basename: "/moodflix", // for deployment
    }
);
