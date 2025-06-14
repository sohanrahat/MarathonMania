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
import Dashboard from "../Layouts/Dashboard";
import MyMarathons from "../Components/MyMarathons";
import MyApplications from "../Components/MyApplications";
import AddMarathonPage from "../Pages/AddMarathonPage";


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
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "my-marathons",
                element: <MyMarathons />
            },
            {
                path: "my-applications",
                element: <MyApplications />
            },
            {
                path: "add-marathon",
                element: <AddMarathonPage />
            }
        ]
    }
]);

export default router;