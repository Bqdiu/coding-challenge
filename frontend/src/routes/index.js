import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EmployeeLogin from "../pages/employee/EmployeeLogin";
import OwnerLogin from "../pages/owner/OwnerLogin";
import Home from "../pages/Home";
import OwnerVerification from "../pages/owner/OwnerVerification";
import EmployeeVerification from "../pages/employee/EmployeeVerification";
import DashBoard from "../pages/DashBoard";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <App />
        ),
        children: [
            {
                path: "",
                element: (
                    <Home />
                ),
            },
            {
                path: "dashboard",
                element: (
                    <DashBoard />
                ),
            },
            {
                path: "owner/login",
                element: (
                    <OwnerLogin />
                ),
            },
            {
                path: "owner/login/verification",
                element: (
                    <OwnerVerification />
                ),
            },
            {
                path: "employee/login",
                element: (
                    <EmployeeLogin />
                ),
            },
            {
                path: "employee/login/verification",
                element: (
                    <EmployeeVerification />
                ),
            },
        ]
    }
])


export default router;