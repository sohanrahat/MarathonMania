import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Marathons from "../Pages/Marathons";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AboutUs from "../Pages/AboutUs";
import Contact from "../Pages/Contact";
import Faq from "../Pages/Faq";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/marathons",
                element: <Marathons />
            },
            {
                path: "/about",
                element: <AboutUs />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/faq",
                element: <Faq />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }

        ]
    }
]);

export default router;