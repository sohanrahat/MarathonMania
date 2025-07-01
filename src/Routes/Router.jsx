import { createBrowserRouter } from "react-router";
import PrivateRoute from "../Context/PrivateRoute";
import Root from "../Layouts/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Marathons from "../Pages/Marathons";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyMarathons from "../Components/MyMarathons";
import MyApplications from "../Components/MyApplications";
import DashboardLayout from "../Dashboard/DashboardLayout";
import AddMarathon from "../Components/AddMarathon";
import AllMarathons from "../Dashboard/AllMarathons";
import MarathonDetails from "../Dashboard/MarathonDetails";
import MarathonRegistration from "../Dashboard/MarathonRegistration";
import Plans from "../Pages/Plans";


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
                element: <About />
            },
            {
                path: "/plans",
                element: <Plans />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "dashboard",
                element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
                children: [
                    {
                        path: "all-marathons",
                        element: <AllMarathons />
                    },
                    {
                        path: "my-marathons",
                        element: <MyMarathons />
                    },
                    {
                        index: true,
                        element: <MyMarathons />
                    },

                    {
                        path: "applications",
                        element: <MyApplications />
                    },
                    {
                        path: "add-marathon",
                        element: <AddMarathon />
                    },
                    {
                        path: "marathon-details/:id",
                        element: <MarathonDetails />
                    },
                    {
                        path: "marathon-registration/:id",
                        element: <MarathonRegistration />
                    }
                ]
            }
        ]
    }
]);

export default router;